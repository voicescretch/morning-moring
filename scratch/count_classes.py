import re

classes = set()
for f in ['index.html', 'blog.html', 'blog-detail.html', 'script.js']:
    with open(f, 'r', encoding='utf-8') as fp:
        content = fp.read()
    found = re.findall(r'class="([^"]+)"', content)
    for c in found:
        for item in c.split():
            classes.add(item)

print(f"Total unique classes used: {len(classes)}")
