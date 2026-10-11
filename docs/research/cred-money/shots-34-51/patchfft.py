import cv2, numpy as np, sys
W=sys.argv[1]; out=sys.argv[2]; specs=sys.argv[3:]  # each "frame:x:y:label"
tiles=[]
for sp in specs:
    f,x,y,lab=sp.split(':'); f,x,y=int(f),int(x),int(y)
    im=cv2.imread(f"{W}/f24/{f:04d}.png"); g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY).astype(np.float32)
    p=g[y:y+64,x:x+64]; p=p-p.mean()
    win=np.outer(np.hanning(64),np.hanning(64))
    F=np.abs(np.fft.fftshift(np.fft.fft2(p*win,s=(256,256))))
    c=128; yy,xx=np.mgrid[0:256,0:256]; rr=np.hypot(yy-c,xx-c)
    F[(rr<256/14)|(rr>256/2.5)]=0
    py,px=np.unravel_index(np.argmax(F),F.shape)
    fy=(py-c)/256; fx=(px-c)/256; per=1/np.hypot(fx,fy)
    # orientation of lines = perpendicular to frequency vector
    ang=(np.degrees(np.arctan2(fy,fx))+90)%180
    # peak sharpness: energy ratio
    ratio=F.max()/np.median(F[F>0])
    # coherence via structure tensor -> follows-form indicator: variance of local orientation
    gx=cv2.Sobel(g,cv2.CV_32F,1,0,ksize=3); gy=cv2.Sobel(g,cv2.CV_32F,0,1,ksize=3)
    Jxx=cv2.GaussianBlur(gx*gx,(0,0),3); Jyy=cv2.GaussianBlur(gy*gy,(0,0),3); Jxy=cv2.GaussianBlur(gx*gy,(0,0),3)
    th=0.5*np.degrees(np.arctan2(2*Jxy,Jxx-Jyy))[y:y+64,x:x+64]
    coh=(np.sqrt((Jxx-Jyy)**2+4*Jxy**2)/(Jxx+Jyy+1e-6))[y:y+64,x:x+64]
    # circular std of orientation (doubled angle)
    a2=np.radians(th*2); R=np.hypot(np.cos(a2).mean(),np.sin(a2).mean()); cstd=np.degrees(np.sqrt(-2*np.log(max(R,1e-6))))/2
    print(f"{lab}: f{f} ({x},{y}) period={per:.2f}px = {per/360*100:.2f}%H (=1/{360/per:.0f} of H), line angle={ang:.0f}deg, peakRatio={ratio:.1f}, coherence={coh.mean():.2f}, orientation spread={cstd:.0f}deg")
    big=cv2.resize(im[y:y+64,x:x+64],(192,192),interpolation=cv2.INTER_NEAREST)
    cv2.putText(big,lab[:14],(3,14),cv2.FONT_HERSHEY_SIMPLEX,0.45,(0,0,255),1)
    tiles.append(big)
while len(tiles)%4: tiles.append(np.zeros_like(tiles[0]))
cv2.imwrite(out,np.vstack([np.hstack(tiles[i:i+4]) for i in range(0,len(tiles),4)]))
