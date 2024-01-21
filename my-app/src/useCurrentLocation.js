import { useState, useEffect } from 'react';

// useCurrentLocation はカスタムフックで、ブラウザの位置情報APIを使用してユーザーの現在地を取得します。
export const useCurrentLocation = () => {
    // locationLoaded は boolean 型の状態で、位置情報が読み込まれたかどうかを表します。
    const [locationLoaded, setLocationLoaded] = useState(false);

    // mapCenter は配列の状態で、地図の中心点（緯度と経度）を保持します。
    // 初期値は東京の座標です。
    const [mapCenter, setMapCenter] = useState([35.6895, 139.6917]);

    // useEffect フックはコンポーネントのマウント時に一度だけ実行されます。
    useEffect(() => {
        // navigator.geolocation.getCurrentPosition はブラウザの位置情報APIを使用して、
        // ユーザーの現在地を取得します。
        navigator.geolocation.getCurrentPosition(
            // 成功時のコールバック関数です。
            (position) => {
                const { latitude, longitude } = position.coords;
                // 現在地の座標を mapCenter に設定します。
                setMapCenter([latitude, longitude]);
                // 位置情報の取得が完了したことを locationLoaded に設定します。
                setLocationLoaded(true);
            },
            // エラー時のコールバック関数です。
            (error) => {
                console.error('位置情報の取得に失敗しました。', error);
                // エラーが発生しても、位置情報の取得が試みられたことを locationLoaded に設定します。
                setLocationLoaded(true);
            },
            // 位置情報取得のオプション。ここではタイムアウトを30秒に設定しています。
            { timeout: 30000 }
        );
    }, []);

    // このフックは locationLoaded, mapCenter, setMapCenter を返します。
    // これにより他のコンポーネントでこれらの状態や更新関数を使用できます。
    return { locationLoaded, mapCenter, setMapCenter };
};