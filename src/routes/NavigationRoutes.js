import { Route, Routes, Navigate } from 'react-router-dom';

import Home from '../pages/Home';

const NavigationRoutes = () => {

    return (
        <Routes>
            <Route exact path='/' element={<Home />}></Route>
            <Route
                path="*"
                element={<Navigate to="/" />}
            />
        </Routes>
    );
}

export default NavigationRoutes;
