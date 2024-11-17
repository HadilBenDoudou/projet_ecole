import React, { useState } from 'react';
import './Login.css';

function Register() {
  const [username, setUsername] = useState(''); // Ajout pour le nom d'utilisateur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    // Clear messages
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await fetch('http://localhost:9091/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,  // Inclure le nom d'utilisateur
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('تم التسجيل بنجاح!');
        setUsername(''); // Réinitialiser le champ username
        setEmail('');
        setPassword('');
      } else {
        setErrorMessage(data.message || 'حدث خطأ أثناء التسجيل');
      }
    } catch (error) {
      setErrorMessage('فشل الاتصال بالخادم');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>تسجيل حساب جديد</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="اسم المستخدم"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
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
          
          <button type="submit">تسجيل</button>
        </form>

        {/* Display messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Link to Login page */}
        <div className="extra-text">
          <p>
            هل لديك حساب بالفعل؟ <a href="/login">تسجيل الدخول</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
