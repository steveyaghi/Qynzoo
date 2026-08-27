const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  BorderStyle,
  Table,
  TableRow,
  TableCell,
  WidthType,
  ShadingType,
  Numbering,
  LevelFormat,
  convertInchesToTwip,
  PageOrientation,
} = require("docx");
const fs = require("fs");
const path = require("path");

// ── helpers ──────────────────────────────────────────────────────────────────

const MARGIN = convertInchesToTwip(1); // 1 inch margins

function heading1(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 240, after: 120 },
    run: { bold: true, color: "1E2A3A" },
  });
}

function heading2(text) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 480, after: 120 },
    run: { bold: true, color: "1E2A3A" },
  });
}

function subtitle(text) {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        color: "44BBA4",
        size: 24,
        italics: true,
      }),
    ],
    alignment: AlignmentType.LEFT,
    spacing: { before: 80, after: 320 },
  });
}

function boldPara(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22 })],
    spacing: { before: 100, after: 60 },
  });
}

function bodyPara(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 22 })],
    spacing: { before: 60, after: 60 },
  });
}

function hashtagPara(text) {
  return new Paragraph({
    children: [new TextRun({ text, italics: true, color: "2E86AB", size: 20 })],
    spacing: { before: 100, after: 80 },
  });
}

function divider() {
  return new Paragraph({
    border: {
      bottom: {
        color: "44BBA4",
        space: 1,
        style: BorderStyle.SINGLE,
        size: 6,
      },
    },
    spacing: { before: 200, after: 200 },
  });
}

function bulletList(items) {
  return items.map(
    (item) =>
      new Paragraph({
        children: [new TextRun({ text: item, size: 22 })],
        numbering: {
          reference: "bullet-list",
          level: 0,
        },
        spacing: { before: 60, after: 60 },
      })
  );
}

// Numbered list items
function numberedList(items) {
  return items.map(
    (item) =>
      new Paragraph({
        children: [new TextRun({ text: item, size: 22 })],
        numbering: {
          reference: "numbered-list",
          level: 0,
        },
        spacing: { before: 60, after: 60 },
      })
  );
}

// ── Numbering definitions ─────────────────────────────────────────────────────

const numberingConfig = {
  config: [
    {
      reference: "bullet-list",
      levels: [
        {
          level: 0,
          format: LevelFormat.BULLET,
          text: "\u2022",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
            },
          },
        },
      ],
    },
    {
      reference: "numbered-list",
      levels: [
        {
          level: 0,
          format: LevelFormat.DECIMAL,
          text: "%1.",
          alignment: AlignmentType.LEFT,
          style: {
            paragraph: {
              indent: { left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25) },
            },
          },
        },
      ],
    },
  ],
};

// ── TABLE helper ──────────────────────────────────────────────────────────────

function makeHeaderCell(text) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text, bold: true, color: "FFFFFF", size: 20 })],
        alignment: AlignmentType.CENTER,
      }),
    ],
    shading: { type: ShadingType.CLEAR, color: "auto", fill: "1E2A3A" },
    width: { size: 1638, type: WidthType.DXA }, // ~5 equal cols across ~8190 DXA text width
  });
}

function makeCell(text, fill) {
  return new TableCell({
    children: [
      new Paragraph({
        children: [new TextRun({ text, size: 20 })],
        alignment: AlignmentType.CENTER,
      }),
    ],
    shading: { type: ShadingType.CLEAR, color: "auto", fill: fill || "FFFFFF" },
    width: { size: 1638, type: WidthType.DXA },
  });
}

function scheduleTable(rows) {
  const header = new TableRow({
    children: [
      makeHeaderCell("Week"),
      makeHeaderCell("Day"),
      makeHeaderCell("Time"),
      makeHeaderCell("Post #"),
      makeHeaderCell("Topic"),
    ],
    tableHeader: true,
  });

  const dataRows = rows.map((r, i) => {
    const fill = i % 2 === 0 ? "EAF8F6" : "FFFFFF";
    return new TableRow({
      children: r.map((cell) => makeCell(cell, fill)),
    });
  });

  return new Table({
    rows: [header, ...dataRows],
    width: { size: 8190, type: WidthType.DXA },
    columnWidths: [1638, 1638, 1638, 1638, 1638],
  });
}

