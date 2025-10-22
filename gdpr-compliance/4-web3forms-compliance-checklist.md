# Web3Forms GDPR Compliance Review Checklist
**Qynzoo Internal Documentation**
**Version**: 1.0
**Date**: October 20, 2025
**Priority**: HIGH (URGENT)
**Deadline**: Within 1 week

---

## Overview

**Purpose**: Verify that Web3Forms (our contact form processor) is GDPR-compliant and has appropriate safeguards in place.

**Why This Matters**:
- Web3Forms processes personal data from our contact forms
- GDPR Article 28 requires Data Processing Agreements with all third-party processors
- We are responsible for ensuring our processors are GDPR-compliant
- Non-compliance could result in fines and legal liability

**Third-Party Processor**: Web3Forms
- Website: https://web3forms.com
- Service: Contact form email delivery
- Data Processed: Name, email, phone, message, service interest
- Data Location: United States (requires appropriate safeguards)

---

## Checklist Summary

Use this quick reference to track progress:

- [ ] **Step 1**: Review Web3Forms Privacy Policy
- [ ] **Step 2**: Review Web3Forms Terms of Service
- [ ] **Step 3**: Request Data Processing Agreement (DPA)
- [ ] **Step 4**: Verify Data Location and Transfers
- [ ] **Step 5**: Check Data Retention Policies
- [ ] **Step 6**: Verify Data Deletion Capabilities
- [ ] **Step 7**: Configure Dashboard Security Settings
- [ ] **Step 8**: Enable Spam Protection
- [ ] **Step 9**: Document Findings
- [ ] **Step 10**: Update Privacy Policy

---

## Step 1: Review Web3Forms Privacy Policy

### Actions:
1. Visit: https://web3forms.com/privacy
2. Read the entire privacy policy
3. Answer the questions below
4. Save a PDF copy for records (File → Print → Save as PDF)

### Questions to Answer:

| Question | Answer | Notes |
|----------|--------|-------|
| **Does Web3Forms explicitly state GDPR compliance?** | ☐ Yes ☐ No | Look for "GDPR", "General Data Protection Regulation", or "EU compliance" |
| **What data do they collect?** | | List all data types mentioned |
| **How long do they retain data?** | | Note specific retention periods |
| **Where is data stored? (USA/EU)** | | Critical for international transfers |
| **Do they use sub-processors?** | ☐ Yes ☐ No | If yes, list them |
| **Is there a DPA mentioned?** | ☐ Yes ☐ No | Link or reference number |
| **Do they mention SCCs (Standard Contractual Clauses)?** | ☐ Yes ☐ No | Required for EU-US transfers |
| **Is there a data deletion process?** | ☐ Yes ☐ No | How to request deletion |
| **Is there encryption in transit (HTTPS/TLS)?** | ☐ Yes ☐ No | Security measure |
| **Is there encryption at rest?** | ☐ Yes ☐ No | Security measure |

### Red Flags 🚩:
- No mention of GDPR or EU compliance
- No clear retention policy
- No DPA available
- Data stored without encryption
- No deletion process
- Vague or unclear privacy terms

### Action Required:
- [ ] Save PDF copy to: `gdpr-compliance/web3forms-docs/privacy-policy-[date].pdf`
- [ ] Document answers in table above
- [ ] Flag any red flags for follow-up

---

## Step 2: Review Web3Forms Terms of Service

### Actions:
1. Visit: https://web3forms.com/terms
2. Read the entire terms of service
3. Answer the questions below
4. Save a PDF copy for records

### Questions to Answer:

| Question | Answer | Notes |
|----------|--------|-------|
| **Are there data processing clauses?** | ☐ Yes ☐ No | Article 28 requirements |
| **What are their security obligations?** | | Note specific commitments |
| **Is there a data breach notification clause?** | ☐ Yes ☐ No | Must notify within 72 hours |
| **Are there liability limitations?** | | Understand liability caps |
| **What is the contract termination process?** | | How to end service |
| **Is data deletion guaranteed upon termination?** | ☐ Yes ☐ No | Critical for offboarding |
| **Which jurisdiction/law governs the agreement?** | | USA? EU? Netherlands? |
| **Are there any clauses that conflict with GDPR?** | ☐ Yes ☐ No | If yes, document conflicts |

