import numpy as np, subprocess, re, json, sys
def mcurve(p):
    out=subprocess.run(['ffmpeg','-nostats','-i',p,'-af','ebur128=metadata=1,ametadata=print:key=lavfi.r128.M:file=-','-f','null','-'],capture_output=True,text=True).stdout
    t=[];v=[];cur=None
    for line in out.splitlines():
        m=re.search(r'pts_time:([\d.]+)',line)
        if m: cur=float(m.group(1))
        m=re.search(r'lavfi.r128.M=(-?[\d.]+)',line)
        if m and cur is not None: t.append(cur); v.append(float(m.group(1)))
    return np.array(t)-0.2,np.array(v)   # M window is the 400 ms ending at t: centre it
sys.path.insert(0,'proto2'); 
W=dict(__import__('calibrate').W)
ta,ma=mcurve('ref_stereo.wav'); tb,mb=mcurve(sys.argv[1])
def bump(t,m,on,off):
    w=(t>=on)&(t<=off+0.2); pre=(t>=on-1.0)&(t<on)
    return m[w].max()-np.median(m[pre]) if pre.any() else np.nan, m[w].max()
rows=[]
print('cue   window          ref bump LU (peak M)   ours bump LU (peak M)   diff')
for k,(lo,hi,on,off,ab) in W.items():
    (br,pr),(bo,po)=bump(ta,ma,on,off),bump(tb,mb,on,off)
    rows.append((k,br,bo)); print(f'{k:5s} {on:6.2f}-{off:6.2f}   {br:+6.1f} ({pr:6.1f})        {bo:+6.1f} ({po:6.1f})     {bo-br:+5.1f}')
d=np.array([r[2]-r[1] for r in rows if np.isfinite(r[1]) and r[1]>-50])
print(f'median diff {np.median(d):+.1f} LU, median |diff| {np.median(abs(d)):.1f}, p90 |diff| {np.percentile(abs(d),90):.1f}')
