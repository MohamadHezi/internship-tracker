import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login as loginApi } from '../services/authService';
import { useAuth } from '../context/useAuth';
import Button from '../components/ui/Button';

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-600">
            Internship Tracker
          </h1>
          <p className="mt-2 text-gray-500">
            Sign in to manage your internship applications.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label className="mb-2 block font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mb-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          <label className="mb-2 block font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mb-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          {error && (
            <p className="mb-4 text-sm text-red-600">{error}</p>
          )}

          <Button type="submit" className="w-full py-3">
            Login
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?
          <a
            href="/register"
            className="ml-1 font-medium text-blue-600 hover:underline"
          >
            Register
          </a>
        </p>

      </div>
    </div>
  );
}

export default LoginPage;