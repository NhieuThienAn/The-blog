import React, { useState } from 'react';
import './Search.scss'; // Thêm CSS nếu cần thiết
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => { // Cập nhật prop
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        if (!searchTerm) return; // Không làm gì nếu không có từ khóa tìm kiếm
        onSearch(searchTerm); // Gọi hàm tìm kiếm từ props
        setSearchTerm(''); // Reset input sau khi tìm kiếm
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); // Gọi hàm tìm kiếm khi nhấn Enter
        }
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <input
                    className='search-input'
                    type='text'
                    placeholder='Tìm kiếm'
                    value={searchTerm} // Ràng buộc giá trị input với state
                    onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật state khi người dùng gõ
                    onKeyPress={handleKeyPress} // Thêm sự kiện onKeyPress
                />
                <FaSearch className='inside-input' />
            </div>
        </div >
    );
};

export default Search;