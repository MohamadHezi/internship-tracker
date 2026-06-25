import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  // Shared utility class string for nav styling to keep things clean
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'font-semibold text-blue-600 border-b-2 border-blue-600 pb-4'
      : 'text-gray-600 hover:text-blue-600 pb-4 transition-colors';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Structural Top Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            Internship <span className="text-blue-600">Tracker</span>
          </h1>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 shadow-xs transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sub-Navigation Bar */}
      <nav className="bg-white shadow-xs">
        <div className="mx-auto flex max-w-7xl gap-6 px-6 pt-4">
          <NavLink to="/" className={getNavLinkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/applications" className={getNavLinkClass}>
            Applications
          </NavLink>
        </div>
      </nav>

      {/* Page Content Window Placeholder Injection Zone */}
      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;