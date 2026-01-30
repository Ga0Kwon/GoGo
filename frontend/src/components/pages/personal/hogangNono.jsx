export default function HogangnonoBenchmark() {
  const DETAIL_URL = 'https://ga0wnard.tistory.com/1' // ← 벤치마킹 글 URL로 교체

  return (
    <section className="max-w-5xl mx-auto p-8 bg-white">
      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">서비스 벤치마킹 : 호갱노노</h1>
            <p className="text-gray-600">
              데이터 기반 부동산 서비스의 UX 구조와 핵심 기능을 분석한 개인 기획 프로젝트
            </p>
            <div className="mt-2 text-sm text-gray-500">개인 프로젝트 · 서비스 분석 · 2025.07</div>
          </div>

          {/* 자세히 보기 */}
          <a
            href={DETAIL_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            자세히 보기
            <span aria-hidden>↗</span>
          </a>
        </div>
      </header>

      {/* Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">🔍 프로젝트 개요</h2>
        <p className="text-gray-800 leading-relaxed">
          호갱노노는 아파트 실거래가, 학군, 생활 인프라 등 다양한 부동산 데이터를 지도 기반으로 제공하는 서비스입니다.
          본 프로젝트에서는 해당 서비스를 직접 사용하며 <b>사용자 관점의 정보 탐색 흐름과 UX 구조</b>를 중심으로
          핵심 기능과 개선 포인트를 분석했습니다.
        </p>
      </section>

      {/* Key Insights */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">💡 핵심 인사이트</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li><b>수요자 중심 서비스</b> — 실거주자·실수요자의 의사결정에 필요한 정보를 우선 제공</li>
          <li><b>지도 중심 UX</b> — 필터 → 지도 → 상세 정보로 이어지는 직관적인 탐색 구조</li>
          <li><b>데이터의 콘텐츠화</b> — 실거래가, 갭 가격 등 복잡한 데이터를 시각적으로 제공</li>
        </ul>
      </section>

      {/* Highlight */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">⭐ 주목한 핵심 기능</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>지도 기반 다중 필터링 시스템</li>
          <li>실거래가 · 갭 가격 조회</li>
          <li>대출 계산기</li>
          <li>실거주자 후기</li>
          <li>학군·교통·상권 등 생활 정보 시각화</li>
        </ul>
      </section>

      {/* Problems & Improvements */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">⚠️ 문제 인식 및 개선 제안</h2>

        <div className="space-y-4 text-gray-800">
          <div>
            <h3 className="font-medium mb-1">1. 스크롤 중심 정보 구조</h3>
            <p className="text-sm text-gray-700">정보량이 많아 전체 구조를 한눈에 파악하기 어려움</p>
            <p className="text-sm text-gray-700 mt-1">
              → 카테고리 접힘 기능, 주요 정보 요약 영역 도입 제안
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-1">2. 후기 데이터 신뢰도 한계</h3>
            <p className="text-sm text-gray-700">실거주 인증 없이 누구나 후기 작성 가능</p>
            <p className="text-sm text-gray-700 mt-1">
              → 인증 입주민 마크 + 보상 기반 후기 시스템 제안
            </p>
          </div>
        </div>
      </section>

      {/* Reflection */}
      <section>
        <h2 className="text-xl font-semibold mb-3">🧠 배운 점</h2>
        <p className="text-gray-800 leading-relaxed">
          단순히 서비스를 사용하는 입장이 아닌, <b>기획자의 관점에서 기능과 흐름을 해체하고 문제를 정의하는 경험</b>이었습니다.
          제한된 시간 안에 핵심 UX 문제를 파악하고 개선 방향을 제안하는 과정에서 사용자 흐름 중심 사고의 중요성을 체감했습니다.
        </p>
      </section>
    </section>
  )
}