// ── POST DATA ─────────────────────────────────────────────────────────────────

const posts = [
  {
    num: 1,
    title: "Industry Insight",
    schedule: "Monday, 9:00 AM",
    body: [
      "Most businesses don't have a productivity problem.",
      "They have a repetition problem.",
      "",
      "Every day, your team copies data between tools.",
      "Sends the same follow-up emails.",
      "Manually updates spreadsheets that should update themselves.",
      "",
      "That's not work. That's friction.",
      "",
      "AI automation removes the friction — so your team can focus on the work that actually grows your business.",
      "",
      "At Qynzoo, we build custom automations using Make and n8n that run silently in the background, 24/7.",
      "",
      "What repetitive task is costing your team the most time this week?",
    ],
    hashtags:
      "#Automation #AIAutomation #WorkflowAutomation #Productivity #BusinessEfficiency #Qynzoo #MakeAutomation #n8n #SME #DigitalTransformation",
  },
  {
    num: 2,
    title: "Make vs n8n — Educational",
    schedule: "Wednesday, 10:00 AM",
    body: [
      "Make vs n8n — which one should your business use?",
      "",
      "Here's the honest breakdown:",
      "",
      "Make is better if:",
      "- You want a visual, beginner-friendly interface",
      "- You're connecting popular SaaS tools",
      "- You need to get started fast",
      "",
      "n8n is better if:",
      "- You need custom logic or code",
      "- You want to self-host for data privacy",
      "- You're building complex, multi-step workflows",
      "",
      "Both are powerful. The right choice depends on your business needs — not hype.",
      "",
      "We've built workflows on both. Happy to help you decide.",
      "Drop a comment or send us a message.",
    ],
    hashtags:
      "#Make #n8n #WorkflowAutomation #Automation #NoCode #LowCode #BusinessTools #Qynzoo #SaaS #Integration",
  },
  {
    num: 3,
    title: "Client Story",
    schedule: "Tuesday, 8:30 AM",
    body: [
      "A client came to us spending 3 hours every Monday manually sending onboarding emails.",
      "",
      "One automation later — that's now 0 minutes.",
      "",
      "The workflow:",
      "1. New client signs contract — triggers automatically",
      "2. Personalised welcome email sent instantly",
      "3. Task created in their project tool",
      "4. CRM updated with client status",
      "5. Team notified in Slack",
      "",
      "Total build time: 4 hours.",
      "Time saved every week: 3 hours.",
      "ROI: within the first month.",
      "",
      "This is what automation looks like in practice.",
      "Not science fiction. Just smart systems.",
    ],
    hashtags:
      "#Automation #WorkflowAutomation #CRM #Onboarding #BusinessEfficiency #Qynzoo #MakeAutomation #n8n #SmallBusiness #ROI",
  },
  {
    num: 4,
    title: "Hot Take / Contrarian",
    schedule: "Thursday, 9:00 AM",
    body: [
      "Unpopular opinion: hiring more people is not always the answer.",
      "",
      "Before your next hire, ask yourself:",
      "- How many hours per week does your team spend on manual tasks?",
      "- Could a workflow handle that instead?",
      "",
      "A well-built automation costs a fraction of a salary.",
      "It doesn't take holidays. It doesn't make copy-paste errors.",
      "And it scales instantly.",
      "",
      "We're not saying don't hire people.",
      "We're saying: let automation handle the repetitive work, so the people you hire focus on high-value tasks.",
      "",
      "That's how lean teams outperform large ones.",
    ],
    hashtags:
      "#Automation #BusinessStrategy #Productivity #AIAutomation #FutureOfWork #Qynzoo #WorkflowAutomation #SmallBusiness #Leadership #Efficiency",
  },
  {
    num: 5,
    title: "5 Workflows Every SME Should Automate",
    schedule: "Friday, 10:00 AM",
    body: [
      "5 workflows every SME should have automated by now:",
      "",
      "1. Lead capture — CRM entry (no more manual data entry)",
      "2. Invoice sent — follow-up reminder (stop chasing payments)",
      "3. New booking — confirmation + onboarding sequence",
      "4. Support ticket — team notification + priority tag",
      "5. Monthly report — auto-generated and emailed to stakeholders",
      "",
      "If you're still doing any of these manually, you're leaving time and money on the table.",
      "",
      "Which one would make the biggest difference for your business?",
    ],
    hashtags:
      "#Automation #SME #WorkflowAutomation #CRM #BusinessEfficiency #Qynzoo #MakeAutomation #n8n #Productivity #DigitalTransformation",
  },
  {
    num: 6,
    title: "AI Agents",
    schedule: "Monday, 11:00 AM",
    body: [
      "AI agents are no longer a 'future' concept.",
      "",
      "They're running in businesses right now — handling:",
      "- Customer FAQs without human involvement",
      "- Lead qualification before sales calls",
      "- Content drafts from a single prompt",
      "- Data analysis and weekly summaries",
      "",
      "The difference between businesses that thrive in 2026 and those that struggle?",
      "",
      "The ones thriving have systems that work while they sleep.",
      "",
      "At Qynzoo, we help you build those systems.",
      "Not with off-the-shelf tools that almost fit — but with custom solutions built around how you work.",
    ],
    hashtags:
      "#AIAgents #ArtificialIntelligence #Automation #BusinessAutomation #Qynzoo #FutureOfWork #AITools #WorkflowAutomation #DigitalTransformation #SME",
  },
  {
    num: 7,
    title: "Social Proof / Results",
    schedule: "Wednesday, 9:00 AM",
    body: [
      "What does a 40% reduction in admin time look like?",
      "",
      "For one of our clients, it looked like this:",
      "",
      "Before:",
      "- 2 staff members spending half their day on data entry",
      "- Errors from manual copy-paste between systems",
      "- Delayed reporting every end of month",
      "",
      "After automation:",
      "- Data flows automatically between all tools",
      "- Zero manual entry errors",
      "- Reports generated and delivered automatically",
      "",
      "They didn't change their team. They changed their systems.",
      "",
      "That's the Qynzoo approach.",
    ],
    hashtags:
      "#Automation #BusinessResults #WorkflowAutomation #DataIntegration #Qynzoo #Efficiency #SME #MakeAutomation #n8n #DigitalTransformation",
  },
  {
    num: 8,
    title: "Thought Leadership",
    schedule: "Thursday, 8:00 AM",
    body: [
      "The businesses that will lead their industries in 5 years are already automating today.",
      "",
      "Not because automation is trendy.",
      "Because compounding efficiency is real.",
      "",
      "Every hour saved this week — reinvested in growth next week.",
      "Every manual process eliminated — one less bottleneck at scale.",
      "Every AI agent deployed — one more task your team never touches again.",
      "",
      "The gap between automated and non-automated businesses is growing every quarter.",
      "",
      "Where does your business stand?",
    ],
    hashtags:
      "#Automation #ThoughtLeadership #AIAutomation #BusinessGrowth #FutureOfWork #Qynzoo #DigitalTransformation #AIAgents #Productivity #Leadership",
  },
  {
    num: 9,
    title: "CRM & Integrations",
    schedule: "Tuesday, 10:30 AM",
    body: [
      "Your CRM is only as good as the data inside it.",
      "",
      "Most businesses struggle with:",
      "- Leads not entered in time (or at all)",
      "- Deal stages updated inconsistently",
      "- No follow-up system after the first contact",
      "",
      "The fix isn't discipline. It's automation.",
      "",
      "With a proper integration setup:",
      "- Every form submission — instant CRM entry",
      "- Every call logged — task created for follow-up",
      "- Every deal moved — team notified automatically",
      "",
      "Your CRM becomes a live system, not a graveyard of stale data.",
      "",
      "We specialise in CRM & API integrations that keep your pipeline clean and your team focused.",
    ],
    hashtags:
      "#CRM #Automation #SalesAutomation #APIIntegration #Qynzoo #WorkflowAutomation #n8n #MakeAutomation #BusinessEfficiency #SalesOps",
  },
  {
    num: 10,
    title: "Soft CTA / Awareness",
    schedule: "Friday, 9:00 AM",
    body: [
      "If your business runs on manual processes, you're not behind — you're just one conversation away from changing that.",
      "",
      "At Qynzoo, we:",
      "- Audit your current workflows",
      "- Identify what can be automated",
      "- Build and deploy the solution",
      "",
      "No jargon. No bloated software licences.",
      "Just systems that work for your business.",
      "",
      "Based in Belgium. Working with SMEs across Europe.",
      "",
      "Curious what automation could look like for your team?",
      "Send us a message — the first consultation is free.",
    ],
    hashtags:
      "#Automation #Belgium #AIAutomation #WorkflowAutomation #SME #Qynzoo #BusinessEfficiency #DigitalTransformation #FreeConsultation #MakeAutomation",
  },
];

