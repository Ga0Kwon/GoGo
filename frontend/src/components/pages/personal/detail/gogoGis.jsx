/* 프로덕트 : 곳곳 (카드 결제를 기반 지도 서비스) */
import { useEffect, useState } from "react"
import GogoMobile from "./gogoMobile"

export default function GogoGis() {

    return (
        <div className="p-5">
            <h2 className="text-4xl font-bold mb-6 text-center">곳곳</h2>
            <div className="flex gap-6">

                <div className="border bg-white max-w-[390px] w-full h-[600px] rounded-lg">
                   <GogoMobile />
                </div>
                <div className="flex-1 flex flex-col">
                    <div>
                        {/* <StoreSearchForm /> */}
                    </div>
                    <div className="flex-1 border p-4">
                        <div className="mt-3 text-base text-gray-700 leading-relaxed space-y-5">
                            {/* Summary */}
                            <div className="mt-3 text-base text-gray-700 leading-relaxed space-y-4">
                                {/* Overview */}
                                <div>
                                    <strong className="text-lg block mb-1">🔍 프로젝트 개요</strong>
                                    <p>
                                    <b>‘곳곳’</b>은 카드 결제 데이터를 기반으로 사용자의 방문 장소를 자동 기록하여,
                                    소비 경험을 <b>지도 위에서 시각화</b>하는 개인 기획 프로젝트입니다.
                                    </p>
                                </div>

                                {/* Purpose */}
                                <div>
                                    <strong className="text-lg block mb-1">🎯 기획 목적</strong>
                                    <p>
                                    기존 카드·금융 앱의 소비 기록은 금액 중심으로 제공되어,
                                    사용자가 <b>‘어디를 자주 갔는지’, ‘어떤 장소를 선호하는지’</b>를
                                    공간적으로 파악하기 어렵다는 점에 주목했습니다.
                                    </p>
                                </div>

                                {/* Key Point */}
                                <div>
                                    <strong className="text-lg block mb-1">⚙️ 핵심 설계 포인트</strong>
                                    <ul className="list-disc list-inside space-y-1">
                                    <li>결제 데이터 기반 방문 가맹점 자동 기록</li>
                                    <li>지도 위에서 방문 횟수·카테고리·만족도 시각화</li>
                                    <li>기록의 ‘귀찮음’을 제거한 수집 중심 UX</li>
                                    </ul>
                                </div>

                                {/* Insight */}
                                <div>
                                    <strong className="text-lg block mb-1">💡 기획 인사이트</strong>
                                    <p>
                                    소비 데이터를 <b>공간 정보와 결합</b>하면
                                    단순 지출 내역이 아닌 <b>개인의 경험 자산</b>으로 확장될 수 있으며,
                                    자동화된 기록은 서비스의 지속 사용을 유도할 수 있음을 확인했습니다.
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-500">
                            * 프로토타입 단계에서는 카드 결제 내역이 자동 연동된 것으로 가정하여 구현
                            </p>
                        </div>

                        {/* Links */}
                        <div className="mt-6 text-sm text-gray-700 space-y-3">
                            <div>
                            <strong className="text-lg">Tistory · Detail</strong>
                            <a id="gogo-detail-link-tistory"
                                href="https://ga0wnard.tistory.com/3"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block ml-3 px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                            >
                                자세히 보기 ↗
                            </a>
                            </div>

                            <div>
                            <strong className="text-lg">FIGMA · Prototype</strong>
                            <a  id="gogo-detail-link-figma"
                                href="https://www.figma.com/proto/bKr2m6LN6kbmMQFuVK2g24/%EA%B3%B3%EA%B3%B3-GoGo--%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B8%B0%ED%9A%8D%EC%95%88?node-id=87-943&t=mnVWiI4bmyTv94cv-1"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block ml-3 px-3 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200"
                            >
                                Figma에서 보기 ↗
                            </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}