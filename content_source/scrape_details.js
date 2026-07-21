const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = [
  'https://www.cocsit.org.in/about_res.php',
  'https://www.cocsit.org.in/about_principals_desk.php',
  'https://www.cocsit.org.in/about_chairmans_desk.php',
  'https://www.cocsit.org.in/about_vice_chairman.php',
  'https://www.cocsit.org.in/about_college_advisory_board.php'
];

const downloadDir = path.join(__dirname, 'scraped_raw');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  }
};

function downloadUrl(url) {
  return new Promise((resolve) => {
    const filename = path.basename(url);
    const dest = path.join(downloadDir, filename.replace('.php', '.html'));
    console.log(`Downloading ${url} to ${dest}...`);
    
    https.get(url, options, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Failed to download ${url}: Status code ${res.statusCode}`);
        resolve(null);
        return;
      }
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        fs.writeFileSync(dest, data);
        console.log(`Saved ${filename}`);
        resolve(dest);
      });
    }).on('error', (err) => {
      console.error(`Error downloading ${url}: ${err.message}`);
      resolve(null);
    });
  });
}

async function scrapeAll() {
  for (const url of urls) {
    await downloadUrl(url);
    // Add small delay to be polite
    await new Promise(r => setTimeout(r, 1000));
  }
  console.log("Scraping completed!");
}

scrapeAll();
