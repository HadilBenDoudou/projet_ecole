import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Topbar from './components/Topbar/Topbar';
import DashboardContent from './components/DashboardContent/DashboardContent';
import AllStudents from './components/Student/Students';
import Login from './components/Login';
import Register from './components/Register';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import Classes from './components/classe/Classes'; 
import  Listclasses  from './components/classe/Listclasses';
import  AddSubjectForm  from './components/matiere/AddSubjectForm';
import  ViewSubjects  from './components/matiere/ViewSubjects';
import  AttendanceSheet  from './components/matiere/AttendanceSheet';
import  AddTeacherForm  from './components/teacher/AddTeacherForm';
function App() {
  const isAuthenticated = !!localStorage.getItem('token');  // Vérifie si l'utilisateur est authentifié

  return (
    <Router>
      <Routes>
        {/* Route de connexion affichée en premier si non authentifié */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Route pour la page d'inscription */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Route pour mot de passe oublié */}
        {/* Si l'utilisateur est authentifié, accès au dashboard */}
        {isAuthenticated ? (
          <>
            {/* Route pour le tableau de bord principal avec Sidebar et Topbar */}
            <Route
              path="/dashboard"
              element={
                <div className="dashboard-container">
                  <Sidebar />
                  <div className="content">
                    <Topbar />
                    <DashboardContent />
                  </div>
                </div>
              }
            />
            
            {/* Route pour la page des étudiants */}
            <Route
              path="/student"
              element={
                <div className="dashboard-container">
                  <Sidebar />
                  <div className="content">
                    <Topbar />
                    <AllStudents />
                  </div>
                </div>
              }
            />
            <Route
  path="/subject"
  element={
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Topbar />
        <AddSubjectForm />
      </div>
    </div>
  }
/>
<Route
  path="/view-subjects"
  element={
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Topbar />
        <ViewSubjects />
      </div>
    </div>
  }
/>
<Route
  path="/teacher"
  element={
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Topbar />
        <AddTeacherForm />
      </div>
    </div>
  }
/>
<Route
  path="/absence"
  element={
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Topbar />
        <AttendanceSheet />
      </div>
    </div>
  }
/>
              <Route
  path="/add-classes"
  element={
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Topbar />
        <Classes />
      </div>
    </div>
  }
/>


<Route
  path="/classes-list"
  element={
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Topbar />
        <Listclasses />
      </div>
    </div>
  }
/>

            <Route
  path="/profile"
  element={
    <div className="dashboard-container">
      <Sidebar />
      <div className="content">
        <Topbar />
        <Profile /> {/* Nouveau composant de profil */}
      </div>
    </div>
  }
/>


            {/* Redirige la racine vers le tableau de bord si authentifié */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </>
        ) : (
          // Redirige toute route non authentifiée vers la page de connexion
          <Route path="*" element={<Navigate to="/login" />} />
          
        )}
      </Routes>
    </Router>
  );
}

export default App;
