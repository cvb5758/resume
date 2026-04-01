const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.join(__dirname, 'pdf');

async function generateCareerDocs() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 1. 이력서 (Brief)
  console.log('생성 중: 이력서 (Standard)');
  await page.goto(`file://${path.join(OUTPUT_DIR, '이력서_standard.html')}`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000)); // 폰트 로딩 대기
  await page.pdf({
    path: path.join(OUTPUT_DIR, '이수민_이력서.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '14mm', bottom: '14mm', left: '12mm', right: '12mm' },
  });
  console.log('  -> 이수민_이력서.pdf 완료');

  // 2. 경력기술서 (Detailed)
  console.log('생성 중: 경력기술서 (Detailed)');
  await page.goto(`file://${path.join(OUTPUT_DIR, '경력기술서_detailed.html')}`, { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  await page.pdf({
    path: path.join(OUTPUT_DIR, '이수민_경력기술서.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: '14mm', bottom: '14mm', left: '12mm', right: '12mm' },
  });
  console.log('  -> 이수민_경력기술서.pdf 완료');

  await browser.close();
  console.log(`\n전체 완료! ${OUTPUT_DIR} 폴더를 확인하세요.`);
}

generateCareerDocs().catch(console.error);
