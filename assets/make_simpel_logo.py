import math, struct, zlib
W=H=120
bg=(16,34,54,255)
pix=[[bg for _ in range(W)] for _ in range(H)]
def setp(x,y,c):
    if 0<=x<W and 0<=y<H: pix[y][x]=c if len(c)==4 else (*c,255)
def circle(cx,cy,r,c):
    for y in range(cy-r,cy+r+1):
        for x in range(cx-r,cx+r+1):
            if (x-cx)**2+(y-cy)**2<=r*r:setp(x,y,c)
def ring(cx,cy,ro,ri,c):
    for y in range(cy-ro,cy+ro+1):
        for x in range(cx-ro,cx+ro+1):
            d=(x-cx)**2+(y-cy)**2
            if ri*ri<=d<=ro*ro:setp(x,y,c)
def line(x1,y1,x2,y2,w,c):
    dx=x2-x1;dy=y2-y1; den=max(1,dx*dx+dy*dy)
    for y in range(min(y1,y2)-w,max(y1,y2)+w+1):
        for x in range(min(x1,x2)-w,max(x1,x2)+w+1):
            t=max(0,min(1,((x-x1)*dx+(y-y1)*dy)/den)); px=x1+t*dx;py=y1+t*dy
            if (x-px)**2+(y-py)**2<=w*w:setp(x,y,c)
def polyline(points,w,c):
    for a,b in zip(points,points[1:]):line(a[0],a[1],b[0],b[1],w,c)
# rounded-ish outer badge
circle(60,60,53,(8,107,135,255)); circle(60,60,46,(16,34,54,255))
# surveillance rings
ring(60,52,31,29,(167,229,221,255)); ring(60,52,20,18,(8,107,135,255))
# connected facility nodes
edges=[((60,52),(38,37)),((60,52),(84,35)),((60,52),(86,70)),((60,52),(39,73))]
for a,b in edges: line(*a,*b,2,(8,107,135,255))
for x,y in [(38,37),(84,35),(86,70),(39,73)]: circle(x,y,5,(167,229,221,255))
circle(60,52,6,(220,173,70,255))
# signal line across lower panel
polyline([(25,91),(39,91),(44,82),(51,98),(58,88),(66,88),(72,78),(79,91),(95,91)],2,(255,255,255,255))
# alert marker
circle(92,28,8,(220,173,70,255)); line(92,23,92,29,2,(16,34,54,255)); circle(92,33,1,(16,34,54,255))
raw=b''.join(b'\x00'+bytes(v for p in row for v in p) for row in pix)
def chunk(t,d):return struct.pack('>I',len(d))+t+d+struct.pack('>I',zlib.crc32(t+d)&0xffffffff)
png=b'\x89PNG\r\n\x1a\n'+chunk(b'IHDR',struct.pack('>IIBBBBB',W,H,8,6,0,0,0))+chunk(b'IDAT',zlib.compress(raw,9))+chunk(b'IEND',b'')
open('assets/simpel-logo-120.png','wb').write(png)
