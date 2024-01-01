// アプリケーションのメインコンポーネント
import React, { useState } from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import ShopList from './ShopList';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import Map from './Map'; // Mapコンポーネントをインポート

function App() {
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [selectedShopReviews, setSelectedShopReviews] = useState([]);
  const [mapCenter, setMapCenter] = useState([35.6895, 139.6917]); // Tokyo as initial center

  const fetchReviewsForShop = (shopId) => {
    axios.get(`http://localhost:3000/reviews/shop/${shopId}`)
      .then(response => {
        setSelectedShopReviews(response.data);
      })
      .catch(error => {
        console.error('レビュー取得エラー:', error);
      });
  };

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
      <SearchForm setShops={setShops} />
      <ShopList shops={shops} onShopSelect={handleShopSelect} />
      <Map shops={shops} center={mapCenter} onShopSelect={handleShopSelect} />
      <ReviewList reviews={selectedShopReviews} />
      <ReviewForm selectedShopId={selectedShopId} />
    </div>
  );
}

export default App;
