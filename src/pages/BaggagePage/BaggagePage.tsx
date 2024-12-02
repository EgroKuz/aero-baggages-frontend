import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { BAGGAGES_MOCK } from '../../modules/mock';
import { Baggage, getBaggageById } from '../../modules/airBaggagesAPI';
import './BaggagePage.css';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";


const BaggagePage: React.FC = () => {
    const [pageData, setPageData] = useState<Baggage | null>(null); // Инициализация как null

    const { id } = useParams<{ id: string }>(); // Получаем параметр "id" из URL

    useEffect(() => {
        if (!id) return;

        // Запрос данных по ID
        getBaggageById(id)
            .then((response) => setPageData(response))
            .catch(() => {
                // В случае ошибки используем данные из моков
                const fallbackData = BAGGAGES_MOCK.baggages.find(
                    (baggage) => String(baggage.id) === id
                );
                setPageData(fallbackData || null); // Если нет совпадений, оставить null
            });
    }, [id]);

    // Проверка, что данные загружены
    if (!pageData) {
        return <p>Loading or baggage not found...</p>;
    }

    return (
        <main>
            <BreadCrumbs
          crumbs={[
            { label: ROUTE_LABELS.BAGGAGES, path: ROUTES.BAGGAGES },
            { label: "Вес " + pageData?.weight.toString() + " кг" },
          ]}
        />
            <div className="baggage-details">
                <div className="baggage-image">
                    <img src={pageData.image} alt={`Багаж ${pageData.weight} кг`} />
                </div>
                <div className="baggage-info">
                    <h2>Вес: {pageData.weight} кг</h2>
                    <p>Информация: {pageData.description}</p>
                    <p>Номер: {pageData.number}</p>
                </div>
            </div>
        </main>
    );
};

export default BaggagePage;