const fs = require('fs');
const path = require('path');
const https = require('https');

const products = [
  { id: 'prod_1', img: "https://images.unsplash.com/photo-1590846406792-0adc7f138fbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_2', img: "https://images.unsplash.com/photo-1584283459954-4050e64c1bd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_3', img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_4', img: "https://images.unsplash.com/photo-1584283459986-e8dd627c26fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_5', img: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_6', img: "https://images.unsplash.com/photo-1621293954908-907159247fc8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_7', img: "https://images.unsplash.com/photo-1558138838-7629edbedd46?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_8', img: "https://images.unsplash.com/photo-1601614833297-b86f0aa67683?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_9', img: "https://images.unsplash.com/photo-1616766099516-bb98b8d96e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_10', img: "https://images.unsplash.com/photo-1596700854497-8ecfb7e3bc57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_11', img: "https://images.unsplash.com/photo-1628186419572-886915b8005b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_12', img: "https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_13', img: "https://images.unsplash.com/photo-1622485640772-9b24cd51ed59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 'prod_14', img: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }
];

const dir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${res.statusCode})`));
        return;
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
      file.on('error', (err) => {
        fs.unlink(dest, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const prod of products) {
    const dest = path.join(dir, `${prod.id}.jpg`);
    console.log(`Downloading ${prod.id}.jpg...`);
    try {
      await download(prod.img, dest);
      console.log(`Saved ${prod.id}.jpg`);
    } catch (err) {
      console.error(`Error downloading ${prod.id}:`, err.message);
      // Create a dummy file if download fails
      fs.writeFileSync(dest, 'dummy content');
    }
  }
  console.log('All downloads complete.');
}

main();
