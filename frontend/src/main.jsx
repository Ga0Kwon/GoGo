import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// Load Kakao Maps SDK dynamically using environment variable VITE_KAKAO_KEY.
// Add a file `frontend/.env` (ignored by git) with `VITE_KAKAO_KEY=your_key` for local dev.
const kakaoKey = import.meta.env.VITE_KAKAO_KEY;
if (kakaoKey) {
  const s = document.createElement('script');
  s.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}`;
  s.async = true;
  document.head.appendChild(s);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
