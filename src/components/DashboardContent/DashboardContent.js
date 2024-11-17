import React from "react";
import { FaUserGraduate, FaChalkboardTeacher, FaUserFriends, FaMoneyBillAlt } from "react-icons/fa";
import "./Dashboard.css";

const DashboardContent = () => {
  return (
    <div className="dashboard" dir="rtl">
      <h1>لوحة تحكم الإدارة</h1>
      
      {/* قسم البطاقات */}
      <div className="cards">
        <div className="card">
          <FaUserGraduate className="icon" />
          <h3>الطلاب</h3>
          <p>150000</p>
        </div>
        <div className="card">
          <FaChalkboardTeacher className="icon" />
          <h3>المعلمون</h3>
          <p>2250</p>
        </div>
        <div className="card">
          <FaUserFriends className="icon" />
          <h3>الأولياء</h3>
          <p>5690</p>
        </div>
        <div className="card">
          <FaMoneyBillAlt className="icon" />
          <h3>الأرباح</h3>
          <p>193000</p>
        </div>
      </div>

      {/* قسم الأرباح */}
      <div className="earnings-section">
        <h3>الأرباح</h3>
        <div className="earnings-details">
          <div className="earning">
            <span>إجمالي التحصيلات</span>
            <span>75,000</span>
          </div>
          <div className="earning">
            <span>تحصيل الرسوم</span>
            <span>15,000</span>
          </div>
        </div>
        <div className="chart">[مكان لرسم خط الأرباح]</div>
      </div>

      {/* قسم المصاريف */}
      <div className="expenses-section">
        <h3>المصاريف</h3>
        <div className="expenses-details">
          <div className="expense">
            <span>يناير 2019</span>
            <span>15,000</span>
          </div>
          <div className="expense">
            <span>فبراير 2019</span>
            <span>10,000</span>
          </div>
          <div className="expense">
            <span>مارس 2019</span>
            <span>8,000</span>
          </div>
        </div>
        <div className="chart">[مكان لرسم عمود المصاريف]</div>
      </div>

      {/* قسم الطلاب */}
      <div className="students-section">
        <h3>الطلاب</h3>
        <div className="chart">[مكان لرسم دائرة الطلاب]</div>
        <div className="student-details">
          <div className="student">
            <span>الطالبات</span>
            <span>75000</span>
          </div>
          <div className="student">
            <span>الطلاب</span>
            <span>75000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
