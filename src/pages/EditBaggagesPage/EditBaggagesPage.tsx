import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import { fetchBaggages, createBaggage, deleteBaggage } from '../../store/slices/baggagesSlice.ts';
import { T_Baggage } from '../../modules/types.ts';
import './EditBaggagesPage.css';
import { ROUTES } from '../../Routes.tsx';
import { Link } from 'react-router-dom';

const EditBaggagesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { baggages } = useAppSelector((state) => state.baggages);
    const [newBaggage, setNewBaggage] = useState<Partial<T_Baggage>>({});
    const [localError, setLocalError] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchBaggages());
    }, [dispatch]);

    const handleAddBaggage = async () => {
            if (!newBaggage.weight || !newBaggage.number) {
                setLocalError('Name and Operator Name are required');
                return;
            }

            const baggageData: Omit<T_Baggage, 'id'> = {
                weight: newBaggage.weight,
                number: newBaggage.number,
                description: newBaggage.description || '',
                image: newBaggage.image || '',
                active_add: true,
            };

        try {
            await dispatch(createBaggage(baggageData)).unwrap();
                setNewBaggage({});
        } catch (error) {
            setLocalError('Failed to add baggage');
        }
    };

    const handleDeleteBaggage = async (id: number) => {
        try {
            await dispatch(deleteBaggage(id)).unwrap();
        } catch (error) {
            setLocalError('Failed to delete operation');
        }
    };

    const handleNavigateToEdit = (id: number) => {
        navigate(`${ROUTES.EDIT_BAGGAGES}/${id}`);
    };
    

    return (
        <div className="operations-admin-page">
            <h1>Управление багажами</h1>
            <table>
                <thead>
                    <tr>
                        <th>Вес</th>
                        <th>Номер</th>
                        <th>Описание</th>
                        <th>Действие</th>
                    </tr>
                </thead>
                <tbody>
                    {baggages.map((baggage) => (
                        <tr key={baggage.id}>
                            <td>{baggage.weight}</td>
                            <td>{baggage.number}</td>
                            <td>{baggage.description}</td>
                            <td>
                            <Link to={`${ROUTES.EDIT_BAGGAGES}/${baggage.id}`}>
                            <button>Редактировать</button>
                            </Link>
                            <button className="delete-button" onClick={() => handleDeleteBaggage(baggage.id)}>Удалить</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <h2>Добавить новый багаж</h2>
                <input
                    type="text"
                    placeholder="Вес"
                    value={newBaggage.weight || ''}
                    onChange={(e) => setNewBaggage({ ...newBaggage, weight: Number(e.target.value) })}
                />
                <input
                    type="text"
                    placeholder="Номер"
                    value={newBaggage.number || ''}
                    onChange={(e) => setNewBaggage({ ...newBaggage, number: e.target.value })}
                />
                <textarea
                    placeholder="Описание"
                    value={newBaggage.description || ''}
                    onChange={(e) => setNewBaggage({ ...newBaggage, description: e.target.value })}
                />

                <button onClick={handleAddBaggage}>Добавить багаж</button>
            </div>
        </div>
    );
};

export default EditBaggagesPage;