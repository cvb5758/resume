# 프론트엔드 아키텍처 설계 근거 정리

> 작성일: 2026-03-27
> 목적: 현재 프로젝트의 주요 설계 결정에 대한 "왜?" 정리

---

## 목차

1. [스냅샷 방식의 변경 감지](#1-스냅샷-방식의-변경-감지)
2. [컴포넌트 구조와 Lazy Loading](#2-컴포넌트-구조와-lazy-loading)
3. [디자인 토큰 파이프라인](#3-디자인-토큰-파이프라인)
4. [FSD 도입 근거](#4-fsd-도입-근거)

---

## 1. 스냅샷 방식의 변경 감지

### 현재 방식

매입원가 관리 페이지에서 **원본 스냅샷 + Changed 플래그 하이브리드 방식** 사용.

```
데이터 로드 → JSON.parse(JSON.stringify())로 깊은 복사 → originDataProvider에 저장
셀 변경 → 원본과 현재값을 PURCHASE_COMPARE_FIELDS(11개 필드)로 비교
→ 실제 변경 있으면 changed=true, 없으면 changed=false
```

### 왜 dirty flag가 아닌가?

dirty flag의 기본 동작:

```typescript
let dirty = false;
onCellChanged = () => { dirty = true; };
```

한번 true가 되면 "뭐가 바뀌었는지", "원래 뭐였는지" 모른다. "건드렸다"는 사실만 기록.

#### 문제 1: 되돌림 감지 불가

```
매입가 5,000 → 6,000  →  dirty = true
매입가 6,000 → 5,000  →  dirty = true (변경 이벤트가 또 발생했으니까)
```

원래 값으로 돌아왔지만 dirty는 여전히 true.
→ 불필요한 API 호출 발생

스냅샷 방식은 원본(5,000)과 현재값(5,000)을 비교 → 같음 → changed=false → 저장 제외

#### 문제 2: 자동 계산 파생 필드 오탐

```
사용자가 매입가 하나만 변경
→ calculateValue()가 순이익, 마진율 등 자동 계산
→ dirty flag면 파생 필드까지 전부 "변경됨"으로 찍힘
```

스냅샷 방식은 입력 필드 11개만 비교하면 끝. 파생 필드는 비교 대상에 안 넣음.

#### 문제 3: 다중 편집 경로

```
1. 그리드에서 매입가 변경
2. 팝업에서 수수료율 변경
```

필드별 diff면 두 경로의 변경 기록을 병합해야 함.
스냅샷은 어디서 바꿨든 현재 상태 vs 원본 한 번 비교로 끝.

#### 문제 4: AG-Grid의 in-place mutation

AG-Grid는 셀 수정 시 원래 데이터 객체를 직접 변경.
별도 복사본(스냅샷) 없으면 원래 값을 알 방법이 없음.

### 핵심 정리

> dirty flag를 제대로 보완하면 (필드마다 원본값 저장) 결국 스냅샷 방식에 수렴한다.
> 스냅샷 방식은 "지금 값이 처음과 다른가?"라는 단순한 질문 하나로 모든 복잡한 상황을 처리한다.

### 관련 파일

| 파일 | 역할 |
|------|------|
| `src/pages/PurchasePrice/ListArea.tsx` | 그리드 변경 감지, 스냅샷 관리 |
| `src/utils/DataComparisonUtil.ts` | `hasChanges()` 비교 함수, `PURCHASE_COMPARE_FIELDS` |
| `src/pages/PurchasePrice/calc.ts` | 자동 계산 로직 |
| `src/store/modalState.ts` | 모달-그리드 동기화 (Zustand) |

---

## 2. 컴포넌트 구조와 Lazy Loading

### 현재 상태

- 라우터 레벨 lazy loading: **구현됨** (React.lazy + Suspense)
- 페이지 내부 컴포넌트: **모두 동기 import** → lazy loading 부적합

### 왜 페이지 내부 lazy loading이 어려운가?

#### 이유 1: 컴포넌트가 너무 큼 (쪼갤 단위가 없음)

```
FieldArea.tsx     1,254줄  ← 모달인데 통째로 하나
ListArea.tsx      1,058줄
GrowthField.tsx   1,339줄
```

UI + 로직 + 스타일이 하나에 뭉쳐있어서 내부 분할이 안 됨.
→ lazy로 분리해도 "1,254줄 전체를 나중에 로드"가 되는 것뿐.

분리가 되어있어야 "이건 지금, 이건 나중에" 선택 가능.

#### 이유 2: Props Drilling (핵심)

```typescript
// index.tsx (부모)
const PurchasePage = () => {
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);
  const control = useForm();
  // ... 15개 상태

  return (
    <SearchArea
      stores={stores}
      control={control}
      getValues={getValues}
      // ... 10개 props
    />
  );
};
```

SearchArea를 lazy loading 해도:

```typescript
const SearchArea = lazy(() => import('./SearchArea'));

<Suspense fallback={<Loading />}>
  <SearchArea
    stores={stores}        // ← 이미 부모에서 준비됨
    control={control}      // ← 이미 부모에서 준비됨
    getValues={getValues}  // ← 이미 부모에서 준비됨
  />
</Suspense>
```

**컴포넌트 코드**는 나중에 로드되지만, **필요한 데이터는 부모에서 이미 다 만들어놓고 기다리고 있음.**
stores API 호출, useForm 초기화 등이 부모 렌더링 시점에 전부 실행됨.
→ 무거운 로직은 이미 다 실행된 상태, JSX 렌더링 비용만 절약.

#### Context로 바꾸면 달라지는 점

```typescript
const PurchasePage = () => {
  return (
    <PurchaseProvider>
      <Suspense fallback={<Loading />}>
        <SearchArea />   {/* props 없음 - 독립적 */}
      </Suspense>
      <Suspense fallback={<Loading />}>
        <ListArea />     {/* props 없음 - 독립적 */}
      </Suspense>
    </PurchaseProvider>
  );
};

// SearchArea.tsx
const SearchArea = () => {
  const { stores, control } = usePurchaseContext();
  // SearchArea가 로드되기 전까지 이 코드 자체가 실행되지 않음
};
```

### 핵심 정리

> - 컴포넌트가 크면 → 쪼갤 단위가 없어서 lazy loading 적용 자체가 안 됨
> - props drilling이면 → 쪼개놔도 부모가 모든 데이터를 미리 준비해야 해서 lazy loading 효과가 없음
> - 둘 다 해결해야 "필요할 때, 필요한 것만 로드"가 가능해짐

---

## 3. 디자인 토큰 파이프라인

### 현재 구조

```
source.js (단일 소스: DESIGN_TOKEN_SOURCE)
    │
    ├─→ buildCssVariableMap()    → design-system.tokens.generated.css (CSS 변수)
    ├─→ buildTailwindTokens()    → tailwind.config.ts (실제 값: #0055d4)
    └─→ buildMuiTokens()         → DefaultTheme.ts (실제 값: #0055d4)
```

### 흔한 오해: "CSS Custom Properties가 중간 레이어"

**아니다.** 세 가지는 동등한 출력물이다.
CSS 변수가 Tailwind과 MUI 사이에 끼어있는 게 아니라, 각각 독립적으로 생성됨.

- Tailwind config에는 **실제 색상값**이 들어감 (CSS 변수 참조 아님)
- MUI theme에도 **실제 색상값**이 들어감 (CSS 변수 참조 아님)

### 그러면 CSS 변수는 왜 생성하나?

Tailwind 클래스나 MUI 테마로 커버가 안 되는 곳이 있기 때문:

```typescript
// 1. MUI sx prop에서 Tailwind 클래스를 쓸 수 없음
<Box sx={{ color: 'var(--color-text-help)' }} />

// 2. 런타임 동적 계산은 Tailwind로 불가능
background: color-mix(in oklab, var(--color-primary) 50%, transparent);

// 3. 인라인 스타일, 레거시 코드
style={{ borderColor: 'var(--color-border)' }}
```

### MUI 공식 통합 방식은 준수하고 있는가?

**예.** 공식 권장 설정이 이미 적용됨:

```typescript
// ThemeProvider.tsx
<StyledEngineProvider injectFirst enableCssLayer>
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
</StyledEngineProvider>
```

```css
/* index.css - CSS Layer 순서 */
@layer theme, base, mui, components, utilities;
```

### CSS 변수의 미래

CSS 변수는 과도기 산물이다.

MUI를 완전히 걷어내면:
- sx prop 사라짐
- 레거시 인라인 스타일 사라짐
- `color-mix()` → Tailwind v4의 `bg-primary/50` opacity modifier로 대체 가능

**→ `source.js → Tailwind config` 단일 파이프라인으로 단순화 가능**

### 관련 파일

| 파일 | 역할 |
|------|------|
| `src/design-system/source.js` | 단일 소스 토큰 정의 |
| `src/design-system/tokens.ts` | 토큰 빌더 (build*Tokens 함수들) |
| `src/styles/design-system.tokens.generated.css` | 자동 생성 CSS 변수 파일 |
| `tailwind.config.ts` | Tailwind 설정 (실제 값) |
| `src/theme/schemes/DefaultTheme.ts` | MUI 테마 (실제 값) |
| `src/theme/ThemeProvider.tsx` | 공식 통합 설정 |

---

## 4. FSD(Feature-Sliced Design) 도입 근거

### 기존 pages 구조의 문제: 일관성 없음

35개 페이지가 제각각:

```
// 패턴 1: 직속 파일
Products/
├── SearchArea.tsx
├── ListArea.tsx
└── index.tsx

// 패턴 2: 폴더 분리
AdsDiagnosis/
├── ui/
├── api/
├── components/
├── hooks/
└── types/

// 패턴 3: 기능별 분리
SettingStore/
├── create/
├── modify/
├── request/
└── components/
```

"이 파일 어디에 넣어야 해?"에 대한 답이 페이지마다 다름. 규칙이 없음.

### Atomic Design은 왜 안 맞나?

Atomic Design은 **UI 입자 크기**로 분류:

```
atoms/      → Button, Input
molecules/  → SearchField (= Input + Button)
organisms/  → SearchBar (= SearchField + Filters)
```

이 프로젝트는 **비즈니스 도메인이 핵심** (광고 진단, 매입원가, 주문관리, 정산...).
Atomic Design은 "이 컴포넌트가 얼마나 작으냐"만 알려주지,
"이 로직이 어느 도메인 소속이냐"는 답을 못 줌.

### FSD가 해결하는 것

```
features/rocket-growth/     ← 도메인 명확
├── ui/                     ← UI는 여기
├── model/                  ← 로직은 여기
├── lib/                    ← 유틸은 여기
└── index.ts                ← 외부엔 이것만 공개
```

1. **"파일 어디에 넣어?"** → 도메인 폴더 안에서 `ui/`, `model/`, `lib/` 중 택1
2. **"다른 데서 써도 돼?"** → `index.ts`에 export 안 했으면 안 됨
3. **어떤 페이지를 보든 같은 구조**

### 현재 적용 상태

| 구분 | 비율 | 설명 |
|------|------|------|
| 기존 pages 구조 | ~80% | 656개 파일, 전통적 계층형 |
| FSD 구조 | ~7% | features(25), shared(23), widgets(21) |

전면 재작성 없이 **새 기능부터 규칙을 잡을 수 있는 방법론**으로 선택.

### 적용된 FSD 슬라이스

- `features/auth/kakao-login/` — 카카오 로그인
- `features/onboarding/` — 온보딩
- `features/rocket-growth/` — 로켓그로스
- `features/purchase/` — 매입 그리드 렌더러
- `widgets/PurchaseCalculator/` — 매입 계산기
- `shared/ui/`, `shared/tracking/` — 공유 UI, 추적

### 핵심 정리

> "기존 pages 구조가 페이지마다 제각각이라 컨벤션이 필요했고,
> Atomic Design은 UI 크기 기준이라 비즈니스 로직 분류에 안 맞았고,
> FSD는 도메인 단위 분류 + 내부 구조 규칙 + 의존성 방향 규칙을 제공해서
> 기존 코드를 건드리지 않고 새 기능부터 점진적으로 적용할 수 있었다."
