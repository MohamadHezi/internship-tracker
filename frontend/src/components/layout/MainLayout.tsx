import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? 'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-white bg-white/10'
    : 'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-colors';

function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-56 flex-col bg-neutral-950">

        {/* Brand */}
        <div className="flex items-center gap-2.5 px-4 pt-5 pb-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500 text-[11px] font-bold text-white">
            IT
          </div>
          <span className="text-sm font-semibold tracking-tight text-white">Internship Tracker</span>
        </div>

        <div className="mx-4 h-px bg-white/10" />

        {/* Navigation */}
        <nav className="flex-1 space-y-0.5 px-2 py-4">
          <NavLink to="/" end className={navItemClass}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="15" height="15" className="shrink-0 opacity-75">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </NavLink>

          <NavLink to="/applications" className={navItemClass}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="15" height="15" className="shrink-0 opacity-75">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h8a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            Applications
          </NavLink>
        </nav>

        {/* Sign out */}
        <div className="border-t border-white/10 px-2 py-3">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-neutral-400 hover:bg-white/5 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="15" height="15" className="shrink-0 opacity-75">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-56 flex-1 px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
