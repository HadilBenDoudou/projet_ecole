import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9091/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);  // Stocker le token dans localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user data
      navigate('/dashboard');  // Rediriger vers le dashboard après une connexion réussie
    } catch (error) {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');  // Afficher l'erreur si la connexion échoue
    }
  };

  const handleGoToExcel = () => {
    navigate('/ImportEtudiants');  // Redirection vers la page Excel.js
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>تسجيل الدخول</h2>
        {error && <p className="error-text">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">تسجيل الدخول</button>
        </form>

        <div className="extra-text">
          <p>
            نسيت كلمة المرور؟ <Link to="/forgot-password">إعادة تعيين</Link>
          </p>
          <p>
            جديد هنا؟ <Link to="/register">أنشئ حسابًا</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
