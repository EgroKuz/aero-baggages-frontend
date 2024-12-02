import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import BaggagePage from './pages/BaggagePage/BaggagePage';
import BaggagesPage from './pages/BaggagesPage/BaggagesPage';
import { ROUTES } from "./Routes";

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.BAGGAGES} element={<BaggagesPage />} />
                <Route path={`${ROUTES.BAGGAGES}/:id`} element={<BaggagePage />} />
            </Routes>
        </Router>
    );
};

export default App;