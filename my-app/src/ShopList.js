// ラーメン店の一覧表示
import React from 'react';

const ShopList = ({ shops, onShopSelect }) => {
    return (
        <ul>
        {Array.isArray(shops) && shops.map((shop) => (
            <li key={shop.id} onClick={() => onShopSelect(shop.id)} style={{ cursor: 'pointer' }}>
            {shop.name}
            </li>
        ))}
        </ul>
    );
};

export default ShopList;
