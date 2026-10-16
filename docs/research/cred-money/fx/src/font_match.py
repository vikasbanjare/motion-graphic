"""Render candidate fonts in Chromium (real shaping, CSS letter-spacing) and score against reference masks."""
import sys, os, glob, json, base64
sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
import numpy as np, cv2
from playwright.sync_api import sync_playwright
FX='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx'
KIT='/home/user/motion-graphic/motion-kit/public/fonts'
SERIF_FAM="fraunces playfair-display libre-caslon-text libre-caslon-display source-serif-4 newsreader young-serif dm-serif-display dm-serif-text gelasio crimson-pro eb-garamond gloock bodoni-moda noto-serif-display pt-serif literata spectral lora libre-baskerville cormorant-garamond petrona playfair instrument-serif besley castoro frank-ruhl-libre ibm-plex-serif roboto-serif brygada-1918 linden-hill domine noto-serif merriweather".split()
SANS_FAM="poppins outfit urbanist lexend sora manrope plus-jakarta-sans figtree jost red-hat-display montserrat gabarito league-spartan kumbh-sans albert-sans be-vietnam-pro questrial mulish nunito-sans onest inter dm-sans work-sans gantari readex-pro hanken-grotesk instrument-sans afacad golos-text wix-madefor-display rethink-sans geologica lato raleway".split()
TESTS={
 'serif':[('serif_ignorance','ignorance to bliss',4),('serif_multiple','multiple banks.',4),('serif_single','single view.',4)],
 'sans':[('sans_track','track, analyze and reflect',4),('sans_onyour','on your money',4),('sans_alltrans','all transactions in one place',4)],
}
def prep_ref(name):
    m=cv2.imread(f'{FX}/fonts/ref_{name}.png',0)
    ys,xs=np.nonzero(m>127); return m[ys.min():ys.max()+1, xs.min():xs.max()+1]
def to_mask_like_ref(render_gray, ref_shape_native_h):
    # render_gray: white ink on black, high-res. crop to ink, downscale to native ref height, upsample x4 + blur + otsu (mimic ref pipeline)
    ys,xs=np.nonzero(render_gray>40)
    if len(xs)==0: return None
    g=render_gray[ys.min():ys.max()+1, xs.min():xs.max()+1]
    return g
def score(ref, cand_gray):
    H,W=ref.shape
    # native size of ref is H/4, W/4; simulate low-res by downscaling candidate to native (keeping its own aspect via height match)
    ch,cw=cand_gray.shape
    nat_h=H/4; s=nat_h/ch
    nat=cv2.resize(cand_gray,(max(1,int(round(cw*s))),max(1,int(round(ch*s)))),interpolation=cv2.INTER_AREA)
    up=cv2.resize(nat,None,fx=4,fy=4,interpolation=cv2.INTER_CUBIC)
    up=cv2.GaussianBlur(up,(0,0),1.0)
    _,m=cv2.threshold(up,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    ys,xs=np.nonzero(m); m=m[ys.min():ys.max()+1, xs.min():xs.max()+1]
    aspect_err=(m.shape[1]/m.shape[0])/(W/H)-1
    mm=cv2.resize(m,(W,H),interpolation=cv2.INTER_NEAREST)
    a=ref>127; b=mm>127
    iou=(a&b).sum()/max((a|b).sum(),1)
    ink_ratio=b.mean()/max(a.mean(),1e-6)   # weight proxy
    return iou, aspect_err, ink_ratio
def font_files(fam, kind):
    out=[]
    for w in (400,500,600,700):
        p=f'{FX}/fonts/ttf/{fam}-latin-{w}-normal.ttf'
        if os.path.exists(p): out.append((f'{fam}-{w}',p,w))
    return out
def main():
    results={}
    with sync_playwright() as pw:
        br=pw.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome')
        pg=br.new_page(viewport={'width':4200,'height':400})
        for kind,fams in (('serif',SERIF_FAM),('sans',SANS_FAM)):
            refs=[(n,txt,prep_ref(n)) for n,txt,_ in TESTS[kind]]
            for fam in fams:
                for fid,path,w in font_files(fam,kind):
                    B64=base64.b64encode(open(path,'rb').read()).decode()
                    for ls in (-0.03,-0.015,0.0,0.015,0.03):
                        scores=[]
                        for rn,txt,ref in refs:
                            html=f"""<html><head><style>@font-face{{font-family:F;src:url(data:font/ttf;base64,{B64});}}
                            body{{margin:0;background:#000}} span{{font-family:F;font-size:200px;color:#fff;letter-spacing:{ls}em;line-height:1.3;white-space:nowrap;padding:40px;display:inline-block;font-kerning:normal}}</style></head>
                            <body><span id=s>{txt}</span></body></html>"""
                            pg.set_content(html)
                            ok=pg.evaluate("async()=>{await document.fonts.load('200px F'); return document.fonts.check('200px F');}")
                            if not ok: print('FONT NOT LOADED',fid); continue
                            png=pg.locator('#s').screenshot()
                            img=cv2.imdecode(np.frombuffer(png,np.uint8),cv2.IMREAD_GRAYSCALE)
                            g=to_mask_like_ref(img,None)
                            if g is None: continue
                            scores.append(score(ref,g))
                        if not scores: continue
                        s=np.array(scores)
                        iou=float(s[:,0].mean()); asp=float(np.abs(s[:,1]).mean()); ink=float(s[:,2].mean())
                        results[(kind,fid,ls)]=dict(iou=iou,aspect_err=asp,aspect_signed=[float(v) for v in s[:,1]],ink_ratio=ink,per=[float(v) for v in s[:,0]])
            print(kind,'done')
        br.close()
    json.dump({f'{k[0]}|{k[1]}|{k[2]}':v for k,v in results.items()},open(f'{FX}/out/font_match.json','w'),indent=0)
    for kind in ('serif','sans'):
        rows=[(k,v) for k,v in results.items() if k[0]==kind]
        # combined score: IoU minus aspect penalty
        rows.sort(key=lambda kv: -(kv[1]['iou']-0.5*kv[1]['aspect_err']))
        print('==',kind,'top 15')
        seen=set()
        for k,v in rows:
            if k[1] in seen: continue
            seen.add(k[1])
            print('  %-28s ls=%+.3fem IoU=%.3f |aspect err|=%.3f ink=%.2f per=%s'%(k[1],k[2],v['iou'],v['aspect_err'],v['ink_ratio'],[round(x,3) for x in v['per']]))
            if len(seen)>=15: break
if __name__=='__main__':
    main()
