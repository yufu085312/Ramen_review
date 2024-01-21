import { useState, useEffect } from 'react';

export const useCurrentLocation = () => {
    const [locationLoaded, setLocationLoaded] = useState(false);
    const [mapCenter, setMapCenter] = useState([35.6895, 139.6917]); // デフォルト値は東京

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setMapCenter([latitude, longitude]);
                setLocationLoaded(true);
            },
            (error) => {
                console.error('位置情報の取得に失敗しました。', error);
                setLocationLoaded(true);
            }, { timeout: 30000 }
        );
    }, []);

    return { locationLoaded, mapCenter, setMapCenter };
};