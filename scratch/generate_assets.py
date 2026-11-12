"""
Script to generate all required visual assets for Morning Moring:
- Transparent logo
- 6 Product packaging images (WebP)
- Hero composition showcase
- About story image
- 5 Authentic WhatsApp chat review screenshots
- 4 Blog article thumbnails
"""

import os
import math
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

ASSETS_IMG = "assets/images"
ASSETS_REV = "assets/reviews"
os.makedirs(ASSETS_IMG, exist_ok=True)
os.makedirs(ASSETS_REV, exist_ok=True)

# System fonts
FONT_TITLE_BOLD = "C:/Windows/Fonts/segoeuib.ttf"
FONT_BODY = "C:/Windows/Fonts/segoeui.ttf"
FONT_SEMI = "C:/Windows/Fonts/calibri.ttf"
FONT_BOLD = "C:/Windows/Fonts/calibrib.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

# 1. GENERATE TRANSPARENT LOGO
def generate_transparent_logo():
    logo_path = os.path.join(ASSETS_IMG, "logo.jpg")
    if not os.path.exists(logo_path):
        print("logo.jpg not found")
        return
    
    img = Image.open(logo_path).convert("RGBA")
    w, h = img.size
    
    # Create circular mask with antialiasing
    mask = Image.new("L", (w * 2, h * 2), 0)
    draw_mask = ImageDraw.Draw(mask)
    # Circle diameter slightly inside the edge
    draw_mask.ellipse((10, 10, w * 2 - 10, h * 2 - 10), fill=255)
    mask = mask.resize((w, h), Image.Resampling.LANCZOS)
    
    img.putalpha(mask)
    out_path = os.path.join(ASSETS_IMG, "logo.png")
    img.save(out_path, "PNG")
    print("Saved transparent logo.png")

# Helper to draw crispy moring snack chips
def draw_moring_chips(draw, center_x, center_y, radius, count=35, is_spicy=False):
    random.seed(42)
    # Chips are small rounded thin discs with golden-beige / orange-red hues
    for _ in range(count):
        ox = center_x + random.randint(-int(radius*0.75), int(radius*0.75))
        oy = center_y + random.randint(-int(radius*0.75), int(radius*0.75))
        chip_r = random.randint(18, 32)
        
        # Color palette
        if is_spicy:
            # Fiery reddish orange / paprika golden
            colors = [
                (230, 81, 0), (216, 67, 21), (191, 54, 12),
                (244, 81, 30), (229, 115, 115), (183, 28, 28)
            ]
        else:
            # Golden crisp / toasted garlic / lightly browned tapioca
            colors = [
                (245, 171, 53), (230, 126, 34), (243, 156, 18),
                (241, 196, 15), (211, 84, 0), (238, 216, 174)
            ]
        base_col = random.choice(colors)
        
        # Draw chip disc
        draw.ellipse([ox - chip_r, oy - int(chip_r*0.8), ox + chip_r, oy + int(chip_r*0.8)], fill=base_col, outline=(150, 75, 0, 120))
        # Inner rim / highlight
        draw.ellipse([ox - int(chip_r*0.6), oy - int(chip_r*0.5), ox + int(chip_r*0.6), oy + int(chip_r*0.5)], fill=(base_col[0]+15, base_col[1]+15, min(255, base_col[2]+15)))
        
        # Daun jeruk specks (green herb flakes)
        for _ in range(random.randint(2, 5)):
            gx = ox + random.randint(-chip_r+6, chip_r-6)
            gy = oy + random.randint(-int(chip_r*0.5), int(chip_r*0.5))
            draw.ellipse([gx-2, gy-1, gx+2, gy+1], fill=(46, 125, 50))
            
        # Chili flakes if spicy
        if is_spicy:
            for _ in range(random.randint(2, 4)):
                cx = ox + random.randint(-chip_r+6, chip_r-6)
                cy = oy + random.randint(-int(chip_r*0.5), int(chip_r*0.5))
                draw.rectangle([cx-2, cy-2, cx+2, cy+2], fill=(136, 14, 79))

