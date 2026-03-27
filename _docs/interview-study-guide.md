# 면접 대비 학습 가이드

> 이력서에 적힌 내용을 코드베이스 기반으로 정리한 문서입니다.
> 맥북 반납 전 이 문서를 숙지하세요.

---

## 1. 요금제 구조 개편 · 결제 시스템 전환

### 핵심 파일
- `src/types/PlanTypes.ts` — PlanTier enum, PLAN_REGISTRY, 타입 가드
- `src/config/FeatureMatrix.ts` — 기능별 접근 정책 선언
- `src/lib/evaluateFeatureAccess.ts` — 접근 판정 순수 함수
- `src/hooks/usePlanAccess.ts` — 요금제 정보 훅
- `src/hooks/useFeatureGate.ts` — 기능 접근 권한 훅
- `src/hooks/useVendorLimit.ts` — 쇼핑몰 한도 훅

### 구조 설명

**PlanTier enum (25+ 티어)**
```typescript
export enum PlanTier {
  FREE = 'plan0',
  TRIAL = 'trial',
  BASIC = 'plan10',           // legacy v1
  BASIC_1_2506 = 'basic1_2506',  // legacy v2
  BASIC_NEW = 'basic',           // current v3
  PRO = 'plan30',             // legacy v1
  PRO_3_2506 = 'pro3_2506',  // legacy v2
  PRO_NEW = 'pro',            // current v3
  SUPERADMIN = 'superAdmin',
  // ...
}
```

**Plan Family & Track — 왜 2개로 나눴는지**
- Family: `'free' | 'trial' | 'legacy_v1' | 'legacy_v2' | 'current_v3' | 'superadmin'` — 요금제 세대별 차이가 있어서 family로 구분
- Track: `'free' | 'trial' | 'legacy' | 'current' | 'superadmin'` — 기능 게이팅은 legacy를 하나로 묶어도 충분해서 단순화

**PLAN_REGISTRY — 단일 소스**
각 플랜의 capabilities(maxOrders, maxVendors 등), family, codes, flags를 한 곳에서 관리. 새 요금제 추가 시 여기에 엔트리 하나만 추가하면 됨.

**FeatureMatrix — 선언적 접근 제어**
```typescript
// 각 기능이 어떤 요금제에서 접근 가능한지 family별로 선언
{
  featureName: '매출 분석',
  accessByFamily: {
    free: { minimumPlan: PlanTier.BASIC_NEW },
    trial: ALLOW,
    legacy_v1: { minimumPlan: PlanTier.PRO },
    legacy_v2: { minimumPlan: PlanTier.PRO_3_2506 },
    current_v3: ALLOW,
    superadmin: ALLOW,
  },
  prerequisites: ['vendorConnected'],
  guardMode: 'onboard',
  demoAccessPolicy: 'nonLegacyBypass',
}
```

**evaluateFeatureAccess() — 판정 흐름**
1. API에서 온 planType/planTier를 PlanTier enum으로 정규화
2. family, track 해석
3. FeatureMatrix에서 해당 기능의 config 조회
4. 유저 family에 해당하는 accessRule 확인
5. prerequisites 확인 (쇼핑몰 연동 등)
6. 데모 모드 우회 처리
7. 최종 결과 반환 (canAccess, reason, guardMode 등)

### 면접 예상 질문

**Q: 왜 FeatureMatrix를 만들었나요?**
> 기존에는 13개 페이지에서 각각 요금제를 직접 판단하고 있었습니다. 코드량은 크지 않았지만 관리 포인트가 분산되어 있어서, AI로 작업할 때 관련 없는 코드까지 컨텍스트에 들어와 원하는 퀄리티가 나오지 않았습니다. 신규 요금제가 추가되면 13곳을 전수 수정해야 했고, 이 상태로 가면 AI 활용 효율이 더 떨어질 거라고 판단해 먼저 구조를 정리했습니다.

**Q: family와 track을 왜 나눴나요?**
> 레거시 v1, v2, 현재 v3 요금제가 동시에 운영되고 있었는데, 같은 "프로" 등급이어도 세대별로 제한 사항이 달랐습니다. 접근 제어에서는 세대별 차이를 반영해야 해서 family로 세분화했고, 기능 게이팅처럼 legacy를 하나로 묶어도 되는 경우를 위해 track이라는 단순화된 분류도 만들었습니다.

