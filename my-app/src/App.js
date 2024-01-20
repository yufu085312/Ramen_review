// アプリケーションのメインコンポーネント
import React, { useState, useEffect } from 'react';
import { handleMapMovement } from './MapLogic';
import { handleSearch } from './SearchLogic';
import { fetchReviewsForShop, fetchShopsBasedOnCenter } from './api';
import SearchForm from './SearchForm';
import ShopList from './ShopList';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import Map from './Map';
import './styles/App.css';

function App() {
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [selectedShopReviews, setSelectedShopReviews] = useState([]);
  const [mapCenter, setMapCenter] = useState([35.6895, 139.6917]);
  const [postMode, setPostMode] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showCircle, setShowCircle] = useState(true);
  const [displayedShops, setDisplayedShops] = useState([]);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  // onSearch 関数を使用する場合（SearchForm コンポーネントに渡される）
  const onSearch = async (query) => {
    await handleSearch(query, setMapCenter, setShops, setIsSearchActive, setDisplayedShops, setShowCircle);
  };

  // センターに基づいてショップを取得する機能
  const fetchShops = async (center) => {
    try {
      const [lat, lng] = center; // ここで center を分解する
      const data = await fetchShopsBasedOnCenter(lat, lng);
      setShops(data);
      setIsSearchActive(false);
    } catch (error) {
      console.error('Shop fetch error:', error);
    }
  };

  // 地図の移動イベントを扱う関数
  const onMapMovement = (newCenter) => {
    handleMapMovement(newCenter, setMapCenter, fetchShops, isSearchActive);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        setLocationLoaded(true);
      },
      (error) => {
        console.error('位置情報の取得に失敗しました。', error);
        setLocationLoaded(true);
      },
      { timeout: 30000 }
    );
  }, []);

  // 最初と、mapCenter が変更されたときに fetchShopsNearby を呼び出します
  useEffect(() => {
    if (!isSearchActive) {
      fetchShops(mapCenter);
    }
    // 依存関係配列には `isSearchActive` と `mapCenter` のみを含めます。
  }, [mapCenter, isSearchActive]);

  // ショップリストをクリアする関数
  const clearShops = () => {
    setShops([]);
    setIsSearchActive(false);
    setShowCircle(true);
    setDisplayedShops([]); // 表示される店舗をリセット
  };

  // ラーメン店が選択されたときに呼び出される。
  const handleShopSelect = async (shopId) => {
    const shop = shops.find(s => s.id === shopId);
    if (shop) {
      const newCenter = [parseFloat(shop.lat), parseFloat(shop.lng)];
      setSelectedShop(shop); // 選択された店のデータを設定
      setMapCenter(newCenter);  // 地図の中心を更新
    }
    setSelectedShopId(shopId);
    try {
      const reviews = await fetchReviewsForShop(shopId); // API 呼び出し
      setSelectedShopReviews(reviews);
    } catch (error) {
      console.error('レビュー取得エラー:', error);
    }
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
            <SearchForm onSearch={onSearch} clearShops={clearShops} />
          </div>
          <div className="flexGrow">
            <div className="halfWidth">
            <ShopList shops={isSearchActive ? displayedShops : shops} onShopSelect={handleShopSelect} />
            </div>
            <div className="halfWidth">
              <div className="mapHeight">
              {locationLoaded && <Map
                shops={isSearchActive ? displayedShops : shops}
                selectedShop={selectedShop}
                center={mapCenter}
                onShopSelect={handleShopSelect}
                onMapMovement={onMapMovement}
                showCircle={showCircle}
              />}
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