import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/reviews')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('APIリクエストエラー:', error);
      });
  }, []);

  return (
    <div>
      <h1>ラーメンレビュー一覧</h1>
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
    </div>
  );
}

export default App;
