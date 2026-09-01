import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import '../index.css';

interface FormData {
  email: string;
  password: string;
}

export default function SignIn(): React.ReactNode {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const id = sessionStorage.getItem('challenge/id');
    if (!id) {
      setErrorMessage('User not registered. Please sign up.');
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    }).then((response) => {
      if (!response.ok) {
        throw new Error('Failed to sign in. Please try again.');
      }
      return response.json();
    })
      .then((data) => {
        sessionStorage.setItem('challenge/token', data.token);
        sessionStorage.setItem('challenge/id', data.id);
        navigate('/welcome');
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <>
      <NavBar />
      <div className="card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit} autoComplete="on">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
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
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit">Sign In</button>
        </form>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </div>
    </>
  );
}
