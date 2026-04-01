const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// companies.js에서 회사 목록 파싱
const OUTPUT_DIR = path.join(__dirname, 'pdf');
const RESUME_NAME = '이수민';
const RESUME_PATH = `file://${path.join(__dirname, 'pdf', '이력서_standard.html')}`;

async function generatePDFs() {
  // pdf 폴더 생성
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  console.log('생성 중: 표준 이력서');
  await page.goto(RESUME_PATH, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: path.join(OUTPUT_DIR, `${RESUME_NAME}_프론트엔드_이력서.pdf`),
    format: 'A4',
    printBackground: true,
    margin: { top: '16mm', bottom: '16mm', left: '12mm', right: '12mm' },
  });
  console.log('  -> 완료');

  // 2. 포트폴리오
  console.log('생성 중: 포트폴리오');
  await page.goto(`file://${path.join(__dirname, 'portfolio.html')}`, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: path.join(OUTPUT_DIR, `${RESUME_NAME}_프론트엔드_포트폴리오.pdf`),
    format: 'A4',
    printBackground: true,
    margin: { top: '16mm', bottom: '16mm', left: '12mm', right: '12mm' },
  });
  console.log('  -> 완료');

  await browser.close();
  console.log(`\n전체 완료! ${OUTPUT_DIR} 폴더를 확인하세요.`);
}

generatePDFs().catch(console.error);
