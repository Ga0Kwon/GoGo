import { useState, useRef, useEffect} from "react";
import { sendGAEvent } from "../../../..//js/utils/ga.js";

export default function SearchForm({ onPlaceSelect }) {
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const wrapperRef = useRef(null); // 외부 클릭 감지용 참조
  //가게 검색
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    setLoading(true);
    setError(null);
    fetch("http://localhost:3001/api/searchKakaoApi?query="+keyword)
    .then(res => res.json())
    .then(data => {
      setResult(data);
      setLoading(false);

      sendGAEvent("search_store", {
        keyword: keyword,
        resultCount: data.documents.length
      });
    })
    
  };


  //가게 검색 후 선택 후 위치 전달
  const addPlace = (placeId) => {
    const place = result.documents.find(p => p.id === placeId);
    if (!place) return;

    onPlaceSelect({
      lat: Number(place.y),
      lng: Number(place.x),
      id : place.id,
      name : place.place_name,
      address : place.road_address_name || place.address_name,
      cName : place.category_group_name
    });

    setResult(null); // 선택 후 리스트 닫기 (선택)
};


  // 클릭 외부 영역 감지
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setResult(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



  return (
    <form ref={wrapperRef} onSubmit={handleSubmit} className="z-[100] absolute w-[100%] top-2">
      <div className="flex justify-around gap-1 w-full bg-transparent rounded-md-20"> 
          {/* KAKAO API 검색*/}
          <input className="w-[65%] h-10 p-1 rounded-lg shadow" placeholder="가게명" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <button className="w-[20%] h-10 p-1 bg-blue-600 text-white rounded-md-20" type="submit" disabled={loading}>검색</button>
      </div>

      {loading && <p>검색 중...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {result && result.documents && (
        <ul className="h-[300px] overflow-y-scroll bg-white m-2">
          {result.documents.map((place) => (
            <li key={place.id} className="border-b p-1 h-[60px]">
              <div className="flex justify-between items-center">
                <div className="w-[75%] pl-3">
                  <strong>{place.place_name}</strong>
                  <br />
                  <p className="text-sm">{place.road_address_name || place.address_name}</p>   
                </div>
                <div className="w-[25%]">
                    <button className="ml-2 text-blue-600" onClick={() => addPlace(place.id)}>
                    선택
                    </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}