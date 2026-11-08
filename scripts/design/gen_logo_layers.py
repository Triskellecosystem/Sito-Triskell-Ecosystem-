"""Separa il logo reale (public/brand/triskell-medallion.png) in livelli per la scena 3D: disco, anello, spirali.
Uso: python3 gen_logo_layers.py <percorso_opencv> <cartella_report>
(serve opencv-python-headless; eseguire dalla radice del repo)
"""
import sys, os, math
sys.path.insert(0, sys.argv[1])
import numpy as np, cv2
from PIL import Image
src='public/brand/triskell-medallion.png'
im=np.asarray(Image.open(src).convert('RGBA')).astype(np.float32)
rgb=im[...,:3]; alpha=im[...,3]/255.0
H,W=alpha.shape; cx=cy=(W-1)/2
yy,xx=np.mgrid[0:H,0:W]; r=np.hypot(xx-cx,yy-cy)
R=W/2*0.985
R_,G_,B_=rgb[...,0],rgb[...,1],rgb[...,2]
gold=np.clip((R_-B_-22)/48,0,1)*alpha
# profilo radiale della "doratura"
bins=np.linspace(0,R,64); prof=[gold[(r>=a)&(r<b)].mean() if ((r>=a)&(r<b)).any() else 0 for a,b in zip(bins[:-1],bins[1:])]
print('profilo (r/R : gold):', ' '.join(f'{b/R:.2f}:{p:.2f}' for b,p in zip(bins[1:],prof) if b/R>0.7))
# soglia: minimo tra 0.80R e 0.93R
cand=[(p,b) for b,p in zip(bins[1:],prof) if 0.80*R<=b<=0.93*R]
split=min(cand)[1]; print('r_split/R =',round(split/R,3))
ring=gold*(r>=split-1)
coils=gold*(r<split-1)
def rgba(color,a):
    o=np.zeros((H,W,4),np.uint8); o[...,:3]=np.clip(color,0,255).astype(np.uint8); o[...,3]=np.clip(a*255,0,255).astype(np.uint8); return o
# disco: fondo blu ricostruito (sfumatura liscia dalle zone pulite + grana da un pezzo pulito)
m=(gold>0.02).astype(np.uint8)*255
m=cv2.dilate(m,cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(31,31)))
keep=((m==0)&(alpha>0.99)&(r<0.84*R)).astype(np.float32)
G=lambda a,sg: cv2.GaussianBlur(a,(0,0),sg)
wk=G(keep,26)
base=np.stack([G(rgb[...,c]*keep,26)/np.maximum(wk,1e-4) for c in range(3)],axis=-1)
glob=(rgb*keep[...,None]).sum((0,1))/keep.sum()
wt=np.clip(wk/0.12,0,1)[...,None]
base=base*wt+glob*(1-wt)
# pezzo pulito 112x112 per la grana
best=None
PS=72
for y in range(30,H-PS-30,6):
    for x in range(30,W-PS-30,6):
        if keep[y:y+PS,x:x+PS].min()==1: best=(y,x); break
    if best: break
print('patch grana:',best)
y0,x0=best
patch=rgb[y0:y0+PS,x0:x0+PS]
hp=patch-np.stack([G(patch[...,c],4) for c in range(3)],axis=-1)
tile=np.tile(np.concatenate([np.concatenate([hp,hp[:,::-1]],axis=1),np.concatenate([hp[::-1],hp[::-1,::-1]],axis=1)],axis=0),(5,5,1))[:H,:W]
disc_rgb=base+tile*1.15
edge=np.clip((0.945*R-r)/(0.02*R),0,1)
disc_a=edge
out='public/brand'
Image.fromarray(rgba(disc_rgb,disc_a)).save(f'{out}/triskell-layer-disc.png',optimize=True)
Image.fromarray(rgba(rgb,ring)).save(f'{out}/triskell-layer-ring.png',optimize=True)
Image.fromarray(rgba(rgb,coils)).save(f'{out}/triskell-layer-coils.png',optimize=True)
# controllo: ricomposizione sul fondo notte
def comp(layers,bg=(1,15,28)):
    base=np.zeros((H,W,3),np.float32)+np.array(bg,np.float32)
    for L in layers:
        a=L[...,3:4]/255.0; base=base*(1-a)+L[...,:3].astype(np.float32)*a
    return base
D=rgba(disc_rgb,disc_a); Rg=rgba(rgb,ring); C=rgba(rgb,coils)
Image.fromarray(comp([D,Rg,C]).astype(np.uint8)).save(sys.argv[2]+'/layers-recomposed.png')
orig=comp([rgba(rgb,alpha)])
print('differenza media ricomposizione vs originale:',float(np.abs(comp([D,Rg,C])-orig).mean()))
sheet=np.concatenate([comp([D]),comp([Rg]),comp([C])],axis=1).astype(np.uint8)
Image.fromarray(sheet).resize((sheet.shape[1]//2,sheet.shape[0]//2)).save(sys.argv[2]+'/layers-sheet.png')
for f in ('disc','ring','coils'): print(f, os.path.getsize(f'{out}/triskell-layer-{f}.png')//1024,'KB')
