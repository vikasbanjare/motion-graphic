import sys; sys.path.insert(0,'/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx/src')
from common import *
import matplotlib; matplotlib.use('Agg'); import matplotlib.pyplot as plt
boxes={'icici':(70,190,138,185),'hdfc':(232,408,138,185),'axis':(448,572,138,185)}
ts=np.arange(23.25,25.45,1/24)
data={k:[] for k in boxes}
for t in ts:
    h=hsv(at(t))
    for k,(x0,x1,y0,y1) in boxes.items():
        sub=h[y0:y1,x0:x1]
        S=sub[...,1]; H=np.deg2rad(sub[...,0]); V=sub[...,2]
        cols=[]
        for third in np.array_split(np.arange(sub.shape[1]),3):
            w=S[:,third]**2
            z=np.sum(w*np.exp(1j*H[:,third]))/np.sum(w)
            cols.append(((np.rad2deg(np.angle(z))+360)%360, float(np.abs(z))))
        sat_p90=float(np.percentile(S,90)); sat_med=float(np.median(S))
        data[k].append((t,cols,sat_p90,sat_med,float(np.median(V))))
for k in boxes:
    print('==',k)
    for row in data[k][::4]:
        t,cols,p90,med,v=row
        print(f' t={t:.2f} hueL/M/R={[int(c[0]) for c in cols]} R={[round(c[1],2) for c in cols]} sat p90={p90:.2f} med={med:.2f} V={v:.2f}')
# temporal hue rate at middle third, unwrap
fig,ax=plt.subplots(2,1,figsize=(10,7))
for k in boxes:
    for j,lab in enumerate('LMR'):
        hu=np.unwrap(np.deg2rad([r[1][j][0] for r in data[k]]))*180/np.pi
        ax[0].plot(ts[:len(hu)],hu,label=f'{k}-{lab}')
    ax[1].plot(ts,[r[2] for r in data[k]],label=k+' sat p90')
ax[0].legend(fontsize=7); ax[1].legend(); ax[0].set_ylabel('hue unwrapped'); ax[1].set_xlabel('t (s)')
plt.savefig(FX+'/out/cards_hue_time.png',dpi=80)
# hue rate: robust slope on middle third per card
for k in boxes:
    for j,lab in enumerate('LMR'):
        hu=np.unwrap(np.deg2rad([r[1][j][0] for r in data[k]]))*180/np.pi
        d=np.diff(hu)*24
        print(k,lab,'hue rate deg/s median',round(float(np.median(d)),1),'mean',round(float(np.mean(d)),1),'total sweep deg',round(float(hu[-1]-hu[0]),1))
