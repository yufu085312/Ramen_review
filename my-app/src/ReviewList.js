// 選択されたラーメン店のレビュー一覧
import React from 'react';

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
        <div>
        <h2>レビュー一覧</h2>
        <ul>
            {renderReviews()}
        </ul>
        </div>
    );
};

export default ReviewList;
