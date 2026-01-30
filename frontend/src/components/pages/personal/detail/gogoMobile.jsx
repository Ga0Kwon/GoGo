import { useEffect, useState } from "react";
import KakaoMap from '../../../common/KakaoMap';
import SearchForm from './StoreSearchForm';
import HalfStarRating from "./HalfStarRating";
import { sendGAEvent } from "../../../../js/utils/ga.js";
import { getDeviceId } from "../../../../js/utils/device.js";

export default function GogoMobile() {

    const [position, setPosition] = useState(null); // [lat, lng]
    const [dbMarkers, setDbMarkers] = useState([]);
    const defaultPos = [37.5665, 126.9780];

    const [open, setOpen] = useState(false); // 즐겨찾기 추가 말풍선
    const [result, setResult] = useState(null); //검색 결과 (별점 미등록 가게)
    const [ratings, setRatings] = useState({}); //가게별 별점 상태 저장
    
    const [selectedMarker, setSelectedMarker] = useState(null); //검색으로 선택한 장소 마커

    const [showConfirmModal, setShowConfirmModal] = useState(false); //별점 등록전 확인 모달 표시 여부
    const [confirmModalContent, setConfirmModalContent] = useState(''); //별점 등록전 확인 모달 내용
     
    const [showStatusModal, setShowStatusModal] = useState(false); //상태 확인(등록 등) 모달 표시 여부
    const [showSurvey, setShowSurvey] = useState(false); //설문조사 모달 표시 여부

    //(로드시) 현재 사용자 위치에 따라 3개 정도 자동 등록
    const autoAddPlaces = (location) => {
        const params = {
            query: "음식",
            category_group_code: "FD6",
            x: String(location.lng), // 경도
            y: String(location.lat), // 위도
            radius: "10000",
            size: "3",
            sort: "distance",
        };

        fetch("http://localhost:3001/api/insertNearKakaoApi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(params)
        })
        .then(res => res.json())
        .catch(() => {});
    }; 

    useEffect(() => {
        if (!navigator.geolocation) return;

        //현재 위치 넘기기
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const currentPos = {
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                };

                setPosition([currentPos.lat, currentPos.lng]);
                autoAddPlaces(currentPos);
            },
            () => {
                setPosition(defaultPos);
                autoAddPlaces({ lat: defaultPos[0], lng: defaultPos[1] });
            }
        );

    }, []);

    useEffect(() => {
      fetch("http://localhost:3001/api/selectPayLocations")
        .then(res => res.json())
        .then(data => setDbMarkers(data));
     }, []);

     {/* 별점 미등록 가게 목록 조회 */}
    useEffect(() => {
      fetch("http://localhost:3001/api/selectNoRegisterList")
        .then(res => res.json())
        .then(data => {setResult(data)})
    }, [])

    //설문 조사 입력
    const submitSurvey = (answer) => {
        fetch("http://localhost:3001/api/saveSurvey", {
            method: "POST",   
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                deviceId: getDeviceId(),
                answer: answer
            })
        })
        .then(res => res.json())
        .then(data => {
            setShowSurvey(false);
        });
    };

    const updateStarScore = (pyId) => {
        //query로 별점 등록 API 호출
        //여기에 fetch로 백엔드에 별점 등록 API 호출 가능
        
        result.forEach(store => {
            if(store.pyId == pyId) {
                var contents = {
                    stores: store.storeName,
                    score: ratings[pyId] || 0,
                    comments: document.getElementById(`input-${pyId}`).value,
                    pyId: pyId
                };

                setConfirmModalContent(contents);
                setShowConfirmModal(true);

            }
        });
    };

    //등록 처리 함수
    const submitContents = () => {
            
            //별점 등록 API 호출
            fetch("http://localhost:3001/api/updateStarScore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pyId: confirmModalContent.pyId,
                    score: confirmModalContent.score,
                    comments: confirmModalContent.comments
                }),
            })
            .then((res) => res.json())
            .then((data) => {
                setShowStatusModal(true);

                //5초 후 모달 자동 닫기
                setTimeout(() => {
                    setShowStatusModal(false);

                    // ⏸ 1초 쉬고 실행
                    setTimeout(() => {
                        // 설문 여부 체크
                        fetch("http://localhost:3001/api/checkSurvey", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                deviceId: getDeviceId(),
                            }), 
                        })
                        .then(res => res.json())
                        .then(res => {
                            if (res.success && res.exists === 0) {
                                setShowSurvey(true);
                            }
                        });

                        //등록 후 목록 갱신
                        fetch("http://localhost:3001/api/selectNoRegisterList")
                        .then(res => res.json())
                        .then(data => {setResult(data)});

                        fetch("http://localhost:3001/api/selectPayLocations") 
                        .then(res => res.json())
                        .then(data => {setDbMarkers(data);});
                    }, 1000);
                }, 3000);


        });

        //GA 이벤트 전송
        sendGAEvent("register_star_score", {
            pyId: confirmModalContent.pyId,
            score: confirmModalContent.score,
        });
    };

    // --- 렌더 ---
    return (
        <div className="border bg-white max-wf-[390px] w-full h-full rounded-lg relative overflow-hidden">
                
                {/* 등록 전 확인 상태 표출해서 재확인 모달 팝업*/}
                {showConfirmModal && (
                    <div className="inset-0 bg-black/60 flex items-center justify-center absolute z-[9999]">
                        <div className="bg-white rounded-lg p-6 w-[300px] text-center"> 
                            <p className="text-lg font-bold" id="confirm-modal-title">등록하시겠습니까?</p>
                            <p className="text-lg font-bold" id="confirm-stores">가게 : {confirmModalContent.stores}</p>
                            <p className="text-lg font-bold" id="confirm-stars">별점 : {confirmModalContent.score}</p>
                            <p className="text-lg font-bold" id="confirm-comments">내용 : {confirmModalContent.comments}</p>
                            <div className="mt-4 flex justify-around">
                                <button 
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => {
                                        setShowConfirmModal(false);
                                        //등록 처리 함수 호출
                                        submitContents();
                                    }}
                                >
                                    예
                                </button>
                                <button 
                                    className="bg-gray-300 px-4 py-2 rounded-md"
                                    onClick={() => setShowConfirmModal(false)}
                                >
                                    아니오
                                </button>
                            </div>
                        </div>
                    </div>
                )}  

                {/* 상태 확인(등록 등) 모달 팝업 */}
                {showStatusModal && (
                    <div className="inset-0 bg-black/60 flex items-center justify-center absolute z-[9999]">
                        <div className="bg-white rounded-lg p-6 w-[300px] text-center"> 
                            <p className="text-lg font-bold">등록이 완료되었습니다!</p>
                        </div>
                    </div>
                )}
                
                {/* 설문 조사 모달 팝업 */}
                {showSurvey && (
                        <div className="inset-0 bg-black/60 flex items-center justify-center absolute z-[9999]">
                            <div className="bg-white rounded-lg p-6 w-[300px] text-center">
                            <h2 className="text-lg font-bold mb-4">
                                서비스를 출시하면<br/>이용하시겠습니까?
                            </h2>

                            <div className="flex justify-between gap-4">
                                <button
                                className="flex-1 bg-blue-500 text-white py-2 rounded"
                                onClick={() => submitSurvey('Y')}
                                >
                                예
                                </button>
                                <button
                                className="flex-1 bg-gray-300 py-2 rounded"
                                onClick={() => submitSurvey('N')}
                                >
                                아니오
                                </button>
                            </div>
                            </div>
                        </div>
                )}

                {/* 검색바 (오버레이) */}
                <SearchForm
                    onPlaceSelect={(place) => {
                        setPosition([place.lat, place.lng]);

                        setSelectedMarker({
                            id: place.id,
                            latitude: place.lat,
                            longitude: place.lng,
                            storeName: place.name,
                            score: 0,
                            cName : place.cName,
                            detailAddress: place.address,
                            type: "selected",
                        });
                    }}
                />
                {/* 맵: 초기 위치(사용자 위치)가 준비될 때까지 렌더 대기 */}
                <div className="absolute inset-0 z-10">
                    <KakaoMap
                        lat={position ? position[0] : defaultPos[0]}
                        lng={position ? position[1] : defaultPos[1]}
                        markers={[
                            ...dbMarkers.map(m => ({ ...m, type: "store" })),
                            ...(selectedMarker ? [selectedMarker] : []),
                        ]}
                    />
                </div>

                {/* 카드 결제 내역 평 미등록 가게 아이콘 */}
            <div className="border bg-white max-w-[390px] w-full h-full rounded-lg relative overflow-hidden">

                {/* 말풍선 */}
                {open && (
                    <div className="absolute bottom-40 left-0 right-0 mx-[8px] my-1 z-30 animate-fadeUp">
                        <div className="relative">
                            <div className="bg-white border text-gray-800 text-sm px-4 py-3 rounded-lg shadow-lg w-full h-[240px]">
                                <strong className="text-lg">미등록한 가게</strong>
                                {/* 별점 미등록한 가게 목록 표출*/}
                                <div className="h-[200px] overflow-y-scroll mt-2 mb-2 pb-1 pt-1"> 
                                    {result.map((store) => (
                                        <div key={store.pyId} className="border-b py-3">
                                            <div className="font-semibold flex justify-between">
                                                <div>
                                                     <strong>{store.storeName}</strong>
                                                     <span className="text-xs font-normal ml-2">#{store.cName}</span>
                                                </div>
                                                <button id={store.pyId} className="ml-2 px-3 py-1 bg-pink-400 text-white rounded-md text-sm" onClick={(e) => updateStarScore(e.target.id)} >등록</button>
                                            </div>
                                            <div className="text-xs text-gray-500">{store.detailAddress}</div>
                                            {/* ⭐ 별 입력 란 */}
                                            <div className="mt-2 flex items-center justify-between">
                                               <HalfStarRating
                                                    value={ratings[store.pyId] ?? store.score ?? 0}
                                                    onChange={(val) =>
                                                        setRatings((prev) => ({
                                                        ...prev,
                                                        [store.pyId]: val,
                                                        }))
                                                    }
                                                />
                                                <span className="text-xs text-gray-400">
                                                    {(ratings[store.pyId] || 0).toFixed(1)}
                                                </span>
                                            </div>
                                            <div className="w-full mt-2 flex items-center">
                                                <input id={`input-${store.pyId}`} type="text" placeholder="한줄평을 남겨보세요!" className="flex-1 ml-2 p-1 border rounded-md text-sm"/>
                                            </div>
                                        </div>
                                        ))}
                                </div>
                            </div>
                            {/* 오른쪽 아래 말꼬리 */}
                            <div className="absolute right-6 -bottom-2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"/>
                        </div>
                    </div>
                )}

                {/* 아이콘 (완전 고정) */}
                <div
                    onClick={() => setOpen(!open)}
                    className="absolute right-3 bottom-24 z-20 bg-red-500 text-white rounded-full w-14 h-14 flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition">
                    <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                </div>
            </div>

           {/* 하단 네비 */}
           <div className="absolute bottom-3 left-3 right-3 z-30 p-2 flex items-center justify-around bg-white/90 rounded-md shadow">
              <button className="flex flex-col items-center text-sm text-blue-700 px-3 py-1 rounded-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
                <span className="mt-1">홈</span>
              </button>
              <button className="flex flex-col items-center text-sm text-gray-700 px-3 py-1 rounded-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h4v18H3V3zm6 6h4v12H9V9zm6-4h4v16h-4V5z"/></svg>
                <span className="mt-1">분석</span>
              </button>
              <button className="flex flex-col items-center text-sm text-gray-700 px-3 py-1 rounded-md">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
                <span className="mt-1">마이</span>
              </button>
           </div>
        </div>
    );
}