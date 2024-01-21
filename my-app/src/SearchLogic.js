import { searchShops } from './api';

// handleSearch: ユーザーによる検索クエリに基づいてショップを検索する関数。
export const handleSearch = async(query, setMapCenter, setShops, setIsSearchActive, setDisplayedShops, setShowCircle) => {
    try {
        const data = await searchShops(query); // 引数のクエリを使用してショップを検索

        if (data.length > 0) {
            setMapCenter([data[0].lat, data[0].lng]); // 検索結果の最初のショップの位置を地図の中心に設定
            setShops(data); // 取得したショップデータを状態に設定
            setIsSearchActive(true); // 検索がアクティブであることを示す状態を設定
            setDisplayedShops(data); // 表示されるショップリストを更新
            setShowCircle(false); // 地図上の円の表示を非表示に設定
        }
    } catch (error) {
        console.error('Search error:', error); // 検索中にエラーが発生した場合の処理
    }
};