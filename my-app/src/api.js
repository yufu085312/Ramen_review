import axios from 'axios';

// APIリクエストの基本URLを設定
const BASE_URL = 'http://localhost:3000';

/**
 * 特定のショップのレビューを取得する関数
 * @param {number} shopId - レビューを取得するショップのID
 * @returns {Promise} レビューのデータを含むプロミス
 */
export const fetchReviewsForShop = async(shopId) => {
    try {
        // axiosを使用してレビューのデータを取得
        const response = await axios.get(`${BASE_URL}/reviews/shop/${shopId}`);
        // レスポンスのデータ部分を返す
        return response.data;
    } catch (error) {
        // エラー発生時にコンソールにエラーを表示し、エラーをスロー
        console.error('レビュー取得エラー:', error);
        throw error;
    }
};

/**
 * ショップを検索する関数
 * @param {string} query - 検索クエリ文字列
 * @returns {Promise} 検索結果のショップデータを含むプロミス
 */
export const searchShops = async(query) => {
    try {
        // axiosを使用して検索クエリに基づいてショップのデータを取得
        const response = await axios.get(`${BASE_URL}/api/hotpepper/shops`, { params: { query } });
        // レスポンスのデータ部分を返す
        return response.data;
    } catch (error) {
        // エラー発生時にコンソールにエラーを表示し、エラーをスロー
        console.error('Search error:', error);
        throw error;
    }
};

/**
 * 地図の中心座標に基づいて近くのショップを取得する関数
 * @param {number} lat - 緯度
 * @param {number} lng - 経度
 * @returns {Promise} 近くのショップのデータを含むプロミス
 */
export const fetchShopsBasedOnCenter = async(lat, lng) => {
    try {
        // axiosを使用して指定された緯度・経度の近くのショップのデータを取得
        const response = await axios.get(`${BASE_URL}/api/hotpepper/shops`, {
            params: { lat, lng, radius: 1000 }
        });
        // レスポンスのデータ部分を返す
        return response.data;
    } catch (error) {
        // エラー発生時にコンソールにエラーを表示し、エラーをスロー
        console.error('Shop fetch error:', error);
        throw error;
    }
};