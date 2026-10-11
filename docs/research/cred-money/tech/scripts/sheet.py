import sys, os
from PIL import Image, ImageDraw, ImageFont
src, out, names = sys.argv[1], sys.argv[2], sys.argv[3].split(',')
cols = int(sys.argv[4]) if len(sys.argv) > 4 else 4
tw = int(sys.argv[5]) if len(sys.argv) > 5 else 640
files = sorted(f for f in os.listdir(src) if f.endswith('.png'))
th = tw * 9 // 16
rows = (len(files) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw, rows * (th + 28)), 'white')
d = ImageDraw.Draw(sheet)
try: font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 18)
except Exception: font = ImageFont.load_default()
for i, f in enumerate(files):
    im = Image.open(os.path.join(src, f)).convert('RGB').resize((tw, th), Image.LANCZOS)
    x, y = (i % cols) * tw, (i // cols) * (th + 28)
    sheet.paste(im, (x, y + 28))
    d.text((x + 6, y + 4), f"{i:02d} {names[i] if i < len(names) else f}", fill='black', font=font)
sheet.save(out, quality=90)
print(out, sheet.size)
