"""Export each measured scene gradient map as a 33^3 .cube 3D LUT (input RGB -> Rec.709 luma Y' -> 16-stop map).
Same indexing as the SVG feComponentTransfer filter, so ffmpeg (lut3d) and Remotion grade identically."""
import json, numpy as np, os
FX='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx'
d=json.load(open(FX+'/out/duotone_luts.json'))
N=33
g=np.linspace(0,1,N)
for k,v in d.items():
    stops=np.array([[int(h[i:i+2],16) for i in (1,3,5)] for h in v['lut16']])/255
    lines=[f'TITLE "{k} gradient map (measured)"',f'LUT_3D_SIZE {N}','DOMAIN_MIN 0 0 0','DOMAIN_MAX 1 1 1']
    for b in g:
        for gg in g:
            for r in g:
                y=0.2126*r+0.7152*gg+0.0722*b
                u=y*15; i0=int(np.floor(u)); i1=min(i0+1,15); w=u-i0
                c=stops[i0]*(1-w)+stops[i1]*w
                lines.append('%.5f %.5f %.5f'%tuple(c))
    open(f'{FX}/proto/luts/{k}.cube','w').write('\n'.join(lines)+'\n')
print(len(d),'cubes written')
