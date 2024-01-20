// アプリケーションのメインコンポーネント
import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [mapInstance, setMapInstance] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

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

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/hotpepper/shops`, { params: { query } });
      if (response.data.length > 0) {
        setMapCenter([response.data[0].lat, response.data[0].lng]);
        setShops(response.data);
        setIsSearchActive(true);
        setDisplayedShops(response.data);
        setShowCircle(false);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Function to fetch shops based on center
  const fetchShops = async (center) => {
    try {
      const [lat, lng] = center;
      const response = await axios.get(`http://localhost:3000/api/hotpepper/shops`, {
        params: { lat, lng, radius: 1000 }
      });
      setShops(response.data);
      setIsSearchActive(false);
    } catch (error) {
      console.error('Shop fetch error:', error);
    }
  };

  // Function to handle map movement
  const handleMapMovement = (newCenter) => {
    console.log("App.js: handleMapMovement called with newCenter", newCenter);
    setMapCenter(newCenter);
    if (!isSearchActive) {
      setShowCircle(true);
      fetchShops(newCenter);
    }
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

  // Call fetchShopsNearby initially and when mapCenter changes
  useEffect(() => {
    if (!isSearchActive) {
      fetchShops(mapCenter);
    }
    // 依存関係配列には `isSearchActive` と `mapCenter` のみを含めます。
  }, [mapCenter, isSearchActive]);

  useEffect(() => {
    console.log("mapCenter updated:", mapCenter);
    if (mapInstance && mapCenter) {
      mapInstance.flyTo(mapCenter, mapInstance.getZoom());
    }
  }, [mapInstance, mapCenter]);
  

  // ショップリストをクリアする関数
  const clearShops = () => {
    setShops([]);
    setIsSearchActive(false);
    setShowCircle(true);
    setDisplayedShops([]); // 表示される店舗をリセット
  };

  // ラーメン店が選択されたときに呼び出される。
  // 選択された店の位置情報をマップの中心地に設定し、その店のレビューを取得する。
  const handleShopSelect = (shopId) => {
    const shop = shops.find(s => s.id === shopId);
    if (shop) {
      const newCenter = [parseFloat(shop.lat), parseFloat(shop.lng)];
      setSelectedShop(shop); // 選択された店のデータを設定
      setMapCenter(newCenter);  // 地図の中心を更新
      console.log("New center set to:", newCenter);
      // mapInstanceが存在する場合、新しい中心に飛ぶ
      if (mapInstance) {
        mapInstance.flyTo(newCenter, mapInstance.getZoom());
      }
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
            <SearchForm onSearch={handleSearch} clearShops={clearShops} />
          </div>
          <div className="flexGrow">
            <div className="halfWidth">
            <ShopList shops={isSearchActive ? displayedShops : shops} onShopSelect={handleShopSelect} />
            </div>
            <div className="halfWidth">
              <div className="mapHeight">
              {locationLoaded && <Map
                shops={isSearchActive ? displayedShops : shops}
                selectedShop={selectedShop} // 選択された店のデータを渡す
                center={mapCenter}
                onShopSelect={handleShopSelect}
                setMapCenter={handleMapMovement}
                isSearchActive={isSearchActive}
                showCircle={showCircle}
                setMapInstance={setMapInstance}
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