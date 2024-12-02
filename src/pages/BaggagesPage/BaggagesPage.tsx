import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BaggageCard from '../../components/BaggageCard/BaggageCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { BAGGAGES_MOCK } from "../../modules/mock";
import { getBaggagesByWeight, Baggage } from "../../modules/airBaggagesAPI";
import './BaggagesPage.css';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";

const BaggagesPage: React.FC = () => {
    const [baggages, setBaggages] = useState<Baggage[]>(BAGGAGES_MOCK.baggages);
    const [baggageWeight, setBaggageWeight] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // Fetch initial data from the database when the component mounts
    useEffect(() => {
        const fetchBaggages = async () => {
            setLoading(true);
            try {
                const response = await getBaggagesByWeight(''); // Fetch all baggages or modify as needed
                setBaggages(response.baggages);
            } catch (error) {
                console.error('Error fetching baggages:', error);
                // Fall back to mock data if there is an error
                setBaggages(BAGGAGES_MOCK.baggages);
            } finally {
                setLoading(false);
            }
        };

        fetchBaggages();
    }, []);

    // This function performs the search using baggageWeight
    const handleSearch = () => {
        setLoading(true);

        getBaggagesByWeight(baggageWeight)
            .then((response) => {
                setBaggages(response.baggages);
            })
            .catch(() => {
                // If there is an error during search, fallback to mock data
                setBaggages(
                    BAGGAGES_MOCK.baggages.filter((item) =>
                        item.weight.toString().startsWith(baggageWeight)
                    )
                );
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Handle Enter key press for search
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevents form submission
            handleSearch();
        }
    };

    return (
        <main>
            <BreadCrumbs
          crumbs={[
            { label: ROUTE_LABELS.BAGGAGES, path: ROUTES.BAGGAGES },
          ]}
        />
        <h2>Багажи и ручная кладь</h2>
        <SearchBar 
                baggageWeight={baggageWeight} 
                setBaggageWeight={setBaggageWeight} 
                onKeyDown={handleKeyDown} // Pass the handler here
            />
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