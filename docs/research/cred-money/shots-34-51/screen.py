import cv2, numpy as np, sys
W=sys.argv[1]; specs=sys.argv[2:]
for sp in specs:
    f,x,y,lab=sp.split(':'); f,x,y=int(f),int(x),int(y)
    g=cv2.cvtColor(cv2.imread(f"{W}/f24/{f:04d}.png"),cv2.COLOR_BGR2GRAY).astype(np.float32)
    p=g[y:y+64,x:x+64]; p=p-cv2.GaussianBlur(p,(0,0),2.5)
    win=np.outer(np.hanning(64),np.hanning(64))
    N=512; F=np.abs(np.fft.fftshift(np.fft.fft2(p*win,s=(N,N))))**2
    c=N//2; yy,xx=np.mgrid[0:N,0:N]; rr=np.hypot(yy-c,xx-c)
    band=(rr>N/7)&(rr<N/1.9)
    tot=F[band].sum()
    G=F*band
    peaks=[]
    for k in range(3):
        py,px=np.unravel_index(np.argmax(G),G.shape)
        fy=(py-c)/N; fx=(px-c)/N; per=1/np.hypot(fx,fy); ang=(np.degrees(np.arctan2(fy,fx))+90)%180
        share=G[max(0,py-6):py+7,max(0,px-6):px+7].sum()/tot*2  # symmetric pair
        peaks.append(f"{per:.2f}px@{ang:.0f}deg({share*100:.0f}%)")
        for qy,qx in [(py,px),(2*c-py,2*c-px)]:
            G[max(0,qy-8):qy+9,max(0,qx-8):qx+9]=0
    print(lab, f, ' '.join(peaks))
