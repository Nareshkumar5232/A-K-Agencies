import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let safeContent = content.replace(/\s*dark:[^\s"'\`]+/g, '');
  // Also remove darkmode specific CSS definitions like .dark .xyz { ... }
  safeContent = safeContent.replace(/\.dark\s+\.[a-zA-Z0-9_-]+\s*\{[^}]+\}/g, '');
  if (content !== safeContent) {
    fs.writeFileSync(file, safeContent, 'utf8');
    console.log(`Updated ${file}`);
  }
});
console.log('Dark mode classes removed.');
