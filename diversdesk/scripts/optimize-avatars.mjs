#!/usr/bin/env node
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '../public/images');

// Avatar files that need optimization
const avatarFiles = [
  'seadb_avatar.avif',
  'louis_avatar.avif',
  'jomadventure_avatar.avif',
  'bdrs_avatar.avif',
  'mantastic_scuba_avatar.png',
];

async function optimizeAvatars() {
  console.log('Optimizing avatar images to 80x80px...');
  
  for (const file of avatarFiles) {
    const inputPath = path.join(imagesDir, file);
    
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  File not found: ${file}`);
      continue;
    }
    
    try {
      const originalSize = fs.statSync(inputPath).size;
      const isAvif = file.endsWith('.avif');
      
      // For AVIF files, use a temp file and overwrite
      if (isAvif) {
        const tempPath = inputPath + '.tmp';
        // Resize and recompress the AVIF
        await sharp(inputPath)
          .resize(80, 80, { fit: 'cover', position: 'center' })
          .avif({ quality: 80 })
          .toFile(tempPath);
        
        // Replace original with temp
        fs.renameSync(tempPath, inputPath);
        
        const newSize = fs.statSync(inputPath).size;
        const saved = originalSize - newSize;
        const percent = ((saved / originalSize) * 100).toFixed(1);
        
        console.log(`✓ ${file} (resized to 80x80)`);
        console.log(`  Original: ${(originalSize / 1024).toFixed(1)} KB → Optimized: ${(newSize / 1024).toFixed(1)} KB (saved ${percent}%)`);
      } else {
        // Convert PNG avatar to optimized AVIF
        const avifPath = inputPath.replace(/\.png$/, '.avif');
        await sharp(inputPath)
          .resize(80, 80, { fit: 'cover', position: 'center' })
          .avif({ quality: 80 })
          .toFile(avifPath);
        
        // Delete the PNG
        fs.unlinkSync(inputPath);
        
        const newSize = fs.statSync(avifPath).size;
        const saved = originalSize - newSize;
        const percent = ((saved / originalSize) * 100).toFixed(1);
        
        console.log(`✓ ${file} → ${file.replace(/\.png$/, '.avif')} (resized to 80x80)`);
        console.log(`  Original: ${(originalSize / 1024).toFixed(1)} KB → AVIF: ${(newSize / 1024).toFixed(1)} KB (saved ${percent}%)`);
      }
    } catch (error) {
      console.error(`✗ Error optimizing ${file}:`, error.message);
    }
  }
  
  console.log('✓ Avatar optimization complete!');
}

optimizeAvatars().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
