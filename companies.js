const companies = {
  selectstar: {
    name: '셀렉트스타 · Datumo Platform Frontend Engineer',
    motivation:
      '이커머스 정산 SaaS에서 복잡한 데이터를 DataGrid 등 데이터 밀도 높은 화면으로 풀어내왔습니다. 1인 프론트엔드로 운영과 개선을 병행하면서, 완벽한 구조보다 서비스를 멈추지 않는 쪽을 택하는 판단을 반복해왔습니다. Datumo Platform 역시 복잡한 데이터를 직관적으로 보여주면서 서비스를 계속 전진시켜야 하는 환경이라고 느꼈고, 그 경험이 자연스럽게 이어질 수 있다고 생각해 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 구조 설계 + 품질/일정 판단
      1: 'medium',    // 데이터셋 구축
      2: 'medium',    // 스타일링 전환
      3: 'medium',    // GTM 트래킹 분리
      4: 'detailed',  // 초기 로딩 성능 개선 — JD 우대: 웹 퍼포먼스
      5: 'detailed',  // DataGrid — JD 핵심: 데이터 시각화
      6: 'medium',    // 숫자 0 버그
      7: 'medium',    // 스캐폴딩
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [5, 4, 0, 1, 2, 3, 6, 7, 8]
  },

  deutschmotors: {
    name: '도이치모터스 · AX 솔루션팀 Frontend Developer',
    motivation:
      '이커머스 SaaS에서 정산 대시보드를 포함한 제품 전 영역을 1인 프론트엔드로 개발·운영해왔고, 초기 로딩 번들을 10MB에서 2MB로 줄인 성능 최적화 경험이 있습니다. AI를 활용할 때 코드 환경을 먼저 정돈해온 경험이 AX 솔루션팀에서 사내 솔루션을 구축하는 데 자연스럽게 이어질 수 있다고 생각해 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 사내 솔루션 구조 설계 + AI 활용
      1: 'medium',    // 데이터셋 구축
      2: 'medium',    // 스타일링 전환
      3: 'medium',    // GTM 트래킹 분리
      4: 'detailed',  // 초기 로딩 성능 개선 — JD 직격: 성능 최적화
      5: 'detailed',  // DataGrid — JD 직격: 데이터 시각화
      6: 'medium',    // 숫자 0 버그
      7: 'medium',    // 스캐폴딩 — AI 도구 활용
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [4, 5, 0, 7, 3, 2, 1, 6, 8]
  },

  krm: {
    name: '케이알엠 · 로봇 관제 서비스 Frontend Developer',
    motivation:
      '이커머스 SaaS에서 대시보드와 DataGrid 등 데이터가 많은 화면을 만들어왔고, 번들 최적화와 구조 개선 경험이 있습니다. 로봇 관제라는 도메인은 새롭지만, React·TypeScript·Zustand 기반으로 복잡한 상태를 다뤄온 경험을 바탕으로 배워가며 기여할 수 있다고 생각해 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 아키텍처/구조 설계
      1: 'medium',    // 데이터셋 구축
      2: 'medium',    // 스타일링 전환
      3: 'medium',    // GTM 트래킹 분리 — 관심사 분리
      4: 'detailed',  // 초기 로딩 성능 개선 — 우대: 번들 최적화
      5: 'detailed',  // DataGrid — 실시간 데이터 시각화 UI
      6: 'medium',    // 숫자 0 버그
      7: 'medium',    // 스캐폴딩 — 컴포넌트 설계
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [5, 4, 0, 3, 7, 6, 2, 1, 8]
  },

  quadminer: {
    name: '쿼드마이너 · Network Blackbox UI/UX 웹 개발자',
    motivation:
      '이커머스 SaaS에서 대량의 정산·주문 데이터를 대시보드와 DataGrid로 풀어내는 작업을 해왔고, 번들 최적화 경험이 있습니다. 보안 도메인은 새롭지만, 복잡한 데이터를 사용자에게 명확하게 전달하는 UI를 만들어온 경험을 바탕으로 배워가며 기여할 수 있다고 생각해 지원했습니다.',
    projectLevels: {
      0: 'medium',    // 요금제 구조 개편
      1: 'medium',    // 데이터셋 구축
      2: 'medium',    // 스타일링 전환 — CSS/UI 설계
      3: 'medium',    // GTM 트래킹 분리
      4: 'detailed',  // 초기 로딩 성능 개선 — 주요업무: 퍼포먼스 개선
      5: 'detailed',  // DataGrid — 핵심: 대용량 데이터 시각화
      6: 'detailed',  // 숫자 0 버그 — 복잡한 데이터 정확성
      7: 'medium',    // 스캐폴딩
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [5, 4, 6, 0, 2, 3, 7, 1, 8]
  },

  muchon: {
    name: '무촌 · 프론트엔드 개발자',
    motivation:
      '이커머스 SaaS에서 기획부터 배포까지 1인 프론트엔드로 제품 전 영역을 주도적으로 개발·운영해왔고, 스타일 토큰화와 공통 컴포넌트 정리, 성능 최적화 경험이 있습니다. 정제되지 않은 시장을 디지털로 전환하는 과정에서 빠르게 기능을 만들고 검증해야 하는 환경이 그동안의 경험과 이어지는 부분이라 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 주도적 피처 개발, 구조 설계
      1: 'medium',    // 데이터셋 구축
      2: 'detailed',  // 스타일링 전환 — 스타일 토큰화/공통 컴포넌트
      3: 'medium',    // GTM 트래킹 분리
      4: 'detailed',  // 초기 로딩 성능 — 우대: 성능 최적화
      5: 'medium',    // DataGrid
      6: 'medium',    // 숫자 0 버그
      7: 'medium',    // 스캐폴딩 — 재사용 가능한 컴포넌트 설계
      8: 'brief',     // 크롬 익스텐션 — 기획~배포 전체 사이클
    },
    projectOrder: [0, 2, 4, 7, 8, 3, 5, 1, 6]
  },

  sentbe: {
    name: '센트비 · SentBe Tech실 Frontend Developer',
    motivation:
      '이커머스 SaaS에서 결제 시스템 전환, 스타일 토큰화와 공통 컴포넌트 정리, 기능 설계부터 배포까지 1인 프론트엔드로 주도해왔습니다. 기존 방식을 돌아보고 구조를 개선하면서 서비스를 계속 전진시켜온 경험이, 파트너 연동과 신규 기능을 빠르게 만들어야 하는 센트비의 환경과 이어지는 부분이라 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 · 결제 전환 — 핵심: 시스템 개선 + 주도적 문제 정의
      1: 'medium',    // 데이터셋 구축
      2: 'detailed',  // 스타일링 전환 — 우대: 스타일 토큰화/컴포넌트 구조화
      3: 'medium',    // GTM 트래킹 분리 — 기존 시스템 개선
      4: 'medium',    // 초기 로딩 성능
      5: 'medium',    // DataGrid
      6: 'medium',    // 숫자 0 버그
      7: 'detailed',  // 스캐폴딩 — 우대: End-to-End 주도, 업무 방식 개선
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [0, 2, 7, 3, 4, 1, 5, 6, 8]
  },

  levvit: {
    name: '레브잇 · 올웨이즈 Software Engineer (프론트엔드)',
    motivation:
      '이커머스 정산/순이익 분석 SaaS에서 1인 프론트엔드로 결제·상품·주문 등 제품 전 영역을 개발·운영하면서, 문제를 직접 발견하고 구조를 개선해왔습니다. AI를 활용하기 위해 코드 환경을 정돈하고, 스캐폴딩 도구를 Claude skills로 만들어 비개발자에게 인수인계하는 등 반복 작업을 자동화해왔습니다. 커머스 도메인과 AI 도구 활용 경험을 올웨이즈에서 이어갈 수 있다고 생각해 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 주도적 문제 발견 + 구조 개선
      1: 'medium',    // 데이터셋 구축
      2: 'medium',    // 스타일링 전환 — 개발 환경 개선
      3: 'medium',    // GTM 트래킹 분리 — 구조 개선
      4: 'detailed',  // 초기 로딩 성능 — 주도적 문제 발견
      5: 'medium',    // DataGrid
      6: 'medium',    // 숫자 0 버그
      7: 'detailed',  // 스캐폴딩 — 개발 환경 구축 + 자동화 + AI 도구
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [0, 7, 4, 2, 3, 1, 5, 6, 8]
  },

  integration: {
    name: '인티그레이션 · 린다이어트 프론트엔드 개발자',
    motivation:
      '이커머스 SaaS에서 1인 프론트엔드로 결제·상품·주문 등 제품 전 영역을 개발·운영하면서, Hotjar 녹화에서 사용자 행동을 확인해 성능을 개선하는 등 문제를 직접 발견하고 해결해왔습니다. AI를 활용하기 위해 코드 환경을 정돈하고, 스캐폴딩 도구를 Claude skills로 만들어 비개발자에게 인수인계한 경험이 있습니다. 매주 새로운 기능이 출시되는 환경에서 빠르게 만들고 검증하는 방식이 그동안의 경험과 이어지는 부분이라 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 인하우스 제품 반복 개선 + 구조 설계
      1: 'detailed',  // 데이터셋 구축 — 복잡한 분기 검증 환경 (진료 차트 복잡성과 유사)
      2: 'medium',    // 스타일링 전환
      3: 'medium',    // GTM 트래킹 분리
      4: 'medium',    // 초기 로딩 성능
      5: 'medium',    // DataGrid
      6: 'detailed',  // 숫자 0 버그 — 데이터 정확성 (의료 도메인에서 중요)
      7: 'medium',    // 스캐폴딩 — AI 도구 + 자동화
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [0, 6, 1, 7, 4, 3, 2, 5, 8]
  },

  spector: {
    name: '스펙터 · 프론트엔드 개발자',
    motivation:
      '이커머스 SaaS에서 1인 프론트엔드로 제품 전 영역을 개발·운영하면서, 코드 품질과 기능 출시 사이에서 판단을 반복해왔습니다. MUI에서 Tailwind로 스타일링 체계를 전환하고, Zustand·React Query 기반으로 상태를 정리해온 경험이 스펙터의 기술 스택 및 개발 환경과 자연스럽게 맞닿아 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 구조 설계 + 품질/일정 판단
      1: 'medium',    // 데이터셋 구축
      2: 'detailed',  // 스타일링 전환 — Tailwind 전환 (스택 직격)
      3: 'detailed',  // GTM 트래킹 분리 — 코드 품질 개선
      4: 'medium',    // 초기 로딩 성능 — 우대: 번들 최적화
      5: 'medium',    // DataGrid
      6: 'medium',    // 숫자 0 버그
      7: 'medium',    // 스캐폴딩
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [0, 2, 3, 4, 7, 1, 5, 6, 8]
  },

  wordbricks: {
    name: '워드브릭스 · GetGPT 프론트엔드 엔지니어',
    motivation:
      '이커머스 SaaS에서 1인 프론트엔드로 제품 전 영역을 개발·운영하면서, 코드 환경을 정돈해 AI 활용 효율을 높이고 GTM 트래킹 체계를 분리해 사용자 행동 데이터를 수집한 경험이 있습니다. 빠르게 실험하고 검증하는 환경에서 일해왔고, AI 플랫폼의 인터페이스를 만드는 일에 관심이 있어 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 코드 아키텍처 설계
      1: 'medium',    // 데이터셋 구축
      2: 'medium',    // 스타일링 전환
      3: 'detailed',  // GTM 트래킹 분리 — 사용자 행동 로그 수집 파이프라인
      4: 'detailed',  // 초기 로딩 성능 — 우대: 성능 개선
      5: 'medium',    // DataGrid
      6: 'medium',    // 숫자 0 버그
      7: 'medium',    // 스캐폴딩
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [0, 3, 4, 7, 2, 1, 5, 6, 8]
  },

  difinition: {
    name: '디피니션 · 프론트엔드 개발자',
    motivation:
      '이커머스 SaaS에서 1인 프론트엔드로 제품 전 영역을 개발·운영하면서, 요금제 구조를 일원화하고 스타일링 체계를 전환하는 등 기술 표준을 직접 수립해왔습니다. AI를 활용하기 위해 코드 환경을 먼저 정돈하고, 스캐폴딩 도구를 만들어 반복 작업을 자동화한 경험이 있습니다. SaaS 제품의 구조를 설계하고 고도화하는 일이 그동안의 경험과 이어지는 부분이라 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 기술 표준 수립 + 구조 설계
      1: 'medium',    // 데이터셋 구축
      2: 'detailed',  // 스타일링 전환 — 공통 자산화 (토큰, 공통 컴포넌트)
      3: 'detailed',  // GTM 트래킹 분리 — 아키텍처 표준화
      4: 'medium',    // 초기 로딩 성능
      5: 'medium',    // DataGrid
      6: 'medium',    // 숫자 0 버그
      7: 'medium',    // 스캐폴딩 — AI 도구 + 자동화
      8: 'brief',     // 크롬 익스텐션
    },
    projectOrder: [0, 2, 3, 7, 4, 1, 5, 6, 8]
  },

  vacatio: {
    name: '바카티오 · 프론트엔드 개발자',
    motivation:
      '이커머스 SaaS에서 1인 프론트엔드로 제품 전 영역을 개발·운영해왔습니다. 기술적으로는 구조 개선과 자동화 등 많은 시도를 했지만, 스타트업이면서도 충분히 과감하지 못했고 애자일하게 움직이지 못한 아쉬움이 남습니다. 빠르게 실행하고 부딪히면서 성장하는 환경에서, 성장 경험이 있는 동료들과 함께 작더라도 의미 있는 성장을 만들어가고 싶어 지원했습니다.',
    projectLevels: {
      0: 'detailed',  // 요금제 구조 개편 — 구조 개선 + 판단
      1: 'medium',    // 데이터셋 구축
      2: 'medium',    // 스타일링 전환
      3: 'medium',    // GTM 트래킹 분리
      4: 'medium',    // 초기 로딩 성능
      5: 'medium',    // DataGrid
      6: 'medium',    // 숫자 0 버그
      7: 'detailed',  // 스캐폴딩 — 빠른 기능 테스트 환경
      8: 'detailed',  // 크롬 익스텐션 — 기획~개발 독립 실행 + 실패 인정
    },
    projectOrder: [0, 8, 7, 4, 2, 3, 1, 5, 6]
  },

  // 새 회사 추가 템플릿:
  // companyKey: {
  //   name: '회사명 · 포지션',
  //   motivation: '지원 동기 2~3줄',
  //   projectOrder: [0,1,2,3,4,5,6,7,8],
  // },
};
