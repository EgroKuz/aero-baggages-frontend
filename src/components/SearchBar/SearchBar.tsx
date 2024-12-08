import React, { Component } from 'react';
import './SearchBar.css';

interface SearchBarProps {
    baggageWeight: string;
    setBaggageWeight: (value: string) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

class SearchBar extends Component<SearchBarProps> {
    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { setBaggageWeight } = this.props;
        setBaggageWeight(event.target.value); // Обновление значения через пропс
    };

    render() {
        const { baggageWeight, onKeyDown } = this.props;

        console.log("Current baggageWeight:", baggageWeight); // Отладочное сообщение

        return (
            <div className="search-cart-container">
                <form>
                    <input
                        type="text"
                        placeholder="Поиск багажа по весу..."
                        value={baggageWeight}
                        onChange={this.handleInputChange} // Обработчик изменения
                        onKeyDown={onKeyDown} // Обработчик события клавиатуры
                    />
                </form>
            </div>
        );
    }
}

export default SearchBar;
