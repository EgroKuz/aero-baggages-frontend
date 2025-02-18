import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../store/store';
import { getBaggageById, updateBaggage, updateBaggageImage } from '../../store/slices/baggagesSlice.ts';
import { T_Baggage } from '../../modules/types';
import './EditBaggagePage.css';
const default_image = './images/default_image.jpg';

const EditOperationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { is_staff } = useAppSelector((state) => state.user);
  const { baggages } = useAppSelector((state) => state.baggages);
  const [baggage, setBaggage] = useState<T_Baggage | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (!is_staff) {
      navigate('/');
    } else if (id) {
      dispatch(getBaggageById(id));
    }
  }, [id, is_staff, navigate, dispatch]);

  useEffect(() => {
    if (id && baggages.length > 0) {
      const foundBaggage = baggages.find((b) => b.id === Number(id));
      if (foundBaggage) {
        setBaggage(foundBaggage);
      }
    }
  }, [id, baggages]);

  const handleFieldChange = (field: keyof T_Baggage, value: any) => {
    setBaggage((prev) => prev ? { ...prev, [field]: value } : null);
  };

  const handleSaveChanges = async () => {
    if (baggage) {
      try {
        console.log("Updating baggage with ID:", baggage.id); // Добавьте логирование
        await dispatch(updateBaggage(baggage)).unwrap();
        navigate(`/baggages/${baggage.id}`);
      } catch (error) {
        setLocalError('Failed to save changes');
      }
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);

      try {
        const imageName = await dispatch(updateBaggageImage({ id: baggage!.id.toString(), formData })).unwrap();
          setBaggage((prev) => prev ? { ...prev, photo: imageName } : null);
        dispatch(getBaggageById(id!)); // Refresh operation data
      } catch (error) {
        setLocalError('Failed to update image');
      }
    }
  };

  if (!baggage) return <div>Loading...</div>;
  if (localError) return <div>{localError}</div>;

  return (
    <div className="main-content">

    
    <div className="container-fluid product-container">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="product-operation-container">
            <h1>Редактирование багажа: Вес {baggage.weight} кг</h1>
              <div className="product-operations">
                <img
                  src={baggage.image || default_image}
                  alt="Baggage image"
                  className="product-image"
                />
                <input type="file" onChange={handleImageChange} />
                <div className="info">
                  <label htmlFor="operation-name">Вес (в килограммах):</label>
                  <input
                    id="operation-name"
                    type="text"
                    value={baggage.weight}
                    onChange={(e) => handleFieldChange('weight', e.target.value)}
                  />
                  
                  <label htmlFor="operator-name">Номер:</label>
                  <input
                    id="operator-name"
                    type="text"
                    value={baggage.number}
                    onChange={(e) => handleFieldChange('number', e.target.value)}
                  />
                  
                  <label htmlFor="operation-description">Описание:</label>
                  <textarea
                    id="operation-description"
                    value={baggage.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                  />

                  
                  <button onClick={handleSaveChanges}>Сохранить изменения</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
  );
};

export default EditOperationPage;