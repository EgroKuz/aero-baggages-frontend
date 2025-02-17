import { FC, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import { fetchTransfers, T_TransfersFilters, updateFilters } from "../../store/slices/transfersSlice.ts";
import { useNavigate } from "react-router-dom";
import "./TransfersPage.css";
import { ROUTES } from "../../Routes.tsx";

const TransfersPage: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const transfers = useAppSelector((state) => state.transfers?.transfers || []);
  const filters = useAppSelector<T_TransfersFilters>((state) => state.transfers?.filters || []);

  const [status, setStatus] = useState(filters.status);
  const [dateFormationStart, setDateFormationStart] = useState(filters.date_formation_start);
  const [dateFormationEnd, setDateFormationEnd] = useState(filters.date_formation_end);

  const [hoveredRowId, setHoveredRowId] = useState<string | null>(null);

  const statusOptions = {
    '': "Любой",
    'formed': "Сформирован",
    'completed': "Завершен",
    'rejected': "Отклонен",
  };

  const formatDate = (dateString?: string) => { 
    if (!dateString) return "";   
    const date = new Date(dateString); 
    return date.toLocaleDateString("ru-RU"); // Формат: день.месяц.год 
  }; 

  useEffect(() => {
    dispatch(fetchTransfers());
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
    };

    await dispatch(updateFilters(newFilters));
    await dispatch(fetchTransfers());
  };

  return (
    <div className="transfers-container">
        <div className="transfers-table-container">
            <form onSubmit={applyFilters} className="transfers-form">
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
                {transfers.length > 0 &&
                    <table className="transfers-table">
                        <thead>
                        <tr>
                            <td>ID отправки</td>
                            <td>Статус</td>
                            <td>Дата создания</td>
                            <td>Дата формирования</td>
                            <td>Запланированная дата</td>
                            <td>Дата завершения</td>
                            <td>Создатель</td>
                            <td>Рейс</td>
                            <td>Владелец</td>
                            <td>Самый тяжелый багаж</td>
                        </tr>
                        </thead>
                        <tbody>
                        {transfers.map((transfer, index) => (
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
                            <td>{formatDate(transfer.transfer_date)}</td>
                            <td>{transfer.completion_date}</td>
                            <td>{transfer.user}</td>
                            <td>{transfer.flight}</td>
                            <td>{transfer.owner_name}</td>
                            <td>{transfer.heaviest_baggage}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                }
            </div>
        </div> 
        {!transfers.length &&
            <h3 className="text-center mt-5">Отправки не найдены</h3>
         }
    </div>
  );
};

export default TransfersPage;