import cv2, numpy as np, sys
W=sys.argv[1]; out=sys.argv[2]; ns=[int(x) for x in sys.argv[3].split(',')]
cols=int(sys.argv[4]) if len(sys.argv)>4 else 3
scale=float(sys.argv[5]) if len(sys.argv)>5 else 1.0
tiles=[]
for n in ns:
    im=cv2.imread(f'{W}/f24/{n:04d}.png')
    if scale!=1: im=cv2.resize(im,None,fx=scale,fy=scale,interpolation=cv2.INTER_AREA)
    cv2.rectangle(im,(0,0),(150,22),(0,0,0),-1)
    cv2.putText(im,f'n{n} {n/24:.3f}s',(3,16),cv2.FONT_HERSHEY_SIMPLEX,0.5,(255,255,255),1)
    tiles.append(im)
while len(tiles)%cols: tiles.append(np.zeros_like(tiles[0]))
rows=[np.hstack(tiles[i:i+cols]) for i in range(0,len(tiles),cols)]
cv2.imwrite(out,np.vstack(rows))