// ── Build LinkedIn Document ───────────────────────────────────────────────────

function buildLinkedInDoc() {
  const children = [];

  // Title block
  children.push(heading1("Qynzoo \u2014 LinkedIn Content Calendar"));
  children.push(subtitle("10 Scheduled Posts with Hashtags"));
  children.push(divider());

  // Each post
  posts.forEach((post) => {
    children.push(heading2(`Post ${post.num} \u2014 ${post.title}`));
    children.push(boldPara(`\uD83D\uDCC5 ${post.schedule}`));

    post.body.forEach((line) => {
      children.push(bodyPara(line));
    });

    children.push(hashtagPara(post.hashtags));
    children.push(divider());
  });

  // Posting Schedule section
  children.push(heading2("Posting Schedule"));

  const scheduleRows = [
    ["Week 1", "Monday", "9:00 AM", "Post 1", "Industry Insight"],
    ["Week 1", "Wednesday", "10:00 AM", "Post 2", "Make vs n8n"],
    ["Week 1", "Friday", "9:00 AM", "Post 10", "Soft CTA"],
    ["Week 2", "Tuesday", "8:30 AM", "Post 3", "Client Story"],
    ["Week 2", "Thursday", "9:00 AM", "Post 4", "Hot Take"],
    ["Week 3", "Monday", "11:00 AM", "Post 6", "AI Agents"],
    ["Week 3", "Wednesday", "9:00 AM", "Post 7", "Social Proof"],
    ["Week 3", "Friday", "10:00 AM", "Post 5", "5 Workflows"],
    ["Week 4", "Tuesday", "10:30 AM", "Post 9", "CRM & Integrations"],
    ["Week 4", "Thursday", "8:00 AM", "Post 8", "Thought Leadership"],
  ];

  children.push(scheduleTable(scheduleRows));
  children.push(new Paragraph({ text: "", spacing: { before: 200 } }));

  // Pro Tips
  children.push(heading2("Pro Tips"));
  children.push(
    ...bulletList([
      "No external links in post body \u2014 add website link in first comment",
      "Reply to every comment within the first hour to boost algorithm",
      "Post 3x/week for consistent growth (Mon + Wed + Fri recommended)",
    ])
  );

  return new Document({
    numbering: numberingConfig,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: MARGIN,
              right: MARGIN,
              bottom: MARGIN,
              left: MARGIN,
            },
          },
        },
        children,
      },
    ],
  });
}

