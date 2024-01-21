// updateMapCenter: 地図の中心点を更新する関数です。
export const updateMapCenter = (newCenter, setMapCenter, fetchShops, isSearchActive) => {
    // setMapCenter 関数を使ってアプリケーションの状態に新しい中心点を設定します。
    setMapCenter(newCenter);
    // 検索がアクティブでない場合にのみ、新しい中心点に基づいてショップのデータを取得します。
    if (!isSearchActive) {
        fetchShops(newCenter);
    }
};

// handleMapMovement: 地図の移動イベントを処理する関数です。
export const handleMapMovement = (center, setMapCenter, fetchShops, isSearchActive) => {
    // center オブジェクト（{ lat: number, lng: number } 形式）から緯度と経度の配列を生成します。
    const newCenter = [center.lat, center.lng];
    // updateMapCenter 関数を呼び出して、地図の中心点を更新し、必要に応じてショップのデータを取得します。
    updateMapCenter(newCenter, setMapCenter, fetchShops, isSearchActive);
};