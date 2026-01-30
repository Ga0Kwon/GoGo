import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
      fetch("http://localhost:3001/api/selectProducts")
        .then(res => res.json())
        .then(data => {setProducts(data)})
  }, [])

  // ✔ 프로덕트 상세한 내용을 보는 함수
  const showDetailProduct = (pId) => {
    if(pId == 1){
        navigate("/personal/gogoGis")
    }if(pId == 2){
        navigate("/personal/compareRealEstate")
    }if(pId == 3){
        navigate("/personal/hogangNono")
    }
  }

  return (
    <div className="p-8 min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-gray-900">
        Personal Projects
      </h2>

      <div className="space-y-6">
        {products.map(p => (
          <div
            key={p.pId}
            onClick={() => showDetailProduct(p.pId)}
            className="
              group cursor-pointer
              bg-white border border-gray-200 rounded-xl
              flex overflow-hidden
              transition-all duration-200
              hover:shadow-lg hover:-translate-y-1
            "
          >
            {/* 왼쪽 포인트 바 */}
            <div className="w-1 bg-blue-600" />

            <div className="p-6 flex-1">
              <h3 className="
                text-xl font-semibold text-gray-900
                group-hover:text-blue-600 transition
              ">
                {p.pTitle}
              </h3>

              <p className="mt-2 text-gray-600 leading-relaxed">
                {p.pIntroduce}
              </p>

              <p className="mt-4 text-sm text-gray-400">
                {p.pRegDate}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}