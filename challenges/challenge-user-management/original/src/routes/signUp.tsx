import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>('');
  const [id, setId] = useState<string | null>('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async (id: string | null) => {
      const response = await fetch(`https://reqres.in/api/users/${id}`);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate("/welcome", { state: { firstName: data.data.first_name } });
      }
    };

    if (token) {
      fetchUser(id);
    } else {
      navigate("/sign-up");
    }
  }, [navigate, token, id]);

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

  const handleSignInClick = () => {
    navigate("/sign-in");
  };

  return (
    <div className="card">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleSignInClick}>Sign In</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}