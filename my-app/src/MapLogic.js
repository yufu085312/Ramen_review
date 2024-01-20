export const updateMapCenter = (newCenter, setMapCenter, fetchShops, isSearchActive) => {
    setMapCenter(newCenter);
    if (!isSearchActive) {
        fetchShops(newCenter);
    }
};

export const handleMapMovement = (center, setMapCenter, fetchShops, isSearchActive) => {
    const newCenter = [center.lat, center.lng]; // center を配列に変換
    updateMapCenter(newCenter, setMapCenter, fetchShops, isSearchActive);
};