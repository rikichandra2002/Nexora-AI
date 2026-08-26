import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copy generated high-res horizontal logo file to client/src/assets/logo.png
const srcPath = 'C:\\Users\\RITWIK\\.gemini\\antigravity\\brain\\6ce3f246-17f8-44b8-8550-983503bc0676\\nexora_logo_horizontal_1787754508135.jpg';
const destPng = path.join(__dirname, 'logo.png');

try {
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPng);
    console.log('Successfully copied logo PNG file to:', destPng);
  } else {
    console.log('Source path not found:', srcPath);
  }
} catch (err) {
  console.error('Error copying logo file:', err);
}
