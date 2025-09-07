# Corrupt Nepali 🇳🇵

A collaborative platform to track corrupt Nepali politicians and their children, promoting transparency and accountability in Nepali politics.

## 🎯 Mission

This platform aims to expose corruption by documenting the lavish lifestyles of politicians' children, their expensive education abroad, luxury purchases, and business interests that often exceed their declared family income.

## 🚀 Features

- **Comprehensive Database**: Track politicians, their children, and corruption allegations
- **Lifestyle Documentation**: Record luxury items, recent splurges, and expensive education
- **Business Interests**: Document children's business ownership and positions
- **Social Media Links**: Connect to children's social media profiles for evidence
- **Source Attribution**: All information backed by credible sources
- **Collaborative**: Easy for contributors to add new information via pull requests

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **Data**: JSON files with schema validation
- **Icons**: Lucide React
- **Deployment**: GitHub Pages ready

## 📊 Data Structure

Each politician entry includes:

```json
{
  "id": "unique-identifier",
  "name": "Politician Name",
  "position": "Current/Previous Position",
  "party": "Political Party",
  "photo": "URL to photo",
  "estimatedWealth": "Estimated wealth amount",
  "corruptionAllegations": ["List of allegations"],
  "children": [
    {
      "name": "Child Name",
      "relationship": "son|daughter|adopted_son|adopted_daughter",
      "age": 25,
      "education": {
        "institution": "University Name",
        "degree": "Degree Type",
        "country": "Country",
        "cost": "Cost of education"
      },
      "lifestyle": {
        "luxuryItems": ["List of luxury items"],
        "recentSplurges": [
          {
            "item": "Item purchased",
            "cost": "Cost",
            "date": "YYYY-MM-DD",
            "source": "Source URL"
          }
        ],
        "socialMedia": {
          "instagram": "Instagram URL",
          "facebook": "Facebook URL",
          "tiktok": "TikTok URL"
        }
      },
      "businessInterests": [
        {
          "company": "Company Name",
          "position": "Position",
          "ownership": "Ownership percentage"
        }
      ],
      "sources": ["List of source URLs"]
    }
  ],
  "lastUpdated": "YYYY-MM-DD",
  "sources": ["List of source URLs"]
}
```

## 🤝 How to Contribute

### Adding New Politicians

1. **Fork the repository**
2. **Create a new branch**: `git checkout -b add-politician-[name]`
3. **Add politician data** to `public/data/politicians.json`
4. **Follow the schema** defined in `schema/politician-schema.json`
5. **Include credible sources** for all information
6. **Submit a pull request**

### Updating Existing Information

1. **Fork the repository**
2. **Create a new branch**: `git checkout -b update-[politician-name]`
3. **Update the relevant data** in `public/data/politicians.json`
4. **Add new sources** if providing new information
5. **Update the `lastUpdated` field**
6. **Submit a pull request**

### Adding Photos

1. **Upload photos** to a reliable image hosting service (Imgur, etc.)
2. **Use the photo URLs** in the JSON data
3. **Ensure photos are publicly accessible**

## 📋 Contribution Guidelines

### ✅ What to Include

- **Credible Sources**: All information must be backed by news articles, official documents, or verifiable social media posts
- **Recent Information**: Focus on current or recent activities
- **Specific Details**: Include exact amounts, dates, and locations when possible
- **Social Media Evidence**: Screenshots or links to social media posts showing luxury items
- **Business Registry**: Official business registration information

### ❌ What to Avoid

- **Unverified Rumors**: Only include information with credible sources
- **Personal Attacks**: Focus on facts, not personal opinions
- **Sensitive Personal Information**: Avoid private addresses, phone numbers, etc.
- **Fake Information**: All data must be factual and verifiable

### 🔍 Verification Process

All pull requests will be reviewed for:
- **Source credibility**
- **Data accuracy**
- **Schema compliance**
- **Privacy considerations**

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/corrupt-nepali.git
cd corrupt-nepali

# Install dependencies
npm install

# Run development server
npm run dev
```

### Building for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
corrupt-nepali/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Site header
│   ├── PoliticianCard.tsx # Politician display card
│   └── ChildCard.tsx      # Child information card
├── public/
│   └── data/
│       └── politicians.json # Main data file
├── schema/
│   └── politician-schema.json # JSON schema
├── types/
│   └── politician.ts      # TypeScript types
└── scripts/
    └── validate-data.js   # Data validation script
```

## 🔒 Legal Disclaimer

This platform is for educational and transparency purposes. All information is sourced from publicly available data. We encourage responsible journalism and fact-checking. If you believe any information is incorrect, please submit a correction with proper sources.

## 📞 Contact

- **GitHub Issues**: For bugs, feature requests, or questions
- **Pull Requests**: For contributing new information
- **Email**: [Your contact email]

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Contributors who help maintain and update the database
- Journalists and researchers who provide credible sources
- The open-source community for the tools and frameworks used

---

**Remember**: This platform is about transparency and accountability. Let's work together to expose corruption and promote good governance in Nepal! 🇳🇵