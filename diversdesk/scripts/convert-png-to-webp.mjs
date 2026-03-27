#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '../public/images');

// List of PNG files to convert to WebP
const pngFiles = [
  'Logo_Purple.png',
  'Logo_SDB.png',
  'Logo_BDR.png',
  'Logo_JOM.png',
  'Logo_Reeflex.png',
  'Logo_FM.png',
  'Logo_Bambu.png',
  'Logo_DI.png',
  'logo-bahura-dive.png',
  'mts-logo.svg',
  'tarzan-diving-logo.svg',
  'hgl-tours-logo.svg',
];

async function convertToWebP() {
  console.log('Converting PNG files to WebP format...');
  
  for (const file of pngFiles) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, file.replace(/\.png$/, '.webp').replace(/\.svg$/, '.webp'));
    
    // Skip SVG files as they don't need conversion
    if (file.endsWith('.svg')) {
      console.log(`Skipping ${file} (SVG files don't need WebP conversion)`);
      continue;
    }
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  File not found: ${file}`);
      continue;
    }
    
    try {
      await sharp(inputPath)
        .webp({ quality: 85 })
        .toFile(outputPath);
      
      const originalSize = fs.statSync(inputPath).size;
      const newSize = fs.statSync(outputPath).size;
      const saved = originalSize - newSize;
      const percent = ((saved / originalSize) * 100).toFixed(1);
      
      console.log(`✓ ${file} → ${file.replace(/\.png$/, '.webp')}`);
      console.log(`  Original: ${(originalSize / 1024).toFixed(1)} KB → WebP: ${(newSize / 1024).toFixed(1)} KB (saved ${percent}%)`);
    } catch (error) {
      console.error(`✗ Error converting ${file}:`, error.message);
    }
  }
  
  console.log('✓ Conversion complete!');
}

convertToWebP().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
