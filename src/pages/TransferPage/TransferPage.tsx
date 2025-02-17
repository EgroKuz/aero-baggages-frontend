import { FC, useEffect, useState } from "react";
import "./TransferPage.css";
import { TransferCard } from "../../components/TransferCard/TransferCard.tsx";
import { ROUTES, ROUTE_LABELS } from "../../Routes.tsx";
import { BreadCrumbs } from "../../components/BreadCrumbs/BreadCrumbs.tsx";
import {useParams, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/store.ts";
import {
    deleteDraftTransfer,
    fetchTransfer,
    removeTransfer,
    sendDraftTransfer,
    triggerUpdateMM,
    updateTransfer
} from "../../store/slices/transfersSlice.ts";


const TransferPage: FC = () => {
    const navigate = useNavigate()
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()
    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated)

    const transfer = useAppSelector((state) => state.transfers.transfer)
    
    const [owner_name, setOwnerName] = useState<string>(transfer?.owner_name || '');
    const [transfer_date, setPlannedDate] = useState<string>(transfer?.transfer_date || '');
    const [flight, setFlight] = useState<string>(transfer?.flight || '');
    const [heaviest_baggage, setHeaviestBaggage] = useState<string >(transfer?.heaviest_baggage? String(transfer.heaviest_baggage) : ''); 
    const [error, setError] = useState<string | null>(null);
    

    useEffect(() => {
        if (!isAuthenticated) {
            navigate(ROUTES.PAGE403)
        }
        }, [isAuthenticated]);

    useEffect(() => {
        dispatch(fetchTransfer(id || ''))
        return () => {
            dispatch(removeTransfer());
        };
    }, []);

    useEffect(() => {
        setOwnerName(transfer?.owner_name || '')
        setPlannedDate(transfer?.transfer_date || '')
        setFlight(transfer?.flight || '')
        setHeaviestBaggage(transfer?.heaviest_baggage ? String(transfer.heaviest_baggage) : '')
    }, [transfer]);

    const sendTransfer = async (e: React.FormEvent) => {
        e.preventDefault();
    
        if (!owner_name || !transfer_date || !flight) {
            setError("Пожалуйста, заполните все обязательные поля.");
            return;
        }
    
        setError(null); // Очистить сообщение об ошибке
        await saveTransfer();
        await dispatch(sendDraftTransfer());
        navigate(ROUTES.TRANSFERS);
    };
    

    const saveTransfer = async (e?: React.FormEvent) => {
        e?.preventDefault()

        const data = {
            owner_name,
            transfer_date,
            flight
        }

        await dispatch(updateTransfer(data))
        await dispatch(triggerUpdateMM())
    }

    const deleteTransfer = async () => {
        await dispatch(deleteDraftTransfer())
        navigate(ROUTES.BAGGAGES)
    }

    if (!transfer) {
        return (
        <div className="container">
            <h3 className="text-center">Загрузка...</h3>
        </div>
        );
    }

    const isDraft = transfer.status == "draft"

    return (
        <div className="shipment-container">
            <div className="shipment-data">
            <div className="crumbs">
                <BreadCrumbs crumbs={[{ label: ROUTE_LABELS.TRANSFERS }]} />
            </div>
                    <div className="head">
                        <div className="line">
                            <hr></hr>
                        </div>
                        <h2 className="title">Отправка</h2>
                </div>
                <div className="row">
                    {error && <div className="error-message">{error}</div>}
                    <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <form className="shipment-form">
                            <div className="shipment-form-group">
                            <label className="no-wrap">ФИО владельца:</label>
                                <input
                                type="text"
                                value={owner_name}
                                placeholder="Введите ФИО..."
                                onChange={(e) => setOwnerName(e.target.value)}
                                name="storage"
                                disabled={!isDraft}
                                />
                            </div>

                            <div className="shipment-form-group">
                                <label className="no-wrap">Дата:</label>
                                <input
                                type="date"
                                id="transfer_date"
                                value={transfer_date}
                                onChange={(e) => setPlannedDate(e.target.value)}
                                name="transfer_date"
                                disabled={!isDraft}
                                />
                            </div>

                            <div className="shipment-form-group">
                                <label className="no-wrap">Номер рейса</label>
                                <input
                                type="text"
                                id="flight"
                                value={flight}
                                placeholder="Введите номер..."
                                onChange={(e) => setFlight(e.target.value)}
                                name="flight"
                                disabled={!isDraft}
                                />
                            </div>
                            <div className="shipment-form-group">
                                    <label className="no-wrap">Самый тяжелый багаж</label>
                                    <input 
                                        type="text"
                                        value={heaviest_baggage} 
                                        disabled={true} 
                                        readOnly 
                                    />
                            </div>

                            {isDraft &&
                                <button className="save-button" onClick={saveTransfer}>
                                    Сохранить
                                </button>
                            }
                        </form>
                    </div>

                    <div className="delivery-cards">
                        <div className="row g-2">
                        {transfer.baggages.map((baggage) => (
                            <div className="col-12" key={baggage.id}>
                            <TransferCard baggage={baggage} showRemoveBtn={isDraft}/>
                            </div>
                        ))}
                        </div>
                    </div>
                    </div>
                </div>

            </div>
            <div className="bottom">
                {isDraft &&
                    <div className="row shipment-buttons">
                        <button className="send-button" onClick={sendTransfer}>
                            Отправить
                        </button>
                        <button className="delete-button" onClick={deleteTransfer}>
                            Удалить
                        </button>
                    </div>
                }
            </div>
        </div>
    );
};

export default TransferPage;