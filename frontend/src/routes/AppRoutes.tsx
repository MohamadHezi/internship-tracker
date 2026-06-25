import { Routes, Route } from 'react-router-dom';

import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ApplicationsPage from '../pages/ApplicationsPage';
import ProtectedRoute from '../components/layout/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route 
        path="/applications" 
        element={
          <ProtectedRoute>
            <ApplicationsPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

export default AppRoutes;