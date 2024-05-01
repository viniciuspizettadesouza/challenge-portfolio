import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import '../index.css';

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp(): React.ReactNode {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const passwordsMatch = (): boolean => {
    return formData.password === formData.confirmPassword;
  };

  console.log(import.meta.env)

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!passwordsMatch()) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to sign up. Please try again.');
        }
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem('challenge/token', data.token);
        sessionStorage.setItem('challenge/id', data.id);
        navigate('/welcome');
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <NavBar />
      <div className="card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
}