**Q: 결제 PG 전환에서 가장 중요했던 건?**
> 이관 작업 중에도 다른 기능 릴리즈가 막히지 않는 것이었습니다. 환경변수로 결제 시스템을 분리해서 개발 환경에서는 Toss, 운영에서는 INICIS가 동작하는 구조로 가져갔습니다. 최선의 방법인지는 모르겠지만, 실제로 전환 기간 동안 신기능 릴리즈에 문제가 없었습니다.

---

## 2. 복잡한 분기 검증용 데이터셋

### 핵심 파일
- `src/hooks/planMock.ts` — 요금제 mock 시스템
- `src/hooks/vendorIntegrationMock.ts` — 쇼핑몰/광고 연동 mock (19개 프리셋)

### 구조 설명

**planMock — 요금제 상태 오버라이드**
```typescript
// localStorage에 preset 저장, CustomEvent로 멀티탭 동기화
const PLAN_MOCK_ENABLED = process.env.NODE_ENV === 'development' || process.env.REACT_APP_ENABLE_PLAN_MOCK === 'true';

// 'live'면 실제 API 데이터, PlanTier 값이면 해당 요금제로 오버라이드
type PlanMockPreset = 'live' | PlanTier;
```

**vendorIntegrationMock — 연동 상태 프리셋 (19개)**
```
REAL, NONE, SMARTSTORE_ONLY, GROWTH_ONLY,
GROWTH_WITH_AD_SAME_ORIGIN, GROWTH_WITH_AD_DIFF_ORIGIN,
COUPANG_MP_ONLY, COUPANG_MP_WITH_AD_SAME_ORIGIN,
COUPANG_MP_WITH_AD_REQUEST, MULTI_COMMERCE_PARTIAL_AD_MATCH,
ALL_CONNECTED, ...
```

**핵심 패턴 — 데이터 레이어에서 투명하게 오버라이드**
```typescript
// useVendorIntegrationStatus 내부
const { data } = useQuery({
  queryFn: fetchVendors,
  enabled: !useMockVendors,  // mock이면 API 호출 자체를 건너뜀
});

const allVendors = useMemo(() => {
  return useMockVendors
    ? getVendorIntegrationMockVendors(mockPreset)  // mock 데이터
    : data || [];                                    // 실제 데이터
}, [data, mockPreset, useMockVendors]);
```

### 면접 예상 질문

**Q: 왜 mock 시스템을 만들었나요?**
> 요금제 + 쇼핑몰 + 광고 연동 상태가 엮이면서 분기가 복잡해졌는데, 기존에는 어드민에서 결제 상태를 직접 바꾸거나 실제 쇼핑몰을 연동해야 해서 테스트 한 번에 드는 비용이 컸습니다. 요금제·연동 관련 작업이 이어지면서 이 병목을 더 둘 수 없다고 판단했습니다.

**Q: 기존 mock 라이브러리(MSW 등)와 뭐가 다른가요?**
> MSW는 API 응답을 가로채는 방식인데, 우리 문제는 API 응답이 아니라 "요금제 + 연동 상태 조합"을 빠르게 전환하면서 UI 분기를 확인하는 것이었습니다. 그래서 API를 가로채는 대신, 타입 해석 레이어에서 오버라이드하는 방식을 택했습니다. 훅에서 mock 데이터를 실제 데이터처럼 사용하니까 feature gate나 UI 코드를 수정할 필요가 없었습니다.

---

## 3. 스타일링 환경 재구축

### 핵심 파일
- `src/design-system/tokens.ts` — 디자인 토큰 (CSS vars + Tailwind + MUI 동시 생성)
- `src/design-system/ui/Button/` — 프리셋 기반 버튼 컴포넌트 예시
- `src/theme/base.ts` — MUI 커스텀 테마

### 구조 설명

**토큰 파이프라인 — 단일 소스 → 3개 포맷**
```typescript
const DESIGN_TOKENS = {
  source: DESIGN_TOKEN_SOURCE,   // 원본
  cssVars,                        // CSS 커스텀 프로퍼티
  tailwind,                       // Tailwind config
  mui,                            // MUI theme
};
```

