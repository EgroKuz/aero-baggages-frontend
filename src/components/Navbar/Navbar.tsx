import { NavLink } from 'react-router-dom';
import { ROUTES } from "../../Routes";
import { useAppSelector, useAppDispatch } from "../../store/store.ts";
import { handleLogout } from "../../store/slices/userSlice.ts";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const BasicNavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector((state) => state.user.is_authenticated);
  const isStaff = useAppSelector((state) => state.user.is_staff);
  const username = useAppSelector((state) => {
    return state.user.username;
});


  const logout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await dispatch(handleLogout());
    navigate(ROUTES.HOME);
  };

  return (
    <nav className="nav">
      <div className="nav__icon">
        <Link to="/" className="baggage-link">
                <div className="logo">  
                   <h1>Аэробагажник</h1>
                </div>
          </Link>
      </div>
      <div className="nav__wrapper">
        <div className="nav__links">
          <NavLink to={ROUTES.BAGGAGES} className="nav__link" end>
            Багажи
          </NavLink>

          {isAuthenticated ? (
            <>{isStaff ? (
              <>
              <div className="nav-item">
                <NavLink  to={`${ROUTES.EDIT_BAGGAGES}`} className="nav__link">
                    Редактировать
                </NavLink>
              </div>
              </>
            ):
            <></>
            }
              <div className="nav-item">
                <NavLink  to={`${ROUTES.TRANSFERS}`} className="nav__link">
                    Заявки
                </NavLink>
              </div>
              <div className="nav-item">
                  <NavLink  to={ROUTES.PROFILE} className="nav__link">
                      Профиль: { username }
                  </NavLink>
              </div>
              <a href={ROUTES.HOME} className="nav__link" onClick={logout}>
                Выйти
              </a>
            </>
          ) : (
            <>
              <NavLink to={ROUTES.LOGIN} className="nav__link" end>
                Войти
              </NavLink>
              <NavLink to={ROUTES.REGISTER} className="nav__link" end>
                Регистрация
              </NavLink>
            </>
          )}
        </div>
        <div
          className="nav__mobile-wrapper"
          onClick={(event) => event.currentTarget.classList.toggle('active')}
        >
          <div className="nav__mobile-target" />
          <div className="nav__mobile-menu">
            <NavLink to={ROUTES.HOME} className="nav__link" end>
              Главная
            </NavLink>
            <NavLink to={ROUTES.BAGGAGES} className="nav__link" end>
              Багажи
            </NavLink>

            {isAuthenticated ? (
              <>
                <div className="nav-item">
                  <NavLink  to={`${ROUTES.TRANSFERS}`} className="nav__link">
                      Заявки
                  </NavLink>
                </div>
                <div className="nav-item">
                  <NavLink  to={ROUTES.PROFILE} className="nav__link">
                      {username}
                  </NavLink>
                </div>
                <a href={ROUTES.HOME} className="nav__link" onClick={logout}>
                  Выйти
                </a>
              </>
            ) : (
              <>
                <NavLink to={ROUTES.LOGIN} className="nav__link" end>
                  Войти
                </NavLink>
                <NavLink to={ROUTES.REGISTER} className="nav__link" end>
                  Регистрация
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BasicNavbar;