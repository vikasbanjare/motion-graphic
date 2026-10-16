import cv2, numpy as np, sys
W=sys.argv[1]; out=sys.argv[2]; frames=[int(x) for x in sys.argv[3].split(',')]
cols=int(sys.argv[4]) if len(sys.argv)>4 else 2
tiles=[]
for f in frames:
    im=cv2.imread(f"{W}/f24/{f:04d}.png")
    cv2.putText(im,f"f{f} t={f/24:.3f}",(6,18),cv2.FONT_HERSHEY_SIMPLEX,0.5,(0,0,255),1)
    tiles.append(im)
while len(tiles)%cols: tiles.append(np.zeros_like(tiles[0]))
rows=[np.hstack(tiles[i:i+cols]) for i in range(0,len(tiles),cols)]
cv2.imwrite(out,np.vstack(rows))
