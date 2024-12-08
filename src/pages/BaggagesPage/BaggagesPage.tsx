import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BaggageCard from '../../components/BaggageCard/BaggageCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import { BAGGAGES_MOCK } from "../../modules/mock";
import { getBaggagesByWeight, Baggage } from "../../modules/airBaggagesAPI";
import './BaggagesPage.css';
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";

interface BaggagesPageState {
    baggages: Baggage[];
    baggageWeight: string;
    loading: boolean;
}

class BaggagesPage extends Component<{}, BaggagesPageState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            baggages: BAGGAGES_MOCK.baggages,
            baggageWeight: '',
            loading: false,
        };
    }

    componentDidMount() {
        this.fetchBaggages();
    }

    fetchBaggages = async () => {
        this.setState({ loading: true });
        try {
            const response = await getBaggagesByWeight('');
            this.setState({ baggages: response.baggages });
        } catch (error) {
            console.error('Error fetching baggages:', error);
            this.setState({ baggages: BAGGAGES_MOCK.baggages });
        } finally {
            this.setState({ loading: false });
        }
    };

    handleSearch = () => {
        const { baggageWeight } = this.state;
        this.setState({ loading: true });

        getBaggagesByWeight(baggageWeight)
            .then((response) => {
                this.setState({ baggages: response.baggages });
            })
            .catch(() => {
                const filteredBaggages = BAGGAGES_MOCK.baggages.filter((item) =>
                    item.weight.toString().startsWith(baggageWeight)
                );
                this.setState({ baggages: filteredBaggages });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    };

    handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.handleSearch();
        }
    };

    render() {
        const { baggages, baggageWeight, loading } = this.state;

        return (
            <main>
                <BreadCrumbs
                    crumbs={[{ label: ROUTE_LABELS.BAGGAGES, path: ROUTES.BAGGAGES }]}
                />
                <h2>Багажи и ручная кладь</h2>
                <SearchBar 
                    baggageWeight={baggageWeight} 
                    setBaggageWeight={(value) => this.setState({ baggageWeight: value })}
                    onKeyDown={this.handleKeyDown}
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
                        <p>No baggages found.</p>
                    )}
                </div>
            </main>
        );
    }
}

export default BaggagesPage;
