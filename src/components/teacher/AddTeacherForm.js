import React, { useState, useEffect } from "react";
import "./AddTeacherForm.css";

const AddTeacherForm = () => {
  const [nomEnseignant, setNomEnseignant] = useState("");
  const [prenomEnseignant, setPrenomEnseignant] = useState("");
  const [matiere, setMatiere] = useState("");
  const [emploiFile, setEmploiFile] = useState(null);
  const [message, setMessage] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Récupération des matières via fetch
    const fetchSubjects = async () => {
      try {
        const response = await fetch("http://localhost:9091/api/subjects");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des matières");
        }
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des matières", error);
      }
    };
    fetchSubjects();
  }, []);

  const handleFileChange = (e) => {
    setEmploiFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom_enseignant", nomEnseignant);
    formData.append("prenom_enseignant", prenomEnseignant);
    formData.append("matiere", matiere);
    if (emploiFile) formData.append("emploiFile", emploiFile);

    try {
      const response = await fetch("http://localhost:9091/api/enseignants", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'enseignant");
      }
      const data = await response.text();
      setMessage(data);
      setNomEnseignant("");
      setPrenomEnseignant("");
      setMatiere("");
      setEmploiFile(null);
    } catch (error) {
      setMessage("Erreur lors de l'ajout de l'enseignant.");
    }
  };

  return (
    <div className="form-container" dir="rtl">
      <h2>إضافة معلم جديد</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>الاسم الأول *</label>
            <input
              type="text"
              value={prenomEnseignant}
              onChange={(e) => setPrenomEnseignant(e.target.value)}
              placeholder="الاسم الأول"
              required
            />
          </div>
          <div className="form-group">
            <label>اسم العائلة *</label>
            <input
              type="text"
              value={nomEnseignant}
              onChange={(e) => setNomEnseignant(e.target.value)}
              placeholder="اسم العائلة"
              required
            />
          </div>
          <div className="form-group">
            <label>المادة *</label>
            <select
              value={matiere}
              onChange={(e) => setMatiere(e.target.value)}
              required
            >
              <option value="">يرجى اختيار المادة</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.name}>
                  {subject.name} - {subject.level}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group file-upload-group">
            <label>تحميل صورة المعلم أو ملف</label>
            <input type="file" onChange={handleFileChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">حفظ</button>
          <button type="reset" className="reset-button" onClick={() => setMessage("")}>إعادة تعيين</button>
        </div>
      </form>
    </div>
  );
};

export default AddTeacherForm;
