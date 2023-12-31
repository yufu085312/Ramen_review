import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [shops, setShops] = useState([]); // ラーメン店のデータ用の状態
  const [searchQuery, setSearchQuery] = useState(''); // 検索クエリ用の状態
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [reviewPoints, setReviewPoints] = useState('');
  const [selectedShopReviews, setSelectedShopReviews] = useState([]);

  const handleSearch = () => {
    axios.get(`http://localhost:3000/api/hotpepper/ramen_shops?query=${encodeURIComponent(searchQuery)}`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setShops(response.data); // 検索結果をshopsにセット
        }
      })
      .catch(error => console.error('APIリクエストエラー:', error));
  };

  const fetchReviewsForShop = (shopId) => {
    axios.get(`http://localhost:3000/reviews/shop/${shopId}`)
      .then(response => {
        setSelectedShopReviews(response.data); // 選択された店のレビューで状態を更新
      })
      .catch(error => {
        console.error('レビュー取得エラー:', error);
      });
  };  

  const handleShopSelect = (shopId) => {
    setSelectedShopId(shopId);
    fetchReviewsForShop(shopId); // 店を選択した際にレビューを取得
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!selectedShopId) {
      console.error('ラーメン店が選択されていません');
      return;
    }
    axios.post('http://localhost:3000/reviews', {
      write_name: name,
      review: review,
      review_points: reviewPoints,
      hotpepperId: selectedShopId
    })
    .then(response => {
      console.log('レビュー投稿成功:', response);
    })
    .catch(error => {
      console.error('レビュー投稿エラー:', error);
    });
  };

  // レビュー一覧表示のロジック
  const renderReviews = () => {
    if (selectedShopReviews.length === 0) {
      return <p>レビューはありません。</p>;
    }

    return selectedShopReviews.map((review) => (
      <li key={review._id}>
        <p>投稿者: {review.write_name}</p>
        <p>評価点: {review.review_points}</p>
        <p>レビュー: {review.review}</p>
        <p>投稿日: {new Date(review.created_at).toLocaleDateString()}</p>
      </li>
    ));
  };

  return (
    <div>
      <h2>ラーメン店一覧</h2>
      <ul>
        {Array.isArray(shops) && shops.map((shop) => (
          <li 
            key={shop.id} 
            onClick={() => handleShopSelect(shop.id)}
            style={{ cursor: 'pointer' }}
          >
            {shop.name}
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ラーメン店を検索"
        />
        <button onClick={handleSearch}>検索</button>
      </div>
      <h2>レビュー一覧</h2>
      <ul>
        {renderReviews()}
      </ul>
      <div>
        <h2>レビューを投稿</h2>
        <p>選択されたラーメン店: {shops.find(shop => shop.id === selectedShopId)?.name}</p>
        <form onSubmit={handleReviewSubmit}>
          <input
            type="text"
            placeholder="名前"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            placeholder="レビュー"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <input
            type="number"
            placeholder="評価点数"
            value={reviewPoints}
            onChange={(e) => setReviewPoints(e.target.value)}
          />
          <button type="submit">投稿</button>
        </form>
      </div>
    </div>
  );
}

export default App;
