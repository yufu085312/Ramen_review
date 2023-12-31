// レビュー投稿フォーム
import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ selectedShopId }) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [reviewPoints, setReviewPoints] = useState('');
    const [message, setMessage] = useState('');

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
            setMessage('レビューが投稿されました！');
            resetForm();
        })
        .catch(error => {
            console.error('レビュー投稿エラー:', error);
            setMessage('レビューの投稿に失敗しました。');
        });

        // 投稿成功メッセージを数秒後に非表示にする
        setTimeout(() => {
            setMessage('');
        }, 3000);
    };

    // フォームの内容をリセット
    const resetForm = () => {
        setName('');
        setReview('');
        setReviewPoints('');
    };

    return (
        <div>
            <h2>レビューを投稿</h2>
            {message && <p>{message}</p>}
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
    );
};

export default ReviewForm;
