import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const fetchReviewsForShop = async (shopId) => {
    try {
        const response = await axios.get(`${BASE_URL}/reviews/shop/${shopId}`);
        return response.data;
    } catch (error) {
        console.error('レビュー取得エラー:', error);
        throw error;
    }
};

export const searchShops = async (query) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/hotpepper/shops`, { params: { query } });
        return response.data;
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
};

export const fetchShopsBasedOnCenter = async (lat, lng) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/hotpepper/shops`, {
            params: { lat, lng, radius: 1000 }
        });
        return response.data;
    } catch (error) {
        console.error('Shop fetch error:', error);
        throw error;
    }
};