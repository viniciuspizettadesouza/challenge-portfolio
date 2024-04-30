import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css'

export default function SignIn() {
  const navigate = useNavigate();  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data)
      navigate("/welcome");
    }
  };

  return (
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
            autoComplete="password"
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
