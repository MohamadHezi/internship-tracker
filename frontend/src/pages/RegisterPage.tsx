import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/ui/Input';
import { register } from '../services/authService';
import Button from '../components/ui/Button';

function RegisterPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] =
    useState('');

  const [error, setError] = useState('');

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await register(email, password);

      navigate('/login');
    } catch {
      setError('Unable to create account.');
    }
  }

  return (
    <AuthLayout>
      <AuthCard
        title="Create Account"
        subtitle="Start tracking your internship applications."
      >
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <Input
              type="password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full py-3"
          >
            Create Account
          </Button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default RegisterPage;