# Helper to draw a modern standing packaging pouch
def draw_pouch_product(flavor, size_label, grams, price, out_filename):
    W, H = 800, 800
    im = Image.new("RGBA", (W, H), (255, 255, 255, 0))
    draw = ImageDraw.Draw(im)
    
    is_spicy = (flavor.lower() == "pedas")
    
    # Soft background glow / studio pedestal
    glow_color = (254, 215, 170, 130) if not is_spicy else (254, 202, 202, 130)
    for r in range(260, 40, -20):
        alpha = int(40 * (1 - r / 260))
        draw.ellipse([W//2 - r, H - 220 - r//3, W//2 + r, H - 220 + r//3], fill=(glow_color[0], glow_color[1], glow_color[2], alpha))
        
    # Cast shadow under pouch
    draw.ellipse([W//2 - 220, H - 140, W//2 + 220, H - 80], fill=(60, 40, 20, 50))
    draw.ellipse([W//2 - 180, H - 130, W//2 + 180, H - 90], fill=(40, 20, 10, 80))

    # Pouch dimensions based on size
    # 100g: slightly more compact, 250g: standard, 500g: tall and wide
    if grams == 100:
        pw, ph = 340, 480
    elif grams == 250:
        pw, ph = 380, 520
    else: # 500g
        pw, ph = 420, 560
        
    px = (W - pw) // 2
    py = H - 140 - ph
    
    # Main pouch body color & gradient
    if is_spicy:
        # Pouch colors: Warm Matte Coral / Crimson & Amber Orange
        pouch_top = (220, 38, 38)
        pouch_bottom = (185, 28, 28)
        accent_color = (254, 240, 138) # bright yellow accent
        badge_bg = (153, 27, 27)
    else:
        # Pouch colors: Warm Golden Amber & Creamy Orange
        pouch_top = (245, 158, 11)
        pouch_bottom = (217, 119, 6)
        accent_color = (255, 251, 235)
        badge_bg = (180, 83, 9)
        
    # Draw Pouch Shape with rounded corners
    # Top zipper seal
    seal_h = 35
    draw.rounded_rectangle([px + 10, py, px + pw - 10, py + seal_h], radius=8, fill=(pouch_top[0]-25, pouch_top[1]-20, pouch_bottom[2]-10))
    # Zipper ribs
    for i in range(px + 25, px + pw - 25, 6):
        draw.line([i, py + 8, i, py + seal_h - 8], fill=(255, 255, 255, 70), width=1)
    # Tear notches
    draw.polygon([(px+10, py+16), (px+18, py+19), (px+10, py+22)], fill=(255, 255, 255, 140))
    draw.polygon([(px+pw-10, py+16), (px+pw-18, py+19), (px+pw-10, py+22)], fill=(255, 255, 255, 140))
    
    # Main Pouch Body
    body_y = py + seal_h - 4
    body_h = ph - seal_h + 4
    
    # Base pouch with soft gradient effect
    draw.rounded_rectangle([px, body_y, px + pw, py + ph], radius=24, fill=pouch_top)
    # Bottom gradient overlay
    draw.rounded_rectangle([px, body_y + int(body_h*0.45), px + pw, py + ph], radius=24, fill=pouch_bottom)
    
    # Left & right edge 3D shading
    for s in range(16):
        alpha = int(45 * (1 - s/16))
        draw.line([px + s, body_y + 10, px + s, py + ph - 10], fill=(0, 0, 0, alpha))
        draw.line([px + pw - s, body_y + 10, px + pw - s, py + ph - 10], fill=(255, 255, 255, alpha))

    # Center Logo Emblem on Pouch
    logo_path = os.path.join(ASSETS_IMG, "logo.png")
    if os.path.exists(logo_path):
        logo_img = Image.open(logo_path).convert("RGBA")
        logo_size = int(pw * 0.38)
        logo_resized = logo_img.resize((logo_size, logo_size), Image.Resampling.LANCZOS)
        logo_pos = (W//2 - logo_size//2, body_y + 20)
        im.paste(logo_resized, logo_pos, logo_resized)
        
    # Product Title & Variant Badge
    font_bold = get_font(FONT_TITLE_BOLD, 26)
    font_sub = get_font(FONT_TITLE_BOLD, 17)
    font_weight = get_font(FONT_TITLE_BOLD, 20)
    font_small = get_font(FONT_BODY, 13)
    
    text_y = body_y + 20 + int(pw * 0.38) + 12
    
    # Variant Ribbon
    ribbon_w = int(pw * 0.82)
    ribbon_h = 36
    ribbon_x = W//2 - ribbon_w//2
    draw.rounded_rectangle([ribbon_x, text_y, ribbon_x + ribbon_w, text_y + ribbon_h], radius=18, fill=badge_bg, outline=(255, 255, 255, 200), width=2)
    
    variant_text = f"VARIAN {flavor.upper()}"
    bbox = draw.textbbox((0, 0), variant_text, font=font_bold)
    tw = bbox[2] - bbox[0]
    draw.text((W//2 - tw//2, text_y + 4), variant_text, fill=(255, 255, 255), font=font_bold)
    
    # Window with Crispy Moring Chips preview
    window_y = text_y + ribbon_h + 16
    window_w = int(pw * 0.74)
    window_h = int(ph * 0.32)
    win_x = W//2 - window_w//2
    
    # Window cutout border
    draw.rounded_rectangle([win_x - 3, window_y - 3, win_x + window_w + 3, window_y + window_h + 3], radius=24, fill=(255, 255, 255, 220))
    draw.rounded_rectangle([win_x, window_y, win_x + window_w, window_y + window_h], radius=22, fill=(40, 20, 10, 240)) # dark background
    
    # Draw moring chips inside window
    draw_moring_chips(draw, W//2, window_y + window_h//2, min(window_w, window_h)//2 + 20, count=40, is_spicy=is_spicy)
    
    # Glossy reflection overlay on window
    draw.polygon([(win_x + 10, window_y + 10), (win_x + 90, window_y + 10), (win_x + 20, window_y + window_h - 20), (win_x + 10, window_y + window_h - 20)], fill=(255, 255, 255, 45))

    # Bottom Tagline & Grams Badge
    bottom_y = window_y + window_h + 14
    sub_tag = "Daun Jeruk Segar & Gurih Nagih" if not is_spicy else "Pedes Nampol Daun Jeruk Asli"
    bbox_sub = draw.textbbox((0, 0), sub_tag, font=font_small)
    draw.text((W//2 - (bbox_sub[2]-bbox_sub[0])//2, bottom_y), sub_tag, fill=accent_color, font=font_small)
    
    # Weight pill badge
    weight_pill_w = 120
    weight_pill_h = 30
    weight_pill_x = W//2 - weight_pill_w//2
    weight_pill_y = bottom_y + 20
    draw.rounded_rectangle([weight_pill_x, weight_pill_y, weight_pill_x + weight_pill_w, weight_pill_y + weight_pill_h], radius=15, fill=(255, 255, 255), outline=badge_bg, width=2)
    
    weight_str = f"Netto: {size_label}"
    bbox_w = draw.textbbox((0, 0), weight_str, font=font_weight)
    draw.text((W//2 - (bbox_w[2]-bbox_w[0])//2, weight_pill_y + 3), weight_str, fill=pouch_top, font=font_weight)

    # Floating spilled chips around the pouch base for mouthwatering feel
    draw_moring_chips(draw, px - 15, H - 150, 45, count=9, is_spicy=is_spicy)
    draw_moring_chips(draw, px + pw + 15, H - 150, 45, count=10, is_spicy=is_spicy)
    
    # Quality / Freshness Seal Badge top right
    badge_r = 44
    bx = px + pw - 20
    by = py + 45
    draw.ellipse([bx - badge_r, by - badge_r, bx + badge_r, by + badge_r], fill=(234, 88, 12) if not is_spicy else (185, 28, 28), outline=(255, 255, 255), width=3)
    seal_txt1 = "100%"
    seal_txt2 = "GARUT"
    font_seal1 = get_font(FONT_TITLE_BOLD, 17)
    font_seal2 = get_font(FONT_TITLE_BOLD, 14)
    bbox_s1 = draw.textbbox((0, 0), seal_txt1, font=font_seal1)
    bbox_s2 = draw.textbbox((0, 0), seal_txt2, font=font_seal2)
    draw.text((bx - (bbox_s1[2]-bbox_s1[0])//2, by - 18), seal_txt1, fill=(255, 255, 255), font=font_seal1)
    draw.text((bx - (bbox_s2[2]-bbox_s2[0])//2, by + 1), seal_txt2, fill=(255, 240, 138), font=font_seal2)

    # Save to WebP
    out_path = os.path.join(ASSETS_IMG, out_filename)
    im.save(out_path, "WEBP", quality=92)
    print(f"Saved product image: {out_filename}")

# 2. GENERATE ALL 6 PRODUCTS
def generate_all_products():
    products = [
        {"flavor": "Original", "size": "100g", "grams": 100, "price": 5000, "file": "original-100.webp"},
        {"flavor": "Original", "size": "250g", "grams": 250, "price": 12000, "file": "original-250.webp"},
        {"flavor": "Original", "size": "500g", "grams": 500, "price": 20000, "file": "original-500.webp"},
        {"flavor": "Pedas", "size": "100g", "grams": 100, "price": 5000, "file": "pedas-100.webp"},
        {"flavor": "Pedas", "size": "250g", "grams": 250, "price": 12000, "file": "pedas-250.webp"},
        {"flavor": "Pedas", "size": "500g", "grams": 500, "price": 20000, "file": "pedas-500.webp"},
    ]
    for p in products:
        draw_pouch_product(p["flavor"], p["size"], p["grams"], p["price"], p["file"])

# 3. GENERATE HERO BANNER SHOWCASE
def generate_hero_showcase():
    W, H = 1000, 750
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(im)
    
    # Soft warm radial aura
    for r in range(400, 50, -30):
        alpha = int(45 * (1 - r / 400))
        draw.ellipse([W//2 - r, H//2 - r*0.7, W//2 + r, H//2 + r*0.7], fill=(245, 158, 11, alpha))

    # Load original-250 and pedas-250 pouches
    orig_path = os.path.join(ASSETS_IMG, "original-250.webp")
    pedas_path = os.path.join(ASSETS_IMG, "pedas-250.webp")
    
    if os.path.exists(orig_path) and os.path.exists(pedas_path):
        orig_im = Image.open(orig_path).convert("RGBA").resize((480, 480), Image.Resampling.LANCZOS)
        pedas_im = Image.open(pedas_path).convert("RGBA").resize((480, 480), Image.Resampling.LANCZOS)
        
        # Paste Pedas on left slightly rotated
        p_rot = pedas_im.rotate(7, resample=Image.Resampling.BICUBIC, expand=True)
        im.paste(p_rot, (60, 110), p_rot)
        
        # Paste Original on right slightly rotated
        o_rot = orig_im.rotate(-6, resample=Image.Resampling.BICUBIC, expand=True)
        im.paste(o_rot, (420, 110), o_rot)
        
    # Big appetizing wooden snack bowl in center bottom
    bowl_x, bowl_y = W//2, H - 120
    draw.ellipse([bowl_x - 220, bowl_y - 70, bowl_x + 220, bowl_y + 70], fill=(120, 53, 15), outline=(90, 35, 10), width=4)
    draw.ellipse([bowl_x - 210, bowl_y - 65, bowl_x + 210, bowl_y + 45], fill=(180, 83, 9))
    draw_moring_chips(draw, bowl_x, bowl_y - 20, 180, count=75, is_spicy=False)
    draw_moring_chips(draw, bowl_x + 30, bowl_y - 15, 120, count=45, is_spicy=True)
    
    # Floating badge 1: "Kriuk Gurih Nagih"
    f_badge = get_font(FONT_TITLE_BOLD, 20)
    draw.rounded_rectangle([110, 80, 310, 135], radius=28, fill=(255, 255, 255), outline=(245, 158, 11), width=3)
    draw.text((135, 95), "✨ Renyah Maksimal!", fill=(180, 83, 9), font=f_badge)
    
    # Floating badge 2: "100% Khas Garut"
    draw.rounded_rectangle([W - 320, 100, W - 110, 155], radius=28, fill=(255, 255, 255), outline=(220, 38, 38), width=3)
    draw.text((W - 300, 115), "🔥 Bumbu Daun Jeruk", fill=(185, 28, 28), font=f_badge)

    im.save(os.path.join(ASSETS_IMG, "hero-moring.webp"), "WEBP", quality=92)
    print("Saved hero-moring.webp")

# 4. GENERATE ABOUT IMAGE
def generate_about_image():
    W, H = 800, 600
    im = Image.new("RGB", (W, H), (255, 251, 235))
    draw = ImageDraw.Draw(im)
    
    # Warm patterned background
    for x in range(0, W, 40):
        for y in range(0, H, 40):
            draw.ellipse([x-2, y-2, x+2, y+2], fill=(254, 215, 170, 120))
            
    # Center wooden cutting board & ingredients
    draw.rounded_rectangle([60, 60, W - 60, H - 60], radius=32, fill=(255, 255, 255), outline=(245, 158, 11), width=3)
    
    # Title inside card
    font_h = get_font(FONT_TITLE_BOLD, 32)
    font_p = get_font(FONT_BODY, 18)
    draw.text((100, 95), "Dibuat dengan Dedikasi & Cinta Khas Garut", fill=(69, 26, 3), font=font_h)
    draw.text((100, 140), "Perpaduan tepung tapioka pilihan, rempah alami & daun jeruk segar.", fill=(120, 53, 15), font=font_p)
    
    # Bowl of chips in center
    draw.ellipse([W//2 - 180, H//2 - 20, W//2 + 180, H//2 + 160], fill=(245, 158, 11, 40))
    draw.ellipse([W//2 - 160, H//2, W//2 + 160, H//2 + 140], fill=(120, 53, 15))
    draw_moring_chips(draw, W//2, H//2 + 50, 130, count=55, is_spicy=False)
    draw_moring_chips(draw, W//2 + 40, H//2 + 55, 80, count=35, is_spicy=True)
    
    # 3 Pill counters at bottom
    badges = [
        ("100% Halal", "Bahan Pilihan Alami"),
        ("Tanpa Pengawet", "Higienis & Fresh"),
        ("Khas Garut", "Resep Otentik Turun Temurun")
    ]
    f_b1 = get_font(FONT_TITLE_BOLD, 17)
    f_b2 = get_font(FONT_BODY, 13)
    
    col_w = (W - 200) // 3
    for i, (b1, b2) in enumerate(badges):
        bx = 100 + i * (col_w + 15)
        by = H - 150
        draw.rounded_rectangle([bx, by, bx + col_w, by + 65], radius=16, fill=(255, 247, 237), outline=(251, 146, 60), width=1)
        draw.text((bx + 15, by + 12), b1, fill=(234, 88, 12), font=f_b1)
        draw.text((bx + 15, by + 36), b2, fill=(113, 63, 18), font=f_b2)

    im.save(os.path.join(ASSETS_IMG, "about-moring.webp"), "WEBP", quality=92)
    print("Saved about-moring.webp")

# 5. GENERATE AUTHENTIC WHATSAPP CHAT REVIEW SCREENSHOTS
def generate_whatsapp_reviews():
    reviews_data = [
        {
            "filename": "review-1.webp",
            "sender_name": "Siti Nurhaliza (Bandung)",
            "time_header": "14:25",
            "messages": [
                {"from": "customer", "text": "Halo kak! Mau ngabarin paket moringnya udah sampe barusan yaa 😍📦", "time": "14:20"},
                {"from": "customer", "text": "Sumpah ini moring terenak yg pernah aku coba!! Renyah banget kress ga keras sama sekali, bumbu pedas daun jeruknya nendang nagih parah 🤤🔥 Baru buka 15 menit langsung ludes sebungkus wkwk", "time": "14:21"},
                {"from": "owner", "text": "Alhamdulillah kak Siti! 🥰 Seneng banget dengernya. Moring kami memang selalu fresh goreng tiap hari dan racikan bumbu rempah asli Garut kak ❤️", "time": "14:23"},
                {"from": "customer", "text": "Mau order lagi dong kak yg 500g Pedas 2 bungkus sama Original 1 bungkus! Nanti buat stok nyemil di kantor haha 🙌", "time": "14:24"},
                {"from": "owner", "text": "Siap kak, langsung kami proses yaa! Terima kasih banyak sudah jadi pelanggan setia Morning Moring! 🙏😊", "time": "14:25"},
            ]
        },
        {
            "filename": "review-2.webp",
            "sender_name": "Dimas Pratama (Surabaya)",
            "time_header": "19:12",
            "messages": [
                {"from": "customer", "text": "Min paket Morning Moring 5 pouch yg 250g udah mendarat aman di Surabaya yaa. Packing kardus + bubble wrapnya tebel bgt mantap 👍", "time": "19:05"},
                {"from": "customer", "text": "Anak-anak dan istri suka banget yang rasa Original! Gurih asinnya pas, daun jeruknya wangi semerbak dan ga bikin seret di leher.", "time": "19:07"},
                {"from": "owner", "text": "Terima kasih mas Dimas atas reviewnya! 🙏 Senang sekali sekeluarga pada cocok. Moring Original kami memang ramah anak-anak dan ga pake MSG berlebih mas.", "time": "19:09"},
                {"from": "customer", "text": "Beneran nagih parah min, besok2 kalo habis saya re-order lagi yaa. Sukses terus usahanya! ⭐⭐⭐⭐⭐", "time": "19:11"},
            ]
        },
        {
            "filename": "review-3.webp",
            "sender_name": "Nadia Putri (Jakarta Selatan)",
            "time_header": "11:45",
            "messages": [
                {"from": "customer", "text": "Kak aku mau kasih testimoni jujur nih...", "time": "11:38"},
                {"from": "customer", "text": "Awalnya ragu krn biasa beli moring suka keras bgt bikin gigi mau copot wkwk 😭 EHH pas nyoba Morning Moring ini beda banget dong!! Kriuknya renyah empuk tapi ga rapuh. Juara bgt!", "time": "11:40"},
                {"from": "owner", "text": "Wah terima kasih banyak review jujurnya kak Nadia! ❤️ Kami pake teknik iris tipis khusus khas Garut kak, jadi sensasi kriuknya renyah kress di setiap gigitan.", "time": "11:42"},
                {"from": "customer", "text": "Fix jadi langganan! Udah ku racunin juga ke temen2 satu divisi wkwk 😆", "time": "11:44"},
            ]
        },
        {
            "filename": "review-4.webp",
            "sender_name": "Rizky Ramadhan (Semarang)",
            "time_header": "16:30",
            "messages": [
                {"from": "customer", "text": "Pagi kak, mau repeat order Morning Moring dong!", "time": "16:22"},
                {"from": "customer", "text": "Kemarin bawa moring pedas 500g ke tongkrongan langsung diserbu temen2 abis ga bersisa haha. Mau pesen 3 pouch yg 500g pedas ya kak.", "time": "16:24"},
                {"from": "owner", "text": "Halo kak Rizky! Wahh mantap pisan hahaha, cocok banget buat nemenin nongkrong & nobar yaa kak! 🔥🔥 Total 3 pouch 500g siap kami packing sore ini yaa kak.", "time": "16:27"},
                {"from": "customer", "text": "Siap kak, udah ku transfer yaa via QRIS. Makasih banyak pengirimannya cepet bgt!", "time": "16:29"},
            ]
        },
        {
            "filename": "review-5.webp",
            "sender_name": "Bunda Anita (Tangerang)",
            "time_header": "20:05",
            "messages": [
                {"from": "customer", "text": "Selamat malam admin Morning Moring. Paket cemilan sudah sampai dengan selamat.", "time": "19:55"},
                {"from": "customer", "text": "Sangat puas sekali dengan pelayanannya yang ramah & cepat. Rasanya otentik cemilan Garut tempo dulu tapi kemasannya modern zipper lock jd awet renyahnya.", "time": "19:58"},
                {"from": "owner", "text": "Malam Bunda Anita 🙏 Terima kasih banyak atas apresiasi hangatnya, sangat berarti bagi kami sebagai UMKM lokal Garut. Sehat dan berkah selalu untuk Bunda sekeluarga 😊", "time": "20:02"},
                {"from": "customer", "text": "Sama-sama min. Nanti kalau ada acara keluarga saya pesan dalam jumlah banyak ya. Sukses selalu!", "time": "20:04"},
            ]
        }
    ]
    
    # WhatsApp layout dimensions
    W, H = 720, 1100
    
    for r_idx, rev in enumerate(reviews_data):
        im = Image.new("RGB", (W, H), (239, 234, 226)) # WA Chat Background beige
        draw = ImageDraw.Draw(im)
        
        # Subtle WA doodle background pattern
        for x in range(20, W, 80):
            for y in range(120, H, 80):
                draw.ellipse([x, y, x+6, y+6], fill=(228, 222, 212))
                draw.line([x+20, y+10, x+30, y+20], fill=(228, 222, 212), width=2)
                
        # Header bar (WhatsApp Emerald Green)
        header_h = 105
        draw.rectangle([0, 0, W, header_h], fill=(0, 128, 105))
        
        # Back arrow
        f_icons = get_font(FONT_TITLE_BOLD, 22)
        draw.text((20, 48), "←", fill=(255, 255, 255), font=f_icons)
        
        # Profile Picture Circle (with logo)
        pfp_r = 24
        pfp_center = (80, 60)
        draw.ellipse([pfp_center[0]-pfp_r, pfp_center[1]-pfp_r, pfp_center[0]+pfp_r, pfp_center[1]+pfp_r], fill=(245, 158, 11))
        
        logo_path = os.path.join(ASSETS_IMG, "logo.png")
        if os.path.exists(logo_path):
            l_img = Image.open(logo_path).convert("RGBA").resize((44, 44), Image.Resampling.LANCZOS)
            im.paste(l_img, (pfp_center[0]-22, pfp_center[1]-22), l_img)
            
        # Profile title & Online status
        f_name = get_font(FONT_TITLE_BOLD, 21)
        f_status = get_font(FONT_BODY, 14)
        draw.text((120, 42), "Morning Moring Official", fill=(255, 255, 255), font=f_name)
        draw.text((120, 68), "online • Bikin Nagih Khas Garut", fill=(220, 245, 235), font=f_status)
        
        # Header action icons (video, call, menu dots)
        draw.text((W - 130, 48), "📹", fill=(255, 255, 255), font=f_icons)
        draw.text((W - 85, 48), "📞", fill=(255, 255, 255), font=f_icons)
        draw.text((W - 40, 48), "⋮", fill=(255, 255, 255), font=f_icons)
        
        # Date Pill in chat
        date_pill_w = 120
        date_pill_h = 28
        date_pill_x = W//2 - date_pill_w//2
        draw.rounded_rectangle([date_pill_x, 125, date_pill_x + date_pill_w, 125 + date_pill_h], radius=14, fill=(255, 255, 255), outline=(220, 215, 205))
        f_date = get_font(FONT_TITLE_BOLD, 13)
        draw.text((date_pill_x + 36, 131), "HARI INI", fill=(100, 110, 115), font=f_date)
        
        # Render Chat Bubbles
        cur_y = 175
        f_msg = get_font(FONT_BODY, 17)
        f_time = get_font(FONT_BODY, 12)
        
        for msg in rev["messages"]:
            is_cust = (msg["from"] == "customer")
            text = msg["text"]
            time_str = msg["time"]
            
            # Word wrap text
            words = text.split()
            lines = []
            cur_line = ""
            max_chars = 34 if is_cust else 32
            
            for word in words:
                if len(cur_line + " " + word) <= max_chars:
                    cur_line = cur_line + " " + word if cur_line else word
                else:
                    lines.append(cur_line)
                    cur_line = word
            if cur_line:
                lines.append(cur_line)
                
            line_height = 24
            bubble_h = len(lines) * line_height + 34
            max_line_w = max(draw.textbbox((0, 0), l, font=f_msg)[2] - draw.textbbox((0, 0), l, font=f_msg)[0] for l in lines)
            bubble_w = min(W - 140, max(max_line_w + 35, 180))
            
            if is_cust:
                # Customer bubble on left (white)
                bx = 30
                bubble_bg = (255, 255, 255)
                text_col = (17, 27, 33)
                time_col = (102, 119, 129)
                draw.rounded_rectangle([bx, cur_y, bx + bubble_w, cur_y + bubble_h], radius=14, fill=bubble_bg)
                
                # Small tail on left
                draw.polygon([(bx, cur_y + 10), (bx - 8, cur_y + 16), (bx, cur_y + 22)], fill=bubble_bg)
            else:
                # Owner bubble on right (light green)
                bx = W - bubble_w - 30
                bubble_bg = (217, 253, 211)
                text_col = (17, 27, 33)
                time_col = (102, 119, 129)
                draw.rounded_rectangle([bx, cur_y, bx + bubble_w, cur_y + bubble_h], radius=14, fill=bubble_bg)
                
                # Small tail on right
                draw.polygon([(bx + bubble_w, cur_y + 10), (bx + bubble_w + 8, cur_y + 16), (bx + bubble_w, cur_y + 22)], fill=bubble_bg)

            # Draw lines of text
            ly = cur_y + 10
            for line in lines:
                draw.text((bx + 14, ly), line, fill=text_col, font=f_msg)
                ly += line_height
                
            # Time & Read ticks
            draw.text((bx + bubble_w - 65, cur_y + bubble_h - 22), time_str, fill=time_col, font=f_time)
            if not is_cust:
                # Double blue ticks
                draw.text((bx + bubble_w - 26, cur_y + bubble_h - 23), "✓✓", fill=(83, 189, 235), font=f_time)
                
            cur_y += bubble_h + 14
            
        # WhatsApp bottom input bar placeholder
        input_y = H - 80
        draw.rectangle([0, input_y, W, H], fill=(240, 242, 245))
        draw.rounded_rectangle([20, input_y + 14, W - 90, input_y + 64], radius=25, fill=(255, 255, 255))
        draw.text((45, input_y + 26), f"Ketik pesan... ({rev['sender_name']})", fill=(134, 150, 160), font=f_status)
        draw.text((W - 130, input_y + 25), "📎", fill=(134, 150, 160), font=f_icons)
        
        # Green microphone button
        draw.ellipse([W - 75, input_y + 14, W - 25, input_y + 64], fill=(0, 168, 132))
        draw.text((W - 57, input_y + 25), "🎙", fill=(255, 255, 255), font=f_icons)

        # Save review screenshot
        out_rev_path = os.path.join(ASSETS_REV, rev["filename"])
        im.save(out_rev_path, "WEBP", quality=90)
        print(f"Saved review screenshot: {rev['filename']}")

# 6. GENERATE BLOG THUMBNAILS
def generate_blog_thumbnails():
    blogs = [
        {
            "file": "blog-1.webp",
            "tag": "RAHASIA RESEP",
            "title": "Rahasia Kerenyahan Moring Garut yang Bikin Nagih",
            "accent": (245, 158, 11),
            "is_pedas": False
        },
        {
            "file": "blog-2.webp",
            "tag": "TIPS KULINER",
            "title": "5 Cara Asik Menikmati Moring: Dari Camilan Sampai Topping Bakso",
            "accent": (234, 88, 12),
            "is_pedas": True
        },
        {
            "file": "blog-3.webp",
            "tag": "TIPS PENYIMPANAN",
            "title": "Tips Menyimpan Moring Agar Tetap Kress Berminggu-minggu",
            "accent": (16, 185, 129),
            "is_pedas": False
        },
        {
            "file": "blog-4.webp",
            "tag": "CERITA GARUT",
            "title": "Kisah di Balik Morning Moring: Dapur Rumahan Menuju Selera Nusantara",
            "accent": (217, 119, 6),
            "is_pedas": False
        }
    ]
    
    W, H = 800, 500
    for b in blogs:
        im = Image.new("RGB", (W, H), (255, 251, 235))
        draw = ImageDraw.Draw(im)
        
        # Stylish gradient card layout
        draw.rounded_rectangle([25, 25, W - 25, H - 25], radius=28, fill=(255, 255, 255), outline=b["accent"], width=2)
        
        # Top banner illustration
        draw.rounded_rectangle([27, 27, W - 27, 240], radius=26, fill=b["accent"])
        
        # Moring chips in banner
        draw_moring_chips(draw, W - 180, 130, 90, count=30, is_spicy=b["is_pedas"])
        
        # Tag pill
        f_tag = get_font(FONT_TITLE_BOLD, 15)
        draw.rounded_rectangle([60, 55, 230, 92], radius=18, fill=(255, 255, 255))
        draw.text((75, 63), b["tag"], fill=b["accent"], font=f_tag)
        
        # Article Title in banner
        f_btitle = get_font(FONT_TITLE_BOLD, 26)
        # Wrap title
        words = b["title"].split()
        lines = []
        cur = ""
        for w in words:
            if len(cur + " " + w) <= 28:
                cur = cur + " " + w if cur else w
            else:
                lines.append(cur)
                cur = w
        if cur:
            lines.append(cur)
            
        ly = 115
        for l in lines:
            draw.text((60, ly), l, fill=(255, 255, 255), font=f_btitle)
            ly += 32
            
        # Bottom preview details
        f_p = get_font(FONT_BODY, 16)
        f_meta = get_font(FONT_TITLE_BOLD, 14)
        draw.text((60, 275), "Pelajari rahasia kerenyahan dan cita rasa otentik camilan khas Garut", fill=(100, 116, 139), font=f_p)
        draw.text((60, 310), "yang telah menjadi favorit keluarga di seluruh Indonesia.", fill=(100, 116, 139), font=f_p)
        
        # Meta footer
        draw.line([60, 370, W - 60, 370], fill=(241, 245, 249), width=2)
        draw.text((60, 400), "📅 Tim Morning Moring • ⏱ 4 Menit Baca", fill=(148, 163, 184), font=f_meta)
        
        # "Baca Selengkapnya ->"
        draw.text((W - 250, 400), "Baca Artikel Lengkap →", fill=b["accent"], font=f_meta)

        out_b = os.path.join(ASSETS_IMG, b["file"])
        im.save(out_b, "WEBP", quality=90)
        print(f"Saved blog thumbnail: {b['file']}")

if __name__ == "__main__":
    generate_transparent_logo()
    generate_all_products()
    generate_hero_showcase()
    generate_about_image()
    generate_whatsapp_reviews()
    generate_blog_thumbnails()
    print("ALL ASSETS SUCCESSFULLY GENERATED!")
