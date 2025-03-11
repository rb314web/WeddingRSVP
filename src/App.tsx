import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './assets/style/global.scss';
import EmailVerification from './components/EmailVerification';

const App: React.FC = () => (
  <div className="app">
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
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/verify-email" element={<EmailVerification />} />
    </Routes>
    <footer className="footer">
      <p>© 2024 Wedding RSVP. Wszystkie prawa zastrzeżone.</p>
    </footer>
  </div>
);

export default App;