**프리셋 기반 컴포넌트 패턴**
```typescript
// 이름으로 스타일 조합을 선택
const BUTTON_PRESETS = {
  'primary-fill': { variant: 'contained', color: 'primary', className: 'tw-rounded-lg tw-font-semibold' },
  'secondary-outline': { variant: 'outlined', color: 'secondary', className: 'tw-rounded-lg tw-border-2' },
};

// 사용
<Button preset="primary-fill" size="md">확인</Button>
```

**MUI 커스텀 테마 — 확장된 인터페이스**
- colors.alpha (투명도 스케일)
- colors.gradients (그래디언트 프리셋)
- sidebar, header 전용 테마 속성
- 3개 테마 변형: Default, ChromeExt, PureLight

### 면접 예상 질문

**Q: 왜 MUI에서 Tailwind로 전환했나요?**
> 3가지 이유가 있었습니다. 첫째, Next.js 마이그레이션을 대비했을 때 runtime CSS(Emotion)는 비권장이라 기술부채가 될 거라고 봤습니다. 둘째, MUI는 이미 만들어진 컴포넌트를 커스텀하는 구조라 원하는 결과를 얻으려면 문서를 찾아야 하는 일이 잦아 AI와 궁합이 좋지 않았습니다. 셋째, 피그마 MCP로 디자인을 가져올 때 Tailwind가 훨씬 수월했습니다.

**Q: 전환 결과는?**
> 피그마 MCP 사용 시 이전에는 레이아웃을 반드시 수작업으로 잡아야 했는데, 이후에는 디테일만 손보면 되는 수준이 됐습니다. 다만 MUI를 전부 걷어내지는 못하고 혼용 상태입니다.

**Q: 토큰을 왜 단일 소스로 관리했나요?**
> CSS, Tailwind, MUI 세 곳에서 같은 색상을 쓰는데, 각각 따로 정의하면 불일치가 생깁니다. 하나의 source에서 세 포맷을 자동 생성하면 토큰 하나만 수정해도 전체가 동기화됩니다.

---

## 4. GTM 트래킹 체계 분리

### 핵심 파일
- `src/shared/tracking/api/gtm-client.ts` — dataLayer push 클라이언트
- `src/shared/tracking/model/types.ts` — 이벤트별 타입 정의
- `src/shared/tracking/hooks/useAuthTracking.ts` — 도메인 훅 예시
- 기타 도메인 훅: useAdAnalysisTracking, useAccountTracking, useServiceTracking, useCalculatorTracking

### 구조 설명

**GTM Client — 핵심 함수**
```typescript
trackEvent(data)         // dataLayer push (즉시)
trackLinkEvent(data)     // dataLayer push + 300ms 대기 (네비게이션 전 처리 보장)
trackMultipleEvents()    // 배치 push
```

**이벤트 타입 시스템 — 컴파일 타임 오류 차단**
```typescript
interface ViewAdCampaignListParams {
  page_index: 'ad_analysis';
  service_page: '캠페인 리스트' | '캠페인 상세' | '캠페인 상세 > 상품';
  period_type: 'yesterday' | '1week' | '1month' | 'custom';
  period_from: string;
  period_to: string;
  campaign_count: number;
  warning_count: number;
  danger_count: number;
  is_demo: 'Y' | 'N';
}
```

**해싱 전략 — 개인정보 보호**
```typescript
const hashUserId = (userId: string) => crypto.SHA256(userId + TRACKING_SALT).toString();
const hashEmail = (email: string) => crypto.SHA256(email).toString();
const hashPhone = (phone: string) => {
  const e164Phone = formatToE164(phone);  // +82XXXXXXXXXX 정규화
  return crypto.SHA256(e164Phone).toString();
};
```

**도메인 훅 패턴**
```typescript
export const useSignUpTracking = () => {
  return (params: SignUpTrackingParams) =>
    trackMultipleEvents([
      { params: undefined },  // 이전 파라미터 초기화 (데이터 오염 방지)
      { event: TRACKING_EVENTS.SIGN_UP, event_name: 'sign_up', ... },
    ]);
};
```

### 면접 예상 질문

**Q: 왜 trackingHelper.ts를 분리했나요?**
> 600줄짜리 파일에 Mixpanel, Hotjar, GTM이 섞여 있었는데, AI로 트래킹 코드를 작업할 때 관심사가 섞인 파일이 방해가 됐습니다. GA4 이벤트만 다루는 구조로 분리하면 AI가 판단할 게 없어져서 정확도가 올라갈 거라고 생각했고, 실제로 광고 분석 GA4 이벤트 15개 추가 시 AI가 틀릴 수 없는 구조가 됐습니다.

