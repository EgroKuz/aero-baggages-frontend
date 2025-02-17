import "./BaggagesPage.css";
import { FC, useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import SearchBar from "../../components/SearchBar/SearchBar";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs";
import { ROUTES, ROUTE_LABELS } from "../../Routes";
import { T_Baggage } from "../../modules/types.ts";
import { BaggageCard } from "../../components/BaggageCard/BaggageCard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, RootState , useAppSelector} from "../../store/store.ts";
import { getBaggagesByWeight, setWeight } from "../../store/slices/baggagesSlice";
import { BAGGAGES_MOCK } from "../../modules/mock";
import { Link } from 'react-router-dom';


const BaggagesPage: FC = () => {
  const dispatch = useAppDispatch();
  const [baggageWeight, setBaggageHight] = useState("");
  const [loading, setLoading] = useState(false);
  const [baggages, setBaggages] = useState<T_Baggage[]>([]);
  const {draft_transfer, baggages_to_transfer} = useAppSelector((state) => state.transfers)
  const hasDraft = draft_transfer != null
  const isAuthenticated = useAppSelector((state) => state.user.is_authenticated);
  const selectedWeight = useAppSelector((state: RootState) => state.baggages.weight);

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedWeight) {
      setBaggageHight(String(selectedWeight));
      handleSearch(String(selectedWeight));
    } else {
      handleSearch('');
    }
  }, [selectedWeight]);

  const handleSearch = (searchTerm: string) => {
    setLoading(true);
    dispatch(setWeight(searchTerm));

    dispatch(getBaggagesByWeight({}) as any)
      .unwrap()
      .then((response: T_Baggage[]) => {
        setBaggages(response);
        setLoading(false);
      })
      .catch(() => {
        setBaggages(
          BAGGAGES_MOCK.baggages.filter((item: T_Baggage) =>
            String(item.weight)
              .startsWith(searchTerm)
          )
        );
        setLoading(false);
      });
      
  };

  const handleSubmit = () => {
    handleSearch(baggageWeight);
  };

  const handleCardClick = (id: number) => {
    navigate(`${ROUTES.BAGGAGES}/${id}/`);
  };




  return (
    <div className="custom-container">
      <div className="parts-data">
      {isAuthenticated ? (
        <>
        <div className="crumbs">
                  <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.BAGGAGES }]} />
              </div>
        <Row className="align-items-center">
        <div className="head">

              <div className="line">
                  <hr></hr>
              </div>
              <h2 className="title">Багажи</h2>
              <div className="truck">
              <span className="badge">{baggages_to_transfer}</span>
              <div
                className={`truck-bg ${!hasDraft || !isAuthenticated ? 'disabled' : ''}`}
                onClick={() => (isAuthenticated && hasDraft) && navigate(`${ROUTES.TRANSFERS}/${draft_transfer}/`)}
                style={{
                  cursor: !isAuthenticated || !hasDraft ? 'not-allowed' : 'pointer',
                }}
              >
                <img src="./images/cart.png" alt="Грузовик" className="truck-icon" />
              </div>

                
              </div>
          </div>
          <SearchBar />
          </Row>

          </>
        ) : (
          <>
              <div className="crumbs">
                  <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.BAGGAGES }]} />
              </div>
          <div className="head">

              <div className="line">
                  <hr></hr>
              </div>
              <h2 className="title">Багажи</h2>
              <div className="truck">
              <div
                className={`truck-bg ${!hasDraft || !isAuthenticated ? 'disabled' : ''}`}
                onClick={() => (isAuthenticated && hasDraft) && navigate(`${ROUTES.TRANSFERS}/${draft_transfer}/`)}
                style={{
                  cursor: !isAuthenticated || !hasDraft ? 'not-allowed' : 'pointer',
                }}
              >
                <img src="./images/cart.png" alt="Грузовик" className="truck-icon" />
              </div>
                <span 
                  className="truck-pill position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                  style={{ backgroundColor: "#3f8dfb" }}
                >
                  {baggages_to_transfer}
                </span>
              </div>
          </div>
          <SearchBar />

          </>
        )}
        <div className="data">

          {loading && (
            <div className="loadingBg">
              <Spinner animation="border" />
            </div>
          )}

          {!loading && (
            !baggages.length ? (
              <div>
                <h2>К сожалению, пока ничего не найдено</h2>
              </div>
            ) : (
              <div className="baggage-container">
                {loading ? (
                    <p>Loading...</p>
                ) : baggages.length > 0 ? (
                  baggages.map((baggage) => (
                    <Link to={`/baggages/${baggage.id}`} className="baggage-link" key={baggage.id}>
                      <BaggageCard 
                        baggage={baggage}
                        imageClickHandler={() => handleCardClick(baggage.id)}
                        onAddToDraft={handleSubmit}
                      />
                    </Link>
                  
                    ))
                ) : (
                    <p>No baggages found.</p> // Message when no baggages are found
                )}
            </div>

            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BaggagesPage;