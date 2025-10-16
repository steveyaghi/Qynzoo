import json

# Read the Lighthouse report
with open(r'c:\Users\mosty\Downloads\localhost_8000-mobile.json', 'rb') as f:
    data = json.loads(f.read().decode('utf-8', errors='ignore'))

# Extract scores
cats = data['categories']
print('=== LIGHTHOUSE SCORES (Mobile) ===')
print(f'Performance: {cats["performance"]["score"]*100:.0f}/100')
print(f'Accessibility: {cats["accessibility"]["score"]*100:.0f}/100')
print(f'Best Practices: {cats["best-practices"]["score"]*100:.0f}/100')
print(f'SEO: {cats["seo"]["score"]*100:.0f}/100')

# Core Web Vitals
a = data['audits']
print('\n=== CORE WEB VITALS ===')
print(f'First Contentful Paint: {a["first-contentful-paint"]["displayValue"]}')
print(f'Largest Contentful Paint: {a["largest-contentful-paint"]["displayValue"]}')
print(f'Total Blocking Time: {a["total-blocking-time"]["displayValue"]}')
print(f'Cumulative Layout Shift: {a["cumulative-layout-shift"]["displayValue"]}')
print(f'Speed Index: {a["speed-index"]["displayValue"]}')

# Find opportunities and diagnostics
print('\n=== TOP OPPORTUNITIES ===')
opportunities = []
for key, audit in a.items():
    if audit.get('score') is not None and audit.get('score') < 0.9:
        if 'overallSavingsMs' in audit.get('details', {}):
            opportunities.append({
                'title': audit['title'],
                'savings': audit['details']['overallSavingsMs'],
                'display': audit.get('displayValue', '')
            })

opportunities.sort(key=lambda x: x['savings'], reverse=True)
for opp in opportunities[:10]:
    print(f"- {opp['title']}: {opp['display']}")

# Find failing audits
print('\n=== FAILING AUDITS ===')
failing = []
for key, audit in a.items():
    score = audit.get('score')
    if score is not None and score < 1 and audit.get('scoreDisplayMode') == 'binary':
        failing.append(audit['title'])

for f in failing[:15]:
    print(f"- {f}")

# Accessibility issues
print('\n=== ACCESSIBILITY ISSUES ===')
acc_issues = []
for key, audit in a.items():
    if key.startswith('aria-') or key.startswith('color-') or key in ['label', 'link-name', 'image-alt']:
        if audit.get('score') is not None and audit.get('score') < 1:
            acc_issues.append(audit['title'])

for issue in acc_issues[:10]:
    print(f"- {issue}")
