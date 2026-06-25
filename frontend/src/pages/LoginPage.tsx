import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login as loginApi } from '../services/authService';
import { useAuth } from '../context/useAuth';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { login } = useAuth();

  async function handleSubmit() {
    const response = await loginApi(
      email,
      password
    );

    login(response.token);

    navigate('/applications');
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

        <label className="mb-2 block font-medium">
          Email
        </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          className="mb-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

        <label className="mb-2 block font-medium">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          className="mb-5 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500"
        />

        <button 
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Login
        </button>

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