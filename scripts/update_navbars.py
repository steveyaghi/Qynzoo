import re

# List of blog files to update
blog_files = [
    'blog-workflow-automation.html',
    'blog-ai-tools-2025.html',
    'blog-build-chatbot.html',
    'blog-geo-vs-seo.html',
    'blog-local-ai.html'
]

# New navbar HTML
new_navbar = '''    <!-- Navigation -->
    <nav class="navbar" id="navbar">
        <div class="container nav-wrapper">
            <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
                <span></span>
                <span></span>
                <span></span>
            </button>
            <a href="index.html#home" class="logo">
                <img src="images/logo.png" alt="Qynzoo Logo" onerror="this.style.display='none'">
                <span class="logo-text">Qynzoo</span>
            </a>
            <ul class="nav-menu" id="navMenu">
                <li><a href="index.html#home" class="nav-link">Home</a></li>
                <li><a href="index.html#services" class="nav-link">Services</a></li>
                <li><a href="index.html#workflow" class="nav-link">How It Works</a></li>
                <li><a href="blogs.html" class="nav-link active">Blog</a></li>
                <li><a href="index.html#contact" class="btn btn-primary">Get Started</a></li>
            </ul>
        </div>
    </nav>'''

for filename in blog_files:
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if navbar already exists
        if '<nav class="navbar"' in content:
            # Replace existing navbar
            pattern = r'<nav class="navbar"[^>]*>.*?</nav>'
            content = re.sub(pattern, new_navbar.strip(), content, flags=re.DOTALL)
            print(f"[OK] Updated existing navbar in {filename}")
        else:
            # Add navbar after <body> tag
            content = content.replace('<body>', '<body>\n' + new_navbar + '\n')
            print(f"[OK] Added new navbar to {filename}")

        # Write back
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)

    except Exception as e:
        print(f"[ERROR] Error processing {filename}: {e}")

print("\n[SUCCESS] All blog navbars updated!")
