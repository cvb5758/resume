# Git Commit References for Resume Evidence

## ZERO TO ONE PROJECTS

### Chrome Extension
**Repository:** `sellerking-extension`

| Feature | Commit Hash | Date | Message |
|---------|------------|------|---------|
| Project Start | 1143dc3 | 2025-03-14 | first commit |
| Initial Feature | be5188a | 2025-03-14 | feat: 쿠팡 카테고리 수수료 도입 |
| Core Setup | 2a2f6e1 | 2025-06-04 | feat: 환경 설정 파일 및 UI 컴포넌트 추가, 쿠팡 판매자 정보 수집 기능 구현 |
| Google OAuth | b23267b | 2025-07-11 | feat: Google OAuth 기능 추가 및 관련 코드 정리 |
| Gemini AI | 6c00ed2 | 2025-06-24 | feat: 리뷰 분석 기능 추가 및 Gemini API를 통한 인사이트 제공 기능 구현 |
| Manual Scraping | 93a43be | 2025-07-04 | feat: 수동 스크래핑 기능 추가 및 콘텐츠 스크립트 재주입 로직 개선 |
| UI Redesign | 354767d | 2025-06-27 | feat: 익스텐션 UI 개편 |
| SmartStore Support | fbff8ed | 2025-06-25 | feat: 네이버 스마트스토어 완전 지원 및 마진율 계산 가이드 추가 |
| Review Analysis | 724558d | 2025-06-25 | feat: 스마트스토어 및 쿠팡 계산기 기능 개선 및 리뷰 수집 기능 추가 |

**Summary:** Complete product developed from scratch: 43 commits over 8 months with multi-platform support, auth, AI integration, and full UI.

---

### Ads Diagnosis Dashboard
**Repository:** `sellerking-frontend`

| Feature | Commit Hash | Date | Message |
|---------|------------|------|---------|
| Core Feature | 9f27e22e | 2026-01-20 | feat(AdsDiagnosis): 상태 코드 RED/YELLOW/GREEN 통일 및 DiagnosisDetailModal 구현 |
| Comparison Modal | 6da4d68d | 2026-01-20 | feat(AdsDiagnosis): ComparisonModal 추가 및 매입원가 버튼 campaignId 연동 |
| Loading State | 1643cbaa | 2026-01-20 | fix: AdsDiagnosis 페이지 진입 시 로딩 UX 개선 |
| UI Polish | ad97193c | 2026-01-20 | feat: AdsDiagnosis GRAY 상태 처리 및 UI 개선 |
| Campaign Routing | 2b835645 | 2026-01-20 | feat(AdsDiagnosis): 캠페인명 아이콘 클릭 시 상세 분석 페이지로 이동 |
| Analytics | 1a7fc8a7 | 2026-01-21 | feat(AdsDiagnosis): GA4 이벤트 트래킹 구현 |

**Summary:** 20+ commits in 3 days. Complete diagnostic feature with modals, filtering, analytics, and routing.

---

### Admin Dashboard Pages
**Repository:** `sellerking-admin-frontend`

| Page | Initial Commit | Date | Message |
|------|----------------|------|---------|
| Credit Management | 95914c3 | 2026-02-12 | feat: 크레딧 관리 어드민 페이지 구현 |
| Coupon Management | e8a3556 | 2026-02-12 | feat: 쿠폰 관리 어드민 페이지 구현 |
| Referral Management | 598f046 | 2026-02-13 | feat: 추천인 관리 어드민 페이지 구현 |
| Business Location | bb85ae5 | 2026-03-05 | feat: 사업장 관리 페이지 추가 및 검색 결과 empty state 개선 |

**Summary:** 4 complete admin pages developed in Feb-Mar 2026.

---

### Cash Flow & Settlement Pages
**Repository:** `sellerking-frontend`

| Feature | Date | Message |
|---------|------|---------|
| Cash Flow Feature (branch start) | 2024-08-20 | Merge pull request #3 from moonklabs/develop-cashflow |
| Cash Flow Banner | 2024-09-24 | feat: Home Cashflow Banner Add |
| Settlement Components | 2024-09 | feat: ProductsProfit, AnalysisSales, AnalysisSettlements |
| Tailwind Migration | 2025-01+ | refactor: migrate Payment, CashFlow, components to Tailwind CSS |

**Summary:** 30+ commits building complete financial feature set with multiple pages.

---

## 100→1 INFRASTRUCTURE PROJECTS

### Tailwind CSS Migration
**Repository:** `sellerking-frontend`

| Milestone | Commit Hash | Date | Message |
|-----------|------------|------|---------|
| MUI Consolidation | 5edd1ba4 | 2025-12-08 | refactor: mui + tailwind 병합 |
| MUI Update | 66b35bf1 | 2025-12-08 | refactor: mui 5.1 -> 7.3 버전 업데이트 - 버전 변경에 따른 Grid 컴포넌트 마이그레이션 |
| Ads Page Tailwind | 30f83f69 | 2025-12-10 | feat: 쿠팡 광고분석 페이지 개편 - tailwindCSS 적용 - 광고 대시보드 기획안 1차 적용 |
| Tailwind v4 Styling | 8a68fb45 | 2025-12-10 | feat: AdsAnalysis Tailwind v4 스타일링 및 차트 개선 |

