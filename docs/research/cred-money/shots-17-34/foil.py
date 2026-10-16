import numpy as np, cv2, subprocess, sys
V=sys.argv[1]
raw=subprocess.run(['ffmpeg','-v','error','-ss','22.9','-t','2.4','-i',V,'-vf','fps=8','-f','rawvideo','-pix_fmt','rgb24','-'],capture_output=True).stdout
fr=np.frombuffer(raw,np.uint8).reshape(-1,360,640,3)
regions={'leftcard':(70,140,135,185),'centercard':(235,140,400,180),'rightcard':(450,140,560,185)}
for i,f in enumerate(fr):
    hsv=cv2.cvtColor(f,cv2.COLOR_RGB2HSV)
    s=[]
    for k,(x0,y0,x1,y1) in regions.items():
        h=hsv[y0:y1,x0:x1]; sat=h[...,1]>70
        if sat.sum()>20:
            hue=h[...,0][sat].astype(float)*2
            # circular mean
            ang=np.degrees(np.arctan2(np.sin(np.radians(hue)).mean(),np.cos(np.radians(hue)).mean()))%360
            s.append(f"{k}: hue={ang:5.0f} satpx={sat.mean()*100:4.1f}%")
        else: s.append(f"{k}: -- satpx={sat.mean()*100:4.1f}%")
    print(f"{22.9+i/8:.3f} "+' | '.join(s))
