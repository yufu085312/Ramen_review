// apiモジュールから fetchShopsBasedOnCenter 関数をインポートしています。
import { fetchShopsBasedOnCenter } from './api';
// MapLogicモジュールから updateMapCenter 関数をインポートしています。
import { updateMapCenter } from './MapLogic';

// fetchShops は非同期関数で、地図の中心点に基づいてショップのデータを取得します。
export const fetchShops = async(center, setShops, setIsSearchActive) => {
    try {
        // 中心点が配列で2要素（緯度と経度）を持っていることを確認します。
        if (!Array.isArray(center) || center.length !== 2) {
            throw new Error('Invalid center format');
        }
        const [lat, lng] = center;
        // APIを呼び出してショップのデータを取得します。
        const data = await fetchShopsBasedOnCenter(lat, lng);
        // 取得したデータを状態として設定します。
        setShops(data);
        // 検索がアクティブでない状態に設定します。
        setIsSearchActive(false);
    } catch (error) {
        // エラーが発生した場合、コンソールにエラーを出力します。
        console.error('Shop fetch error:', error);
    }
};

// onMapMovement は地図の移動イベントに対応する関数です。
export const onMapMovement = (newCenter, setMapCenter, setShops, setIsSearchActive, isSearchActive) => {
    // 地図の中心点を更新し、必要に応じてショップのデータを再取得します。
    updateMapCenter(newCenter, setMapCenter, () => fetchShops(newCenter, setShops, setIsSearchActive), isSearchActive);
};