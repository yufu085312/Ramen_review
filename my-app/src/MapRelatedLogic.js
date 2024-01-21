// MapRelatedLogic.js
import { fetchShopsBasedOnCenter } from './api';
import { updateMapCenter } from './MapLogic';

export const fetchShops = async(center, setShops, setIsSearchActive) => {
    try {
        if (!Array.isArray(center) || center.length !== 2) {
            throw new Error('Invalid center format');
        }
        const [lat, lng] = center;
        const data = await fetchShopsBasedOnCenter(lat, lng);
        setShops(data);
        setIsSearchActive(false);
    } catch (error) {
        console.error('Shop fetch error:', error);
    }
};

export const onMapMovement = (newCenter, setMapCenter, setShops, setIsSearchActive, isSearchActive) => {
    updateMapCenter(newCenter, setMapCenter, () => fetchShops(newCenter, setShops, setIsSearchActive), isSearchActive);
};