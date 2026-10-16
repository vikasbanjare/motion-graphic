"""Original procedural line engraving (sphere on plinth + card + wavy field) used only as a neutral test input."""
import numpy as np, cv2
W,H=1920,1080
yy,xx=np.mgrid[0:H,0:W].astype(np.float32)
shade=np.full((H,W),0.92,np.float32)          # 1 = white paper
dirx=np.zeros((H,W),np.float32)               # local line direction offset (curvature)
# background: soft vertical light falloff
shade-= 0.10*(yy/H)
# sphere
cx,cy,r=760,470,260
dx,dy=(xx-cx)/r,(yy-cy)/r; d2=dx**2+dy**2; ins=d2<1
nz=np.sqrt(np.clip(1-d2,0,1)); L=np.array([-0.5,-0.6,0.62]); L/=np.linalg.norm(L)
lam=np.clip(dx*L[0]+dy*L[1]+nz*L[2],0,1)
shade[ins]=(0.12+0.85*lam)[ins]
dirx[ins]=(dy*nz*40)[ins]                      # lines bow around the sphere
# plinth
pl=(xx>520)&(xx<1000)&(yy>730)&(yy<900)
shade[pl]=0.55-0.25*((xx[pl]-520)/480); dirx[pl]=0
top=(xx>500)&(xx<1020)&(yy>700)&(yy<735); shade[top]=0.85
# cast shadow
sh=((xx-800)/330)**2+((yy-905)/38)**2<1; shade[sh&~pl]*=0.55
# card (tilted rounded rect)
ang=np.deg2rad(-12); u=(xx-1430)*np.cos(ang)+(yy-430)*np.sin(ang); v=-(xx-1430)*np.sin(ang)+(yy-430)*np.cos(ang)
q=np.maximum(np.abs(u)-300+40,0)**2+np.maximum(np.abs(v)-190+40,0)**2
card=q<40**2
shade[card]=(0.80-0.35*(v[card]+190)/380)
dirx[card]=(25*np.sin(u[card]/60))
# engrave: horizontal-ish lines with pitch 7px, thickness ~ darkness
pitch=7.0
phase=(yy+dirx+6*np.sin(xx/140.0))/pitch
dist=np.abs(phase-np.round(phase))*pitch              # px from nearest line centre
thick=(1-shade)*pitch*0.95                           # dark -> thick lines
ink=np.clip((thick/2-dist)+0.5,0,1)                  # AA line
img=(1-ink)*255
# card edge + sphere outline as thin contour
for m in (card,ins,pl):
    e=cv2.morphologyEx(m.astype(np.uint8),cv2.MORPH_GRADIENT,np.ones((3,3),np.uint8))>0
    img[e]=40
cv2.imwrite('/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/proto/remotion/public/test_engraving.png',img.astype(np.uint8))
print('ok')
