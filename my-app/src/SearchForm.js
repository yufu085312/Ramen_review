// ラーメン店の検索フォーム
import React, { useState } from 'react';
import axios from 'axios';

const SearchForm = ({ setShops }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        axios.get(`http://localhost:3000/api/hotpepper/ramen_shops?query=${encodeURIComponent(searchQuery)}`)
        .then(response => {
            if (response.data && Array.isArray(response.data)) {
            setShops(response.data);
            }
        })
        .catch(error => console.error('APIリクエストエラー:', error));
    };

    return (
        <div>
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ラーメン店を検索"
        />
        <button onClick={handleSearch}>検索</button>
        </div>
    );
};

export default SearchForm;