**Q: 점진적 전환 전략은?**
> 기존 Mixpanel/Hotjar는 trackingHelper에 그대로 두고, 새로 추가하는 GTM/GA4만 shared/tracking/ 구조로 작성했습니다. 전면 교체가 아니라 새 코드만 새 구조로 가는 방식이었습니다.

**Q: 이전 파라미터 초기화는 왜 하나요?**
> GTM dataLayer는 이전 push의 파라미터가 남아있어서, 다음 이벤트에 의도하지 않은 값이 섞일 수 있습니다. 매 이벤트 전에 params: undefined를 먼저 push해서 오염을 방지했습니다.

---

## 5. 초기 로딩 성능 개선

### 핵심 파일
- `src/routes/index.tsx` — lazy import + 라우트 정의
- `vite.config.ts` — 멀티앱 빌드 설정

### 구조 설명

**라우트 레벨 lazy loading**
```typescript
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const CoachingNote = lazy(() => import('@/pages/CoachingNote'));
// 50+ lazy imports
```

**Named export를 lazy로 가져오는 패턴**
```typescript
const CommerceCompleteDialog = lazy(() =>
  import('@/pages/Dialogs/CommerceGuideDialog').then(
    module => ({ default: module.CommerceCompleteDialog })
  )
);
```

**멀티앱 아키텍처 (6개 독립 앱)**
```
cashflow, margin, purchase, chrome, globalMargin, growth
```
각각 별도 entry point, 별도 template, 별도 빌드.

### 면접 예상 질문

**Q: 메인 번들이 10MB였다는 게 무슨 뜻인가요?**
> lazy loading이 전혀 없어서 모든 페이지 코드가 하나의 번들에 포함됐습니다. 사용자가 대시보드만 보려고 해도 50개 페이지 전체를 다운로드해야 했고, fallback UI도 없어서 다운로드 중에 흰 화면이 노출됐습니다.

**Q: React.lazy의 한계는?**
> 네트워크가 느린 환경에서 chunk 로딩이 실패할 수 있습니다. 또한 SSR에서는 동작하지 않아서 Next.js 전환 시 next/dynamic으로 교체해야 합니다. 그리고 lazy만으로는 chunk 크기 자체를 줄이지 못해서, manualChunks로 vendor/mui/charts/grid를 분리하는 작업도 함께 했습니다.

---

## 6. DataGrid 전체화면 · 컬럼 접기

### 핵심 개념

**MUI Dialog(Portal) 문제**
- Dialog는 Portal 기반 → DOM 트리 밖에 새 DOM 생성
- 그 안에 AG Grid를 마운트하면 그리드 인스턴스가 2개
- 전체화면에서 조작한 스크롤/필터/정렬이 축소 시 사라짐

**해결: CSS position: fixed**
- 기존 그리드 컨테이너의 CSS만 토글
- `position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 1300;`
- 그리드 인스턴스는 그대로 → 상태 유지

### 면접 예상 질문

**Q: Portal이 뭔가요?**
> React Portal은 컴포넌트를 부모 DOM 트리 밖의 다른 DOM 노드에 렌더링하는 기능입니다. MUI Dialog는 내부적으로 Portal을 사용해서 body 직하에 렌더링합니다. 이벤트 버블링은 React 트리를 따르지만 DOM 구조는 분리됩니다.

**Q: 왜 처음부터 fixed를 안 쓰고 Dialog를 썼나요?**
> prop 하나로 바로 전체화면이 되니까 가장 빠르게 구현할 수 있는 방법이었습니다. 붙여보고 나서야 그리드 상태 단절 문제를 발견했고, 원인이 "인스턴스가 2개"라는 게 명확했기 때문에 바로 걷어냈습니다.

---

## 7. 숫자 0과 미입력 구분

### 핵심 개념

**JavaScript falsy의 함정**
```javascript
!0 === true           // 0이 falsy
0 || '기본값'          // '기본값' 반환 (0이 무시됨)
if (!value)            // value가 0이면 true
```

**수정 패턴**
```typescript
// Before — 0을 빈 값으로 취급
if (!value) return '-';

// After — null/undefined만 빈 값으로 취급
if (value === null || value === undefined) return '-';
```

