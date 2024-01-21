import { fetchReviewsForShop } from './api';

// clearShops: アプリケーションの状態をリセットし、ショップのリストをクリアする関数です。
export const clearShops = (setShops, setIsSearchActive, setShowCircle, setDisplayedShops) => {
    setShops([]); // ショップのリストを空に設定
    setIsSearchActive(false); // 検索状態を非アクティブに設定
    setShowCircle(true); // 地図上の円を表示するように設定
    setDisplayedShops([]); // 表示されるショップのリストを空に設定
};

// handleShopSelect: ユーザーが地図上のショップを選択したときに呼び出される関数です。
export const handleShopSelect = async(shopId, shops, setSelectedShop, setMapCenter, setSelectedShopId, setSelectedShopReviews) => {
    const shop = shops.find(s => s.id === shopId); // 選択されたショップIDに基づいてショップを検索
    if (shop) {
        const newCenter = [parseFloat(shop.lat), parseFloat(shop.lng)]; // ショップの緯度と経度を浮動小数点数に変換
        setSelectedShop(shop); // 選択されたショップの状態を設定
        setMapCenter(newCenter); // 地図の中心をショップの位置に設定
    }
    setSelectedShopId(shopId); // 選択されたショップIDの状態を設定
    try {
        const reviews = await fetchReviewsForShop(shopId); // ショップIDに基づいてレビューを取得
        setSelectedShopReviews(reviews); // 取得したレビューの状態を設定
    } catch (error) {
        console.error('レビュー取得エラー:', error); // エラーが発生した場合の処理
    }
};