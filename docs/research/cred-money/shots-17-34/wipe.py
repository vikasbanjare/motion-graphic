import numpy as np, subprocess, sys
V=sys.argv[1]
raw=subprocess.run(['ffmpeg','-v','error','-ss','26.5','-t','1.2','-i',V,'-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
fr=np.frombuffer(raw,np.uint8).reshape(-1,360,640,3).astype(int)
prev=None
for i,f in enumerate(fr):
    t=26.5+i/24
    warm=(f[...,0]>f[...,2]+25)   # peach/crimson world
    cool=(f[...,2]>f[...,0]+5)    # lavender world
    # per-row: rightmost x of contiguous cool region from left edge
    edges=[]
    for y in range(60,340,4):
        row=cool[y]
        if row[:6].mean()>0.5:
            nz=np.where(~row)[0]
            # first x where a run of 8 warm pixels starts
            w=warm[y]; run=np.convolve(w,np.ones(8,int),'valid')
            k=np.where(run==8)[0]
            edges.append(k[0] if len(k) else 640)
        else:
            edges.append(0)
    e=np.median(edges); coolshare=cool.mean(); warmshare=warm.mean()
    # also track column (crimson dark band) positions: columns of high redness & darkness
    red=((f[...,0]-f[...,2])>60)&(f[...,1]<130)
    colprof=red[100:300].mean(0)
    cols=np.where(colprof>0.35)[0]
    segs=[]
    if len(cols):
        s=cols[0]; p=cols[0]
        for c in cols[1:]:
            if c!=p+1: segs.append((s,p)); s=c
            p=c
        segs.append((s,p))
    print(f"{t:.3f} wipe-edge x={e:5.0f} ({e/6.4:5.1f}%W) cool={coolshare*100:4.1f}% warm={warmshare*100:4.1f}% red-column-bands={[(int(a),int(b)) for a,b in segs if b-a>4]}")
