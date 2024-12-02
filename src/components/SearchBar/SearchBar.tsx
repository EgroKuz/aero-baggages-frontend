import React from 'react';
import './SearchBar.css';

interface SearchBarProps {
    baggageWeight: string;
    setBaggageWeight: React.Dispatch<React.SetStateAction<string>>;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ baggageWeight, setBaggageWeight, onKeyDown }) => {
    console.log("Current baggageWeight:", baggageWeight);  // Отладочное сообщение
    return (
        <div className="search-cart-container">
            <form>
                <input 
                    type="text" 
                    placeholder="Поиск багажа по весу..." 
                    value={baggageWeight} 
                    onChange={(e) => setBaggageWeight(e.target.value)} 
                    onKeyDown={onKeyDown} // Attach onKeyDown here
                />
            </form>
        </div>
    );
};

export default SearchBar;