import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Load Kakao Maps SDK dynamically using environment variable VITE_KAKAO_KEY or legacy VITE_KAKAO_MAP_KEY.
// Add a file `frontend/.env` (ignored by git) with `VITE_KAKAO_KEY=your_key` for local dev.
const kakaoKey = import.meta.env.VITE_KAKAO_KEY || import.meta.env.VITE_KAKAO_MAP_KEY;
console.info('Kakao key present:', Boolean(kakaoKey));
if (kakaoKey) {
  const s = document.createElement('script');
  // load with autoload=false so we can wait for internal API initialization
  s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
  s.async = true;
  s.onload = () => {
    console.info('Kakao SDK script loaded:', s.src);
    if (window.kakao?.maps?.load) {
      window.kakao.maps.load(() => {
        console.info('kakao.maps API ready (maps.load callback)');
        window.dispatchEvent(new Event('kakao-sdk-loaded'));
      });
    } else {
      console.warn('kakao.maps.load not available, dispatching kakao-sdk-loaded anyway');
      window.dispatchEvent(new Event('kakao-sdk-loaded'));
    }
  };
  s.onerror = (e) => console.warn('Failed to load Kakao Maps SDK', e);
  document.head.appendChild(s);
} else {
  // helpful hint in dev when key is missing
  console.warn('VITE_KAKAO_KEY not set. Kakao Maps will not load.');
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
