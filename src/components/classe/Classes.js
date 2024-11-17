import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Button,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from '@mui/material';
import './Classes.css'; // Importation du fichier CSS

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const niveaux = ['7 أساسي', '8 أساسي', '9 أساسي'];

  useEffect(() => {
    axios
      .get('http://localhost:9091/api/classes')
      .then((response) => {
        setClasses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('حدث خطأ في جلب الفصول');
        setLoading(false);
      });
  }, []);

  // Fonction pour supprimer une classe par ID
  const handleDeleteClass = (id_classe) => {
    axios
      .delete(`http://localhost:9091/api/classes/${id_classe}`)
      .then(() => {
        setClasses(classes.filter((classe) => classe.id_classe !== id_classe));
      })
      .catch((error) => {
        setError('حدث خطأ في حذف الفصل');
      });
  };

  // Vérifier si la classe existe déjà
  const isClassAlreadyExists = (nom_classe, niveau_classe) => {
    return classes.some(
      (classe) => classe.nom_classe === nom_classe && classe.niveau_classe === niveau_classe
    );
  };

  // Fonction pour ajouter une classe
  const handleAddClass = () => {
    const niveauNumber = parseInt(selectedNiveau, 10);
    
    // Vérification si le champ nom_classe contient seulement des chiffres
    if (!/^\d+$/.test(newClass)) {
      alert('اسم الفصل يجب أن يحتوي على أرقام فقط.');
      return;
    }

    if (!newClass || !selectedNiveau) {
      alert('يرجى اختيار مستوى وتقديم اسم الفصل.');
    } else if (isNaN(niveauNumber) || niveauNumber < 1 || niveauNumber > 20) {
      alert('المستوى يجب أن يكون بين 1 و 20.');
    } else if (isClassAlreadyExists(newClass, selectedNiveau)) {
      alert('هذه الفصل موجود بالفعل.');
    } else {
      axios
        .post('http://localhost:9091/api/classes', {
          nom_classe: newClass,
          niveau_classe: selectedNiveau,
        })
        .then((response) => {
          setClasses([...classes, response.data]);
          setNewClass('');
          setSelectedNiveau('');
        })
        .catch((error) => setError('حدث خطأ في إضافة الفصل'));
    }
  };

  // Fonction pour réinitialiser les champs de saisie
  const handleReset = () => {
    setNewClass('');
    setSelectedNiveau('');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>إدارة الفصول</h1>

        {loading ? (
          <CircularProgress />
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <div className="input-container">
              <TextField
                label="اسم الفصل"
                value={newClass}
                onChange={(e) => {
                  const value = e.target.value;
                  // Accepter uniquement les chiffres
                  if (/^\d*$/.test(value)) {
                    setNewClass(value);
                  }
                }}
                style={{ marginRight: '10px' }}
              />
              <FormControl style={{ minWidth: 120 }}>
                <InputLabel>المستوى</InputLabel>
                <Select
                  value={selectedNiveau}
                  onChange={(e) => setSelectedNiveau(e.target.value)}
                >
                  {niveaux.map((niveau) => (
                    <MenuItem key={niveau} value={niveau}>
                      {niveau}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                className="primary"
                onClick={handleAddClass}
                disabled={loading}
              >
                إضافة
              </Button>
              <Button
                variant="contained"
                className="reset"
                onClick={handleReset}
                disabled={loading}
              >
                إعادة تعيين
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Classes;
