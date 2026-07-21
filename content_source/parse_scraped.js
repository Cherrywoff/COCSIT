const fs = require('fs');
const path = require('path');

const rawDir = path.join(__dirname, 'scraped_raw');

function cleanHtml(html) {
  // Replace script and style tags
  let cleaned = html.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, '');
  cleaned = cleaned.replace(/<style[^>]*>([\s\S]*?)<\/style>/gi, '');
  // Replace double viewports/meta/comments
  cleaned = cleaned.replace(/<!--([\s\S]*?)-->/g, '');
  return cleaned;
}

function extractMainText(filename, startKeyword, endKeyword) {
  const filePath = path.join(rawDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`File ${filename} not found.`);
    return '';
  }

  const html = cleanHtml(fs.readFileSync(filePath, 'utf8'));
  
  // Find paragraphs
  const pRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  let paragraphs = [];
  while ((match = pRegex.exec(html)) !== null) {
    const text = match[1].replace(/<[^>]*>/g, '').trim();
    if (text.length > 30) { // filter short texts
      paragraphs.push(text);
    }
  }

  // Filter paragraphs by checking content context
  return paragraphs;
}

console.log("=== PARSING SCRAPED PAGES ===");

// 1. About RES
const resParagraphs = extractMainText('about_res.html');
const resInfo = {
  title: "About Royal Education Society",
  paragraphs: resParagraphs.filter(p => !p.includes('Login') && !p.includes('Latur') && !p.includes('Accredited') && !p.includes('Syllabus') && !p.includes('Time-Table'))
};
fs.writeFileSync(path.join(__dirname, 'res_info.json'), JSON.stringify(resInfo, null, 2));
console.log(`Parsed about_res.html: ${resInfo.paragraphs.length} paragraphs saved.`);

// 2. Principal's Message
const principalParagraphs = extractMainText('about_principals_desk.html');
const principalMessage = {
  title: "Principal's Desk Message",
  author: "Dr. R. S. Awasthi",
  paragraphs: principalParagraphs.filter(p => !p.includes('Login') && !p.includes('Syllabus') && !p.includes('Royal Education') && !p.includes('Accredited'))
};
fs.writeFileSync(path.join(__dirname, 'principal_message.json'), JSON.stringify(principalMessage, null, 2));
console.log(`Parsed about_principals_desk.html: ${principalMessage.paragraphs.length} paragraphs saved.`);

// 3. Chairman's Message
const chairmanParagraphs = extractMainText('about_chairmans_desk.html');
const chairmanMessage = {
  title: "Chairman's Desk Message",
  author: "Dr. M. R. Patil",
  paragraphs: chairmanParagraphs.filter(p => !p.includes('Login') && !p.includes('Syllabus') && !p.includes('Royal Education') && !p.includes('Accredited'))
};
fs.writeFileSync(path.join(__dirname, 'chairman_message.json'), JSON.stringify(chairmanMessage, null, 2));
console.log(`Parsed about_chairmans_desk.html: ${chairmanMessage.paragraphs.length} paragraphs saved.`);

// 4. Vice Chairman Message
const viceChairmanParagraphs = extractMainText('about_vice_chairman.html');
const viceChairmanMessage = {
  title: "Vice-Chairman's Desk Message",
  author: "Mr. L. M. Patil",
  paragraphs: viceChairmanParagraphs.filter(p => !p.includes('Login') && !p.includes('Syllabus') && !p.includes('Royal Education') && !p.includes('Accredited'))
};
fs.writeFileSync(path.join(__dirname, 'vice_chairman_message.json'), JSON.stringify(viceChairmanMessage, null, 2));
console.log(`Parsed about_vice_chairman.html: ${viceChairmanMessage.paragraphs.length} paragraphs saved.`);

// 5. Advisory Board
const advisoryParagraphs = extractMainText('about_college_advisory_board.html');
const advisoryInfo = {
  title: "College Advisory Board",
  members: advisoryParagraphs.filter(p => !p.includes('Login') && !p.includes('Syllabus') && !p.includes('Royal Education') && !p.includes('Accredited'))
};
fs.writeFileSync(path.join(__dirname, 'advisory_board.json'), JSON.stringify(advisoryInfo, null, 2));
console.log(`Parsed about_college_advisory_board.html: ${advisoryInfo.members.length} items saved.`);
