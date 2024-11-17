import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // If authentication is needed

    try {
      // Make sure to add token in the headers if required
      await axios.post('http://localhost:9091/api/auth/forgot-password', 
        { email }, 
        { headers: { Authorization: `Bearer ${token}` } } // Include token if needed
      );
      setMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');

      // Optionally, navigate back to login or registration after successful submission
      setTimeout(() => {
        navigate('/login'); // Redirect to the login page after 3 seconds
      }, 3000); // Adjust the time as needed (in milliseconds)

    } catch (error) {
      // Log the actual error response for more details
      console.error('Error:', error.response.data); // Log the error response
      setMessage('حدث خطأ، الرجاء المحاولة مرة أخرى');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>إعادة تعيين كلمة المرور</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">إرسال رابط إعادة التعيين</button>
        </form>
        {/* Links to login and register pages */}
        <p>
          <a href="/login">عودة إلى تسجيل الدخول</a> | 
          <a href="/register"> التسجيل</a>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
