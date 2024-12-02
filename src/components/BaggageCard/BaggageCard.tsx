import React from 'react';
import './BaggageCard.css';
const default_image = "/images/default_image.jpg"

interface BaggageCardProps {
    baggage: {
        id: number;
        image: string;
        weight: number;
        description: string;
    };
}

const BaggageCard: React.FC<BaggageCardProps> = ({ baggage }) => {
    return (
        <div className="baggage-card">
            <img src={baggage.image|| default_image} alt={`Багаж ${baggage.weight} кг`} />
            <h3>Вес {baggage.weight} кг</h3>
            <p>{baggage.description}</p>
        </div>
    );
};

export default BaggageCard;