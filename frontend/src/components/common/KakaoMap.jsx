import { use, useEffect, useRef } from "react";
import { sendGAEvent } from "../../js/utils/ga.js";

export default function KakaoMap({ lat, lng, level = 4, markers = []}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const currentMarkerRef = useRef(null);
  const isAutoCenterRef = useRef(true);
  const markersRef = useRef([]); // 마커들을 저장할 배열

  // 1️⃣ 지도 생성 (한 번만)
  useEffect(() => {
    if (!containerRef.current || !window.kakao?.maps) return;

    mapRef.current = new window.kakao.maps.Map(
      containerRef.current,
      {
        center: new window.kakao.maps.LatLng(lat, lng),
        level,
      }
    );

    window.kakao.maps.event.addListener(
      mapRef.current,
      "dragstart",
      () => {
        isAutoCenterRef.current = false;
      }
    );
  }, []);

  // 2️⃣ 현재 위치 마커 + 중앙 이동
  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return;

    const position = new window.kakao.maps.LatLng(lat, lng);

    // 🔹 현재 위치 마커
    if (!currentMarkerRef.current) {
      currentMarkerRef.current = new window.kakao.maps.Marker({
        position,
      });
      currentMarkerRef.current.setMap(mapRef.current);
    } else {
      currentMarkerRef.current.setPosition(position);
    }

    // 🔹 자동 중앙 포커스
    if (isAutoCenterRef.current) {
      mapRef.current.setCenter(position);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (!mapRef.current || !window.kakao?.maps) return;

    // 기존 마커 제거
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    markers.forEach(item => {
      let markerImage;

      if (item.type === "store") {
        markerImage = createStarScoreMarker(item.score);
      }

      if (item.type === "selected") {
        markerImage = createSelectedPinMarker();
      }

      const marker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(item.latitude, item.longitude),
        image: markerImage,
        title: item.storeName, // 접근성/보조용
      });

      // 툴팁 (CustomOverlay)
      const overlay = new kakao.maps.CustomOverlay({
        content: `
          <div style="
            padding:8px 12px;
            border-radius:8px;
            background:#ffffff;
            box-shadow:0 2px 8px rgba(0,0,0,0.15);
            font-size:12px;
            white-space:nowrap;
          ">
            <div style="font-weight:600;">${item.storeName} <span style="font-size: 10px; font-weight:normal">#${item.cName}</span></div>
            <div style="color:#6b7280;">${item.detailAddress}</div>
            <div style="margin-top:4px; display:flex; align-items:center; justify-content:space-between; width:100%;">
              <span style="margin-right:8px;">${item.comments || ""}</span>
              <span style="font-size:10px; color:#999999">
                별점: ${item.score}점
              </span>
            </div>

          </div>
        `,
        position: marker.getPosition(),
        yAnchor: 1.6,
      });

        // 🖱 마우스 오버
        kakao.maps.event.addListener(marker, "mouseover", () => {
          overlay.setMap(mapRef.current);
          sendGAEvent("view_store_tooltip", {
            storeId: item.id,
            storeName: item.storeName,
          });
        });

        // 🖱 마우스 아웃
        kakao.maps.event.addListener(marker, "mouseout", () => {
          overlay.setMap(null);
        });

        marker.setMap(mapRef.current);
        markersRef.current.push(marker);
  });

  }, [markers]);

  const scoreColors = {
    1: "#FFE4F1",
    2: "#FFB3D9",
    3: "#FF7DBF",
    4: "#FF4FA8",
    5: "#E60073",
  };

  function createSelectedPinMarker() {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
          width="36" height="48" viewBox="0 0 36 48">

        <path
          d="M18 1C10 1 4 7 4 15c0 11 14 32 14 32s14-21 14-32C32 7 26 1 18 1z"
          fill="#ffffff"
        />

        <path
          d="M18 2.2C11.2 2.2 5.8 7.6 5.8 14.8c0 10.2 12.2 29.5 12.2 29.5s12.2-19.3 12.2-29.5C30.2 7.6 24.8 2.2 18 2.2z"
          fill="#FF2F92"
        />

        <circle cx="18" cy="15" r="4.6" fill="#ffffff"/>
      </svg>
    `;

    return new kakao.maps.MarkerImage(
      `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      new kakao.maps.Size(36, 48),
      { offset: new kakao.maps.Point(18, 48) }
    );
  }

 function createStarScoreMarker(score) {
    // 실수 점수를 활용해 색을 선형 보간하되, 반올림 대신 보간 비율에 강조를 주어
    const s = Math.max(1, Math.min(5, Number(score) || 1));
    const lower = Math.floor(s);
    const upper = Math.ceil(s);
    const t = upper === lower ? 0 : s - lower; // 0..1

    // 소수점이면 점수가 낮은 쪽으로 더 가깝게
    const accent = 1.4;
    const tAdj = Math.pow(t, accent);

    const c1 = scoreColors[lower] || scoreColors[1];
    const c2 = scoreColors[upper] || scoreColors[upper - 1] || c1;

    function hexToRgb(hex) {
      const h = hex.replace('#', '');
      return {
        r: parseInt(h.substring(0,2), 16),
        g: parseInt(h.substring(2,4), 16),
        b: parseInt(h.substring(4,6), 16),
      };
    }

    function rgbToHex({r,g,b}){
      return (
        '#' + [r,g,b].map(v => Math.round(v).toString(16).padStart(2,'0')).join('')
      );
    }

    function interpHex(a, b, t) {
      const A = hexToRgb(a);
      const B = hexToRgb(b);
      return rgbToHex({
        r: A.r + (B.r - A.r) * t,
        g: A.g + (B.g - A.g) * t,
        b: A.b + (B.b - A.b) * t,
      });
    }

    const fill = interpHex(c1, c2, tAdj);

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
          width="25" height="25" viewBox="0 0 25 25">
        <polygon
          points="
            12.5,1.5
            15.7,8.8
            23.7,9.3
            17.6,14.2
            19.6,22.2
            12.5,18.2
            5.4,22.2
            7.4,14.2
            1.3,9.3
            9.3,8.8
          "
          fill="${fill}"
          stroke="#ffffff"
          stroke-width="1"
        />
        <text
          x="12.5"
          y="15.5"
          text-anchor="middle"
          font-size="9"
          font-weight="bold"
          fill="#ffffff"
          font-family="Arial"
        >
        </text>
      </svg>
    `;

    return new kakao.maps.MarkerImage(
      `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      new kakao.maps.Size(25, 25)
    );
}

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}
