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

  // 새 회사 추가 템플릿:
  // companyKey: {
  //   name: '회사명 · 포지션',
  //   motivation: '지원 동기 2~3줄',
  //   projectOrder: [0,1,2,3,4,5,6,7,8],
  // },
};
