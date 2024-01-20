import { searchShops } from './api';

export const handleSearch = async(query, setMapCenter, setShops, setIsSearchActive, setDisplayedShops, setShowCircle) => {
    try {
        const data = await searchShops(query);
        if (data.length > 0) {
            setMapCenter([data[0].lat, data[0].lng]);
            setShops(data);
            setIsSearchActive(true);
            setDisplayedShops(data);
            setShowCircle(false);
        }
    } catch (error) {
        console.error('Search error:', error);
    }
};