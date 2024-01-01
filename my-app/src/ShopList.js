// ラーメン店の一覧表示
import React from 'react';

const ShopList = ({ shops, onShopSelect }) => {
    return (
        <ul>
        {Array.isArray(shops) && shops.map((shop) => (
            <li key={shop.id} onClick={() => onShopSelect(shop.id)} style={{ cursor: 'pointer' }}>
            {/* ロゴ画像を表示 */}
            <img src={shop.logo_image} alt={shop.name} style={{ width: '150px', height: '150px', marginRight: '30px' }} />
            {shop.name}
            </li>
        ))}
        </ul>
    );
};

export default ShopList;
