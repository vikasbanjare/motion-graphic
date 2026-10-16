import sys, numpy as np, onnxruntime as ort, soundfile as sf, librosa
M='/tmp/claude-0/-home-user-motion-graphic/1f24b667-a667-5b98-80e3-897ca246eb7a/scratchpad/research-cred/audio/dl/silero/x/silero_vad/data/silero_vad.onnx'
path=sys.argv[1]
x,sr=librosa.load(path,sr=16000,mono=True)
s=ort.InferenceSession(M)
state=np.zeros((2,1,128),np.float32); ctx=np.zeros((1,64),np.float32)
probs=[]
for i in range(0,len(x)-512,512):
    ch=x[i:i+512][None].astype(np.float32)
    inp=np.concatenate([ctx,ch],1)
    out,state=s.run(None,{'input':inp,'state':state,'sr':np.array(16000,np.int64)})
    ctx=inp[:,-64:]
    probs.append(out[0,0])
p=np.array(probs); t=np.arange(len(p))*512/16000
np.save(sys.argv[2],np.stack([t,p]))
print('frames',len(p),'max',p.max().round(3),'mean',p.mean().round(3),'frac>0.5',(p>0.5).mean().round(4))
# list runs above 0.5
on=p>0.5; runs=[]; i=0
while i<len(on):
    if on[i]:
        j=i
        while j<len(on) and on[j]: j+=1
        runs.append((t[i],t[min(j,len(t)-1)],p[i:j].max())); i=j
    else: i+=1
for r in runs: print(f"{r[0]:6.2f}-{r[1]:6.2f}  max {r[2]:.2f}")
