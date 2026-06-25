import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700'
      : 'rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">

          <h1 className="text-xl font-bold text-gray-900">
            Internship <span className="text-blue-600">Tracker</span>
          </h1>

          <div className="flex items-center gap-2">

            <NavLink
              to="/"
              className={getNavLinkClass}
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/applications"
              className={getNavLinkClass}
            >
              Applications
            </NavLink>
          </div>
            <button
              onClick={handleLogout}
              className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600"
            >
              Logout
            </button>

        </div>
      </header>

      {/* Page Content Window Placeholder Injection Zone */}
      <main className="mx-auto w-full max-w-7xl px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;