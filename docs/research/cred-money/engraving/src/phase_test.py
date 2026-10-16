# Screen-space vs object-space test.
# 1) object displacement d between frames from phase correlation of LOW-PASSED luma (sigma 3 removes the screen)
# 2) carrier phase change at the same SCREEN location (high-pass, demodulated at P,theta)
# object-space prediction: dphi = 2*pi*(d . n)/P   ; screen-space prediction: dphi = 0
import numpy as np, cv2, sys
def load(p): return cv2.cvtColor(cv2.imread(p),cv2.COLOR_BGR2GRAY).astype(np.float64)
def carrier_phase(g,P,th):
    yy,xx=np.mgrid[0:g.shape[0],0:g.shape[1]].astype(float)
    d=np.array([np.cos(th),-np.sin(th)]); n=np.array([-d[1],d[0]]); u=xx*n[0]+yy*n[1]
    h=g-cv2.GaussianBlur(g,(0,0),3)
    z=(h*np.exp(-2j*np.pi*u/P)).sum(); return np.angle(z),abs(z),n
def run(prefix,idx,box,P,ang):
    x0,y0,x1,y1=box; th=np.radians(ang); out=[]
    for i in idx:
        a=load(f'f24/{prefix}{i:03d}.png'); b=load(f'f24/{prefix}{i+1:03d}.png')
        la=cv2.GaussianBlur(a,(0,0),3)[y0:y1,x0:x1]; lb=cv2.GaussianBlur(b,(0,0),3)[y0:y1,x0:x1]
        win=cv2.createHanningWindow((x1-x0,y1-y0),cv2.CV_64F)
        (dx,dy),resp=cv2.phaseCorrelate(la,lb,win)
        pa,ma,n=carrier_phase(a[y0:y1,x0:x1],P,th); pb,mb,_=carrier_phase(b[y0:y1,x0:x1],P,th)
        dphi=np.angle(np.exp(1j*(pb-pa)))
        pred=np.angle(np.exp(1j*2*np.pi*(dx*n[0]+dy*n[1])/P))
        out.append((i,dx,dy,resp,dphi,pred))
        print(f"{prefix}{i:03d}->{i+1:03d}: object shift ({dx:+.2f},{dy:+.2f})px resp={resp:.2f}  carrier dphi={dphi:+.2f}rad  object-space predicts {pred:+.2f}  screen-space predicts +0.00")
    o=np.array(out); mv=np.hypot(o[:,1],o[:,2])>0.3
    if mv.any():
        e_obj=np.abs(np.angle(np.exp(1j*(o[mv,4]-o[mv,5])))).mean(); e_scr=np.abs(o[mv,4]).mean()
        print(f"  moving pairs={mv.sum()}  mean|err| object-space={e_obj:.2f}rad  screen-space={e_scr:.2f}rad")
run('c',range(1,40,3),(0,60,110,360),2.49,45)
run('l',range(1,60,4),(0,160,330,360),2.00,45)
run('h',range(1,60,4),(0,40,200,300),2.78,45)
