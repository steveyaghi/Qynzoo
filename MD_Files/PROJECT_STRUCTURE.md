# Qynzoo.com Project Structure

## Directory Tree

```
Qynzoo.com/
│
├── 📄 index.html                    # Main landing page
├── 📄 coming-soon.html              # Coming soon placeholder
├── 📄 README.md                     # Project documentation
├── 📄 .gitignore                    # Git ignore rules
│
├── 📁 css/                          # Stylesheets
│   ├── style.css                    # Main styles (source)
│   ├── style.min.css               # Minified styles (production)
│   ├── blog.css                    # Blog-specific styles
│   └── card-nav.css                # Navigation component styles
│
├── 📁 js/                           # JavaScript files
│   ├── script.js                   # Main JavaScript (source)
│   ├── script.min.js               # Minified JavaScript (production)
│   ├── card-nav.js                 # Card navigation component
│   └── pixel-blast.js              # WebGL background effects
│
├── 📁 images/                       # Website images
│   ├── logo.png                    # Qynzoo logo
│   ├── mostafa-yaghi.jpg          # Founder photo
│   └── README.md                   # Images documentation
│
├── 📁 logos/                        # Partner/Technology logos
│   ├── Qynzoo_solo_logo.svg       # Main logo (SVG)
│   ├── Anthropic_Logo_1.svg       # AI partner logo
│   ├── OpenAI-Logo-2022.svg       # AI partner logo
│   ├── Make_idU77DJcxU_1.svg      # Automation tool logo
│   ├── N8N logo.svg                # Automation tool logo
│   └── Supabase_id9q7Wa4Ba_1.svg  # Database logo
│
├── 📁 Blog Pages/                   # Blog articles
│   ├── blog.html                   # Blog template
│   ├── blogs.html                  # Blog listing page
│   ├── blog-geo-vs-seo.html       # GEO vs SEO article
│   ├── blog-local-ai.html         # Local AI article
│   ├── blog-workflow-automation.html
│   ├── blog-ai-agent-practices.html
│   ├── blog-ai-tools-2025.html
│   └── blog-build-chatbot.html
│
├── 📁 docs/                         # Project documentation
│   ├── CLAUDE.md                   # Development guidelines
│   ├── ChangeLog.md                # Version history
│   ├── Design_principles_Qynzoo.md # Design system
│   ├── DEPLOYMENT_GUIDE.md         # Deployment instructions
│   ├── SSH_DEPLOYMENT_GUIDE.md     # SSH deployment guide
│   ├── PERFORMANCE_IMPROVEMENTS.md # Optimization notes
│   ├── animated pixel.txt          # PixelBlast notes
│   ├── Card Nav.txt                # Navigation notes
│   ├── Scroll Stack.txt            # Scroll effect notes
│   ├── Color pallete.txt           # Brand colors
│   └── update-blog-nav.txt         # Blog update notes
│
├── 📁 scripts/                      # Utility scripts
│   ├── analyze_report.py           # Performance analysis
│   ├── update_navbars.py           # Navigation updater
│   └── apply-fixes.sh              # Quick fix script
│
├── 📁 assets/                       # Additional assets
│   └── images-unused/              # Archived images
│       ├── pasfoto.jpg
│       ├── Qynzoo logo.png
│       └── GitHub_Symbol_1.png
│
├── 📁 backups/                      # Backup files (gitignored)
│   ├── style.css.backup
│   ├── script.js.backup
│   └── index.html.backup
│
└── 📁 .git/                         # Git repository data

```

## File Categories

### 🌐 Website Pages (Root)
- `index.html` - Main landing page
- `coming-soon.html` - Placeholder for social media links
- `blog*.html` - Blog articles and listings

### 🎨 Styles (css/)
- **Source**: `style.css`, `blog.css`, `card-nav.css`
- **Production**: `style.min.css` (used by website)

### ⚡ Scripts (js/)
- **Source**: `script.js`, `card-nav.js`, `pixel-blast.js`
- **Production**: `script.min.js` (used by website)

### 🖼️ Media
- **images/** - Website imagery
- **logos/** - Partner and technology logos (SVG)

### 📚 Documentation (docs/)
- Deployment guides
- Design principles
- Development notes
- Performance improvements

### 🛠️ Utilities (scripts/)
- Python scripts for automation
- Shell scripts for fixes

### 🗃️ Archives (assets/)
- Unused or historical assets

## Deployment Structure

When deploying, only these files/folders are needed:

```
Qynzoo.com/ (Production)
├── index.html
├── coming-soon.html
├── blog*.html
├── css/
│   ├── style.min.css
│   ├── blog.css
│   └── card-nav.css
├── js/
│   ├── script.min.js
│   ├── card-nav.js
│   └── pixel-blast.js
├── images/
├── logos/
└── README.md (optional)
```

## Git Ignored Items

The following are excluded from version control:
- `.claude/` - AI assistant cache
- `.playwright-mcp/` - Browser automation
- `backups/` - Backup files
- `assets/images-unused/` - Archived images
- `node_modules/` - Dependencies (if any)
- `.env` files - Environment variables

## Key Points

1. **Source vs Production**: Always edit `.css` and `.js` files, then copy to `.min` versions
2. **Documentation**: All guides and notes are in `docs/`
3. **Clean Root**: Only essential HTML files in root directory
4. **Organized Assets**: Media separated by type (images/ vs logos/)
5. **Version Control**: Unnecessary files gitignored

---

Last Updated: October 16, 2024
