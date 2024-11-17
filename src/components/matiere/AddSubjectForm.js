import React, { useState } from 'react';
import './AddSubjectForm.css'; // Importer le fichier CSS

function AddSubjectForm() {
  const [subjectName, setSubjectName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('7 أساسي'); // Valeur par défaut : 7 أساسي
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // État pour le message de succès
  const [errorMessage, setErrorMessage] = useState(''); // État pour le message d'erreur

  // Fonction pour afficher ou cacher le formulaire
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
    setSuccessMessage(''); // Réinitialiser le message de succès lorsque l'utilisateur réaffiche le formulaire
    setErrorMessage(''); // Réinitialiser le message d'erreur
  };

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Création de l'objet matière à envoyer
    const newSubject = {
      name: subjectName,
      level: selectedLevel,
    };

    // Utilisation de fetch pour envoyer les données vers l'API backend
    fetch('http://localhost:9091/api/subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Déclaration du format de contenu
      },
      body: JSON.stringify(newSubject), // Conversion de l'objet en JSON
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Récupération de la réponse JSON
        }
        throw new Error('Erreur lors de l\'ajout de la matière');
      })
      .then((data) => {
        setSuccessMessage('تم إضافة المادة بنجاح'); // Message de succès
        setSubjectName(''); // Réinitialiser les champs du formulaire
        setSelectedLevel('7 أساسي');
      })
      .catch((error) => {
        setErrorMessage('حدث خطأ أثناء إضافة المادة'); // Message d'erreur
        console.error('Erreur:', error);
      });

    // Cacher le formulaire après soumission
    setIsFormVisible(false);
  };

  return (
    <div className="add-subject-form">
      <button onClick={toggleForm}>
        {isFormVisible ? 'إخفاء النموذج' : 'إضافة مادة'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>اسم المادة:</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="أدخل اسم المادة"
            />
          </div>

          <div>
            <label>اختر المستوى:</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="7 أساسي">7 أساسي</option>
              <option value="8 أساسي">8 أساسي</option>
              <option value="9 أساسي">9 أساسي</option>
            </select>
          </div>

          <button type="submit">إضافة</button>
        </form>
      )}

      {/* Affichage des messages de succès ou d'erreur */}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default AddSubjectForm;
