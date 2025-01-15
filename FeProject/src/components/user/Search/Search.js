import React, { useState } from 'react';
import './Search.scss'; 
import { FaSearch } from "react-icons/fa";

const Search = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async () => {
        if (!searchTerm) return; 
        onSearch(searchTerm); 
        setSearchTerm('');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <div className="search-input-wrapper">
                <input
                    className='search-input'
                    type='text'
                    placeholder='Tìm kiếm'
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    onKeyPress={handleKeyPress} 
                />
                <FaSearch className='inside-input' />
            </div>
        </div >
    );
};

export default Search;