import { Routes, Route } from 'react-router-dom';

import MainLayout from '../components/layout/MainLayout';
import DashboardPage from '../pages/DashboardPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ApplicationsPage from '../pages/ApplicationsPage';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import ApplicationDetailsPage from '../pages/ApplicationDetailsPage';
import ResumeMatchPage from '../pages/ResumeMatchPage';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes using the shared layout */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<DashboardPage />} />

        <Route
          path="/applications"
          element={<ApplicationsPage />}
        />

        <Route
          path="/applications/:id"
          element={<ApplicationDetailsPage />}
        />

        <Route
          path="/applications/:id/match"
          element={<ResumeMatchPage />}
        />
      </Route>
    </Routes>
  );
}

export default AppRoutes;