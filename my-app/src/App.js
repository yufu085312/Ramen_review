import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]); // レビューデータ用の状態
  const [shops, setShops] = useState([]); // ラーメン店のデータ用の状態

  const [searchQuery, setSearchQuery] = useState(''); // 検索クエリ用の状態

  // レビューデータの取得
  useEffect(() => {
    axios.get('http://localhost:3000/reviews')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('APIリクエストエラー:', error);
      });
  }, []);

  /*
  useEffect(() => {
    axios.get('http://localhost:3000/api/hotpepper/ramen_shops')
      .then(response => {
        console.log(response.data); // ここでレスポンスデータをログ出力
        if (response.data && Array.isArray(response.data)) {
          setShops(response.data);
        }
      })
      .catch(error => console.error('APIリクエストエラー:', error));
  }, []);
  */

  const handleSearch = () => {
    axios.get(`http://localhost:3000/api/hotpepper/ramen_shops?query=${encodeURIComponent(searchQuery)}`)
      .then(response => {
        if (response.data && Array.isArray(response.data)) {
          setShops(response.data); // 検索結果をshopsにセット
        }
      })
      .catch(error => console.error('APIリクエストエラー:', error));
  };
  

  return (
    <div>
      <h1>レビュー一覧</h1>
      <ul>
        {data.map((review) => (
          <li key={review._id}>
            <p>投稿者: {review.write_name}</p>
            <p>評価点: {review.review_points}</p>
            <p>レビュー: {review.review}</p>
            <p>投稿日: {new Date(review.created_at).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
      <h2>ラーメン店一覧</h2>
      <ul>
        {Array.isArray(shops) && shops.map((shop) => (
          <li key={shop.id}>{shop.name}</li> // ラーメン店名を表示
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
    </div>
  );
}

export default App;
