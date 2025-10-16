# Qynzoo.com Website Development Guide

## Project Overview
This is the official website for Qynzoo, an AI automation agency specializing in workflow automation and website building services.

## Brand Identity

### Official Color Palette
- **Primary Color**: `#44bba4` (Turquoise)
- **Secondary Color**: `#ffc107` (Yellow/Gold)
- **Accent Color**: `#fc7753` (Coral/Orange)

Always use these exact colors for any design changes or new features.

### Logo & Branding
- Logo file: `images/logo.png`
- Founder photo: `images/mostafa-yaghi.jpg` (Mostafa Yaghi only)
- **Important**: Do NOT add content about "Bader" - only Mostafa Yaghi should be featured

## Project Structure

```
Qynzoo.com/
├── index.html          # Main landing page
├── blog.html           # Blog page (TO BE CREATED)
├── css/
│   └── style.css       # Main stylesheet with Qynzoo brand colors
├── js/
│   └── script.js       # Interactive features & animations
├── images/
│   ├── logo.png
│   ├── mostafa-yaghi.jpg
│   └── portfolio-*.jpg # Portfolio project images
├── ChangeLog.md        # Track all changes made
└── CLAUDE.md          # This file - guidelines for future development

```

## Key Features Implemented

### 1. **Interactive Elements**
- Mouse cursor following effect with animated trail
- Smooth scroll navigation
- Animated statistics counters
- 3D tilt effects on service cards
- Tab-based benefits section
- Portfolio filtering system
- Real-time form validation
- Back to top button
- Scroll progress indicator

### 2. **Design Principles**
- **Color Usage**:
  - Hero title uses `--secondary-color` (#ffc107) for visibility
  - Primary actions use `--primary-color` (#44bba4)
  - Accents use `--accent-color` (#fc7753)

- **Responsive Design**:
  - Breakpoints: 968px, 768px, 480px
  - Mobile-first approach
  - Touch-friendly interface

- **Animations**:
  - AOS library for scroll animations
  - Custom JavaScript animations for interactions
  - CSS transitions for smooth UX

### 3. **Website Sections**
1. **Hero** - Features Mostafa Yaghi prominently
2. **Services** - AI Automation, Website Building, Integration
3. **Workflow** - 5-step process explanation
4. **Benefits** - Tab interface (What You'll Understand/Receive/Outcomes/Support)
5. **Portfolio** - Filterable project gallery
6. **Contact** - Interactive form with validation

## Important Development Rules

### When Making Changes:
1. **Always preserve brand colors** - use the official palette
2. **Update ChangeLog.md** after completing any task
3. **Test responsiveness** on multiple screen sizes
4. **Maintain accessibility** standards
5. **Keep code comments** clear and descriptive

### Before Committing Changes:
- [ ] Test on desktop browser
- [ ] Test on mobile device
- [ ] Verify all interactive elements work
- [ ] Check color consistency
- [ ] Update ChangeLog.md
- [ ] Ensure Mostafa Yaghi is the only person featured

## Future Development Tasks

### Pending Features:
- [ ] Create blog page for agentic workflow content
  - Research best practices from internet sources
  - Add proper citations
  - Include illustrations/diagrams
  - Write about AI workflow automation use cases

### Improvement Ideas:
- Add more portfolio projects
- Integrate backend for contact form
- Add testimonials section
- Create case studies page
- Add pricing page
- Implement blog CMS integration
- Add newsletter functionality
- SEO optimization
- Performance optimization
- Add analytics tracking

## File Modification Guidelines

### HTML (index.html)
- Maintain semantic HTML structure
- Keep accessibility attributes (ARIA labels)
- Use descriptive class names
- Ensure all images have proper alt text

### CSS (css/style.css)
- Use CSS custom properties (variables) for colors
- Follow BEM naming convention where possible
- Keep media queries organized at the end
- Comment complex selectors

### JavaScript (js/script.js)
- Keep functions modular and reusable
- Add comments for complex logic
- Use modern ES6+ features
- Ensure cross-browser compatibility
- Test all interactive features

## Testing Checklist

### Functionality:
- [ ] All navigation links work
- [ ] Logo clicks return to home
- [ ] Form validation works
- [ ] Portfolio filtering functions
- [ ] Tab switching works
- [ ] Smooth scrolling active
- [ ] Mouse trail appears
- [ ] Counter animations trigger

### Visual:
- [ ] Colors match brand palette
- [ ] Fonts load correctly
- [ ] Images display properly
- [ ] Layout doesn't break on resize
- [ ] Animations are smooth
- [ ] No console errors

### Performance:
- [ ] Page loads quickly
- [ ] Images are optimized
- [ ] No layout shifts (CLS)
- [ ] Smooth 60fps animations

## Common Issues & Solutions

### Issue: Portfolio boxes appear white
**Solution**: Ensure `.portfolio-item` has `background: #e9ecef` and `box-shadow` in CSS

### Issue: Hero title not visible enough
**Solution**: Hero title uses `color: var(--secondary-color)` for the yellow/gold color

### Issue: Logo not clickable
**Solution**: Logo is wrapped in `<a href="#home">` tag

### Issue: Colors don't match brand
**Solution**: Check CSS :root variables match official palette:
- `--primary-color: #44bba4`
- `--secondary-color: #ffc107`
- `--accent-color: #fc7753`

## Deployment Notes

### Before Uploading to Live Server:
1. Replace placeholder images with actual project images
2. Update contact information (email, phone)
3. Add actual social media links
4. Configure contact form backend
5. Test all features one final time
6. Minify CSS and JavaScript for production
7. Optimize images (compress without quality loss)
8. Set up proper error pages (404, 500)
9. Configure SSL certificate
10. Set up redirect from www to non-www (or vice versa)

## Resources

### Libraries Used:
- **AOS (Animate On Scroll)**: https://michalsnik.github.io/aos/
- **Font Awesome Icons**: https://fontawesome.com/

### Documentation:
- HTML/CSS/JS: MDN Web Docs
- Accessibility: WCAG 2.1 Guidelines
- SEO: Google Search Central

## Contact & Support

For questions about the website design or development:
- Review this CLAUDE.md file first
- Check ChangeLog.md for recent changes
- Refer to inline code comments for specific functionality

## Version History

**Current Version**: 1.0
**Last Updated**: 2024-10-10
**Created By**: Claude AI Assistant

---

**Remember**: This website represents Qynzoo's brand. Always maintain professionalism, quality, and attention to detail in all development work.
