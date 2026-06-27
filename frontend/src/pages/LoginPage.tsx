import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as loginApi } from '../services/authService';
import { useAuth } from '../context/useAuth';
import Button from '../components/ui/Button';

const inputClass =
  'w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400';
const labelClass = 'mb-1.5 block text-sm font-medium text-neutral-700';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError('');
    try {
      const response = await loginApi(email, password);
      login(response.token);
      navigate('/applications');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unable to log in.');
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 p-6">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-[11px] font-bold text-white">
          IT
        </div>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-neutral-900">Sign in</h1>
        <p className="mt-1.5 text-sm text-neutral-500">Welcome back to Internship Tracker.</p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="text-xs text-red-600">{error}</p>}

          <Button type="submit" className="w-full py-2.5">
            Sign in
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-500">
          No account?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:underline">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
