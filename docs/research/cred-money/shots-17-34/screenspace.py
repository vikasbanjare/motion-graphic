import numpy as np, subprocess, cv2, sys
V=sys.argv[1]
def frame(t):
    raw=subprocess.run(['ffmpeg','-v','error','-ss',str(t),'-i',V,'-frames:v','1','-f','rawvideo','-pix_fmt','gray','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.uint8).reshape(360,640).astype(float)
def peak(p,pad=256):
    s=p.shape[0]; p=p-p.mean(); win=np.outer(np.hanning(s),np.hanning(s))
    P=np.abs(np.fft.fftshift(np.fft.fft2(p*win,(pad,pad))))**2
    c=pad//2; yy,xx=np.mgrid[-c:c,-c:c]; r=np.hypot(xx,yy)
    band=(r>=pad/3.6)&(r<=pad/2.05)
    # restrict to diagonal orientations 20..70deg lines (frequency vector 110..160 deg or -70..-20)
    ang=(np.degrees(np.arctan2(-yy,xx))+90)%180
    band&=(ang>25)&(ang<65)
    Q=np.where(band,P,0); iy,ix=np.unravel_index(np.argmax(Q),Q.shape)
    fy,fx=(iy-c)/pad,(ix-c)/pad
    return 1/np.hypot(fx,fy), (np.degrees(np.arctan2(-fy,fx))+90)%180, Q[iy,ix]/P[band].mean()
for t in [22.0,23.0,24.5,25.1,25.5,25.9,26.4,26.9]:
    g=frame(t); out=[]
    for (x,y) in [(0,140),(10,250),(560,150),(570,250),(40,60)]:
        x=min(x,640-48); y=min(y,360-48)
        per,ang,q=peak(g[y:y+48,x:x+48])
        out.append(f"({x},{y}) P={per:.2f} a={ang:.0f} q={q:.0f}")
    print(f"t={t}: "+' | '.join(out))
