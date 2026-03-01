/**
 * Brandfetch Logo Integration
 * Replaces local logos with white/light themed versions from Brandfetch API
 */

class BrandfetchLogoManager {
  constructor(clientId) {
    this.clientId = clientId;
    this.logos = [
      // N8N excluded - using local logo file instead
      { selector: 'img[alt="Make"]', domain: 'make.com' },
      { selector: 'img[alt="OpenAI"]', domain: 'openai.com' },
      { selector: 'img[alt="Anthropic"]', domain: 'anthropic.com' },
      { selector: 'img[alt="Supabase"]', domain: 'supabase.com' },
      { selector: 'img[alt="Perplexity"]', domain: 'perplexity.ai' },
      { selector: 'img[alt="Figma"]', domain: 'figma.com' },
      { selector: 'img[alt="Google"]', domain: 'gemini.google.com' },
      { selector: 'img[alt="ElevenLabs"]', domain: 'elevenlabs.io' }
    ];
  }

  /**
   * Generate Brandfetch CDN URL for a logo with light theme (white/light colored logos)
   * @param {string} domain - Company domain
   * @param {number} size - Logo size (default 256)
   * @returns {string} - Brandfetch CDN URL
   */
  generateLogoUrl(domain, size = 256) {
    // Use light theme to get white/light colored logos for dark backgrounds
    return `https://cdn.brandfetch.io/${domain}/theme/light/w/${size}/h/${size}/logo?c=${this.clientId}`;
  }

  /**
   * Get logo URL from Brandfetch CDN
   * Uses CDN directly - the API endpoint requires a separate API key (not the embed client ID)
   * @param {string} domain - Company domain
   * @returns {string} - Logo CDN URL
   */
  fetchLogo(domain) {
    return this.generateLogoUrl(domain);
  }

  /**
   * Replace a single logo element
   * @param {HTMLImageElement} img - Image element to replace
   * @param {string} logoUrl - New logo URL
   */
  replaceLogo(img, logoUrl) {
    const originalSrc = img.src;

    img.onerror = () => {
      console.error(`Failed to load logo from Brandfetch, keeping original: ${originalSrc}`);
      img.src = originalSrc;
    };

    img.src = logoUrl;

    // Add CSS filter to make logos white/bright for dark backgrounds
    img.style.filter = 'brightness(0) invert(1)';
  }

  /**
   * Initialize and replace all logos
   */
  init() {
    for (const { selector, domain } of this.logos) {
      try {
        const elements = document.querySelectorAll(selector);

        if (elements.length === 0) {
          console.warn(`No elements found for selector: ${selector}`);
          continue;
        }

        const logoUrl = this.fetchLogo(domain);

        elements.forEach(img => {
          this.replaceLogo(img, logoUrl);
        });

      } catch (error) {
        console.error(`Failed to replace logo for ${domain}:`, error);
      }
    }
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Get client ID from meta tag or data attribute
  const metaClientId = document.querySelector('meta[name="brandfetch-client-id"]');
  const clientId = metaClientId ? metaClientId.content : 'YOUR_CLIENT_ID_HERE';

  if (clientId === 'YOUR_CLIENT_ID_HERE') {
    console.warn('Brandfetch client ID not configured. Add <meta name="brandfetch-client-id" content="your_id"> to the <head>');
    return;
  }

  const logoManager = new BrandfetchLogoManager(clientId);
  logoManager.init();
});
