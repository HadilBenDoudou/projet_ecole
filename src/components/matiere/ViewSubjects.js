import React, { useState } from 'react';
import './ViewSubjects.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Icônes d'édition et de suppression

function ViewSubjects() {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLevelClick = (level) => {
    setSelectedLevel(level);
    setLoading(true);

    fetch(`http://localhost:9091/api/subjects/level/${encodeURIComponent(level)}`)
      .then((response) => response.json())
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur:', error);
        setLoading(false);
      });
  };

  const handleDelete = (subjectId) => {
    fetch(`http://localhost:9091/api/subjects/${subjectId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          setSubjects(subjects.filter((subject) => subject.id !== subjectId));
        }
      })
      .catch((error) => console.error('Erreur de suppression:', error));
  };

  const handleEdit = (subjectId) => {
    const newName = prompt('Modifier le nom de la matière:');
    if (newName) {
      const updatedSubject = { name: newName, level: selectedLevel };

      fetch(`http://localhost:9091/api/subjects/${subjectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSubject),
      })
        .then((response) => response.json())
        .then((updatedSubject) => {
          setSubjects(subjects.map((subject) =>
            subject.id === subjectId ? updatedSubject : subject
          ));
        })
        .catch((error) => console.error('Erreur d\'édition:', error));
    }
  };

  return (
    <div className="view-subjects">
      <h2 className="page-title">عرض المواد</h2>

      <div className="levels">
        <button onClick={() => handleLevelClick('7 أساسي')} className="level-btn">7 أساسي</button>
        <button onClick={() => handleLevelClick('8 أساسي')} className="level-btn">8 أساسي</button>
        <button onClick={() => handleLevelClick('9 أساسي')} className="level-btn">9 أساسي</button>
      </div>

      {loading && <div className="loading-message">جاري التحميل...</div>}

      {selectedLevel && !loading && (
        <div className="subjects">
          <h3 className="subject-title">المواد لـ {selectedLevel}</h3>
          <ul className="subject-list">
            {subjects.length > 0 ? (
              subjects.map((subject) => (
                <li key={subject.id} className="subject-item">
                  <span>{subject.name}</span>
                  <div className="actions">
                    <FaEdit className="edit-icon" onClick={() => handleEdit(subject.id)} />
                    <FaTrashAlt className="delete-icon" onClick={() => handleDelete(subject.id)} />
                  </div>
                </li>
              ))
            ) : (
              <li className="no-subjects">لا توجد مواد لهذا المستوى</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ViewSubjects;
