import { FC } from "react";
import { T_Baggage } from "../../modules/types.ts";
import { useAppDispatch } from "../../store/store.ts";
import { removeBaggageFromDraftTransfer } from "../../store/slices/transfersSlice.ts";
import "./TransferCard.css";


const defaultImage = './images/default_image.jpg';

interface TransferCardProps {
  baggage: T_Baggage;
  showRemoveBtn?: boolean;
}

export const TransferCard: FC<TransferCardProps> = ({
  baggage,
  showRemoveBtn = false,
}) => {
  const dispatch = useAppDispatch();


  // Удаление орбиты
  const handleRemoveFromDraftTransfer = async () => {
    try {
      await dispatch(removeBaggageFromDraftTransfer(baggage.id.toString()));
    } catch (error) {
      console.error("Ошибка при удалении багажа:", error);
    }
  };

  return (
    <div className="part-card">
      <img
        className="shipment-part-photo"
        src={baggage.image || defaultImage}
        alt="Baggage Image"
      />
      <div className="shipment-part-details">
        <div className="left-shipment-part-details">
          <h5 className="card-title">Вес: {baggage.weight} кг</h5>
          <p className="card-text">
            <strong>Описание:</strong> {baggage.description}
          </p>
        </div>
        <div className="actions-row">

          {showRemoveBtn && (
            <button
              className="delete-button"
              onClick={handleRemoveFromDraftTransfer}
            >
              Удалить
            </button>
          )}
        </div>
      </div>
    </div>
  );
};