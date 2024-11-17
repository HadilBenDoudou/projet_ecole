import React, { useEffect, useState } from 'react';
import './Profile.css';
import profileImage from '../components/Topbar/image.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBirthdayCake, faKey } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  useEffect(() => {
    // استرجاع بيانات المستخدم من localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log("بيانات المستخدم من localStorage:", userData);  // التحقق من البيانات المسترجعة
    
    if (userData) {
      setUser(userData);
      setFormData({
        username: userData.username,
        email: userData.email,
      });
    }
  }, []);
  
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // التحقق مما إذا كان المستخدم معرفًا ومعرفة user.id
    if (!user || !user.id) {
      console.error("معرف المستخدم غير معرف أو المستخدم غير متصل!");
      return;  // منع إرسال الطلب إذا كان المستخدم أو معرفه مفقودًا
    }

    const userId = user.id;
    console.log("معرف المستخدم:", userId);  // التحقق من قيمة userId
    
    try {
      const response = await fetch(`http://localhost:9091/api/auth/update-profile?userId=${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } else {
        console.error('خطأ في تحديث الملف الشخصي');
      }
    } catch (error) {
      console.error('خطأ في تحديث الملف الشخصي:', error);
    }
  };
  
  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-card">
          <div className="profile-header">
            <h2><FontAwesomeIcon icon={faUser} /> معلوماتي الشخصية</h2>
          </div>
          <div className="profile-content">
            <div className="profile-image">
              <img src={profileImage} alt="صورة الملف الشخصي" />
            </div>
            <div className="profile-details">
              <h3>{user.username}</h3>
              <p>هذه هي معلوماتك الشخصية في الملف الشخصي.</p>
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <ul>
                    <li>
                      <label>
                        <strong>الاسم:</strong>
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                        />
                      </label>
                    </li>
                    <li>
                      <label>
                        <strong>البريد الإلكتروني:</strong>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </label>
                    </li>
                    <li>
                      <button type="submit">حفظ التغييرات</button>
                      <button type="button" onClick={handleEditToggle}>إلغاء</button>
                    </li>
                  </ul>
                </form>
              ) : (
                <ul>
                  <li><strong>الاسم:</strong> {user.username}</li>
                  <li><strong>البريد الإلكتروني:</strong> {user.email}</li>
                  <li><strong><FontAwesomeIcon icon={faKey} /> كلمة المرور:</strong> ********</li>
                  <li><strong><FontAwesomeIcon icon={faBirthdayCake} /> تاريخ الميلاد:</strong> {user.dateOfBirth || 'غير متوفر'}</li>
                  <li><strong>الدور:</strong> {user.role || 'مستخدم'}</li>
                  <li><button onClick={handleEditToggle}>تعديل</button></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>جاري تحميل بيانات المستخدم...</p>
      )}
    </div>
  );
};

export default Profile;
