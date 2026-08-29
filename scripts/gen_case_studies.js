const fs = require('fs');
const path = require('path');

const VER = '6.15';

function page(d) {
  const pills = d.pills.map((p, i) =>
    `                <span class="case-meta-pill${i === 0 ? ' accent' : ''}">${p}</span>`).join('\n');
  const chips = d.tools.map(t =>
    `                <span class="case-tool-chip">${t}</span>`).join('\n');
  const paras = arr => arr.map(t => `            <p>${t}</p>`).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${d.metaDesc}">
    <meta name="author" content="Mostafa Yaghi">
    <title>${d.client} Case Study: ${d.cardTitle} | Qynzoo</title>
    <link rel="canonical" href="https://qynzoo.com/case-studies/${d.slug}.html">

    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com https://unpkg.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com; base-uri 'self'; form-action 'self';">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta name="referrer" content="strict-origin-when-cross-origin">

    <meta property="og:type" content="article">
    <meta property="og:url" content="https://qynzoo.com/case-studies/${d.slug}.html">
    <meta property="og:title" content="${d.client} Case Study: ${d.cardTitle}">
    <meta property="og:description" content="${d.ogDesc}">
    <meta property="og:image" content="https://qynzoo.com/images/og/og-home.png">

    <script async src="https://www.googletagmanager.com/gtag/js?id=G-YF5C5BCJK4"></script>
    <script src="../js/analytics.js"></script>

    <!-- Schema.org CreativeWork -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "name": "${d.cardTitle}",
      "about": "${d.about}",
      "creator": { "@type": "Person", "name": "Mostafa Yaghi" },
      "client": { "@type": "Organization", "name": "${d.client}" },
      "url": "https://qynzoo.com/case-studies/${d.slug}.html"
    }
    </script>

    <link rel="icon" type="image/svg+xml" href="../logos/Qynzoo_solo_logo.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="../css/style.min.css?v=4.4">
    <link rel="stylesheet" href="../css/card-nav.css?v=4.2" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" media="print" onload="this.media='all'">
    <link rel="stylesheet" href="../css/neo.css?v=${VER}">
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700&display=swap"></noscript>
</head>
<body>
    <div class="card-nav-container" id="cardNavContainer"></div>

    <section class="case-hero neo-page">
        <div class="container">
            <a href="../index.html#projects" class="case-back-link"><i class="fas fa-arrow-left"></i> Back to projects</a>
            <div class="case-meta">
${pills}
            </div>
            <h1 class="case-title">${d.pageTitle}</h1>
            <p class="case-summary">${d.summary}</p>
        </div>
    </section>

    <section class="case-section neo-page">
        <div class="container">
            <h2>The Problem</h2>
${paras(d.problem)}
        </div>
    </section>

    <section class="case-section neo-page">
        <div class="container">
            <h2>The Approach</h2>
${paras(d.approach)}
            <div class="case-tools">
${chips}
            </div>${d.figures || ''}
        </div>
    </section>

    <section class="case-section neo-page" style="border-bottom:none">
        <div class="container">
            <h2>Results</h2>
${paras(d.results)}
        </div>
    </section>

    <section class="neo-section neo-page">
        <div class="container" style="text-align:center">
            <h2 class="neo-section-title" style="font-size:28px">Have a similar problem to solve?</h2>
            <div style="margin-top:20px">
                <a href="https://cal.com/mostafa.yaghi" class="neo-btn" target="_blank" rel="noopener noreferrer">Book Free 30-Min Call</a>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="pixel-bg"></div>
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <div class="footer-logo">
                        <img src="../images/logo.png" alt="Qynzoo Logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <span class="logo-text">Qynzoo</span>
                    </div>
                    <p class="footer-description">AI automation, machine learning, and websites — built by Mostafa Yaghi. Based in the Netherlands — serving clients worldwide.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul class="footer-links">
                        <li><a href="../index.html#home">Home</a></li>
                        <li><a href="../index.html#projects">Projects</a></li>
                        <li><a href="../faq.html">FAQ</a></li>
                        <li><a href="../index.html#contact">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Legal</h4>
                    <ul class="footer-links">
                        <li><a href="../privacy-policy.html">Privacy Policy</a></li>
                        <li><a href="../terms-of-service.html">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2026 Qynzoo. All rights reserved. | V4.1.4</p>
                <div class="footer-bottom-links">
                    <a href="../privacy-policy.html">Privacy Policy</a>
                    <a href="../terms-of-service.html">Terms of Service</a>
                    <a href="../sitemap.html">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
    // card-nav uses relative asset paths; override to work from /case-studies/
    window.CARD_NAV_BASE = '../';
    </script>
    <script src="../js/card-nav.js?v=4.1" defer></script>
