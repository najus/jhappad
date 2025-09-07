const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');

// Load the schema
const schemaPath = path.join(__dirname, '../schema/politician-schema.json');
const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

// Load the data
const dataPath = path.join(__dirname, '../public/data/politicians.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Initialize AJV
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(schema);

// Validate each politician
let hasErrors = false;

console.log('🔍 Validating politician data...\n');

data.forEach((politician, index) => {
  const valid = validate(politician);
  
  if (!valid) {
    hasErrors = true;
    console.log(`❌ Politician ${index + 1}: ${politician.name}`);
    console.log('   Errors:');
    validate.errors.forEach(error => {
      console.log(`   - ${error.instancePath || 'root'}: ${error.message}`);
    });
    console.log('');
  } else {
    console.log(`✅ Politician ${index + 1}: ${politician.name} - Valid`);
  }
});

// Additional validation checks
console.log('\n🔍 Running additional validation checks...\n');

data.forEach((politician, index) => {
  console.log(`Checking ${politician.name}...`);
  
  // Check for duplicate IDs
  const duplicateIds = data.filter(p => p.id === politician.id);
  if (duplicateIds.length > 1) {
    hasErrors = true;
    console.log(`❌ Duplicate ID found: ${politician.id}`);
  }
  
  // Check for valid dates
  if (politician.lastUpdated) {
    const date = new Date(politician.lastUpdated);
    if (isNaN(date.getTime())) {
      hasErrors = true;
      console.log(`❌ Invalid date format: ${politician.lastUpdated}`);
    }
  }
  
  // Check children data
  politician.children.forEach((child, childIndex) => {
    // Check for valid ages
    if (child.age < 0 || child.age > 120) {
      hasErrors = true;
      console.log(`❌ Invalid age for ${child.name}: ${child.age}`);
    }
    
    // Check for valid relationship
    const validRelationships = ['son', 'daughter', 'adopted_son', 'adopted_daughter'];
    if (!validRelationships.includes(child.relationship)) {
      hasErrors = true;
      console.log(`❌ Invalid relationship for ${child.name}: ${child.relationship}`);
    }
    
    // Check recent splurges dates
    if (child.lifestyle?.recentSplurges) {
      child.lifestyle.recentSplurges.forEach((splurge, splurgeIndex) => {
        if (splurge.date) {
          const splurgeDate = new Date(splurge.date);
          if (isNaN(splurgeDate.getTime())) {
            hasErrors = true;
            console.log(`❌ Invalid splurge date for ${child.name}: ${splurge.date}`);
          }
        }
      });
    }
  });
  
  // Check sources accessibility (basic URL format check)
  const allSources = [
    ...(politician.sources || []),
    ...politician.children.flatMap(child => child.sources || [])
  ];
  
  allSources.forEach(source => {
    try {
      new URL(source);
    } catch (e) {
      hasErrors = true;
      console.log(`❌ Invalid URL format: ${source}`);
    }
  });
});

// Summary
console.log('\n📊 Validation Summary:');
console.log(`Total politicians: ${data.length}`);
console.log(`Total children: ${data.reduce((sum, p) => sum + p.children.length, 0)}`);

if (hasErrors) {
  console.log('\n❌ Validation failed! Please fix the errors above.');
  process.exit(1);
} else {
  console.log('\n✅ All data is valid!');
  process.exit(0);
}