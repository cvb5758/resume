const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// companies.js에서 회사 목록 파싱
const companiesRaw = fs.readFileSync(path.join(__dirname, 'companies.js'), 'utf-8');
const companies = {};
const nameRegex = /(\w+):\s*\{[^}]*name:\s*'([^']+)'/g;
let match;
while ((match = nameRegex.exec(companiesRaw)) !== null) {
  // 주석 템플릿 제외
  if (match[1] === 'companyKey') continue;
  companies[match[1]] = match[2];
}

const OUTPUT_DIR = path.join(__dirname, 'pdf');
const RESUME_NAME = '이수민';
const INDEX_PATH = `file://${path.join(__dirname, 'index.html')}`;

async function generatePDFs() {
  // pdf 폴더 생성
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // 1. 범용 이력서 (회사 선택 없음)
  console.log('생성 중: 범용 이력서');
  await page.goto(INDEX_PATH, { waitUntil: 'networkidle0' });
  await page.pdf({
    path: path.join(OUTPUT_DIR, `${RESUME_NAME}_프론트엔드_이력서.pdf`),
    format: 'A4',
    printBackground: true,
    margin: { top: '16mm', bottom: '16mm', left: '12mm', right: '12mm' },
  });
  console.log('  -> 완료');

  // 2. 회사별 이력서
  for (const [key, name] of Object.entries(companies)) {
    // 회사명에서 파일명 추출 (첫 번째 · 앞부분)
    const companyShort = name.split('·')[0].trim();
    const fileName = `${RESUME_NAME}_프론트엔드_이력서_${companyShort}.pdf`;

    console.log(`생성 중: ${companyShort}`);
    await page.goto(`${INDEX_PATH}?company=${key}`, { waitUntil: 'networkidle0' });

    // 회사 선택 + 레벨/순서 적용 대기
    await page.waitForSelector('#motivation-text');
    await new Promise(r => setTimeout(r, 300));

    await page.pdf({
      path: path.join(OUTPUT_DIR, fileName),
      format: 'A4',
      printBackground: true,
      margin: { top: '16mm', bottom: '16mm', left: '12mm', right: '12mm' },
    });
    console.log(`  -> ${fileName}`);
  }

  // 3. 포트폴리오
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
