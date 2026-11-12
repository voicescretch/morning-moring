import os
import re

files_to_check = ['index.html', 'blog.html', 'blog-detail.html', 'script.js']
all_ok = True

print("=== CHECKING ASSETS & REFERENCES ===")
for f in files_to_check:
    if not os.path.exists(f):
        print(f"MISSING FILE: {f}")
        all_ok = False
        continue
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    
    matches = re.findall(r'assets/[\w\-\./]+', content)
    for m in set(matches):
        clean_m = m.strip("\"'")
        if not os.path.exists(clean_m):
            print(f"In {f}, broken asset path: {clean_m}")
            all_ok = False
        else:
            print(f"  [OK] {clean_m} exists (referenced in {f})")

print("\n=== CHECKING WHATSAPP NUMBER & FORMAT ===")
with open('script.js', 'r', encoding='utf-8') as fp:
    js_code = fp.read()

if 'const WHATSAPP_NUMBER = "6283818590784";' in js_code:
    print("  [OK] WhatsApp number configured exactly: 6283818590784")
else:
    print("  [ERROR] WhatsApp number is NOT 6283818590784")
    all_ok = False

if 'encodeURIComponent' in js_code:
    print("  [OK] WhatsApp messages encoded with encodeURIComponent")
else:
    print("  [ERROR] encodeURIComponent missing")
    all_ok = False

# Check product count in script.js
product_ids = re.findall(r'id:\s*"([^"]+)"', js_code)
print(f"  [INFO] Products defined in script.js: {product_ids}")
expected_products = ["original-100", "original-250", "original-500", "pedas-100", "pedas-250", "pedas-500"]
for p in expected_products:
    if p in product_ids:
        print(f"  [OK] Product {p} found")
    else:
        print(f"  [ERROR] Product {p} missing")
        all_ok = False

if all_ok:
    print("\n>>> ALL TESTS PASSED SUCCESSFULLY! <<<")
else:
    print("\n>>> SOME TESTS FAILED! <<<")
