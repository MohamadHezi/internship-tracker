import { Routes, Route } from 'react-router-dom';

import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ApplicationsPage from '../pages/ApplicationsPage';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import ApplicationDetailsPage from '../pages/ApplicationDetailsPage';

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
      <Route
        path="/applications/:id"
        element={
          <ProtectedRoute>
            <ApplicationDetailsPage />
          </ProtectedRoute>
        }
      />
    </Routes>

    
  );
}

export default AppRoutes;