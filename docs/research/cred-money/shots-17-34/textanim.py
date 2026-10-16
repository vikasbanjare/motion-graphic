import numpy as np, cv2, subprocess, sys
W=sys.argv[1]; V=sys.argv[2]
def frames(t0,dur):
    raw=subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-t',str(dur),'-i',V,'-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.uint8).reshape(-1,360,640,3).astype(int)
# (a) headline drop-in
fr=frames(22.25,1.0)
print('banks headline drop-in: t, top-ink-row, bottom-ink-row, ink px count (region x205-435,y0-110)')
for i,f in enumerate(fr):
    R=f[0:110,205:435]; hsv=cv2.cvtColor(R.astype(np.uint8),cv2.COLOR_RGB2HSV).astype(int)
    m=(hsv[...,1]>110)&(R[...,0]>R[...,1]+50)&(R[...,0]<215)
    rows=np.where(m.sum(1)>3)[0]
    print(f"  {22.25+i/24:.3f} top={rows.min() if len(rows) else None} bot={rows.max() if len(rows) else None} n={m.sum()}")
fr=frames(25.2,1.2)
print('banks headline fade-out: mean contrast text vs bg (darkness of text pixels) in fixed mask from 25.2')
f0=fr[0][20:100,205:435]; hsv=cv2.cvtColor(f0.astype(np.uint8),cv2.COLOR_RGB2HSV).astype(int)
mask=(hsv[...,1]>110)&(f0[...,0]>f0[...,1]+50)&(f0[...,0]<215)
bgm=~cv2.dilate(mask.astype(np.uint8),np.ones((5,5)))
base=None
for i,f in enumerate(fr):
    R=f[20:100,205:435].astype(float); g=R.mean(2)
    c=g[bgm.astype(bool)].mean()-g[mask].mean()
    if base is None: base=c
    print(f"  {25.2+i/24:.3f} contrast={c:5.1f} rel={c/base*100:5.1f}%")
