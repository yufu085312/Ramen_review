// レビュー投稿フォーム
import React, { useState } from 'react';
import axios from 'axios';
import './styles/ReviewForm.css';

const ReviewForm = ({ selectedShopId }) => {
    // ユーザーがフォームに入力するレビューの名前、内容、評価点をそれぞれ保持する
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [reviewPoints, setReviewPoints] = useState('');
    // ユーザーにフィードバックを提供するためのメッセージを保持する
    const [message, setMessage] = useState('');

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        // 未入力チェック
        if (!name.trim() || !review.trim() || !reviewPoints) {
            setMessage('全ての項目を入力してください。');
            return;
        }
        if (!selectedShopId) {
            console.error('ラーメン店が選択されていません');
            return;
        }
        // レビューの投稿
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
        // エラーハンドリング
        .catch(error => {
            // フィードバックメッセージ
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
        <div className="reviewFormContainer">
            <h1>レビューを投稿</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* 名前入力フィールド */}
                <label className="reviewFormLabel">
                    名前
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ fontSize: '1.2em', padding: '5px', width: '300px' }} // スタイルを適用
                    />
                </label>
                {/* レビュー入力フィールド */}
                <label className="reviewFormLabel">
                    レビュー
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        style={{ fontSize: '1.2em', padding: '5px', width: '400px', height: '200px' }} // スタイルを適用
                    ></textarea>
                </label>
                {/* 評価点入力フィールド */}
                <label className="reviewFormLabel">
                    評価点
                    <input
                        type="number"
                        value={reviewPoints}
                        onChange={(e) => setReviewPoints(e.target.value)}
                        style={{ fontSize: '1.2em', padding: '5px', width: '100px' }} // スタイルを適用
                    />
                </label>
                {/* 投稿ボタン */}
                <div style={{ textAlign: 'center' }}>
                    <button type="submit" style={{ width: '200px', fontSize: '1.2em', padding: '10px 20px' }}>投稿</button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
