// アプリケーションのメインコンポーネント
import React, { useState } from 'react';
// カスタムフックと追加のロジックのインポート
import { useCurrentLocation } from './useCurrentLocation';
import { usePostMode } from './usePostMode';
import { handleSearch } from './SearchLogic';
import { onMapMovement } from './MapRelatedLogic';
import { clearShops, handleShopSelect } from './ShopLogic';

// UIコンポーネントのインポート
import SearchForm from './SearchForm';
import ShopList from './ShopList';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import Map from './Map';
import './styles/App.css';

function App() {
  // カスタムフックを使用して現在地情報と投稿モードの状態を管理
  const { locationLoaded, mapCenter, setMapCenter } = useCurrentLocation();
  const { postMode, enablePostMode, disablePostMode } = usePostMode();

  // コンポーネント内のローカル状態の定義
  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [selectedShopReviews, setSelectedShopReviews] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showCircle, setShowCircle] = useState(true);
  const [displayedShops, setDisplayedShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const [selectedShopDetails, setSelectedShopDetails] = useState(null);
  // ページインデックスの状態
  const [pageIndex, setPageIndex] = useState(0);
  // レビューリスト表示の状態
  const [showReviewList, setShowReviewList] = useState(false);

  // ショップ検索処理
  const onSearch = async (query) => {
    setPageIndex(0); // 検索時にページインデックスをリセット
    await handleSearch(query, setMapCenter, setShops, setIsSearchActive, setDisplayedShops, setShowCircle);
  };

  // 地図上の変更に対応する処理
  const onMapChange = (newCenter) => {
    const centerArray = [newCenter.lat, newCenter.lng];
    onMapMovement(centerArray, setMapCenter, setShops, setIsSearchActive, isSearchActive);
  };

  // ショップ選択処理
  const onShopSelect = (shopId) => {
    const shop = shops.find(s => s.id === shopId);
    setSelectedShop(shop);
    setSelectedShopDetails(shop); // 選択されたショップの詳細情報を設定
    handleShopSelect(shopId, shops, setSelectedShop, setMapCenter, setSelectedShopId, setSelectedShopReviews);
    setShowReviewList(true);
  };

  // レビューリストからショップリストへ戻る
  const backToShopList = () => {
    setShowReviewList(false);
  };

  // ショップリストのクリア処理
  const onClearShops = () => {
    clearShops(setShops, setIsSearchActive, setShowCircle, setDisplayedShops);
  };

  // コンポーネントのレンダリング
  return (
    <div className="appContainer">
      <div className="logoArea">
        <div className="logoText">RAMEN RATING</div>
        <img src="/logo.png" alt="Logo" className="logoImage" />
      </div>
      {postMode ? (
        // 投稿モードのUI
        <div className="reviewform">
          <button onClick={disablePostMode} className="goBackButton">戻る</button>
          <ReviewForm selectedShopId={selectedShopId} />
        </div>
      ) : (
        // 通常モードのUI
        <div className="flexGrow">
          <div className="searchContainer">
            <SearchForm onSearch={onSearch} clearShops={onClearShops} />
          </div>
          <div className="mainContent">
            <div className="halfWidth">
            {!showReviewList ? (
              // ショップリスト表示
              <ShopList
                shops={isSearchActive ? displayedShops : shops}
                onShopSelect={onShopSelect}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
              />
            ) : (
              // レビューリスト表示
              <div>
                <h1>店名: {selectedShopDetails && selectedShopDetails.name}</h1>
                <p>住所: {selectedShopDetails && selectedShopDetails.address}</p>
                <p>営業日: {selectedShopDetails && selectedShopDetails.open}</p>
                <p>駐車場: {selectedShopDetails && selectedShopDetails.parking}</p>
                <ReviewList reviews={selectedShopReviews} />
                <button onClick={backToShopList} style={{ fontSize: '1.2em', padding: '10px 20px' }}>戻る</button>
                <button onClick={enablePostMode} style={{ fontSize: '1.2em', padding: '10px 20px' }}>投稿</button>
              </div>
            )}
            </div>
            <div className="mapHeight">
              {locationLoaded && <Map
                shops={isSearchActive ? displayedShops : shops}
                selectedShop={selectedShop}
                center={mapCenter}
                onShopSelect={onShopSelect}
                onMapMovement={onMapChange}
                showCircle={showCircle}
              />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
