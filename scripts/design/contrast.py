import sys
def lin(c):
    c/=255
    return c/12.92 if c<=0.03928 else ((c+0.055)/1.055)**2.4
def L(h):
    h=h.lstrip('#'); r,g,b=[int(h[i:i+2],16) for i in (0,2,4)]
    return 0.2126*lin(r)+0.7152*lin(g)+0.0722*lin(b)
def cr(a,b):
    la,lb=L(a),L(b)
    if la<lb: la,lb=lb,la
    return (la+0.05)/(lb+0.05)
pairs=[
 ("text-primary on bg-base","#F2F6FB","#010F1C"),
 ("text-primary on surface","#F2F6FB","#061725"),
 ("text-secondary(measured) on bg-base","#CED2DA","#010F1C"),
 ("text-secondary on surface-elevated","#CED2DA","#0D273D"),
 ("text-muted(measured #91979A) on bg-base","#91979A","#010F1C"),
 ("text-muted(measured #91979A) on surface","#91979A","#061725"),
 ("grey #656D75 on bg-base (cluster)","#656D75","#010F1C"),
 ("gold-400 #F2C462 on bg-base","#F2C462","#010F1C"),
 ("gold-500 #ECB851 on bg-base","#ECB851","#010F1C"),
 ("gold-700 #C3850E on bg-base","#C3850E","#010F1C"),
 ("gold-800 #86550B on bg-base","#86550B","#010F1C"),
 ("bg-base on gold button mid #F7C85C","#010F1C","#F7C85C"),
 ("bg-base on gold button bottom #DA9C25","#010F1C","#DA9C25"),
 ("azure #2A90C3 on bg-base","#2A90C3","#010F1C"),
 ("azure #138DC8 on bg-base","#138DC8","#010F1C"),
 ("cobalt #0D3E66 on bg-base (decor)","#0D3E66","#010F1C"),
 ("cobalt-bright #0B5A8D on bg-base","#0B5A8D","#010F1C"),
 ("gold on surface-elevated","#F2C462","#0D273D"),
 ("azure-300 #5BB6E0 on bg-base","#5BB6E0","#010F1C"),
 ("text-muted proposta #A3AEBD on bg-base","#A3AEBD","#010F1C"),
 ("text-muted proposta #A3AEBD on surface-elevated","#A3AEBD","#0D273D"),
 ("focus ring gold #F2C462 on bg-base","#F2C462","#010F1C"),
]
for n,a,b in pairs:
    r=cr(a,b); print(f"{r:5.2f}  {'AA ok ' if r>=4.5 else ('AA-large' if r>=3 else 'FAIL   ')}  {n}")
