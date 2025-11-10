# Brandfetch Logo Integration Setup

## Overview
This integration automatically replaces your tech stack logos with white/light-themed versions from Brandfetch's API.

## Setup Instructions

### Step 1: Add Your API Key
Open `index.html` and find this line (around line 38):

```html
<meta name="brandfetch-client-id" content="YOUR_CLIENT_ID_HERE">
```

Replace `YOUR_CLIENT_ID_HERE` with your actual Brandfetch API key/client ID.

### Step 2: Test It
1. Open your website in a browser
2. Check the browser console (F12) for log messages
3. You should see: "✓ Replaced X logo(s) for [company]"

## How It Works

The script (`js/brandfetch-logos.js`) automatically:
1. Detects logo images by their `alt` attribute
2. Fetches white/light-themed versions from Brandfetch API
3. Replaces the logo sources with Brandfetch CDN URLs
4. Falls back to original logos if Brandfetch fails

## Supported Logos

Currently configured for:
- **N8N** (n8n.io)
- **Make** (make.com)
- **OpenAI** (openai.com)
- **Anthropic** (anthropic.com)
- **Supabase** (supabase.com)

## Customization

To add more logos, edit `js/brandfetch-logos.js` and add entries to the `logos` array:

```javascript
this.logos = [
  { selector: 'img[alt="CompanyName"]', domain: 'company.com' },
  // ... more logos
];
```

## Troubleshooting

### Logos not loading?
1. Check the browser console for errors
2. Verify your API key is correct in the meta tag
3. Check network tab to see if Brandfetch requests are failing
4. Ensure the domain names are correct (e.g., 'openai.com' not 'www.openai.com')

### Want to use local logos instead?
Simply remove or comment out the script tag:
```html
<!-- <script src="js/brandfetch-logos.js?v=3.6" defer></script> -->
```

## API Documentation
For more information, visit: https://docs.brandfetch.com/
