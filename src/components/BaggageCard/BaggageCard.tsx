import { Component } from "react";
import "./BaggageCard.css";

const default_image = "./images/default_image.jpg";

interface Baggage {
  id: number;
  image: string | null;
  weight: number;
  description: string;
}

interface BaggageCardProps {
  baggage: Baggage;
}

class BaggageCard extends Component<BaggageCardProps> {
  render() {
    const { baggage } = this.props;

    return (
      <div className="baggage-card">
        <img
          src={baggage.image || default_image}
          alt={`Багаж ${baggage.weight} кг`}
        />
        <h3>Вес {baggage.weight} кг</h3>
        <p>{baggage.description}</p>
      </div>
    );
  }
}

export default BaggageCard;
