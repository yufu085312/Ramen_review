import { fetchReviewsForShop } from './api';

export const clearShops = (setShops, setIsSearchActive, setShowCircle, setDisplayedShops) => {
    setShops([]);
    setIsSearchActive(false);
    setShowCircle(true);
    setDisplayedShops([]);
};

export const handleShopSelect = async(shopId, shops, setSelectedShop, setMapCenter, setSelectedShopId, setSelectedShopReviews) => {
    const shop = shops.find(s => s.id === shopId);
    if (shop) {
        const newCenter = [parseFloat(shop.lat), parseFloat(shop.lng)];
        setSelectedShop(shop);
        setMapCenter(newCenter);
    }
    setSelectedShopId(shopId);
    try {
        const reviews = await fetchReviewsForShop(shopId);
        setSelectedShopReviews(reviews);
    } catch (error) {
        console.error('レビュー取得エラー:', error);
    }
};