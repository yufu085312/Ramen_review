// アプリケーションのメインコンポーネント
import React, { useState, useEffect } from 'react';
import { handleSearch } from './SearchLogic';
import { onMapMovement, fetchShops } from './MapRelatedLogic';
import { clearShops, handleShopSelect } from './ShopLogic';
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

  const onMapChange = (newCenter) => {
    // newCenter が { lat: number, lng: number } 形式である場合、配列に変換する
    const centerArray = [newCenter.lat, newCenter.lng];
    onMapMovement(centerArray, setMapCenter, setShops, setIsSearchActive, isSearchActive);
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
      // mapCenter が配列であることを確認してください。
      fetchShops(mapCenter, setShops, setIsSearchActive);
    }
  }, [mapCenter, isSearchActive, setShops, setIsSearchActive]);

  // ショップリストをクリアする関数
  // Updated function calls with required arguments
  const onShopSelect = (shopId) => {
    handleShopSelect(shopId, shops, setSelectedShop, setMapCenter, setSelectedShopId, setSelectedShopReviews);
  };

  const onClearShops = () => {
    clearShops(setShops, setIsSearchActive, setShowCircle, setDisplayedShops);
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
            <SearchForm onSearch={onSearch} clearShops={onClearShops} />
          </div>
          <div className="flexGrow">
            <div className="halfWidth">
            <ShopList shops={isSearchActive ? displayedShops : shops} onShopSelect={onShopSelect} />
            </div>
            <div className="halfWidth">
              <div className="mapHeight">
              {locationLoaded && <Map
                shops={isSearchActive ? displayedShops : shops}
                selectedShop={selectedShop}
                center={mapCenter}
                onShopSelect={handleShopSelect}
                onMapMovement={onMapChange}
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