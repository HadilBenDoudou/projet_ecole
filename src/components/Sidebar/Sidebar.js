import React, { useState } from 'react';
import { FaTachometerAlt, FaSignOutAlt, FaUserGraduate, FaChalkboardTeacher, FaUsers, FaClipboardList, FaCalendarCheck, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Sidebar() {
  const [isClassMenuOpen, setIsClassMenuOpen] = useState(false); // Etat pour gérer l'affichage du sous-menu Class
  const [isSubjectMenuOpen, setIsSubjectMenuOpen] = useState(false); // Etat pour gérer l'affichage du sous-menu Subject

  const toggleClassMenu = () => {
    setIsClassMenuOpen(!isClassMenuOpen); // Inverse l'état du sous-menu Class
  };

  const toggleSubjectMenu = () => {
    setIsSubjectMenuOpen(!isSubjectMenuOpen); // Inverse l'état du sous-menu Subject
  };

  return (
    <div className="sidebar">
      <ul>
        <li><h2>لوحة التحكم</h2></li>
        <li>
          <Link to="/dashboard">
            لوحة القيادة <FaTachometerAlt />
          </Link>
        </li>
        <li>
          <Link to="/student">
            الطلاب <FaUserGraduate />
          </Link>
        </li>
        <li>
          <Link to="/teacher">
            الأساتذة <FaChalkboardTeacher />
          </Link>
        </li>
        <li>
          <Link to="/staff">
            المستخدمون <FaUsers />
          </Link>
        </li>
        <li>
          <a href="#" onClick={toggleClassMenu}>
            الفصول <FaClipboardList />
          </a>
          {isClassMenuOpen && ( // Affiche le sous-menu si l'état isClassMenuOpen est true
            <ul>
              <li>
                <Link to="/classes-list">
                  قائمة الفصول <FaClipboardList />
                </Link>
              </li>
              <li>
                <Link to="/add-classes">
                  إضافة فصل <FaPlus />
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <a href="#" onClick={toggleSubjectMenu}>
            المواد <FaClipboardList />
          </a>
          {isSubjectMenuOpen && ( // Affiche le sous-menu si l'état isSubjectMenuOpen est true
            <ul>
              <li>
                <Link to="/subject">
                  إضافة مادة <FaPlus />
                </Link>
              </li>
              <li>
                <Link to="/view-subjects">
                  عرض المواد <FaClipboardList />
                </Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/absence">
            الحضور <FaCalendarCheck />
          </Link>
        </li>
        <li>
          <Link to="/profile">
            الملف الشخصي <FaUserGraduate />
          </Link>
        </li>
        <li>
          <Link to="/login">
            تسجيل الخروج <FaSignOutAlt />
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
