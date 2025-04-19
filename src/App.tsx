import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import ToolDetailPage from './pages/ToolDetailPage';
import ReservationPage from './pages/ReservationPage';
import ReservationsListPage from './pages/ReservationsListPage';
import ProfilePage from './pages/ProfilePage';
import AddToolPage from './pages/AddToolPage';
import AuthPage from './pages/AuthPage';
import RequestsPage from './pages/RequestsPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/tool/:id" element={<ToolDetailPage />} />
              <Route path="/reserve/:id" element={<ReservationPage />} />
              <Route path="/reservations" element={<ReservationsListPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/add-tool" element={<AddToolPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/requests" element={<RequestsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;