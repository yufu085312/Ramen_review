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
                style={{ fontSize: '1.2em', padding: '10px', width: '300px' }}
                // テキスト入力フィールドのサイズを大きくする
            />
            <button onClick={handleSearch} style={{ fontSize: '1.2em', padding: '10px 20px' }}>
                検索
                {/* 検索ボタンのサイズを大きくする */}
            </button>
            <button onClick={handleClear} style={{ fontSize: '1.2em', padding: '10px 20px' }}>
                クリア
                {/* クリアボタンのサイズを大きくする */}
            </button>
        </div>
    );
};

export default SearchForm;
