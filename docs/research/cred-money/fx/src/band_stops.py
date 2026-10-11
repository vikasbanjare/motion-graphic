import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import json
out={}
# 1) gradient stops along the full band at t=14.75-15.25 (average 3 frames), rows inside band, excluding text
acc=[]
for t in (14.75,15.0,15.25):
    f=at(t).astype(np.float32); h=hsv(at(t))
    y0,y1=171,190
    sub=f[y0:y1]; hs=h[y0:y1]
    text=(hs[...,1]<0.18)&(hs[...,2]>0.82)
    cols=[]
    for x in range(640):
        m=~text[:,x]
        cols.append(np.median(sub[m,x],0) if m.sum()>3 else np.array([np.nan]*3))
    acc.append(np.array(cols))
A=np.nanmedian(np.array(acc),0)  # BGR per column
# smooth
for c in range(3):
    v=A[:,c]; ok=~np.isnan(v); A[:,c]=np.interp(np.arange(640),np.nonzero(ok)[0],v[ok])
A=cv2.GaussianBlur(A.reshape(1,640,3),(0,0),6).reshape(640,3)
# band extent: where lens is bright enough (x ~ 40-600); express stops relative to the visible band 60..585
xs=np.linspace(60,585,11).astype(int)
stops=[]
for x in xs:
    b,g,r=A[x]; hh=hsv(np.uint8([[[b,g,r]]]))[0,0]
    stops.append(dict(pos=round((x-60)/525,2), hex='#%02x%02x%02x'%(int(r),int(g),int(b)), hue=int(hh[0]), sat=round(float(hh[1]),2), val=round(float(hh[2]),2)))
out['thin_band_t15_stops']=stops
# 2) zoomed band at t=18: per-column colour (rows 140-215), excluding text and the ring emblem
f=at(18.0).astype(np.float32); h=hsv(at(18.0))
sub=f[140:216]; hs=h[140:216]
text=(hs[...,1]<0.12)&(hs[...,2]>0.85)
B=np.array([np.median(sub[~text[:,x],x],0) if (~text[:,x]).sum()>5 else [np.nan]*3 for x in range(640)])
for c in range(3):
    v=B[:,c]; ok=~np.isnan(v); B[:,c]=np.interp(np.arange(640),np.nonzero(ok)[0],v[ok])
B=cv2.GaussianBlur(B.reshape(1,640,3).astype(np.float32),(0,0),5).reshape(640,3)
xs=np.linspace(40,600,15).astype(int)
out['wide_band_t18_stops']=[dict(pos=round((x-40)/560,2),hex='#%02x%02x%02x'%(int(B[x,2]),int(B[x,1]),int(B[x,0])),hue=int(hsv(np.uint8([[B[x]]]))[0,0,0]),sat=round(float(hsv(np.uint8([[B[x]]]))[0,0,1]),2),val=round(float(hsv(np.uint8([[B[x]]]))[0,0,2]),2)) for x in xs]
# 3) wavy lines: luma high-pass inside band at t=18; vertical pitch via autocorrelation per column; wave period via tracking ridge y across x
L=cv2.cvtColor(at(18.0),cv2.COLOR_BGR2GRAY).astype(np.float32)[140:216]
hp=L-cv2.GaussianBlur(L,(0,0),4)
pitches=[]
for x in range(420,600,6):
    c=hp[:,x]-hp[:,x].mean(); ac=np.correlate(c,c,'full')[len(c)-1:]; ac/=ac[0]
    # first peak after lag 2
    from scipy.signal import find_peaks
    pk,_=find_peaks(ac[2:40]); 
    if len(pk): pitches.append(pk[0]+2)
out['wavy_line_vertical_pitch_px_t18']=dict(median=float(np.median(pitches)),p25=float(np.percentile(pitches,25)),p75=float(np.percentile(pitches,75)))
# wave: follow one ridge across x from x=420 to 600 starting at the row with max hp at x=420 near band middle
y=int(np.argmax(hp[30:45,420]))+30; ys=[]
for x in range(420,620):
    lo=max(0,y-2); hi=min(hp.shape[0],y+3); y=lo+int(np.argmax(hp[lo:hi,x])); ys.append(y)
ys=np.array(ys,float); ys-=ys.mean()
F=np.abs(np.fft.rfft(ys*np.hanning(len(ys)))); k=np.argmax(F[1:])+1
out['wavy_line_wave_t18']=dict(amplitude_px=float((np.percentile(ys,95)-np.percentile(ys,5))/2), period_px=float(len(ys)/k))
out['band_height_px']={'t15':'~20 (rows 171-190 of 360) = 0.055 H','t18':'97 (rows 130-227) = 0.27 H'}
out['text_contrast']='white caps, sat<0.16, val>0.82 on pastel band (val 0.8-1.0, sat 0.2-0.4)'
json.dump(out,open(FX+'/out/band_stops.json','w'),indent=1)
print(json.dumps(out,indent=1))
