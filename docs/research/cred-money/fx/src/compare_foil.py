"""Measure our foil renders exactly like the reference: 640x360, H.264 4:2:0 round trip, same stats."""
import sys, subprocess, json, os
sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
def h264_roundtrip(png, out):
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i',png,'-vf','scale=640:360:flags=area','-c:v','libx264','-crf','23','-pix_fmt','yuv420p','/tmp/_rt.mp4'],check=True)
    subprocess.run(['ffmpeg','-y','-loglevel','error','-i','/tmp/_rt.mp4','-frames:v','1',out],check=True)
    return cv2.imread(out)
def stats(pix_bgr):
    P=pix_bgr.astype(np.float32)/255; rgb=P[:,::-1]
    hs=cv2.cvtColor(pix_bgr[None],cv2.COLOR_BGR2HSV_FULL)[0].astype(np.float32); H=hs[:,0]*360/256; S=hs[:,1]/255; V=hs[:,2]/255
    foil=S>0.25; w=S*foil
    hist,_=np.histogram(H[foil],bins=12,range=(0,360),weights=w[foil]); hist=hist/max(hist.sum(),1e-9)
    Y=0.2126*rgb[:,0]+0.7152*rgb[:,1]+0.0722*rgb[:,2]; C=rgb.max(1)-rgb.min(1)
    idx=np.clip(np.digitize(Y,np.linspace(0,1,11))-1,0,9)
    curve=np.array([np.median(C[idx==i]) if np.sum(idx==i)>20 else np.nan for i in range(10)])
    return dict(hist=hist,sat50=float(np.median(S[foil])) if foil.any() else 0,sat90=float(np.percentile(S[foil],90)) if foil.any() else 0,
                foil_frac=float(foil.mean()),Y=np.percentile(Y,[2,50,98]),curve=curve)
def ref_pixels(name):
    R={'shell':[(41.75,130,210,260,390),(42.0,130,210,260,390),(42.25,130,210,260,390)],
       'turtle':[(29.5,225,290,60,210),(30.0,225,290,80,220),(30.5,225,290,100,240)],
       'card_axis':[(24.5,140,183,515,572)]}[name]
    return np.concatenate([at(t)[y0:y1,x0:x1].reshape(-1,3) for t,y0,y1,x0,x1 in R])
def ours(img, maskpng, erode=6):
    m=cv2.imread(maskpng,cv2.IMREAD_UNCHANGED)[...,3]; m=cv2.resize(m,(640,360),interpolation=cv2.INTER_AREA)>200
    m=cv2.erode(m.astype(np.uint8),np.ones((erode,erode),np.uint8))>0
    return img[m]
def hist_inter(a,b): return float(np.minimum(a,b).sum())
def curve_rmse(a,b):
    m=~np.isnan(a)&~np.isnan(b); return float(np.sqrt(np.mean((a[m]-b[m])**2))) if m.any() else None
if __name__=='__main__':
    render=sys.argv[1] if len(sys.argv)>1 else FX+'/renders/FxFoil_f24.png'
    tag=sys.argv[2] if len(sys.argv)>2 else 'gl'
    img=h264_roundtrip(render, FX+f'/renders/_rt_{tag}.png')
    P=FX+'/proto/remotion/public/'
    res={}
    refs={k:stats(ref_pixels(k)) for k in ('shell','turtle','card_axis')}
    for obj,mask in (('sphere',P+'mask_sphere.png'),('card',P+'mask_card.png')):
        s=stats(ours(img,mask))
        row={}
        for k,r in refs.items():
            row[k]=dict(hue_hist_intersection=round(hist_inter(s['hist'],r['hist']),3),chroma_curve_rmse=curve_rmse(s['curve'],r['curve']))
        res[obj]=dict(ours=dict(hist=[round(float(v),3) for v in s['hist']],sat50=round(s['sat50'],2),sat90=round(s['sat90'],2),foil_frac=round(s['foil_frac'],2),Y=[round(float(v),2) for v in s['Y']],curve=[None if np.isnan(v) else round(float(v),2) for v in s['curve']]),vs=row)
        print(tag,obj,'hist',res[obj]['ours']['hist'],'sat50/90',res[obj]['ours']['sat50'],res[obj]['ours']['sat90'],'foil%',res[obj]['ours']['foil_frac'],'Y',res[obj]['ours']['Y'])
        for k,v in row.items(): print('    vs',k,v)
    for k,r in refs.items(): print('REF',k,'hist',[round(float(v),3) for v in r['hist']],'sat50/90',round(r['sat50'],2),round(r['sat90'],2),'foil%',round(r['foil_frac'],2),'Y',np.round(r['Y'],2))
    json.dump(res,open(FX+f'/out/compare_foil_{tag}.json','w'),indent=1)
