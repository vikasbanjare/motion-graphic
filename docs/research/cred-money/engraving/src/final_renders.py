import json, subprocess, sys, os
sys.path.insert(0,'src')
from cg_levels import levels_for
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CG=dict(wobble=0.7,detail=0.25,segLen=4.0,segJitter=0.35,segWidth=0.3,segGap=0.2,fill=0.4)
Q=dict(bs='2',an='0.35')
# subject, palette, reference scene for tone quantiles, extra params
SPEC=[('column','crimson4','columns',dict(periodFrac=0.0069,black=0.298,white=0.913,toneGamma=1.05)),
      ('stilllife','crimson4','columns',{}),
      ('stilllife','mint4','lighthouse',{}),
      ('coin','forest','green_rock',dict(periodFrac=0.0105,fill=0.65,aa=2.0,covGamma=1.0)),
      ('sphere','lavender4','columns',{}),
      ('card','violet','flowers',dict(periodFrac=0.0077))]
def run(jobs,tag):
    fn=f'{ROOT}/out/jobs_{tag}.json'; json.dump(jobs,open(fn,'w'))
    r=subprocess.run(['node','run.mjs',fn],cwd=f'{ROOT}/web',capture_output=True,text=True); print(r.stdout[-600:],r.stderr[-300:])
subs=sorted(set(s[0] for s in SPEC))
run([dict(name=f'final_plain_{s}',subject=s,plain=True,query=Q) for s in subs],'final_plain')
jobs=[]; meta={}
for subj,pal,ref,extra in SPEC:
    lv,info=levels_for(f'{ROOT}/out/web/final_plain_{subj}.png',(0,0,1920,1080),ref)
    tg=round(lv['toneGamma']*(1.05 if pal.endswith('4') else 1.2),3)    # levels to reference tone space, then the calibrated curve (4-stop palettes 1.05)
    p=dict(CG,black=lv['black'],white=lv['white'],toneGamma=tg); p.update(extra)   # extra may pin calibrated levels
    name=f'final_{subj}_{pal}'; jobs.append(dict(name=name,subject=subj,palette=pal,params=p,query=Q)); meta[name]=dict(params=p,levels_info={k:[round(float(x),3) for x in v] for k,v in info.items()},ref=ref)
# surface-following material variant (lines follow UV iso-lines) for the column and the sphere
jobs.append(dict(name='final_column_uvmaterial',subject='column',palette='crimson4',params=dict(CG,wobble=0.15,segJitter=0.15,toneGamma=1.3),query=dict(Q,material='1',lpuv='110')))
jobs.append(dict(name='final_sphere_uvmaterial',subject='sphere',palette='lavender4',params=dict(CG,wobble=0.15,segJitter=0.15,toneGamma=1.3),query=dict(Q,material='1',lpuv='170')))
jobs.append(dict(name='final_sphere_screenpost',subject='sphere',palette='lavender4',params=dict(CG,black=0.0,white=1.0,toneGamma=1.3),query=Q))
run(jobs,'final_eng')
json.dump(meta,open(f'{ROOT}/out/final_meta.json','w'),indent=1)
