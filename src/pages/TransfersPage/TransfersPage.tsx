import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import {
  fetchTransfers,
  T_TransfersFilters, 
  updateFilters,
  completeTransfer,
  rejectTransfer
 } from "../../store/slices/transfersSlice.ts";
import { useNavigate } from "react-router-dom";
import "./TransfersPage.css";
import { ROUTES } from "../../Routes.tsx";

const TransfersPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const transfers = useAppSelector((state) => state.transfers?.transfers || []);
  const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated);
  const { is_staff } = useAppSelector((state) => state.user);
  const filters = useAppSelector<T_TransfersFilters>((state) => state.transfers?.filters || []);

  const [authorFilter, setAuthorFilter] = useState<string>(filters.author || "");
  const [status, setStatus] = useState(filters.status);
  const [dateFormationStart, setDateFormationStart] = useState(filters.date_formation_start);
  const [dateFormationEnd, setDateFormationEnd] = useState(filters.date_formation_end);
  const [filteredTransfers, setFilteredTransfers] = useState(transfers);

  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const statusOptions = {
    "": "Любой",
    formed: "Сформирован",
    completed: "Завершен",
    rejected: "Отклонен",
  };

  const formatDate = (dateString?: string) => { 
    if (!dateString) return "";   
    const date = new Date(dateString); 
    return date.toLocaleDateString("ru-RU"); // Формат: день.месяц.год 
  }; 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTES.PAGE403);
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(fetchTransfers());
    const intervalId = setInterval(() => dispatch(fetchTransfers()), 10000);
    return () => clearInterval(intervalId);
  }, [dispatch]);

  const applyFilters = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formatDate = (date: string) => {
      if (!date) return null;
      const d = new Date(date);
      return d.toISOString();
    };
    const newFilters: T_TransfersFilters = {
      status,
      date_formation_start: formatDate(dateFormationStart) || '',
      date_formation_end: formatDate(dateFormationEnd) || '',
      author: authorFilter,
    };

    dispatch(updateFilters(newFilters));
    const formattedStart = dateFormationStart ? new Date(dateFormationStart) : null;
    const formattedEnd = dateFormationEnd ? new Date(dateFormationEnd) : null;
    let filteredData = transfers;

    if (authorFilter) {
      filteredData = filteredData.filter((transfer) =>
        transfer.user.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    if (status) {
      filteredData = filteredData.filter((transfer) => transfer.status === status);
    }

    if (formattedStart) {
      filteredData = filteredData.filter(
        (transfer) => new Date(transfer.formation_date) >= formattedStart
      );
    }

    if (formattedEnd) {
      const endOfDay = new Date(formattedEnd);
      endOfDay.setHours(23, 59, 59, 999);
      filteredData = filteredData.filter(
        (transfer) => new Date(transfer.formation_date) <= endOfDay
      );
    }

    setFilteredTransfers(filteredData);
  };

  const handleAccept = (id: string) => {
    dispatch(completeTransfer(parseInt(id)));
  };

  const handleReject = (id: string) => {
    dispatch(rejectTransfer(parseInt(id)));
  };

  useEffect(() => {
    setFilteredTransfers(transfers);
  }, [transfers]);


  return (
    <div className="transfers-container">
        <div className="transfers-table-container">
        

            <form onSubmit={applyFilters} className="transfers-form">
                <div className="shipment-form-group">
                {is_staff && (
                <label>
                Автор:
                <input
                type="text"
                className="asks-page-input"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
                placeholder="Введите автора"
                />
                </label>
                )}
                </div>
                <div className="shipment-form-group">
                <label>От </label>
                <input
                    type="date"
                    value={dateFormationStart}
                    onChange={(e) => setDateFormationStart(e.target.value)}
                />
                </div>
                <div className="shipment-form-group">
                <label>До </label>
                <input
                    type="date"
                    value={dateFormationEnd}
                    onChange={(e) => setDateFormationEnd(e.target.value)}
                />
                </div>
                <div className="shipment-form-group">
                <label>Статус </label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    {Object.entries(statusOptions).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value}
                    </option>
                    ))}
                </select>
                </div>
                <div className="transfers-form-group">
                <button type="submit" className="set-button">
                    Применить
                </button>
                </div>
            </form>

            <div className="table-container">
                {filteredTransfers.length > 0 ? (
                    <table className="transfers-table">
                        <thead>
                        <tr>
                            <td>ID отправки</td>
                            <td>Статус</td>
                            <td>Дата создания</td>
                            <td>Дата формирования</td>
                            <td>Дата завершения</td>
                            <td>Создатель</td>
                            <td>Дата отправки</td>
                            <td>Рейс</td>
                            <td>Владелец</td>
                            <td>Наибольший вес</td>
                            <td>QR</td>
                            {is_staff && <td>Действия</td>}
                        </tr>
                        </thead>
                        <tbody>
                        {filteredTransfers.map((transfer, index) => (
                            <tr
                            key={index}
                            className={transfer.id === hoveredRowId ? "hovered-row" : ""} 
                            onMouseEnter={() => setHoveredRowId(transfer.id)}
                            onMouseLeave={() => setHoveredRowId(null)}
                            onClick={() => navigate(`${ROUTES.TRANSFERS}/${transfer.id}/`)}
                            >
                            <td>{transfer.id}</td>
                            <td>{statusOptions[transfer.status as unknown as keyof typeof statusOptions]}</td>
                            <td>{formatDate(transfer.creation_date)}</td>
                            <td>{formatDate(transfer.formation_date)}</td>
                            <td>{transfer.completion_date}</td>
                            <td>{transfer.user}</td>
                            <td>{formatDate(transfer.transfer_date)}</td>
                            <td>{transfer.flight}</td>
                            <td>{transfer.owner_name}</td>
                            <td>{transfer.heaviest_baggage}</td>
                            <td>
                              {transfer.qr ? (
                                <div className="qr-hover-wrapper">
                                  <img className="status-icon" src="/images/qr.svg" alt="QR Icon" />
                                  <div className="qr-hover">
                                    <img className="qr-code" src={`data:image/png;base64,${transfer.qr}`} alt="QR Code" />
                                    <p>Нажмите для увеличения</p>
                                  </div>
                                </div>
                              ) : (
                                <img className="status-icon" src="/images/time.svg" alt="Time Icon" />
                              )}
                            </td>
                            {is_staff && transfer.status === "formed" && (
                      <td>
                        <button
                          className="action-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAccept(String(transfer.id));
                          }}
                        >
                          Принять
                        </button>
                        <button
                          className="action-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleReject(String(transfer.id));
                          }}
                        >
                          Отклонить
                        </button>
                      </td>
                    )}
                            </tr>
                        ))}
                      </tbody>
                    </table>
                ): (
                  <h3 className="text-center mt-5">Отправки не найдены!</h3>
                )}
            </div>
        </div> 
    </div>
  );
};

export default TransfersPage;