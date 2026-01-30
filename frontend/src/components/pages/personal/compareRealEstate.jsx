export default function compareRealEstate() {
  const DETAIL_URL = 'https://ga0wnard.tistory.com/2' // 블로그 상세 글 링크

  return (
    <section className="max-w-5xl mx-auto p-8 bg-white">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              서비스 비교 분석 : 직방 vs 다방
            </h1>
            <p className="text-gray-600">
              동일한 부동산 플랫폼을 서로 다른 UX 전략과 타깃 관점에서 비교 분석한 개인 기획 프로젝트
            </p>
            <div className="mt-2 text-sm text-gray-500">
              개인 기획 프로젝트 · UX 비교 분석 · 2025.07
            </div>
          </div>

          {/* 자세히 보기 */}
          <a
            href={DETAIL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            자세히 보기 <span aria-hidden>↗</span>
          </a>
        </div>
      </header>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">🔍 분석 목적</h2>
        <p className="text-gray-800 leading-relaxed">
          직방과 다방은 모두 부동산 중개 플랫폼이지만,
          <b> 서비스 타깃과 기능 확장 방향, UX 설계 방식</b>에서 뚜렷한 차이를 보입니다.
          본 프로젝트에서는 두 서비스를 동일한 조건에서 사용하며
          <b> 메뉴 구조, 지도 기반 필터 UI, 사용자 플로우</b>를 중심으로 비교 분석했습니다.
        </p>
      </section>

      {/* Key Comparison */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">⚖️ 핵심 비교 포인트</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>
            <b>타깃 전략</b> — 직방: 공급자·투자자 포함 / 다방: 임차인 중심
          </li>
          <li>
            <b>메뉴 구성</b> — 직방: ‘우리집’, ‘분양’ 등 기능 중심 / 다방: 탐색 중심 단순 구조
          </li>
          <li>
            <b>지도 UX</b> — 직방: 빠른 조건 설정 / 다방: 유연한 매물 유형 전환
          </li>
        </ul>
      </section>

      {/* Highlight */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">⭐ 지도 내 필터 UI 비교</h2>
        <div className="space-y-4 text-gray-800">
          <div>
            <h3 className="font-medium">직방</h3>
            <p className="text-sm text-gray-700">
              드롭다운 기반 필터 구조로 빠른 조건 변경에 최적화되어 있으며,
              임대인을 고려한 ‘방 내놓기’ 동선이 함께 설계됨
            </p>
          </div>

          <div>
            <h3 className="font-medium">다방</h3>
            <p className="text-sm text-gray-700">
              지도 내에서 매물 유형을 직접 변경할 수 있는 구조로,
              필터 개수는 많지만 탐색 유연성이 높음
            </p>
          </div>
        </div>
      </section>

      {/* UX Insight */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">💡 UX 인사이트</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>
            직방은 <b>전문성과 구조화된 정보 전달</b>에 초점을 둔 UX
          </li>
          <li>
            다방은 <b>사용자 행동 기반 탐색과 직관성</b>을 중시한 UX
          </li>
          <li>
            동일 기능이라도 <b>타깃 설정에 따라 UI 설계 방향이 크게 달라짐</b>을 확인
          </li>
        </ul>
      </section>

      {/* Reflection */}
      <section>
        <h2 className="text-xl font-semibold mb-3">🧠 느낀 점</h2>
        <p className="text-gray-800 leading-relaxed">
          같은 도메인의 서비스라도
          <b> 어떤 사용자를 핵심 타깃으로 설정하느냐에 따라 UX와 기능 우선순위가 완전히 달라진다</b>는 점을
          체감한 프로젝트였습니다.
          또한 서비스 기획 단계에서 타깃과 방향성을 명확히 정의하는 것이
          장기적인 서비스 일관성에 얼마나 중요한지 다시 한번 느낄 수 있었습니다.
        </p>
      </section>
    </section>
  )
}
