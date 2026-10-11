import numpy as np, subprocess, sys
V=sys.argv[1]
def frames(t0,dur,fps=4):
    raw=subprocess.run(['ffmpeg','-v','error','-ss',str(t0),'-t',str(dur),'-i',V,'-vf',f'fps={fps}','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
    return np.frombuffer(raw,np.uint8).reshape(-1,360,640,3).astype(float)
print('monitor headline: x of teal highlight (max G-R among ink px), and x of darkest purple')
fr=frames(27.5,5.0)
for i,f in enumerate(fr):
    R=f[30:54,150:490]; ink=(R.mean(2)<150)
    gr=np.where(ink,R[...,1]-R[...,0],-999)
    col=np.array([gr[:,x][ink[:,x]].mean() if ink[:,x].sum()>2 else np.nan for x in range(R.shape[1])])
    # smooth
    k=np.ones(15)/15; cs=np.convolve(np.nan_to_num(col,nan=-100),k,'same')
    print(f"  t={27.5+i/4:.2f} teal-peak x={np.argmax(cs)+150} ({(np.argmax(cs)+150)/6.4:.1f}%W) peak G-R={cs.max():5.1f}")
print('dues headline: x of palest region (lowest ink density relative)')
fr=frames(32.55,2.0,8)
for i,f in enumerate(fr):
    R=f[246:272,300:570]; g=R.mean(2)
    dark=255-g
    col=dark.mean(0); k=np.ones(21)/21; cs=np.convolve(col,k,'same')[10:-10]
    xs=np.arange(310,560)
    print(f"  t={32.55+i/8:.3f} palest x={xs[np.argmin(cs)]} ({xs[np.argmin(cs)]/6.4:.1f}%W) darkest x={xs[np.argmax(cs)]} min/max ink={cs.min():.0f}/{cs.max():.0f}")