### Action Required:
- [ ] Save PDF copy to: `gdpr-compliance/web3forms-docs/terms-of-service-[date].pdf`
- [ ] Document answers in table above
- [ ] Note any concerning clauses

---

## Step 3: Request Data Processing Agreement (DPA)

### What is a DPA?
A Data Processing Agreement is a **legal contract** required by GDPR Article 28 between:
- **Data Controller** (Qynzoo - that's us)
- **Data Processor** (Web3Forms)

It defines:
- What data is processed
- How data is processed
- Security measures
- Data retention and deletion
- Breach notification procedures
- Sub-processor usage

### Is a DPA Required?
✅ **YES** - Web3Forms is a data processor under GDPR because they process personal data on our behalf.

### How to Request a DPA:

#### Email Template to Send:

```
To: support@web3forms.com (or legal/privacy contact)
Subject: Data Processing Agreement (DPA) Request - GDPR Compliance

Dear Web3Forms Team,

We are a client of Web3Forms (Account: [Your account email]) and are conducting a GDPR compliance review.

As Web3Forms processes personal data on our behalf through contact form submissions, we require a Data Processing Agreement (DPA) as mandated by GDPR Article 28.

Could you please provide:

1. Your standard Data Processing Agreement (DPA)
2. Confirmation of the following:
   - Data storage location (USA/EU)
   - Use of Standard Contractual Clauses (SCCs) for EU-US transfers
   - Data retention period for form submissions
   - Data deletion procedures and timelines
   - Sub-processors used (if any)
   - Security measures and certifications (SOC 2, ISO 27001, etc.)

We need this documentation to update our Privacy Policy and ensure full GDPR compliance.

Please provide this information by [Date + 7 days].

Thank you for your assistance.

Best regards,
[Your Name]
Qynzoo
Email: mostyaghi@outlook.com / bader.atem@qynzoo.com
Website: https://qynzoo.com
```

### Action Required:
- [ ] Send DPA request email to Web3Forms support
- [ ] Set calendar reminder to follow up in 7 days
- [ ] Save response when received
- [ ] Review DPA thoroughly (see Step 4)

---

## Step 4: Verify Data Location and Transfers

### Why This Matters:
- Web3Forms is a US-based company
- Transferring EU personal data to the USA requires **specific safeguards** under GDPR
- Without proper safeguards, transfers are **illegal** under GDPR

### Required Safeguards for EU-US Data Transfers:

Check which safeguards Web3Forms uses:

| Safeguard | Available? | Notes |
|-----------|------------|-------|
| **Standard Contractual Clauses (SCCs)** | ☐ Yes ☐ No | EU Commission-approved contract terms |
| **Adequacy Decision** | ☐ Yes ☐ No | EU Commission approval of data protection level |
| **Privacy Shield** | ☐ Yes ☐ No | ⚠️ Invalidated in 2020 - NOT sufficient alone |
| **Binding Corporate Rules (BCRs)** | ☐ Yes ☐ No | Internal company rules for multinationals |
| **EU Data Hosting Option** | ☐ Yes ☐ No | Data stored in EU (best option) |

### Questions to Ask Web3Forms:

1. **Where exactly is data stored?**
   - Specific cloud provider (AWS, Google Cloud, Azure?)
   - Specific regions (us-east-1, eu-west-1?)
   - Can we choose EU-only storage?

2. **What transfer mechanisms are in place?**
   - SCCs signed and available?
   - Supplementary measures beyond SCCs?

3. **Do they have an EU subsidiary or representative?**
   - GDPR Article 27 representative?
   - EU contact for data subjects?

### Action Required:
- [ ] Ask Web3Forms about data location
- [ ] Request confirmation of transfer safeguards
- [ ] Obtain copy of SCCs if used
- [ ] Document findings in table above

---

## Step 5: Check Data Retention Policies

### Why This Matters:
- GDPR requires data minimization - don't keep data longer than necessary
- We need to know how long Web3Forms retains form submissions
- Users have the right to erasure - we need to ensure Web3Forms can delete data

### Questions to Ask Web3Forms:

| Question | Answer | Notes |
|----------|--------|-------|
| **How long are form submissions stored?** | | Specific number of days/months |
| **Are submissions stored after email delivery?** | ☐ Yes ☐ No | Ideally No |
| **Are there logs separate from submissions?** | ☐ Yes ☐ No | Check log retention |
| **How long are logs retained?** | | Specific period |
| **Is there automatic deletion after X days?** | ☐ Yes ☐ No | Best practice |
| **Can retention period be customized?** | ☐ Yes ☐ No | Flexibility option |
| **What is deleted vs. anonymized?** | | True deletion vs. de-identification |

### Ideal Retention Policy:
- **Form submissions**: Deleted immediately after email delivery (or 24-48 hours max)
- **Logs**: Minimal, 30-90 days maximum
- **Backups**: Included in deletion process, purged within 90 days

### Action Required:
- [ ] Contact Web3Forms to confirm retention policies
- [ ] Document specific retention periods
- [ ] Request configuration of shortest possible retention
- [ ] Verify our Privacy Policy matches their retention periods

---

## Step 6: Verify Data Deletion Capabilities

### Why This Matters:
- Users have the **Right to Erasure** (GDPR Article 17)
- When we receive a deletion request, we must ensure Web3Forms deletes data too
- We need a clear process for requesting deletions from Web3Forms

### Questions to Ask Web3Forms:

| Question | Answer | Notes |
|----------|--------|-------|
| **Is there a data deletion API or process?** | ☐ Yes ☐ No | How we request deletions |
| **How long does deletion take?** | | Immediate? 30 days? |
| **Are backups included in deletion?** | ☐ Yes ☐ No | True deletion required |
| **Is deletion confirmation provided?** | ☐ Yes ☐ No | Proof of deletion |
| **Can we delete by email address?** | ☐ Yes ☐ No | Lookup method |
| **Can we delete by date range?** | ☐ Yes ☐ No | Bulk deletion option |
| **Is deletion logged/auditable?** | ☐ Yes ☐ No | Compliance trail |

### Test the Deletion Process:

1. **Submit a test form** with test data:
   - Name: "GDPR Test User"
   - Email: "test-[date]@qynzoo.com"
   - Message: "This is a GDPR deletion test"

2. **Request deletion from Web3Forms**:
   - Use their deletion process
   - Time how long it takes
   - Request confirmation

3. **Verify deletion**:
   - Check if data is actually gone
   - Confirm backups are purged

### Action Required:
- [ ] Ask Web3Forms about deletion process
- [ ] Request deletion API documentation
- [ ] Perform test deletion (optional but recommended)
- [ ] Document the process for team reference

---

## Step 7: Configure Dashboard Security Settings

### Actions:

1. **Log into Web3Forms Dashboard**:
   - Account: [Your Web3Forms account email]
   - URL: https://web3forms.com/dashboard (or login page)

2. **Review Account Settings**:

| Setting | Current Value | Recommended Value | Action Required |
|---------|---------------|-------------------|-----------------|
| **Two-Factor Authentication (2FA)** | ☐ Enabled ☐ Disabled | ✅ Enabled | [ ] Enable 2FA |
| **Access Key Visibility** | ☐ Public ☐ Private | ✅ Private/Server-side | [ ] Make private |
| **Email Notifications** | ☐ On ☐ Off | ✅ On (for security alerts) | [ ] Enable |
| **API Access Logs** | ☐ Available ☐ Not Available | ✅ Review regularly | [ ] Check logs |
| **Allowed Domains** | | ✅ qynzoo.com only | [ ] Whitelist domain |

3. **Check Form-Specific Settings**:

For each form you have:

| Setting | Current Value | Recommended Value | Action Required |
|---------|---------------|-------------------|-----------------|
| **Form Name/ID** | | Descriptive | [ ] Update if needed |
| **Redirect URL** | | Custom thank-you page | [ ] Configure |
| **Email Recipients** | | mostyaghi@outlook.com, bader.atem@qynzoo.com | [ ] Verify |
| **Auto-Response** | ☐ On ☐ Off | ✅ On (optional) | [ ] Configure if desired |
| **Spam Filter Level** | | High | [ ] See Step 8 |

### Action Required:
- [ ] Log into Web3Forms dashboard
- [ ] Enable 2FA immediately
- [ ] Complete settings table above
- [ ] Make all recommended changes
- [ ] Document current configuration

---

## Step 8: Enable Spam Protection

### Why This Matters:
- Reduces spam submissions (saves inbox space and costs)
- Prevents bot abuse
- Improves data quality
- Reduces data we need to process/store

### Web3Forms Spam Protection Options:

Check which options are available and enable them:

| Protection Method | Available? | Enabled? | Notes |
|-------------------|------------|----------|-------|
| **Honeypot Field** | ☐ Yes ☐ No | ☐ Yes ☐ No | Already in our HTML ✅ |
| **reCAPTCHA v2/v3** | ☐ Yes ☐ No | ☐ Yes ☐ No | Requires Google API key |
| **hCaptcha** | ☐ Yes ☐ No | ☐ Yes ☐ No | Privacy-focused alternative |
| **Turnstile (Cloudflare)** | ☐ Yes ☐ No | ☐ Yes ☐ No | Cloudflare's CAPTCHA |
| **Rate Limiting** | ☐ Yes ☐ No | ☐ Yes ☐ No | Limit submissions per IP |
| **Domain Whitelist** | ☐ Yes ☐ No | ☐ Yes ☐ No | Only accept from qynzoo.com |
| **Spam Filter (built-in)** | ☐ Yes ☐ No | ☐ Yes ☐ No | Enable if available |
| **Block Disposable Emails** | ☐ Yes ☐ No | ☐ Yes ☐ No | Block temp email services |

### Current Implementation on Qynzoo.com:

✅ **Already Implemented**:
- Honeypot field in HTML (`name="botcheck"`)
- JavaScript validation
- maxlength attributes on inputs

⚠️ **To Configure in Web3Forms Dashboard**:
- Domain whitelist (qynzoo.com only)
- Rate limiting
- Additional spam filters

### Configuration Steps:

1. **Enable Domain Whitelist**:
   - Only accept submissions from: `qynzoo.com`
   - Reject submissions from other domains
   - Test after enabling

2. **Configure Rate Limiting** (if available):
   - Recommended: 5-10 submissions per IP per hour
   - Prevents abuse and spam floods

3. **Enable Built-in Spam Filter** (if available):
   - Set to "High" or "Aggressive" level
   - Monitor for false positives initially

4. **Consider CAPTCHA** (optional):
   - Pros: Very effective against bots
   - Cons: User friction, Google dependency
   - Recommendation: Only if spam becomes a problem

### Action Required:
- [ ] Check Web3Forms spam protection options
- [ ] Enable domain whitelist (qynzoo.com)
- [ ] Configure rate limiting
- [ ] Enable spam filters
- [ ] Test form submission after changes
- [ ] Monitor for false positives in first week

---

## Step 9: Document Findings

### Create Compliance Summary Document

After completing all steps above, create a summary document:

**File**: `gdpr-compliance/web3forms-compliance-summary.md`

**Contents**:

```markdown
# Web3Forms GDPR Compliance Summary
Date: [Completion Date]
Reviewed By: [Your Name]
Status: [Compliant / Non-Compliant / Partial]

## Overview
- Service: Web3Forms
- Data Processed: [List]
- Data Location: [USA/EU]
- GDPR Compliance: [Yes/No]

## Data Processing Agreement (DPA)
- DPA Obtained: [Yes/No]
- DPA Date: [Date]
- DPA Stored: [File location]
- Key Terms: [Summary]

## Data Transfers
- Transfer Mechanism: [SCCs / Adequacy / Other]
- Safeguards in Place: [List]
- Compliance Status: [Compliant / Non-Compliant]

## Data Retention
- Submission Retention: [X days/months]
- Log Retention: [X days/months]
- Auto-Deletion: [Yes/No]

## Data Deletion
- Deletion Process: [Description]
- Deletion Timeline: [X days]
- Confirmation Provided: [Yes/No]

## Security Measures
- Encryption in Transit: [Yes/No]
- Encryption at Rest: [Yes/No]
- Access Controls: [Description]
- Certifications: [SOC 2, ISO 27001, etc.]

## Spam Protection
- Spam Filters Enabled: [List]
- Domain Whitelist: [Yes/No]
- Rate Limiting: [Yes/No]

## Compliance Issues Found
[List any issues or concerns]

## Actions Required
[List any follow-up actions needed]

## Conclusion
[Overall assessment and recommendation]
```

### Action Required:
- [ ] Complete all previous steps first
- [ ] Create compliance summary document
- [ ] Save all documentation in `gdpr-compliance/web3forms-docs/`
- [ ] Share summary with team (Mostafa & Bader)

---

## Step 10: Update Privacy Policy

### Why This Matters:
- Our Privacy Policy must accurately reflect how Web3Forms processes data
- Users have the right to know about third-party processors
- Transparency is a GDPR requirement

### Information to Update in Privacy Policy:

Based on your findings, update the **"3. Third-Party Service Providers" → "3.1 Web3Forms"** section:

**Current Privacy Policy Section**:
```markdown
### 3.1 Web3Forms (Contact Form Processing)
- Purpose: Processing and delivering contact form submissions via email
- Data Shared: Name, email address, subject, message, service interest
- Data Location: United States (GDPR-compliant with appropriate safeguards)
- Privacy Policy: https://web3forms.com/privacy
- Retention: Contact form data is transmitted and not stored by Web3Forms long-term
```

**Update With Findings**:

```markdown
### 3.1 Web3Forms (Contact Form Processing)

**Service Provider**: Web3Forms (USA)
**Purpose**: Processing and delivering contact form submissions via email

**Data Shared**:
- Name, email address, phone number (if provided)
- Subject, message content, service interest
- IP address (automatically collected)
- Timestamp of submission

**Data Location**: [Based on your findings]
- Primary Storage: [USA / EU / Both]
- Cloud Provider: [If disclosed]

**Transfer Safeguards**: [Based on your findings]
- Standard Contractual Clauses (SCCs) - EU Commission approved
- [Any other safeguards]

**Data Retention**: [Based on your findings]
- Form Submissions: [X days/months or "Deleted immediately after delivery"]
- Server Logs: [X days]

**Data Deletion**:
- Users can request deletion via privacy@qynzoo.com
- Deletion completed within [X days]
- Includes deletion from Web3Forms systems and backups

**Security Measures**:
- HTTPS/TLS encryption in transit
- [Any certifications: SOC 2, ISO 27001, etc.]

**Data Processing Agreement**: Active DPA in place (as of [Date])

**Privacy Policy**: https://web3forms.com/privacy
**Terms of Service**: https://web3forms.com/terms
```

### Action Required:
- [ ] Wait until Steps 1-9 are complete
- [ ] Update Privacy Policy with accurate information
- [ ] Include DPA confirmation
- [ ] Update "Last Updated" date in Privacy Policy
- [ ] Deploy updated Privacy Policy to website
- [ ] Increment version number (V3.9 → V4.0)

---

## Compliance Status Matrix

Use this to track overall compliance:

| Requirement | Status | Evidence | Notes |
|-------------|--------|----------|-------|
| **DPA in Place** | ☐ Yes ☐ No ☐ Pending | File: | |
| **Data Location Known** | ☐ Yes ☐ No ☐ Pending | | |
| **Transfer Safeguards** | ☐ Yes ☐ No ☐ Pending | | |
| **Retention Policy Documented** | ☐ Yes ☐ No ☐ Pending | | |
| **Deletion Process Documented** | ☐ Yes ☐ No ☐ Pending | | |
| **Security Measures Verified** | ☐ Yes ☐ No ☐ Pending | | |
| **Privacy Policy Updated** | ☐ Yes ☐ No ☐ Pending | | |
| **Dashboard Secured** | ☐ Yes ☐ No ☐ Pending | | |
| **Spam Protection Enabled** | ☐ Yes ☐ No ☐ Pending | | |

**Overall Compliance**: ☐ Compliant ☐ Partial ☐ Non-Compliant

---

## Red Flags & Escalation

### 🚩 Critical Red Flags (STOP using Web3Forms immediately):

- [ ] Web3Forms refuses to provide DPA
- [ ] No transfer safeguards for EU-US data transfers
- [ ] No data deletion capability
- [ ] Data stored indefinitely without deletion
- [ ] No encryption in transit or at rest
- [ ] Evidence of data breaches or security issues
- [ ] Terms conflict with GDPR requirements

**If any critical red flags are found**:
1. ⚠️ **Stop using Web3Forms immediately**
2. Find GDPR-compliant alternative (e.g., Formspree, Basin, EU-hosted form service)
3. Notify users if necessary (breach notification)
4. Consult legal counsel

### ⚠️ Medium Concerns (Address but not critical):

- [ ] Retention periods longer than necessary (>90 days)
- [ ] No EU data hosting option
- [ ] Unclear privacy policy language
- [ ] Limited security certifications
- [ ] Slow deletion process (>30 days)

**Action**: Work with Web3Forms to address concerns

### ✅ Minor Issues (Document and monitor):

- [ ] Spam protection not optimal
- [ ] Dashboard lacks some features
- [ ] Documentation could be clearer

**Action**: Note for future review

---

## Alternative Form Processors (If Web3Forms Not Compliant)

If Web3Forms doesn't meet GDPR requirements, consider these alternatives:

| Service | Location | GDPR Compliant | DPA Available | Notes |
|---------|----------|----------------|---------------|-------|
| **Basin** | USA | Yes | Yes | Developer-friendly |
| **Formspree** | USA | Yes | Yes | Popular, easy integration |
| **Formspark** | EU | Yes | Yes | EU-hosted, privacy-focused |
| **Tally** | EU | Yes | Yes | Free tier, GDPR-compliant |
| **99inbound** | USA | Yes | Yes | Spam protection built-in |
| **Self-hosted PHP form** | Your server | Yes | N/A | Full control |

### Action Required (If Switching):
- [ ] Research alternative
- [ ] Test integration
- [ ] Migrate forms
- [ ] Update Privacy Policy
- [ ] Delete Web3Forms account and request data deletion

---

## Timeline & Deadlines

| Task | Deadline | Responsible | Status |
|------|----------|-------------|--------|
| Review privacy policy | Day 1-2 | [Name] | ☐ |
| Review terms of service | Day 1-2 | [Name] | ☐ |
| Request DPA | Day 2 | [Name] | ☐ |
| Follow up on DPA | Day 9 | [Name] | ☐ |
| Verify data location | Day 3-5 | [Name] | ☐ |
| Check retention policies | Day 3-5 | [Name] | ☐ |
| Configure dashboard | Day 3-5 | [Name] | ☐ |
| Enable spam protection | Day 3-5 | [Name] | ☐ |
| Document findings | Day 6-7 | [Name] | ☐ |
| Update Privacy Policy | Day 7 | [Name] | ☐ |
| **Final Deadline** | **Day 7** | | ☐ |

---

## Resources & Links

### Web3Forms Documentation:
- Main Website: https://web3forms.com
- Privacy Policy: https://web3forms.com/privacy
- Terms of Service: https://web3forms.com/terms
- Documentation: https://docs.web3forms.com
- Support: support@web3forms.com (or contact form)

### GDPR Resources:
- Article 28 (Processor): https://gdpr-info.eu/art-28-gdpr/
- SCCs Template: https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en
- EDPB Guidelines: https://edpb.europa.eu/our-work-tools/general-guidance/guidelines-recommendations-best-practices_en

### Internal Documents:
- Training Guide: `gdpr-compliance/1-team-training-guide.md`
- Email Templates: `gdpr-compliance/2-email-templates.md`
- Tracking Spreadsheet: `gdpr-compliance/3-data-request-tracking-spreadsheet.csv`

---

## Completion Certification

Once all steps are complete, sign off below:

**Reviewed By**: ___________________________
**Date**: ___________________________
**Compliance Status**: ☐ Compliant ☐ Partial ☐ Non-Compliant
**DPA Obtained**: ☐ Yes ☐ No
**Privacy Policy Updated**: ☐ Yes ☐ No

**Notes**:
_____________________________________________________________________________
_____________________________________________________________________________
_____________________________________________________________________________

**Next Review Date**: [Date + 6 months]

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-10-20 | Initial creation | Security Audit |

---

**END OF WEB3FORMS COMPLIANCE CHECKLIST**

📧 Questions? Email privacy@qynzoo.com
📁 Related Documents: Training Guide, Email Templates, Tracking Spreadsheet
