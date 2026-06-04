import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProtectedRoute from '../../components/protected-route/protected-route';

import { AppRoute, AuthorizationStatus } from '../../const';

type TAppProps = {
    offersCount: number;
}

function App({ offersCount }: TAppProps) {
    return (
        <HelmetProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path={AppRoute.Root}
                        element={<MainPage offersCount={offersCount} />}
                    />
                    <Route
                        path={AppRoute.Favorites}
                        element={
                            <ProtectedRoute
                                restrictedFor={AuthorizationStatus.NoAuth}
                                redirectTo={AppRoute.Login} 
                            >
                                <FavoritesPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path={AppRoute.Login}
                        element={
                            <ProtectedRoute
                                restrictedFor={AuthorizationStatus.Auth}
                                redirectTo={AppRoute.Root}
                            >
                                <LoginPage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path={`${AppRoute.Offer}/:offerId`} element={<OfferPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </BrowserRouter>
        </HelmetProvider>
    );
}

export default App;