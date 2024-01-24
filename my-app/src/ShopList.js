// ラーメン店の一覧表示
import React from 'react';
import './styles/ShopList.css';

const ShopList = ({ shops, onShopSelect, pageIndex, setPageIndex }) => {
    const itemsPerPage = 4;

    const showMoreShops = () => {
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
    };

    const showPreviousShops = () => {
        setPageIndex((prevPageIndex) => prevPageIndex > 0 ? prevPageIndex - 1 : 0);
    };

    // 表示するショップを決定
    const displayedShops = shops.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage);

    return (
        <div>
            <ul className="shopListContainer">
                {displayedShops.map((shop) => (
                    <li key={shop.id} onClick={() => onShopSelect(shop.id)} className="shopListItem">
                        <img src={shop.logo_image} alt={shop.name} className="shopImage" />
                        <span className="shopName">{shop.name}</span>
                    </li>
                ))}
            </ul>
            <div className="pagination">
                {pageIndex > 0 && (
                    <button onClick={showPreviousShops} className="paginationButton">戻る</button>
                )}
                {(pageIndex + 1) * itemsPerPage < shops.length && (
                    <button onClick={showMoreShops} className="paginationButton">次へ</button>
                )}
            </div>
        </div>
    );
};

export default ShopList;
