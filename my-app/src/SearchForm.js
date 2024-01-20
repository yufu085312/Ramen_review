// ラーメン店の検索フォーム
import React, { useState } from 'react';

const SearchForm = ({ onSearch, clearShops }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // 検索ボタンがクリックされた時の処理
    const handleSearch = () => {
        onSearch(searchQuery);
    };

    // クリアボタンがクリックされた時の処理
    const handleClear = () => {
        setSearchQuery('');
        clearShops();
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ラーメン店を検索"
            />
            <button onClick={handleClear}>クリア</button>
            <button onClick={handleSearch}>検索</button>
        </div>
    );
};

export default SearchForm;
