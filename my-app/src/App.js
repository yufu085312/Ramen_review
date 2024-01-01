// アプリケーションのメインコンポーネント
import React, { useState } from 'react'; // コンポーネントの状態管理に使用されるReactのフック
import axios from 'axios'; // HTTPリクエストを行うためのライブラリ
import SearchForm from './SearchForm';
import ShopList from './ShopList';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import Map from './Map';

function App() {
  const [shops, setShops] = useState([]); // ラーメン店の一覧を格納する状態
  const [selectedShopId, setSelectedShopId] = useState(null); // 選択されたラーメン店のIDを格納する状態
  const [selectedShopReviews, setSelectedShopReviews] = useState([]); // 選択されたラーメン店のレビューを格納する状態
  const [mapCenter, setMapCenter] = useState([35.6895, 139.6917]); // マップの中心地を格納する状態。初期値は東京の座標

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

  return (
    <div>
      <SearchForm setShops={setShops} /> { /* ラーメン店を検索するためのフォーム */}
      <ShopList shops={shops} onShopSelect={handleShopSelect} /> {/* 検索されたラーメン店の一覧 */}
      <Map shops={shops} center={mapCenter} onShopSelect={handleShopSelect} /> {/* ラーメン店の位置情報を表示するマップ */}
      <ReviewList reviews={selectedShopReviews} /> {/* 選択されたラーメン店のレビュー一覧 */}
      <ReviewForm selectedShopId={selectedShopId} /> {/* 選択されたラーメン店へのレビュー投稿フォーム */}
    </div>
  );
}

export default App;
