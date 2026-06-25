import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { login as loginApi } from '../services/authService';
import { useAuth } from '../context/AuthContext';

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
    <div>
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(event) =>
          setEmail(event.target.value)
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) =>
          setPassword(event.target.value)
        }
      />

      <button onClick={handleSubmit}>
        Login
      </button>
    </div>
  );
}

export default LoginPage;