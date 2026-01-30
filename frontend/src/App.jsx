import { Routes, Route } from 'react-router-dom'
import Products from "./components/pages/Personal"
import GogoGis from "./components/pages/personal/detail/gogoGis"
import GogoMobile from "./components/pages/personal/detail/gogoMobile"
import StoreSearchForm from "./components/pages/personal/detail/StoreSearchForm"
import HalfStarRating from "./components/pages/personal/detail/HalfStarRating"
import KakaoMap from './components/common/KakaoMap'
import HogangNono from './components/pages/personal/hogangNono'
import CompareRealEstate from './components/pages/personal/compareRealEstate'


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/personal" element={<Products />} />
        <Route path="/personal/gogoGis" element={<GogoGis />} />
        <Route path="/personal/gogoMobile" element={<GogoMobile />} />
        <Route path="/personal/StoreSearchForm" element={<StoreSearchForm />} />
        <Route path="/personal/HalfStarRating" element={<HalfStarRating />} />
        <Route path="/products/KakaoMap" element={<KakaoMap />} />
        <Route path="/personal/hogangNono" element={<HogangNono />} />
        <Route path="/personal/compareRealEstate" element={<CompareRealEstate />} />
      </Routes>
    </>
  )
}
 