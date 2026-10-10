import sys, numpy as np
from PIL import Image
F='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/ref1/f6/%04d.jpg'
def fr(t): return int(round(t*6))+1
def crop(t,x,y,w,h,scale=4,name=None):
    im=Image.open(F%fr(t)).convert('RGB')
    c=im.crop((x,y,x+w,y+h))
    c2=c.resize((w*scale,h*scale),Image.NEAREST)
    nm=name or f't{t:05.2f}_{x}_{y}_{w}x{h}'
    c.save(f'crops/{nm}_1x.png'); c2.save(f'crops/{nm}.png')
    return nm
if __name__=='__main__':
    t,x,y,w,h=map(float,sys.argv[1:6]); s=int(sys.argv[6]) if len(sys.argv)>6 else 4
    print(crop(t,int(x),int(y),int(w),int(h),s))
