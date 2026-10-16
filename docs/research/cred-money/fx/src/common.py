import numpy as np, cv2, os
FX='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/fx'
_A=None
def frames():
    global _A
    if _A is None: _A=np.load(FX+'/frames/all24.npy', mmap_mode='r')
    return _A
def at(t):
    """BGR frame at time t (s), 24 fps"""
    return np.array(frames()[int(round(t*24))])
def rgb(t): return at(t)[:,:,::-1].copy()
def save(name, img_bgr, scale=1):
    if scale!=1: img_bgr=cv2.resize(img_bgr,None,fx=scale,fy=scale,interpolation=cv2.INTER_NEAREST if scale>=2 else cv2.INTER_AREA)
    cv2.imwrite(os.path.join(FX,name), img_bgr)
def hsv(img_bgr):
    h=cv2.cvtColor(img_bgr, cv2.COLOR_BGR2HSV_FULL).astype(np.float32)
    h[...,0]*=360/256; h[...,1]/=255; h[...,2]/=255
    return h