</body>
</html>
`;
}

const pages = [
  {
    slug: 'fugro',
    client: 'Fugro',
    pills: ['Machine Learning', 'Client: Fugro', 'Geotechnical / Infrastructure'],
    pageTitle: "Investigating the Potential of Machine Learning Methods to Predict Soil Variables for Dike's Macro Stability Analysis",
    cardTitle: 'Predicting Dike Stability Variables with Machine Learning',
    summary: "Applied Random Forest, Neural Networks, and Auto-Encoders to predict dike clay's dry unit weight and friction angle — replacing slow, expensive lab tests with a data-driven design-phase estimate.",
    metaDesc: "Case study: using Random Forest, Neural Networks, and Auto-Encoders at Fugro to predict dike clay dry unit weight and friction angle for macro-stability analysis, without waiting on triaxial and compaction tests.",
    ogDesc: "Random Forest, Neural Networks, and Auto-Encoders applied to predict dike clay soil variables for macro-stability analysis.",
    about: "Applied machine learning to predict soil variables for dike macro-stability analysis",
    problem: [
      "Designing a dike's macro-stability requires knowing the clay's dry unit weight and friction angle. Today, engineers get these from triaxial and compaction tests — both expensive, slow, and unavailable during the design phase. Until the tests are run, designers fall back on manual estimates based on clay/sand ratio and assumed consistency (weak, moderate, strong). This project asked: can machine learning make that design-phase estimate more precise, using only the data an engineer already has on hand?"
    ],
    approach: [
      "Using Dutch geotechnical data from Fugro's database, I trained Random Forest and Neural Network models across four scenarios reflecting different levels of design-phase knowledge: Atterberg limits, clay/sand/silt content, NEN 5014 triangular classification, and plasticity diagram category. Auto-encoders were tested for feature extraction. The goal was to find which combination of inputs and models best predicted dry unit weight and friction angle before any lab test is run."
    ],
    tools: ['Neural Networks', 'Random Forest', 'Auto-Encoders', 'Python'],
    results: [
      "Random Forest outperformed Neural Networks across scenarios, with the Atterberg-limits scenario producing the strongest predictions — particularly for dry unit weight. Combining this with water content estimates at three consistency indices (0.60 / 0.75 / 0.85) allowed unit weight to be predicted with low uncertainty, directly mirroring how engineers currently reason through the estimate — just with better accuracy.",
      "Friction angle could not be reliably predicted — not due to a modeling failure, but a data one: the available triaxial dataset was too small and inconsistent in quality to build any meaningful correlation. The models simply had nothing to learn from. The practical conclusion still stands: unit weight estimation can realistically skip compaction and triaxial testing in the design phase, cutting cost and time without sacrificing accuracy."
    ]
  },
  {
    slug: 'haskoning',
    client: 'Haskoning',
    pills: ['RAG Application', 'Client: Haskoning', 'AI Automation'],
    pageTitle: 'AI-Generated Infrastructure Risk Registers',
    cardTitle: 'AI-Generated Infrastructure Risk Registers',
    summary: "Built a retrieval-augmented generation (RAG) agent on n8n that turns a project description into a full risk register — cutting a 6-hour manual task down to 1 hour, review included.",
    metaDesc: "Case study: a retrieval-augmented generation (RAG) agent built on n8n for Haskoning that drafts full infrastructure risk registers from a project description, cutting a 6-hour manual task to about 1 hour.",
    ogDesc: "A RAG agent on n8n that turns a project description into a full infrastructure risk register — 6 hours down to 1.",
    about: "Retrieval-augmented generation agent producing infrastructure risk registers",
    problem: [
      "Every new infrastructure project starts with a blank risk register. The standard process — manually digging through old registers, copy-pasting relevant risks, then brainstorming new ones — took around 6 hours before a project manager could even start reviewing."
    ],
    approach: [
      "I built an AI agent on n8n with custom connections to a structured database of known infrastructure risks. Given a description of the new project, the agent retrieves relevant precedent risks and generates a draft risk register — causes, mitigations, and all — directly into an Excel file ready for a risk manager's review."
    ],
    tools: ['n8n', 'RAG', 'Automation', 'Excel Integration'],
    figures: `
            <div class="case-figure-stack">
                <figure class="case-figure is-wide">
                    <img src="../images/n8n-haskoning.png" alt="The n8n workflow powering the risk register agent, showing the retrieval and generation steps that produce a draft register." loading="lazy" decoding="async">
                    <figcaption>n8n workflow (backend of the app)</figcaption>
                </figure>
                <figure class="case-figure is-portrait">
                    <img src="../images/n8n-risk-lens-frontend.png" alt="The Risk Lens app interface, where a risk manager submits a project description and receives the generated risk register." loading="lazy" decoding="async">
                    <figcaption>Simple user interface (front end) of the app</figcaption>
                </figure>
            </div>`,
    results: [
      "What used to take 6 hours of manual drafting now takes about 1 hour, including human review. The agent doesn't replace the risk manager's judgment — it removes the blank-page problem and the repetitive copy-paste work that came before it, freeing reviewers to focus on judgment calls instead of data entry."
    ]
  },
  {
    slug: 'odido',
    client: 'Odido',
    pills: ['Business Automation', 'Client: Odido', 'Retail / Reporting'],
    pageTitle: 'Automated Retail Reporting, Nationwide',
    cardTitle: 'Automated Retail Reporting, Nationwide',
    summary: "Automated recurring retail performance reports across the Netherlands using Python, SQL, PowerBI, and ThoughtSpot — replacing manual, error-prone reporting with a consistent process that runs on schedule, every time.",
    metaDesc: "Case study: automating recurring nationwide retail performance reporting for Odido with Python, SQL, PowerBI, and ThoughtSpot — removing manual steps from data pull through final report.",
    ogDesc: "Recurring nationwide retail reporting automated end-to-end with Python, SQL, PowerBI, and ThoughtSpot.",
    about: "End-to-end automation of recurring nationwide retail performance reporting",
    problem: [
      "As one of the Netherlands' largest retail networks, Odido depends on detailed recurring reports pulled from multiple data sources to track performance against deadlines. Built manually, these reports were error-prone and caused delays whenever something went wrong."
    ],
    approach: [
      "I automated the full reporting pipeline using Python and SQL for data processing, with PowerBI and ThoughtSpot for visualization and delivery — removing manual steps from data pull through final report."
    ],
    tools: ['Python', 'SQL', 'PowerBI', 'ThoughtSpot'],
    results: [
      "Reports are now delivered on schedule with consistent output, eliminating the manual-entry errors and delays that previously required firefighting after the fact."
    ]
  },
  {
    slug: 'waterprof',
    client: 'Waterprof',
    pills: ['Cloud Automation', 'Client: Waterprof', 'Azure / Content Automation'],
    pageTitle: 'Secure LinkedIn Content Automation on Azure',
    cardTitle: 'Secure LinkedIn Content Automation on Azure',
    summary: "Built a secure AI agent on Azure — inside Waterprof's own Microsoft environment — that drafts on-brand LinkedIn posts from project documents, keeping data in-house and humans in the review loop.",
    metaDesc: "Case study: a secure AI agent built on Azure inside Waterprof's own Microsoft environment that drafts on-brand LinkedIn posts from project documents, with human review before publishing.",
    ogDesc: "A secure AI agent on Azure that drafts on-brand LinkedIn posts from project documents, with data staying in-house.",
    about: "Secure Azure-hosted AI agent drafting on-brand LinkedIn content from project documents",
    problem: [
      "Waterprof's employees were manually writing LinkedIn posts, a slow process requiring many rounds of edits to get right — and one that had to stay inside Waterprof's own secure Microsoft/Azure environment, since data handling was a hard requirement."
    ],
    approach: [
      "I built an AI agent on Azure infrastructure — matching Waterprof's existing Microsoft environment — that pulls project documents on request and drafts LinkedIn posts matching Waterprof's established voice, with a human always reviewing before publishing."
    ],
    tools: ['Azure', 'Python'],
    results: [
      "Posts no longer start from a blank page. Drafting time dropped from a multi-iteration manual process to a single AI-generated draft plus human review, with all data staying inside Waterprof's own secured infrastructure throughout."
    ]
  },
  {
    slug: 'podcast-tuhaf-dashboard',
    client: 'Podcast Tuhaf',
    pills: ['AI Automation', 'Client: Podcast Tuhaf (Personal Project)', 'Media / Content Strategy'],
    pageTitle: 'AI-Powered Social Media Growth Dashboard',
    cardTitle: 'AI-Powered Social Media Growth Dashboard',
    summary: "Built a social media performance dashboard for Podcast Tuhaf, paired with an AI strategist that reads timing, reach, and episode content to tell us exactly which clips to publish — helping a niche architecture podcast reach 50,000+ viewers on Facebook Shorts and Reels.",
    metaDesc: "Case study: an AI-connected social media dashboard for Podcast Tuhaf that analyzes posting timing, reach, and episode content to identify the strongest clips for growth — reaching 50,000+ viewers in a niche category.",
    ogDesc: "An AI strategist layered on a social media dashboard, helping a niche podcast reach 50,000+ viewers on Facebook Shorts and Reels.",
    about: "AI-connected social media dashboard and content strategist for podcast growth",
    problem: [
      "As one of my side projects, Podcast Tuhaf needed visibility into how our posts were performing across platforms — that part any dashboard can do. What we actually needed was something that understood who we were trying to reach, and could help us grow our audience for YouTube videos, Shorts, and Reels across different platforms, not just report on them."
    ],
    approach: [
      "I built a social media dashboard connected to every platform we post on, paired with an AI strategist layered on top. The AI analyzed posting timing and reach across our content, and also read the substance of each episode — surfacing which clips had strong enough hooks to pull new listeners in, so we knew exactly what to cut for social before we published."
    ],
    tools: ['AI Strategy', 'Dashboards', 'Content Analysis', 'Social Automation'],
    figures: `
            <div class="case-figure-stack">
                <figure class="case-figure is-wide">
                    <img src="../images/podcast-dashboard-overview.png" alt="The Podcast Tuhaf Command Centre overview — follower counts, reach, watch time, and platform performance at a glance." loading="lazy" decoding="async">
                    <figcaption>Command Centre overview — every platform's key numbers in one view</figcaption>
                </figure>
                <figure class="case-figure is-wide">
                    <img src="../images/podcast-dashboard-growth.png" alt="Follower and subscriber growth chart across the full campaign, tracking Facebook and YouTube side by side." loading="lazy" decoding="async">
                    <figcaption>Full growth history — Facebook followers vs. YouTube subscribers over time</figcaption>
                </figure>
                <figure class="case-figure is-wide">
                    <img src="../images/podcast-dashboard-insights.png" alt="AI-generated strategist insights, flagging which posts to double down on and recommending specific next actions." loading="lazy" decoding="async">
                    <figcaption>AI strategist insights — what's working, why, and the exact next action to take</figcaption>
                </figure>
            </div>`,
    results: [
      "The results exceeded expectations. Podcast Tuhaf covers architecture — a genuinely small niche — and we still reached 50,000+ viewers on Facebook Shorts and Reels, a scale that wouldn't have been realistic without a dedicated social media strategist. The lesson: knowing precisely what to build and narrowing the right questions down got better results than a generic tool ever could. Need something similar for your own project? Let's talk."
    ]
  }
];

const outDir = path.join(__dirname, '..', 'case-studies');
for (const d of pages) {
  fs.writeFileSync(path.join(outDir, d.slug + '.html'), page(d), 'utf8');
  console.log('wrote case-studies/' + d.slug + '.html');
}