**Summary:** 9-month effort consolidating styling frameworks and applying design tokens across multiple pages.

---

### Design System Manager
**Repository:** `sellerking-design-manager`

| Milestone | Commit Hash | Date | Message |
|-----------|------------|------|---------|
| MVP Setup | 7f54806 | 2026-03-08 | 초기 프로젝트 세팅: SellerKing Design System Manager MVP |
| DB Integration | e783cd8 | 2026-03-08 | feat: Supabase DB 연동 (서울 리전) |
| Token Catalog | 4db2602 | 2026-03-08 | feat: Token Catalog + Usage Guidelines 페이지 추가 |
| Spacing Spec | 5c6a928 | 2026-03-08 | feat: Component Spacing Spec 페이지 추가 |

**Summary:** Centralized design token management system launched.

---

### Admin UI Standardization
**Repository:** `sellerking-admin-frontend`

| Change | Commit Hash | Date | Message |
|--------|------------|------|---------|
| Button Standardization | 594f141 | 2026-03-19 | style: standardize button colors |
| Search Field Sizing | 556985c | 2026-03-20 | style: unify admin search field sizing |
| UI Interactions | 7bb1b66 | 2026-03-19 | style: align admin ui interactions |
| Credit Search Alignment | d612694 | 2026-03-20 | style: align credit search with admin filters |
| Credit Page UX | bc31860 | 2026-03-19 | feat(credit): 크레딧 현황 페이지 UX 개선 |
| Coupon Page Style | 68d9e84 | 2026-03-19 | style: 쿠폰 현황 페이지 UI 일관성 개선 |
| Referral Pagination | 097a706 | 2026-03-19 | style: 추천인 현황 페이지네이션을 전체 회원과 동일한 형식으로 통일 |
| Table Refinement | defb2e0 | 2026-03-19 | style: 크레딧 현황 테이블 컬럼 너비 및 패딩 개선 |
| Tab Styling | 63fda6e | 2026-03-19 | style: 탭 영역 스타일 개선 |

**Summary:** 9 coordinated style commits in 2 days (Mar 19-20) unifying UI across admin pages.

---

### Code Cleanup & Refactoring
**Repository:** `sellerking-admin-frontend`

| Item | Commit Hash | Date | Message |
|------|------------|------|---------|
| Remove Debug Logs | 43abfe4 | 2026-03-18 | refactor: PagDetailPopup.vue 불필요한 디버그 로그 제거 |
| Remove Sensitive Logging | 18ce869 | 2026-03-18 | refactor: 민감한 정보 로깅 제거 |
| Env Variable Refactor | af659a0 | 2026-03-18 | fix: 하드코딩된 stg-app URL을 환경변수로 전환 |
| Remove Router Backup | c744cd0 | 2026-03-20 | chore: remove unused router backup |
| Remove Auth Helper | 3743a07 | 2026-03-20 | chore: remove unused authHelper.js |
| Remove Composables | c744cd0 | 2026-03-20 | chore: remove unused composables folder |
| Remove API Types | cef6075 | 2026-03-20 | chore: 미사용 api.types.ts 삭제 |

**Summary:** Systematic technical debt removal in 3-day push (Mar 18-20).

---

## PARALLEL WORK EVIDENCE

### March 2026 High Velocity Period
**Admin Frontend:** 56 commits (combination of new pages + UI standardization + cleanup)
- New page features: Feb 12-Mar 5
- UI standardization sprint: Mar 19-20
- Cleanup effort: Mar 18-20

Shows ability to ship infrastructure + features simultaneously.

### January 2026 Parallel Work
**Main Frontend:** 92 commits
- Ads Dashboard: 20+ feature commits (Jan 20-22)
- Tailwind migration: Continuing throughout
- Other features: Payment, Purchase updates

Shows multi-threaded development capability.

---

## PRODUCTIVITY EVIDENCE

### Commit Frequency Analysis

**Chrome Extension:**
```
2025-03: 2 commits (setup)
2025-06: 18 commits (feature sprint)
2025-07: 22 commits (continued development)
Total: 43 commits over 8 months
```

**Admin Frontend:**
```
2026-02: 8 commits (new pages)
2026-03: 56 commits (features + infrastructure)
Peak period: Mar 19-20 (9 commits in 2 days)
```

**Main Frontend:**
```
2025-12: 90 commits (sustained high velocity)
2026-01: 92 commits (sustained high velocity)
Average 2024-2025: 80-100 commits/month
```

---

## HOW TO USE THIS EVIDENCE

### For "Zero to One" Claim:
1. Chrome Extension: Show git history from first commit (1143dc3) through feature expansion
2. Ads Dashboard: Show 3-day rapid development (Jan 20-22)
3. Admin Pages: Show 4 pages created from scratch
4. Cash Flow: Show sustained development through branches and merges

### For "100→1 Volume Reduction" Claim:
1. Tailwind Migration: Show multi-page refactoring effort
2. Design System: Show centralized token system
3. UI Standardization: Show coordinated multi-page styling alignment
4. Code Cleanup: Show technical debt removal freeing capacity

### Metrics to Highlight:
- 3-day feature build (Ads Dashboard) = efficient execution with AI
- 56 commits in March = high output month combining infra + features
- 9 commits in 2 days (styling) = systematic approach to reducing duplicate work
- 80-100 commits/month sustained = consistent high velocity
