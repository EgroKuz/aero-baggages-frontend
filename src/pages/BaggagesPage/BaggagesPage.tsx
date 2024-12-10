import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BaggageCard from '../../components/BaggageCard/BaggageCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { BAGGAGES_MOCK } from "../../modules/mock";
import { getBaggagesByWeight, Baggage } from "../../modules/airBaggagesAPI";
import './BaggagesPage.css';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const BaggagesPage: React.FC = () => {
    const [baggages, setBaggages] = useState<Baggage[]>(BAGGAGES_MOCK.baggages);
    const baggageWeight = useSelector((state: RootState) => state.baggages.weight);
    const [loading, setLoading] = useState(false);

    // Fetch initial data from the database when the component mounts
    useEffect(() => {
        const fetchBaggages = async () => {
            setLoading(true);
            try {
                const response = await getBaggagesByWeight(baggageWeight); // Fetch all baggages or modify as needed
                setBaggages(response.baggages);
            } catch (error) {
                console.error('Error fetching orbits:', error);
                // Если ошибка, фильтруем по локальным данным
                setBaggages(
                  BAGGAGES_MOCK.baggages.filter((item) =>
                    item.weight.toString().startsWith(baggageWeight)
                  )
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBaggages();
    }, [baggageWeight]);


    return (
        <main>
            <BreadCrumbs
          crumbs={[
            { label: ROUTE_LABELS.BAGGAGES, path: ROUTES.BAGGAGES },
          ]}
        />
        <h2>Багажи и ручная кладь</h2>
        <SearchBar />
            <div className="baggage-container">
                {loading ? (
                    <p>Loading...</p>
                ) : baggages.length > 0 ? (
                    baggages.map((baggage) => (
                        <Link to={`/baggages/${baggage.id}`} className="baggage-link" key={baggage.id}>
                            <BaggageCard baggage={baggage} />
                        </Link>
                    ))
                ) : (
                    <p>No baggages found.</p> // Message when no baggages are found
                )}
            </div>
        </main>
    );
};

export default BaggagesPage;