**영향 범위**
- BasicFormatter.tsx (그리드 숫자 포매터) — 모든 숫자 셀에 영향
- calc.ts (매입원가 계산) — 부가세율, 합산 계산에 영향
- 순이익/마진율 계산에도 영향 가능성 있었으나 정밀 검증 못함

### 면접 예상 질문

**Q: 이 버그를 어떻게 발견했나요?**
> 매입원가에 0을 입력하면 미입력으로 표시된다는 버그 리포트를 받았습니다. 추적해보니 단일 지점이 아니라 공통 유틸 함수가 0을 빈 값으로 판정하고 있었고, 이 함수를 그리드의 모든 숫자 포매터가 사용하고 있었습니다.

**Q: 왜 정밀 검증을 못 했나요?**
> falsy 패턴이 계산 로직 곳곳에 있어서 순이익·마진율에도 영향이 있을 수 있었지만, 매입가가 정확히 0원인 상품의 과거 계산 결과를 비교할 기준 데이터가 없었습니다. null 체크를 교체하고 이후 데이터로는 정상 동작을 확인했지만, 과거 데이터가 어디까지 왜곡됐는지는 확인하지 못했습니다.

---

## 8. 페이지 스캐폴딩 도구

### 핵심 파일
- `scripts/scaffold-page.mjs` — CLI 스크립트 (627줄)
- `templates/page-feature/base/` — 기본 템플릿
- `templates/page-feature/optional/` — 선택적 모듈 (api, mobile, search-area, list-area)

### 구조 설명

**사용법**
```bash
npm run scaffold:page -- CoachingNote --with-search-list --route /lab/coaching-note --menu-name "코칭노트"
```

**자동 생성되는 것**
1. `src/pages/CoachingNote/` 폴더 구조 (components, hooks, types, utils, constants)
2. 각 폴더에 보일러플레이트 파일 (View, useHook, types)
3. `src/routes/index.tsx`에 lazy import + 라우트 등록
4. `src/assets/data/left-menu.ts`에 메뉴 항목 추가

**템플릿 패턴 — 관심사 분리 강제**
```typescript
// index.tsx — 페이지 진입점
const Page = () => {
  const { cards, handlePrimaryAction } = useFeature();  // 로직
  return <FeatureView cards={cards} onPrimaryAction={handlePrimaryAction} />;  // UI
};

// components/View.tsx — 순수 UI
// hooks/useFeature.ts — 로직 + 상태
// types/ — 타입 정의
```

### 면접 예상 질문

**Q: 왜 코드 구조를 정비하는 대신 스캐폴딩을 택했나요?**
> AI가 기존 코드만 보고 라우터·메뉴 등록 패턴까지 파악하려면 코드 구조 자체를 AI-friendly하게 리팩토링해야 했는데, 그 방향에 확신이 없었고 리소스 대비 효과가 불확실했습니다. 반면 스캐폴딩은 1초면 끝나고, AI가 놓치던 부분이 구조적으로 사라지는 확실한 해결책이었습니다.

---

## 9. 크롬 익스텐션

### 핵심 개념

**왜 익스텐션인가**
- 사용자 브라우저에서 실행 → DOM 접근 자유
- 네이버의 크롤링 전쟁 대비 → 봇 탐지 우회 이점
- 쿠팡/네이버 상품 페이지에서 마진 계산기 즉시 실행

**기능**
- 상품 클릭 시 익스텐션에 데이터 주입
- 플랫폼별 수수료 자동 적용
- 발굴 아이템 서비스 연동 (저장·관리)

**결과 — 솔직한 실패**
- 1,000+ 다운로드
- 결제 전환율 현저히 낮음
- 소싱 유저 ≠ 장사왕 타겟 고객

### 면접 예상 질문

**Q: 실패라고 했는데, 배운 점은?**
> 다운로드 수와 실제 전환은 다르다는 걸 확인했습니다. 소싱 유저는 아이템을 찾는 단계에 있고, 장사왕은 이미 판매 중인 셀러를 위한 서비스여서 고객 단계가 달랐습니다. 가설을 검증하는 것 자체는 의미 있었지만, 타겟 고객의 단계를 더 정밀하게 정의했어야 했습니다.

---

## 10. Skills — React 패턴

### 실제 코드에서 확인된 패턴

