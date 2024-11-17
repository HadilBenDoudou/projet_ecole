import React, { useState, useEffect } from 'react';
import './Listclasses.css';
import axios from 'axios';
import {
  Button,
  TextField,
  Grid,
  CircularProgress,
  Snackbar, // Pour afficher le message de succès
  Alert, // Pour un message plus stylisé
} from '@mui/material';

function ClassListPage() {
  const [classData, setClassData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedClassLevel, setSelectedClassLevel] = useState('7 أساسي');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(''); // Nouveau message de succès

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    filterClasses();
  }, [searchQuery, selectedClassLevel]);

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:9091/api/classes');
      if (!response.ok) {
        throw new Error('فشل جلب بيانات الفصل الدراسي');
      }
      const data = await response.json();
      setClassData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const filterClasses = () => {
    const filtered = classData.filter(
      (item) =>
        item.niveau_classe === selectedClassLevel &&
        item.nom_classe.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleDelete = async (id_classe) => {
    try {
      await axios.delete(`http://localhost:9091/api/classes/${id_classe}`);
      // Mise à jour immédiate des données affichées
      setClassData(classData.filter((classe) => classe.id_classe !== id_classe));
      setFilteredData(filteredData.filter((classe) => classe.id_classe !== id_classe));
      setSuccessMessage('تم حذف الفصل بنجاح!'); // Affiche le message de succès
    } catch (error) {
      setError('حدث خطأ أثناء حذف الفصل');
    }
  };

  const handleGoToStudentsPage = (id_classe) => {
    console.log(`التوجه إلى صفحة التلاميذ للفصل بالرقم: ${id_classe}`);
  };

  const handleGoToTeachersPage = (id_classe) => {
    console.log(`التوجه إلى صفحة الأساتذة للفصل بالرقم: ${id_classe}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <p>حدث خطأ: {error}</p>;

  return (
    <div className="class-list-page">
      <h2>جداول الصفوف</h2>

      {/* Boutons pour sélectionner le niveau de classe */}
      <div className="class-level-buttons">
        <button onClick={() => setSelectedClassLevel('7 أساسي')}>7 أساسي</button>
        <button onClick={() => setSelectedClassLevel('8 أساسي')}>8 أساسي</button>
        <button onClick={() => setSelectedClassLevel('9 أساسي')}>9 أساسي</button>
      </div>

      {/* Barre de recherche */}
      <div className="search-bar">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={9}>
            <TextField
              label="البحث حسب اسم الفصل..."
              variant="outlined"
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={filterClasses}
              fullWidth
            >
              بحث
            </Button>
          </Grid>
        </Grid>
      </div>

      {/* Tableau des classes filtrées */}
      <table>
        <thead>
          <tr>
            <th>مستوى الفصل</th>
            <th>اسم الفصل</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <tr key={item.id_classe}>
                <td>{item.niveau_classe}</td>
                <td>{item.nom_classe}</td>
                <td>
                  <button onClick={() => handleDelete(item.id_classe)}>حذف</button>
                  <button onClick={() => handleGoToStudentsPage(item.id_classe)}>صفحة التلاميذ</button>
                  <button onClick={() => handleGoToTeachersPage(item.id_classe)}>صفحة الأساتذة</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">لم يتم العثور على فئات ل {selectedClassLevel}</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Message de succès */}
      {successMessage && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage('')}
        >
          <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </div>
  );
}

export default ClassListPage;