// ── IMAGE PROMPT DATA ─────────────────────────────────────────────────────────

const imagePrompts = [
  {
    num: 1,
    topic: "Repetition / Friction / Automation",
    matchingPost: "Post 1 \u2014 Industry Insight (Monday 9:00 AM)",
    prompt:
      "A split-screen illustration showing left side: a stressed office worker drowning in sticky notes, spreadsheets, and repetitive tasks, overwhelmed expression \u2014 right side: the same person relaxed and smiling at a clean desk while glowing teal workflow lines connect floating app icons automatically. Dark navy background, teal and orange accent colors, futuristic but approachable style, 3D render, LinkedIn landscape format 1200x627px.",
  },
  {
    num: 2,
    topic: "Make vs n8n Comparison",
    matchingPost: "Post 2 \u2014 Educational (Wednesday 10:00 AM)",
    prompt:
      "A sleek dark-background comparison graphic showing two glowing platforms facing each other \u2014 left side shows the Make.com logo environment with colorful visual nodes, right side shows n8n's darker code-friendly interface. Connected by a glowing teal bridge in the center. Professional tech aesthetic, dark navy background, teal and orange highlights, flat design with depth, LinkedIn landscape format 1200x627px.",
  },
  {
    num: 3,
    topic: "Workflow Automation Chain",
    matchingPost: "Post 3 \u2014 Client Story (Tuesday 8:30 AM)",
    prompt:
      "A glowing workflow chain visualized as interconnected nodes floating in dark space \u2014 icons representing contract signing, email, project tool, CRM, and Slack connected by bright teal lines with animated arrow indicators. Clean, minimal, futuristic 3D render. Dark navy background, teal green and orange glow effects, professional business automation aesthetic, LinkedIn square format 1080x1080px.",
  },
  {
    num: 4,
    topic: "Lean Team vs Large Team",
    matchingPost: "Post 4 \u2014 Hot Take (Thursday 9:00 AM)",
    prompt:
      "A dramatic visual contrast \u2014 left: a small team of 3 people surrounded by glowing automated workflow lines achieving massive output \u2014 right: a large crowded office of 20 people doing repetitive manual work. Dark navy background, teal lighting on the small team side, muted gray on the large team side, cinematic 3D render style, LinkedIn landscape format 1200x627px.",
  },
  {
    num: 5,
    topic: "5 Automated Workflows",
    matchingPost: "Post 5 \u2014 Educational Tips (Friday 10:00 AM)",
    prompt:
      "A clean infographic-style visual showing 5 glowing workflow icons arranged in a circular pattern on a dark navy background \u2014 each icon represents: lead capture, invoice, booking, support ticket, monthly report. Connected by subtle teal lines to a central automation hub. Flat design with neon glow accents in teal and orange, professional and minimal, LinkedIn square format 1080x1080px.",
  },
  {
    num: 6,
    topic: "AI Agents Working",
    matchingPost: "Post 6 \u2014 AI Agents (Monday 11:00 AM)",
    prompt:
      "A futuristic visualization of AI agents as glowing humanoid figures made of teal light, each handling a different task \u2014 one responding to chat, one analyzing data charts, one generating content \u2014 all working simultaneously in a dark digital workspace. Cinematic lighting, dark navy and black background, teal and orange glow, high-end 3D render, LinkedIn landscape format 1200x627px.",
  },
  {
    num: 7,
    topic: "Before and After Results",
    matchingPost: "Post 7 \u2014 Social Proof (Wednesday 9:00 AM)",
    prompt:
      "A bold before-and-after visual split \u2014 left side labeled BEFORE shows red warning icons, cluttered data, stressed team icons in muted gray tones \u2014 right side labeled AFTER shows green checkmarks, clean data flows, happy team icons in bright teal. Dark navy background, strong contrast between the two sides, clean modern design, LinkedIn landscape format 1200x627px.",
  },
  {
    num: 8,
    topic: "Compounding Efficiency / Growth",
    matchingPost: "Post 8 \u2014 Thought Leadership (Thursday 8:00 AM)",
    prompt:
      "A dramatic upward growth visualization \u2014 a glowing teal arrow shooting upward through a dark space, with small automation and AI icons attached to it like fuel boosters. The arrow leaves a trail of orange sparks. In the background, silhouettes of competing businesses falling behind. Cinematic 3D render, dark navy background, teal and orange color scheme, LinkedIn landscape format 1200x627px.",
  },
  {
    num: 9,
    topic: "CRM Data Flow",
    matchingPost: "Post 9 \u2014 CRM & Integrations (Tuesday 10:30 AM)",
    prompt:
      "A clean visualization of a CRM pipeline \u2014 glowing teal data points flowing from a web form icon through API connection lines into a CRM dashboard, then branching out to task, notification, and report icons. All floating on a dark navy background with subtle grid lines. Professional, futuristic, 3D render with flat design elements, teal and orange accent colors, LinkedIn square format 1080x1080px.",
  },
  {
    num: 10,
    topic: "Consultation / Invitation",
    matchingPost: "Post 10 \u2014 Soft CTA (Friday 9:00 AM)",
    prompt:
      "A warm yet professional scene \u2014 a glowing teal door slightly open with a welcoming light inside, surrounded by automation and AI icons floating gently around it. Text space at bottom. Dark navy background, teal and warm orange glow from the doorway, inviting and forward-thinking atmosphere, 3D render with cinematic lighting, LinkedIn landscape format 1200x627px.",
  },
];

