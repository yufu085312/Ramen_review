// 選択されたラーメン店のレビュー一覧
import React from 'react';

import './styles/ReviewList.css';

const ReviewList = ({ reviews }) => {
    const renderReviews = () => {
        if (reviews.length === 0) {
            return <p>レビューはありません。</p>;
        }

        return reviews.map((review) => (
            <li key={review._id}>
                <p>投稿者: {review.write_name}</p>
                <p>評価点: {review.review_points}</p>
                <p>レビュー: {review.review}</p>
                <p>投稿日: {new Date(review.created_at).toLocaleDateString()}</p>
            </li>
        ));
    };

    return (
        <div className="reviewListContainer">
            <h1>一覧</h1>
            <div className="reviewList">
                <ul>
                    {renderReviews()}
                </ul>
            </div>
        </div>
    );
};

export default ReviewList;
