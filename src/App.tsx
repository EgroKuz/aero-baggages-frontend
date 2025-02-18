import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage/HomePage';
import BaggagePage from './pages/BaggagePage/BaggagePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import BaggagesPage from './pages/BaggagesPage/BaggagesPage';
import TransferPage from "./pages/TransferPage/TransferPage";
import TransfersPage from "./pages/TransfersPage/TransfersPage";
import ForbiddenPage from './pages/ForbiddenPage/ForbiddenPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { ROUTES } from "./Routes";
import { dest_root } from "../target_config";
import BasicNavbar from './components/Navbar/Navbar';
import EditBaggagesPage from './pages/EditBaggagesPage/EditBaggagesPage';
import EditBaggagePage from './pages/EditBaggagePage/EditBaggagePage';

const App: React.FC = () => {
    return (
        <BrowserRouter basename={dest_root}> 
           <BasicNavbar />
            <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.BAGGAGES} element={<BaggagesPage />} />
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                <Route path={`${ROUTES.BAGGAGES}/:id`} element={<BaggagePage />} />
                <Route path={`${ROUTES.TRANSFERS}/:id`} element={<TransferPage />} />
                <Route path={ROUTES.TRANSFERS} element={<TransfersPage />} />
                <Route path={ROUTES.PAGE403} element={<ForbiddenPage />} />
                <Route path={ROUTES.PAGE404} element={<NotFoundPage />} />
                <Route path={ROUTES.EDIT_BAGGAGES} element={<EditBaggagesPage />} />
                <Route path={`${ROUTES.EDIT_BAGGAGES}/:id`} element={<EditBaggagePage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
