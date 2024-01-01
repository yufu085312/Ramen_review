// ラーメン店の検索フォーム
import React, { useState } from 'react'; // Reactの基本機能と状態管理フック
import axios from 'axios'; // HTTPリクエストを行うためのライブラリ

// setShops: 親コンポーネントから渡される関数
// searchQuery: 検索クエリを格納する状態
const SearchForm = ({ setShops }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // 検索ボタンがクリックされたときに呼び出される
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
