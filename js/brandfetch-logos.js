/**
 * Brandfetch Logo Integration
 * Replaces local logos with white/light themed versions from Brandfetch API
 */

class BrandfetchLogoManager {
  constructor(clientId) {
    this.clientId = clientId;
    this.logos = [
      { selector: 'img[alt="N8N"]', domain: 'n8n.io' },
      { selector: 'img[alt="Make"]', domain: 'make.com' },
      { selector: 'img[alt="OpenAI"]', domain: 'openai.com' },
      { selector: 'img[alt="Anthropic"]', domain: 'anthropic.com' },
      { selector: 'img[alt="Supabase"]', domain: 'supabase.com' }
    ];
  }

  /**
   * Generate Brandfetch CDN URL for a logo with light theme
   * @param {string} domain - Company domain
   * @param {number} size - Logo size (default 256)
   * @returns {string} - Brandfetch CDN URL
   */
  generateLogoUrl(domain, size = 256) {
    return `https://cdn.brandfetch.io/${domain}/theme/light/w/${size}/h/${size}/logo?c=${this.clientId}`;
  }

  /**
   * Fetch logo from Brandfetch API
   * @param {string} domain - Company domain
   * @returns {Promise<string>} - Logo URL
   */
  async fetchLogo(domain) {
    try {
      // Use the API endpoint to get brand data
      const response = await fetch(`https://api.brandfetch.io/v2/brands/${domain}`, {
        headers: {
          'Authorization': `Bearer ${this.clientId}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch brand data for ${domain}`);
      }

      const data = await response.json();

      // Find light-themed logo
      const logos = data.logos || [];
      const lightLogo = logos.find(logo =>
        logo.theme === 'light' || logo.type === 'logo'
      );

      if (lightLogo && lightLogo.formats && lightLogo.formats.length > 0) {
        // Prefer SVG, then PNG
        const svgFormat = lightLogo.formats.find(f => f.format === 'svg');
        const pngFormat = lightLogo.formats.find(f => f.format === 'png');
        return (svgFormat || pngFormat)?.src;
      }

      // Fallback to CDN URL
      return this.generateLogoUrl(domain);
    } catch (error) {
      console.warn(`Using CDN fallback for ${domain}:`, error.message);
      return this.generateLogoUrl(domain);
    }
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
  }

  /**
   * Initialize and replace all logos
   */
  async init() {
    console.log('Initializing Brandfetch logo replacement...');

    for (const { selector, domain } of this.logos) {
      try {
        const elements = document.querySelectorAll(selector);

        if (elements.length === 0) {
          console.warn(`No elements found for selector: ${selector}`);
          continue;
        }

        const logoUrl = await this.fetchLogo(domain);

        elements.forEach(img => {
          this.replaceLogo(img, logoUrl);
        });

        console.log(`✓ Replaced ${elements.length} logo(s) for ${domain}`);
      } catch (error) {
        console.error(`Failed to replace logo for ${domain}:`, error);
      }
    }

    console.log('Logo replacement complete!');
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
