import React, { useState } from 'react';
import './SearchBar.css';
import { useDispatch } from 'react-redux';
import { setWeight } from '../../slices/baggagesSlice';



const SearchBar: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>('');
    const dispatch = useDispatch();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(setWeight(inputValue));
        }
    };

    return (
        <div className="search-cart-container">
            <form>
                <input 
                    type="text" 
                    placeholder="Поиск багажа по весу..." 
                    value={inputValue} 
                    onChange={(e) => setInputValue(e.target.value)} 
                    onKeyDown={handleKeyDown} // Attach onKeyDown here
                />
            </form>
        </div>
    );
};

export default SearchBar;