import { FC } from "react";
import './BaggageCard.css';
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import { addBaggageToTransfer } from "../../store/slices/baggagesSlice.ts";
import { T_Baggage } from "../../modules/types.ts";
const default_image = './images/default_image.jpg';

interface BaggageCardProps {
    baggage: T_Baggage;
    imageClickHandler: () => void;
    onAddToDraft: () => void;
}

export const BaggageCard: FC<BaggageCardProps> = ({
    baggage,
    imageClickHandler,
    onAddToDraft,
}) => {
    const dispatch = useAppDispatch();
    const isAuthenticated = useAppSelector((state) => state.user.is_authenticated);

    const handleAddToDraftTransition = async (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault(); // Останавливаем переход по ссылке
        // Выполнив добавление, уведомляем родительский компонент
        await dispatch(addBaggageToTransfer(baggage.id.toString()));
        onAddToDraft(); // Этот метод используется для обновления состояния в родительском компоненте
    };

    return (
        <div className="baggage-card">
            <img 
                src={baggage.image || default_image} 
                alt={`Багаж ${baggage.weight} кг`} 
                onClick={imageClickHandler} 
            />
            <h3>Вес {baggage.weight} кг</h3>
            <div className="add-section">
                {isAuthenticated ? (
                    !baggage.active_add ? (
                        <button
                            className="add-button"
                            type="button"
                            onClick={handleAddToDraftTransition}
                        >
                            Добавить
                        </button>
                    ) : (
                        <button
                            className="added-button"
                            type="button"
                            disabled
                        >
                            Добавлено
                        </button>
                    )
                ) : null}
            </div>
        </div>
    );
};

export default BaggageCard;