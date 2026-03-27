#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const inputDir = path.join(root, 'public', 'images');
const outputDir = path.join(inputDir, 'marquee');

const logos = [
  'Logo_JOM.png',
  'Logo_BDR.png',
  'Logo_SDB.png',
  'Logo_Reeflex.png',
  'Logo_Purple.png',
  'Logo_Bambu.png',
  'Logo_DI.png',
  'Logo_FM.png',
  'logo-bahura-dive.png',
  'mts-logo.svg',
  'tarzan-diving-logo.svg',
  'hgl-tours-logo.svg',
];

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

const results = [];
for (const file of logos) {
  const inPath = path.join(inputDir, file);
  const outName = file.replace(/\.(png|svg)$/i, '.webp');
  const outPath = path.join(outputDir, outName);

  if (!fs.existsSync(inPath)) {
    console.log(`Missing: ${file}`);
    continue;
  }

  const img = sharp(inPath, { density: 300 }).resize({ height: 70, withoutEnlargement: true });
  await img.webp({ quality: 82, effort: 5 }).toFile(outPath);

  const meta = await sharp(outPath).metadata();
  const inSize = fs.statSync(inPath).size;
  const outSize = fs.statSync(outPath).size;

  results.push({
    file,
    outName,
    width: meta.width,
    height: meta.height,
    inKB: (inSize / 1024).toFixed(1),
    outKB: (outSize / 1024).toFixed(1),
  });
}

console.log('\nGenerated marquee logos:');
for (const r of results) {
  console.log(`${r.file} -> ${r.outName} (${r.width}x${r.height}) ${r.inKB}KB -> ${r.outKB}KB`);
}
