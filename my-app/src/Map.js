import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import pinIconUrl from './path/to/pin-icon.png';
import pinIconUrl2 from './path/to/pin-icon2.png';

const customIcon = new L.Icon({
    iconUrl: pinIconUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
});

const MapEvents = ({ onMapMovement }) => {
        useMapEvents({
        moveend: (e) => {
            onMapMovement(e.target.getCenter());
        },
    });
    return null;
};

const Map = ({ center, onShopSelect, shops, selectedShop, onMapMovement, showCircle }) => {
    // console.log(center)
    const mapRef = useRef(null);  // マップインスタンスを保持するための ref

    const getIcon = (shop) => {
        if (selectedShop && shop.id === selectedShop.id) {
          // 選択された店のための大きいアイコン
            return new L.Icon({
                iconUrl: pinIconUrl2,
                iconSize: [35, 55], // 大きいサイズに変更
                iconAnchor: [17, 55],
                popupAnchor: [1, -50]
            });
        } else {
            // 通常サイズのアイコン
            return customIcon;
        }
    };

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo(center);
        }
    }, [center]);
    
    const renderMarkers = () => {
        return shops.map(shop => (
            <Marker
                key={shop.id}
                position={[Number(shop.lat), Number(shop.lng)]}
                icon={getIcon(shop)} // アイコンを動的に取得
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
