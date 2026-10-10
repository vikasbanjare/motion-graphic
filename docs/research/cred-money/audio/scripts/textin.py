import subprocess, numpy as np
from scipy.ndimage import laplace, uniform_filter1d
V='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/in/ref.mp4'
W,H=640,360
def frames(a,b):
    raw=subprocess.run(['ffmpeg','-v','error','-ss',str(a),'-i',V,'-t',str(b-a),'-f','rawvideo','-pix_fmt','gray','-'],capture_output=True).stdout
    F=np.frombuffer(raw,np.uint8).reshape(-1,H,W).astype(np.float32)/255
    return F
boxes=[('multiple banks. single view.',21.5,24.0,(218,422,22,110)),
('total balance tablet',24.8,26.6,(270,370,120,250)),
('monitor your cash flow',26.6,28.6,(154,486,22,85)),
('view all your dues',31.8,33.8,(300,570,238,300)),
('get reminders & updates',35.3,37.0,(30,370,262,320)),
('EMI card',36.2,37.6,(25,120,190,265)),
('dive deep into your money',38.6,40.2,(130,515,62,108)),
('keep the findings to yourself',42.2,43.8,(118,535,70,140)),
('CRED MONEY seal',49.4,50.6,(150,490,80,280)),
('ignorance to bliss',55.4,57.0,(135,345,145,225)),
('CRED logo mark',59.9,61.2,(285,355,140,215)),
('CRED wordmark',62.6,64.0,(285,355,200,225))]
for name,a,b,(x0,x1,y0,y1) in boxes:
    F=frames(a,b); t=a+np.arange(len(F))/24
    e=np.array([np.abs(laplace(f[y0:y1,x0:x1])).mean() for f in F])
    e=uniform_filter1d(e,3)
    lo,hi=np.percentile(e,5),np.percentile(e,95)
    r=(e-lo)/(hi-lo+1e-9)
    i10=np.argmax(r>0.1); i50=np.argmax(r>0.5); i90=np.argmax(r>0.9)
    print(f"{name:32s} edge-rise 10%={t[i10]:6.2f}  50%={t[i50]:6.2f}  90%={t[i90]:6.2f}   (range {lo:.4f}->{hi:.4f})")
