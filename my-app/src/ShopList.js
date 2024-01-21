// ラーメン店の一覧表示

const ShopList = ({ shops, onShopSelect, pageIndex, setPageIndex }) => {
    const itemsPerPage = 4;

    const showMoreShops = () => {
        setPageIndex((prevPageIndex) => prevPageIndex + 1);
    };

    // 表示するショップを決定
    const displayedShops = shops.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage);

    return (
        <div>
            <ul style={{ listStyleType: 'none' }}>
                {displayedShops.map((shop) => (
                    // Flexbox を使用してアイテムを横に並べる
                    <li key={shop.id} onClick={() => onShopSelect(shop.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                        <img src={shop.logo_image} alt={shop.name} style={{ width: '150px', height: '150px', marginRight: '30px' }} />
                        {/* fontSizeを大きくする */}
                        <span style={{ fontSize: '1.8em' }}>{shop.name}</span>
                    </li>
                ))}
            </ul>
            {(pageIndex + 1) * itemsPerPage < shops.length && (
                <button onClick={showMoreShops}>もっと見る</button>
            )}
        </div>
    );
};

export default ShopList;
