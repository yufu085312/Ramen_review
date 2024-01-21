// アプリケーションのメインコンポーネント
import React, { useState } from 'react';
import { useCurrentLocation } from './useCurrentLocation';
import { handleSearch } from './SearchLogic';
import { onMapMovement} from './MapRelatedLogic';
import { clearShops, handleShopSelect } from './ShopLogic';
import SearchForm from './SearchForm';
import ShopList from './ShopList';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import Map from './Map';
import './styles/App.css';

function App() {
  const { locationLoaded, mapCenter, setMapCenter } = useCurrentLocation();

  const [shops, setShops] = useState([]);
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [selectedShopReviews, setSelectedShopReviews] = useState([]);
  const [postMode, setPostMode] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showCircle, setShowCircle] = useState(true);
  const [displayedShops, setDisplayedShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  const onSearch = async (query) => {
    await handleSearch(query, setMapCenter, setShops, setIsSearchActive, setDisplayedShops, setShowCircle);
  };

  const onMapChange = (newCenter) => {
    const centerArray = [newCenter.lat, newCenter.lng];
    onMapMovement(centerArray, setMapCenter, setShops, setIsSearchActive, isSearchActive);
  };

  const onShopSelect = (shopId) => {
    handleShopSelect(shopId, shops, setSelectedShop, setMapCenter, setSelectedShopId, setSelectedShopReviews);
  };

  const onClearShops = () => {
    clearShops(setShops, setIsSearchActive, setShowCircle, setDisplayedShops);
  };

  const enablePostMode = () => setPostMode(true);
  const disablePostMode = () => setPostMode(false);

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
                  onShopSelect={onShopSelect}
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