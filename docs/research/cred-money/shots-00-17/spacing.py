import cv2, numpy as np, sys
W=sys.argv[1]; frames=[int(x) for x in sys.argv[2].split(',')]; x0,y0,x1,y1=[int(v) for v in sys.argv[3].split(',')]
axis=sys.argv[4] if len(sys.argv)>4 else 'v'
for i in frames:
    g=cv2.cvtColor(cv2.imread(f"{W}/f24/{i:04d}.png"),cv2.COLOR_BGR2GRAY).astype(np.float32)[y0:y1,x0:x1]
    g=g-g.mean()
    # 2D FFT peak
    F=np.abs(np.fft.fftshift(np.fft.fft2(g*np.outer(np.hanning(g.shape[0]),np.hanning(g.shape[1])))))
    cy,cx=np.array(F.shape)//2
    F[cy-2:cy+3,cx-2:cx+3]=0
    py,px=np.unravel_index(np.argmax(F),F.shape)
    fy=(py-cy)/g.shape[0]; fx=(px-cx)/g.shape[1]
    f=np.hypot(fx,fy); per=1/f if f>0 else 0
    ang=np.degrees(np.arctan2(fy,fx))
    # vertical profile autocorr
    prof=g.mean(axis=1) if axis=='v' else g.mean(axis=0)
    ac=np.correlate(prof,prof,'full')[len(prof)-1:]; ac/=ac[0]
    # first peak after first min
    k=np.argmin(ac[:len(ac)//2]); pk=k+np.argmax(ac[k:len(ac)//2])
    print(f"f{i} t={i/24:.3f} fftPeriod={per:.2f}px ({per/360*100:.2f}%H) fftAngle={ang:.1f}deg  autocorrPeriod={pk}px ({pk/360*100:.2f}%H) acpk={ac[pk]:.2f}")
