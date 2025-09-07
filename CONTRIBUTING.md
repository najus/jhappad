# Contributing to Corrupt Nepali

Thank you for your interest in contributing to this transparency initiative! This guide will help you understand how to contribute effectively.

## 🎯 How to Contribute

### 1. Adding New Politicians

**Step-by-step process:**

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/najus/jhappad.git
   cd jhappad
   ```
3. **Create a new branch**:
   ```bash
   git checkout -b add-politician-[politician-name]
   ```
4. **Add the politician data** to `public/data/politicians.json`
5. **Validate your data** using the schema
6. **Commit and push**:
   ```bash
   git add .
   git commit -m "Add politician: [Name]"
   git push origin add-politician-[politician-name]
   ```
7. **Create a Pull Request** on GitHub

### 2. Updating Existing Information

Follow the same process but use a branch name like `update-[politician-name]` and focus on updating existing entries.

### 3. Adding Photos

**Best practices for photos:**
- Use reliable image hosting (Imgur, GitHub, etc.)
- Ensure photos are publicly accessible
- Use descriptive filenames
- Maintain reasonable file sizes

## 📋 Data Requirements

### Required Information
- **Politician's full name**
- **Current or previous position**
- **Political party**
- **At least one child with basic information**
- **Credible sources for all claims**

### Child Information Requirements
- **Full name**
- **Relationship to politician** (son/daughter/adopted)
- **Age**
- **At least one source**

### Optional but Valuable Information
- **Photos** (politician and children)
- **Education details** (institution, cost, country)
- **Luxury items and recent purchases**
- **Business interests and ownership**
- **Social media profiles**
- **Estimated family wealth**

## 🔍 Source Guidelines

### Acceptable Sources
- **News articles** from reputable media outlets
- **Official government documents**
- **Public business registry records**
- **Social media posts** (with screenshots)
- **Court documents** and legal filings
- **Academic research** and reports

### Source Format
```json
"sources": [
  "https://example.com/news-article",
  "https://example.com/business-registry",
  "https://example.com/social-media-post"
]
```

### Unacceptable Sources
- Unverified rumors or hearsay
- Personal blogs without credibility
- Anonymous social media accounts
- Speculation without evidence

## ✅ Quality Checklist

Before submitting your pull request, ensure:

- [ ] All required fields are filled
- [ ] Data follows the JSON schema
- [ ] Sources are credible and accessible
- [ ] No personal/private information included
- [ ] Information is factual and verifiable
- [ ] `lastUpdated` field is current date
- [ ] No duplicate entries

## 🚫 What NOT to Include

### Privacy Violations
- Home addresses
- Phone numbers
- Private email addresses
- Personal identification numbers

### Unverified Information
- Rumors without sources
- Speculation about private matters
- Unconfirmed allegations
- Personal opinions or judgments

### Inappropriate Content
- Hate speech
- Personal attacks
- Irrelevant personal information
- Content that could harm innocent parties

## 🔧 Technical Guidelines

### JSON Formatting
- Use proper indentation (2 spaces)
- Follow the exact schema structure
- Use consistent date formats (YYYY-MM-DD)
- Escape special characters properly

### File Organization
- Keep all politician data in `public/data/politicians.json`
- Use unique IDs for each politician
- Maintain chronological order by `lastUpdated`

### Validation
Run the validation script before submitting:
```bash
npm run validate-data
```

## 📝 Pull Request Template

When creating a pull request, include:

### Description
- Brief summary of changes
- Politician(s) added/updated
- Key information included

### Sources
- List all sources used
- Verify all links are accessible

### Verification
- [ ] Data validated against schema
- [ ] All sources checked
- [ ] No privacy violations
- [ ] Information is factual

## 🔄 Review Process

### What We Review
1. **Data accuracy** and completeness
2. **Source credibility** and accessibility
3. **Schema compliance**
4. **Privacy considerations**
5. **Code quality** (if applicable)

### Review Timeline
- Initial review: 2-3 business days
- Feedback and revisions: 1-2 business days
- Final approval: 1 business day

### Common Issues
- Missing required fields
- Invalid source URLs
- Schema validation errors
- Privacy concerns
- Duplicate entries

## 🆘 Getting Help

### Questions?
- **GitHub Issues**: For technical questions
- **Discussions**: For general questions about contributing
- **Email**: [Your contact email] for sensitive matters

### Need Examples?
Check the sample data in `public/data/politicians.json` for reference.

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- GitHub contributors page
- Release notes for significant contributions

## 📜 Code of Conduct

### Our Standards
- **Respectful communication**
- **Factual accuracy**
- **Privacy protection**
- **Constructive collaboration**

### Enforcement
Violations of the code of conduct may result in:
- Warning
- Temporary restriction
- Permanent ban

## 🎉 Thank You!

Your contributions help promote transparency and accountability in Nepali politics. Every piece of information matters in the fight against corruption!

---

**Remember**: This is about facts, not opinions. Let's work together to build a comprehensive, accurate, and respectful database that serves the public interest.