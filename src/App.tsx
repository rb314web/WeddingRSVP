import { Routes, Route, Navigate } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './assets/style/global.scss';
import Callback from './components/Callback';
import AuthGuard from './components/AuthGuard';

// Walidacja zmiennych środowiskowych
const validateEnv = () => {
    const requiredVars = [
        'REACT_APP_AUTH0_DOMAIN',
        'REACT_APP_AUTH0_CLIENT_ID',
        'REACT_APP_AUTH0_AUDIENCE'
    ];

    requiredVars.forEach(varName => {
        if (!process.env[varName]) {
            throw new Error(`Brak wymaganej zmiennej środowiskowej: ${varName}`);
        }
    });
};

validateEnv();

const App: React.FC = () => (
    <Auth0Provider
        domain={process.env.REACT_APP_AUTH0_DOMAIN!}
        clientId={process.env.REACT_APP_AUTH0_CLIENT_ID!}
        authorizationParams={{
            audience: process.env.REACT_APP_AUTH0_AUDIENCE!,
            redirect_uri: process.env.REACT_APP_AUTH0_REDIRECT_URI || window.location.origin,
            scope: 'openid profile email read:users write:guests'
        }}
        cacheLocation="localstorage"
        useRefreshTokens={true}
        onRedirectCallback={(appState) => {
            window.history.replaceState(
                {},
                document.title,
                appState?.returnTo || window.location.pathname
            );
        }}
    >
        <div className="app">
            <AuthGuard>
                <Navbar />
                <Routes>
                    <Route path="/" element={
                        <>
                            <Hero />
                            <Features />
                            <Pricing />
                            <FAQ />
                        </>
                    } />

                    <Route path="/login" element={<Login />} />
                    <Route path="/callback" element={<Callback />} />

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    {/* Error handling routes */}
                    <Route path="/unauthorized" element={<div>Brak uprawnień</div>} />
                    <Route path="/error" element={<div>Błąd systemowy</div>} />

                    {/* Catch-all route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthGuard>

            <footer className="footer">
                <p>© 2024 Wedding RSVP. Wszystkie prawa zastrzeżone.</p>
            </footer>
        </div>
    </Auth0Provider>
);

export default App;