import numpy as np, cv2, sys
W=sys.argv[1]
a=np.fromfile(W+'/f24_16_35.raw',np.uint8).reshape(-1,180,320,3)
g=[cv2.cvtColor(f,cv2.COLOR_RGB2GRAY).astype(np.float32) for f in a]
t0=16.0
def track(name,x0,x1,y0,y1,ta,tb,step=6):
    X0,X1,Y0,Y1=int(x0*320),int(x1*320),int(y0*180),int(y1*180)
    ia=int(round((ta-t0)*24)); ib=int(round((tb-t0)*24))
    tot=np.zeros(2); out=[]
    for i in range(ia,ib,step):
        j=min(i+step,ib)
        A=g[i][Y0:Y1,X0:X1]; B=g[j][Y0:Y1,X0:X1]
        win=cv2.createHanningWindow((X1-X0,Y1-Y0),cv2.CV_32F)
        (dx,dy),resp=cv2.phaseCorrelate(A,B,win)
        tot+= [dx,dy]
        out.append(f"{t0+i/24:.2f}:{dx/320*100*24/(j-i):+.1f}%W/s,{dy/180*100*24/(j-i):+.1f}%H/s(r{resp:.2f})")
    print(name, ' '.join(out)); print('   total dx %W', tot[0]/320*100, 'dy %H', tot[1]/180*100)
track('seabed-right',0.72,1.0,0.80,1.0,27.6,30.4)
track('coral-left',0.0,0.18,0.42,0.72,27.6,32.4)
track('sky-top',0.0,1.0,0.0,0.12,27.6,32.4)
track('fish',0.68,1.0,0.48,0.72,27.6,30.0)
