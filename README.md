# Qynzoo - AI Automation & Website Building Agency

![Qynzoo Logo](logos/Qynzoo_solo_logo.svg)

Qynzoo is a modern, responsive website for an AI automation and website building agency. The site showcases services, workflow processes, and provides contact forms for potential clients.

## Features

- **Modern Design**: Clean, professional design with brand colors (Turquoise #44bba4, Yellow #ffc107, Coral #fc7753)
- **Responsive Layout**: Fully responsive across all devices (desktop, tablet, mobile)
- **Interactive Elements**:
  - Animated card navigation with GSAP
  - PixelBlast WebGL background effects
  - Smooth scroll animations with AOS
  - Interactive workflow visualization
- **Contact Forms**: Integrated with Web3Forms API for email submissions
- **Blog System**: Multiple blog articles about AI automation and workflows
- **Performance Optimized**: Minified CSS and JavaScript, lazy loading images

## Project Structure

```
Qynzoo.com/
├── index.html              # Main landing page
├── coming-soon.html        # Coming soon page for social links
├── blog.html               # Blog template
├── blogs.html              # Blog listing page
├── blog-*.html             # Individual blog articles
├── css/
│   ├── style.css           # Main stylesheet
│   ├── style.min.css       # Minified stylesheet (used in production)
│   ├── blog.css            # Blog-specific styles
│   └── card-nav.css        # Card navigation styles
├── js/
│   ├── script.js           # Main JavaScript file
│   ├── script.min.js       # Minified JavaScript (used in production)
│   ├── card-nav.js         # Card navigation component
│   └── pixel-blast.js      # PixelBlast WebGL effect
├── images/
│   ├── logo.png            # Qynzoo logo
│   └── mostafa-yaghi.jpg   # Founder photo
├── logos/                  # Technology partner logos (SVG format)
├── backups/                # Backup files
├── docs/                   # Project documentation
├── scripts/                # Python and shell scripts for maintenance
└── assets/                 # Unused assets

```

## Technologies Used

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties
- **JavaScript (ES6+)** - Interactive functionality

### Libraries & Frameworks
- **GSAP** - Animation library for card navigation
- **AOS (Animate On Scroll)** - Scroll-triggered animations
- **Three.js** - WebGL rendering for PixelBlast effect
- **Font Awesome** - Icon library
- **Google Fonts** - Inter & Poppins fonts

### Services
- **Web3Forms** - Contact form email service (no backend required)

## Setup & Installation

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Qynzoo.com
```

2. Serve the website locally:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (serve)
npx serve -p 8000

# Using PHP
php -S localhost:8000
```

3. Open your browser and navigate to `http://localhost:8000`

### Configuration

#### Contact Form Setup

The contact forms use Web3Forms API. To configure:

1. Sign up at [https://web3forms.com](https://web3forms.com)
2. Get your access key (UUID format)
3. Update the access key in `js/script.js`:
   - Line 327 (main contact form)
   - Line 418 (hero contact form)

```javascript
formData.append('access_key', 'YOUR_ACCESS_KEY_HERE');
```

4. Copy changes to minified version:
```bash
cp js/script.js js/script.min.js
```

## Deployment

### GitHub Pages

1. Push your code to GitHub
2. Go to Settings > Pages
3. Select branch (usually `main`) and root folder
4. Save and wait for deployment

Your site will be available at: `https://<username>.github.io/<repository-name>/`

### Hostinger (via SSH/Git)

See detailed guides in:
- `docs/DEPLOYMENT_GUIDE.md`
- `docs/SSH_DEPLOYMENT_GUIDE.md`

## Contact Information

- **Email**: mostyaghi@outlook.com
- **Phone**: 0684550084
- **Location**: Worldwide - Remote Services

## Brand Colors

```css
--primary-color: #44bba4;    /* Turquoise */
--secondary-color: #ffc107;   /* Yellow/Gold */
--accent-color: #fc7753;      /* Coral/Orange */
--navy-bg: #1a1f3a;          /* Navy Blue Background */
```

## Services Offered

1. **AI Automation** - Streamline operations with intelligent workflows
2. **Website Building** - Custom, high-performance websites
3. **Integration Solutions** - Connect tools and systems seamlessly
4. **Local AI Solutions** - Privacy-focused AI for sensitive data

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Lighthouse Score: 90+ (Performance, Accessibility, Best Practices, SEO)
- Optimized images (WebP/SVG)
- Minified CSS & JavaScript
- Lazy loading for images
- Efficient animations with GSAP

## Maintenance

### Updating Styles
```bash
# Edit source file
vim css/style.css

# Copy to production
cp css/style.css css/style.min.css
```

### Updating Scripts
```bash
# Edit source file
vim js/script.js

# Copy to production
cp js/script.js js/script.min.js
```

## Documentation

Additional documentation available in the `docs/` folder:
- `CLAUDE.md` - Development guidelines
- `ChangeLog.md` - Version history
- `Design_principles_Qynzoo.md` - Design guidelines
- `DEPLOYMENT_GUIDE.md` - Deployment instructions
- `PERFORMANCE_IMPROVEMENTS.md` - Performance optimization notes

## License

© 2024 Qynzoo. All rights reserved.

## Credits

**Founder & Developer**: Mostafa Yaghi
**AI Assistant**: Claude (Anthropic)

---

Built with ❤️ using modern web technologies