**파생 상태는 저장하지 않고 계산**
```typescript
// usePlanAccess.ts
const isFree = useMemo(() => currentPlan === PlanTier.FREE, [currentPlan]);
const isPaid = useMemo(() => !isFree && !isTrial, [isFree, isTrial]);
// ❌ useState로 isFree를 별도 관리하지 않음
```

**useCallback은 훅에서 반환하는 함수에만**
```typescript
// useVendorIntegrationStatus.ts
const hasLinkedVendorByMarketCode = useCallback(
  (code: string) => linkedActiveVendorsByMarketCode[code]?.length > 0,
  [linkedActiveVendorsByMarketCode]
);
// 인라인 이벤트 핸들러에는 useCallback 안 씀
```

**React.memo 거의 안 씀**
- 컴포넌트 전체에서 1개만 사용 (Chart 컴포넌트)
- props drilling을 허용하고 데이터 흐름을 명시적으로 유지

**전역 상태 최소화**
- Redux Toolkit은 레거시로 남아있어서 사용 중 (auth, global)
- 새로운 상태는 Zustand로 가볍게 관리
- 전역 상태를 선호하지 않음

**useReducer 안 씀**
- 복잡한 상태도 useState로 처리
- 상태 로직이 복잡하면 커스텀 훅으로 분리

**데이터 페칭 — React Query**
```typescript
const { data, isLoading } = useQuery({
  queryKey: QUERY_KEY,
  queryFn: fetchData,
  staleTime: 10 * 60 * 1000,  // 10분
  enabled: !useMock,
});
```

### 면접 예상 질문

**Q: React.memo를 왜 안 쓰나요?**
> 대부분의 리렌더는 성능에 문제가 되지 않고, memo의 비교 비용이 오히려 더 클 수 있습니다. 성능 문제가 실제로 측정되면 그때 적용하는 편입니다. 무분별한 memo보다 상태를 적절한 위치에 배치하는 게 더 효과적이라고 생각합니다.

**Q: 전역 상태를 왜 선호하지 않나요?**
> 전역 상태는 어디서든 접근 가능하다는 장점이 있지만, 데이터 흐름을 추적하기 어렵게 만듭니다. 필요한 범위에서 가능한 가까이 상태를 두는 게 명시적이고, AI가 코드를 파악할 때도 더 수월합니다.

**Q: useMemo를 많이 쓰는데, React Compiler가 나오면?**
> React Compiler가 자동 메모이제이션을 해주면 수동 useMemo는 대부분 걷어낼 수 있습니다. 현재는 React 18이라 수동으로 쓰고 있지만, 메모이제이션 자체보다 훅 호출 순서를 일정하게 유지하는 것, 불필요한 리렌더를 유발하는 구조를 만들지 않는 것에 더 신경 쓰고 있습니다.

---

## 11. 공통 면접 대비

### "왜 AI를 많이 언급하나요?"

> 1인 프론트엔드로 제품 전 영역을 맡고 있어서, AI를 잘 활용하는 것이 생산성에 직결됩니다. 다만 AI를 잘 쓴다는 건 프롬프트를 잘 쓴다는 게 아니라, AI가 좋은 결과를 낼 수 있는 코드 환경을 만드는 것이라고 생각합니다. 관심사가 분리되어 있고, 매직 스트링이 없고, 패턴이 일관된 코드베이스에서 AI는 확실히 더 정확하게 동작합니다.

### "어떤 AI 도구를 쓰나요?"

> Claude Code, Cursor, Codex를 일상적으로 사용합니다. 코드 작성·리팩토링에는 Claude Code와 Cursor를, 디자인→코드 전환에는 피그마 MCP를 사용합니다. 스캐폴딩 도구를 Claude/Codex skills로 구축할 예정이기도 합니다.

### "1인 개발자로서 어려운 점은?"

> 코드 리뷰어가 없다는 것과, 기획·디자인·개발·QA를 혼자 판단해야 한다는 점입니다. 그래서 AI를 리뷰어처럼 활용하고, 정책을 config에 선언해서 암묵적인 판단을 줄이는 방향으로 보완하고 있습니다.

### "PMF를 못 찾은 상황이라고 했는데?"

> 서비스 자체는 운영 중이고 유료 사용자도 있지만, 빠르게 다양한 기능을 테스트해야 하는 상황이었습니다. 그래서 스캐폴딩, mock 시스템 같은 개발 환경 투자가 단순 기술부채 정리가 아니라 실험 속도를 높이기 위한 판단이었습니다.
