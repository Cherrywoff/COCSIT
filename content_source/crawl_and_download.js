const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const START_URL = 'https://www.cocsit.org.in/index.php';
const DOMAIN = 'www.cocsit.org.in';
const BASE_URL = 'https://www.cocsit.org.in/';

const workspaceDir = path.join(__dirname, '..', 'scraped_website');
if (!fs.existsSync(workspaceDir)) {
  fs.mkdirSync(workspaceDir, { recursive: true });
}

// Visited sets
const crawledUrls = new Set();
const downloadedAssets = new Set();

const maxPages = 150; // Safety limit
let pagesCrawledCount = 0;

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
};

// Queue for URLs to crawl
const crawlQueue = [START_URL];

// Helper to check if a URL is external
function isInternal(targetUrl) {
  try {
    const parsed = new URL(targetUrl, BASE_URL);
    return parsed.hostname === DOMAIN || parsed.hostname === 'cocsit.org.in';
  } catch (e) {
    return false;
  }
}

// Download a binary or text file to local path
function downloadAsset(assetUrl, relativePath) {
  return new Promise((resolve) => {
    if (downloadedAssets.has(assetUrl)) {
      resolve(true);
      return;
    }
    downloadedAssets.add(assetUrl);

    // Filter out external assets (like Google Fonts, Cloudflare CDN) from local download
    if (!isInternal(assetUrl)) {
      resolve(false);
      return;
    }

    const localPath = path.join(workspaceDir, relativePath);
    const dir = path.dirname(localPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    console.log(`[Asset] Downloading: ${assetUrl} -> ${relativePath}`);
    
    const client = assetUrl.startsWith('https') ? https : http;
    client.get(assetUrl, { headers }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`  [Asset Error] Status ${res.statusCode} for ${assetUrl}`);
        resolve(false);
        return;
      }
      
      const fileStream = fs.createWriteStream(localPath);
      res.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(true);
      });
    }).on('error', (err) => {
      console.error(`  [Asset Network Error] ${err.message}`);
      resolve(false);
    });
  });
}

// Parse HTML contents to extract links, images, CSS, JS
function parseHtmlAndQueueAssets(html, currentUrl) {
  const parsedCurrent = new URL(currentUrl, BASE_URL);
  
  // 1. Extract links <a>
  const aRegex = /href\s*=\s*["']([^"']*)["']/gi;
  let match;
  while ((match = aRegex.exec(html)) !== null) {
    let link = match[1].trim();
    if (!link || link.startsWith('#') || link.startsWith('javascript:')) continue;
    
    try {
      const absolute = new URL(link, currentUrl).href;
      // Skip query parameters or hashes for crawling determination
      const cleanUrl = absolute.split('#')[0].split('?')[0];
      
      if (isInternal(cleanUrl) && !crawledUrls.has(cleanUrl) && !crawlQueue.includes(cleanUrl)) {
        // Only crawl PHP/HTML pages or directories
        const ext = path.extname(cleanUrl).toLowerCase();
        if (ext === '' || ext === '.php' || ext === '.html' || ext === '.htm') {
          crawlQueue.push(cleanUrl);
        }
      }
    } catch (e) {}
  }

  // 2. Extract Images <img>
  const imgRegex = /src\s*=\s*["']([^"']*)["']/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    let imgLink = match[1].trim();
    if (!imgLink) continue;
    try {
      const absolute = new URL(imgLink, currentUrl);
      if (isInternal(absolute.href)) {
        const relPath = absolute.pathname.substring(1); // strip leading slash
        downloadAsset(absolute.href, relPath);
      }
    } catch (e) {}
  }

  // 3. Extract Stylesheets <link rel="stylesheet">
  const linkRegex = /<link[^>]*href=["']([^"']*)["']/gi;
  while ((match = linkRegex.exec(html)) !== null) {
    let linkPath = match[1].trim();
    try {
      const absolute = new URL(linkPath, currentUrl);
      if (isInternal(absolute.href) && absolute.pathname.endsWith('.css')) {
        const relPath = absolute.pathname.substring(1);
        downloadAsset(absolute.href, relPath);
      }
    } catch (e) {}
  }

  // 4. Extract Scripts <script src="...">
  const scriptRegex = /<script[^>]*src=["']([^"']*)["']/gi;
  while ((match = scriptRegex.exec(html)) !== null) {
    let jsPath = match[1].trim();
    try {
      const absolute = new URL(jsPath, currentUrl);
      if (isInternal(absolute.href)) {
        const relPath = absolute.pathname.substring(1);
        downloadAsset(absolute.href, relPath);
      }
    } catch (e) {}
  }
}

// Extract and store plain text characters
function savePlainText(html, relativePath) {
  // Strip script/style tags
  let text = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '');
  text = text.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '');
  // Strip tags
  text = text.replace(/<[^>]*>/g, ' ');
  // Decode common HTML entities
  text = text.replace(/&nbsp;/g, ' ')
             .replace(/&amp;/g, '&')
             .replace(/&lt;/g, '<')
             .replace(/&gt;/g, '>')
             .replace(/\s+/g, ' ')
             .trim();

  const textFolder = path.join(workspaceDir, 'text_content');
  if (!fs.existsSync(textFolder)) {
    fs.mkdirSync(textFolder, { recursive: true });
  }

  const name = relativePath.replace('.html', '.txt');
  fs.writeFileSync(path.join(textFolder, name), text, 'utf8');
}

// Core crawler function
function crawlPage(pageUrl) {
  return new Promise((resolve) => {
    if (crawledUrls.has(pageUrl) || pagesCrawledCount >= maxPages) {
      resolve();
      return;
    }
    crawledUrls.add(pageUrl);
    pagesCrawledCount++;

    const parsed = new URL(pageUrl, BASE_URL);
    let relPath = parsed.pathname.substring(1) || 'index.html';
    if (relPath.endsWith('/')) {
      relPath += 'index.html';
    } else if (!path.extname(relPath)) {
      relPath += '.html';
    }

    console.log(`\n[Page ${pagesCrawledCount}/${maxPages}] Crawling: ${pageUrl} -> ${relPath}`);

    const client = pageUrl.startsWith('https') ? https : http;
    client.get(pageUrl, { headers }, (res) => {
      if (res.statusCode !== 200) {
        console.error(`  [Page Error] Status ${res.statusCode} for ${pageUrl}`);
        resolve();
        return;
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        // Save raw HTML page
        const localPath = path.join(workspaceDir, relPath);
        const dir = path.dirname(localPath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(localPath, data, 'utf8');
        
        // Save plain text version of the page
        savePlainText(data, relPath);

        // Parse HTML to collect other pages & download assets
        parseHtmlAndQueueAssets(data, pageUrl);
        resolve();
      });
    }).on('error', (err) => {
      console.error(`  [Page Network Error] ${err.message}`);
      resolve();
    });
  });
}

// Crawl loop runner
async function startScrape() {
  console.log("=== STARTING FULL RECURSIVE WEBSITE MIRROR ===");
  while (crawlQueue.length > 0 && pagesCrawledCount < maxPages) {
    const nextUrl = crawlQueue.shift();
    await crawlPage(nextUrl);
    // Be polite with requests
    await new Promise(r => setTimeout(r, 600));
  }
  console.log("\n=== WEBSITE MIRROR COMPLETE ===");
  console.log(`Pages Crawled: ${crawledUrls.size}`);
  console.log(`Assets Downloaded: ${downloadedAssets.size}`);
}

startScrape();
