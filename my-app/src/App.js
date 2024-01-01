// アプリケーションのメインコンポーネント
import React, { useState } from 'react'; // コンポーネントの状態管理に使用されるReactのフック
import axios from 'axios'; // HTTPリクエストを行うためのライブラリ
import SearchForm from './SearchForm';
import ShopList from './ShopList';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import Map from './Map';
import './styles/App.css'; // Adjust the path according to your file structure

function App() {
  const [shops, setShops] = useState([]); // ラーメン店の一覧を格納する状態
  const [selectedShopId, setSelectedShopId] = useState(null); // 選択されたラーメン店のIDを格納する状態
  const [selectedShopReviews, setSelectedShopReviews] = useState([]); // 選択されたラーメン店のレビューを格納する状態
  const [mapCenter, setMapCenter] = useState([35.6895, 139.6917]); // マップの中心地を格納する状態。初期値は東京の座標
  // 投稿モードの状態を追加
  const [postMode, setPostMode] = useState(false);

  // 選択されたラーメン店のIDに基づいて、その店のレビューを取得し、selectedShopReviews 状態を更新する。
  const fetchReviewsForShop = (shopId) => {
    axios.get(`http://localhost:3000/reviews/shop/${shopId}`)
      .then(response => {
        setSelectedShopReviews(response.data);
      })
      .catch(error => {
        console.error('レビュー取得エラー:', error);
      });
  };

  // ラーメン店が選択されたときに呼び出される。
  // 選択された店の位置情報をマップの中心地に設定し、その店のレビューを取得する。
  const handleShopSelect = (shopId) => {
    const selectedShop = shops.find(shop => shop.id === shopId);
    if (selectedShop) {
        setMapCenter([Number(selectedShop.lat), Number(selectedShop.lng)]);
    }
    setSelectedShopId(shopId);
    fetchReviewsForShop(shopId);
};

// Toggle post mode
const enablePostMode = () => {
  setPostMode(true);
};

const disablePostMode = () => {
  setPostMode(false);
};

return (
  <div className="appContainer">
    {postMode ? (
      <div className="padding20">
        <button onClick={disablePostMode}>Return</button>
        <ReviewForm selectedShopId={selectedShopId} />
      </div>
    ) : (
      <div className="flexGrow">
        <div className="centerText">
          <SearchForm setShops={setShops} />
        </div>
        <div className="flexGrow">
          <div className="halfWidth">
            <ShopList shops={shops} onShopSelect={handleShopSelect} />
          </div>
          <div className="halfWidth">
            <div className="mapHeight">
              <Map shops={shops} center={mapCenter} onShopSelect={handleShopSelect} />
            </div>
            <div className="reviewsHeight">
              <button onClick={enablePostMode}>Post Review</button>
              {selectedShopId && <ReviewList reviews={selectedShopReviews} />}
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default App;
