const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const imagesDir = path.join(__dirname, '../public/images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Define our placeholder images
const images = [
  'author.jpg',
  'author-bio.jpg',
  'book1.jpg',
  'book2.jpg',
  'book3.jpg',
  'mindfulness1.jpg',
  'mindfulness2.jpg',
  'mindfulness3.jpg',
  'mindfulness-hero.jpg',
  'playlist1.jpg',
  'playlist2.jpg',
  'playlist3.jpg',
  'article1.jpg',
  'article2.jpg',
  'article3.jpg',
  'article4.jpg',
  'article5.jpg',
  'article6.jpg',
  'article7.jpg',
  'article8.jpg',
  'texture.png',
];

// Create 1x1 transparent pixel as placeholder
const pixel = Buffer.from('R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==', 'base64');

// Generate placeholders
images.forEach(img => {
  const filePath = path.join(imagesDir, img);
  fs.writeFileSync(filePath, pixel);
  console.log(`Created placeholder for ${img}`);
});

console.log('All placeholder images created!'); 