import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import pinIconUrl from './path/to/pin-icon.png';
import pinIconUrl2 from './path/to/pin-icon2.png';

// カスタムアイコンの設定
const customIcon = new L.Icon({
    iconUrl: pinIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

// 地図イベントをハンドリングするためのコンポーネント
const MapEvents = ({ onMapMovement }) => {
    useMapEvents({
        moveend: (e) => {
            // 地図の移動終了時に親コンポーネントの関数を呼び出す
            onMapMovement(e.target.getCenter());
        },
    });
    return null;
};

// 地図コンポーネント
const Map = ({ center, onShopSelect, shops, selectedShop, onMapMovement, showCircle }) => {
    const mapRef = useRef(null);  // マップインスタンスを参照するためのref

    // ショップごとに適切なアイコンを返す関数
    const getIcon = (shop) => {
        if (selectedShop && shop.id === selectedShop.id) {
            // 選択された店舗には大きいアイコンを使用
            return new L.Icon({
                iconUrl: pinIconUrl2,
                iconSize: [35, 55], // 大きいサイズ
                iconAnchor: [17, 55],
                popupAnchor: [1, -50]
            });
        } else {
            // 通常の店舗には標準サイズのアイコンを使用
            return customIcon;
        }
    };

    // 中心座標が変更されたときに地図のビューを更新
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo(center);
        }
    }, [center]);
    
    // ショップのマーカーをレンダリングする関数
    const renderMarkers = () => {
        return shops.map(shop => (
            <Marker
                key={shop.id}
                position={[Number(shop.lat), Number(shop.lng)]}
                icon={getIcon(shop)}
                eventHandlers={{ click: () => onShopSelect(shop.id) }}>
                <Popup>{shop.name}</Popup>
            </Marker>
        ));
    };
    
    return (
        <MapContainer
            center={center}
            zoom={14}
            style={{ height: '400px', width: '100%' }}
            whenCreated={map => (mapRef.current = map)}
            >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />
            {renderMarkers()}
            {showCircle && <Circle center={center} radius={1000} />}
            <MapEvents onMapMovement={onMapMovement} />
        </MapContainer>
    );
};

export default Map;