// ── Build Image Prompts Document ──────────────────────────────────────────────

function buildImagePromptsDoc() {
  const children = [];

  children.push(heading1("Qynzoo \u2014 AI Image Generation Prompts"));
  children.push(
    subtitle(
      "10 LinkedIn Post Visual Prompts (for Google ImageFX / Gemini / Midjourney / DALL-E 3)"
    )
  );
  children.push(divider());

  imagePrompts.forEach((item) => {
    children.push(heading2(`Post ${item.num} \u2014 ${item.topic}`));

    children.push(
      new Paragraph({
        children: [
          new TextRun({ text: "Matching Post:  ", bold: true, size: 22 }),
          new TextRun({ text: item.matchingPost, size: 22 }),
        ],
        spacing: { before: 80, after: 60 },
      })
    );

    children.push(
      new Paragraph({
        children: [new TextRun({ text: "Image Prompt:", bold: true, size: 22 })],
        spacing: { before: 80, after: 40 },
      })
    );

    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: item.prompt,
            size: 22,
            color: "2E2E2E",
          }),
        ],
        spacing: { before: 40, after: 80 },
        indent: { left: convertInchesToTwip(0.25) },
        border: {
          left: { color: "44BBA4", style: BorderStyle.SINGLE, size: 8, space: 8 },
        },
      })
    );

    children.push(divider());
  });

  // How To Use section
  children.push(heading2("How To Use These Prompts"));
  children.push(
    ...bulletList([
      "Go to Google ImageFX (imagefx.google.com) \u2014 it's free and produces high quality results",
      "Alternatively use: Gemini, Midjourney, or DALL-E 3 (via ChatGPT)",
      "Copy and paste the prompt for the matching post",
      "Generate 3-4 variations and pick the best one",
      "Crop to 1200x627px for LinkedIn landscape or 1080x1080px for square posts",
      "Add the Qynzoo logo in a corner before posting",
      "Tip: You can ask the AI image tool to 'make it darker' or 'add more teal' to match the brand better",
    ])
  );

  return new Document({
    numbering: numberingConfig,
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: MARGIN,
              right: MARGIN,
              bottom: MARGIN,
              left: MARGIN,
            },
          },
        },
        children,
      },
    ],
  });
}

// ── Write files ───────────────────────────────────────────────────────────────

const OUTPUT_DIR = path.join(__dirname, "..", "marketing");

async function main() {
  console.log("Generating Qynzoo_LinkedIn_Posts.docx ...");
  const linkedInDoc = buildLinkedInDoc();
  const linkedInBuffer = await Packer.toBuffer(linkedInDoc);
  const linkedInPath = path.join(OUTPUT_DIR, "Qynzoo_LinkedIn_Posts.docx");
  fs.writeFileSync(linkedInPath, linkedInBuffer);
  console.log("  Saved:", linkedInPath);
  console.log("  Size:", (linkedInBuffer.length / 1024).toFixed(1), "KB");

  console.log("\nGenerating Qynzoo_Image_Prompts.docx ...");
  const imageDoc = buildImagePromptsDoc();
  const imageBuffer = await Packer.toBuffer(imageDoc);
  const imagePath = path.join(OUTPUT_DIR, "Qynzoo_Image_Prompts.docx");
  fs.writeFileSync(imagePath, imageBuffer);
  console.log("  Saved:", imagePath);
  console.log("  Size:", (imageBuffer.length / 1024).toFixed(1), "KB");

  console.log("\nDone. Both files created successfully.");
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
