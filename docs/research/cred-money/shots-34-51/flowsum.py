import json, numpy as np, sys
W=sys.argv[1]; R=json.load(open(W+'/flow.json')); w=320
shots=[('A',816,857),('B',859,933),('C',945,973),('D1',975,1022),('D2 koi',1023,1052),('D3',1053,1072),('D4 push',1073,1116),('D5',1117,1125),('F',1129,1156),('G',1161,1189),('H',1193,1247)]
by={r['n']:r for r in R}
for name,a,b in shots:
    rs=[by[n] for n in range(a,b+1) if n in by and 'scale' in by[n]]
    s=np.array([r['scale'] for r in rs]); dx=np.array([r['dx'] for r in rs]); dy=np.array([r['dy'] for r in rs]); rot=np.array([r['rot'] for r in rs]); med=np.array([r['medmag'] for r in rs]); inl=np.array([r['inl'] for r in rs])
    tot_s=np.prod(s); dur=(b-a+1)/24
    print(f"{name} n{a}-{b} ({a/24:.2f}-{(b+1)/24:.2f}s, {dur:.2f}s) total scale={tot_s:.3f} zoom/s={tot_s**(1/dur):.3f} | med per-frame scale={np.median(s):.4f} | panx tot={dx.sum()/w*100:+.1f}%W ({np.median(dx)*24/w*100:+.1f}%W/s med) pany tot={dy.sum()/w*100:+.1f}%W ({np.median(dy)*24/w*100:+.1f}%W/s) rot tot={rot.sum():+.2f}deg | medmag={np.median(med):.3f}px@320 inl={np.median(inl):.2f}")
