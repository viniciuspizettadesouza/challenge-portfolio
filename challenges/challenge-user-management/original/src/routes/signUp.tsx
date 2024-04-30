import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'

export default function SignUp() {
  const [token, setToken] = useState<string | null>('');
  const [id, setId] = useState<string | null>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async (id: string | null) => {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem('token', data.token);
        navigate("/welcome");
      }
    };

    if (token) {
      fetchUser(id);
    } else {
      navigate("/sign-up");
    }
  }, [token, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const passwordsMatch = () => {
    return formData.password === formData.confirmPassword;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!passwordsMatch()) {
      setError('Passwords do not match');
      return;
    }

    const response = await fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();

    setId(data.id);
    setToken(data.token);
  };

  return (
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
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}