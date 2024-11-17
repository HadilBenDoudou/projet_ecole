import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Snackbar, Alert, Modal, MenuItem, Select, InputLabel, FormControl
} from '@mui/material';

function AllStudents() {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    nom_eleve: '', prenom_eleve: '', nom_parent: '', num_parent: '', date_naissance: ''
  });
  const [classList, setClassList] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedNiveau, setSelectedNiveau] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      const response = await fetch('http://localhost:9091/api/classes');
      const data = await response.json();
      setClassList(data);
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const addStudent = async () => {
    if (!newStudent.nom_eleve || !newStudent.prenom_eleve || !newStudent.nom_parent || !newStudent.num_parent || !newStudent.date_naissance || !selectedClass || !selectedNiveau) {
      alert('يرجى ملء جميع الحقول');
      return;
    }

    const classId = classList.find((classe) => classe.nom_classe === selectedClass && classe.niveau_classe === selectedNiveau)?.id_classe;
    if (!classId) {
      alert('لم يتم العثور على القسم');
      return;
    }

    try {
      const response = await fetch('http://localhost:9091/api/eleves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newStudent,
          classe: { id_classe: classId }
        })
      });

      if (response.ok) {
        const addedStudent = await response.json();
        setStudents((prevStudents) => [...prevStudents, addedStudent]);
        setNewStudent({ nom_eleve: '', prenom_eleve: '', nom_parent: '', num_parent: '', date_naissance: '' });
        setSelectedClass('');
        setSelectedNiveau('');
        setSuccessMessage('تمت إضافة الطالب بنجاح!');
      } else {
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      setSuccessMessage('');
    }
  };

  const handleClassSearch = async () => {
    if (!selectedClass || !selectedNiveau) {
      alert('يرجى اختيار القسم والمستوى');
      return;
    }

    const classId = classList.find((classe) => classe.nom_classe === selectedClass && classe.niveau_classe === selectedNiveau)?.id_classe;
    if (!classId) {
      alert('لم يتم العثور على القسم');
      return;
    }

    try {
      const response = await fetch(`http://localhost:9091/api/eleves?classId=${classId}`);
      if (!response.ok) throw new Error('فشل في جلب الطلاب لهذا القسم');
      const data = await response.json();
      setFilteredStudents(data);
      setOpenModal(true);
    } catch (error) {
      console.error('Error fetching students:', error);
      setFilteredStudents([]);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFilteredStudents([]);
  };

  const handleDeleteClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:9091/api/eleves/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setFilteredStudents(filteredStudents.filter((student) => student.id_eleve !== id));
        setSuccessMessage('تم حذف الطالب بنجاح!');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEditClick = (student) => {
    setEditStudent(student);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    if (!editStudent) return;
    try {
      const response = await fetch(`http://localhost:9091/api/eleves/${editStudent.id_eleve}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editStudent)
      });
      if (response.ok) {
        const updatedStudent = await response.json();
        setFilteredStudents(
          filteredStudents.map((student) =>
            student.id_eleve === updatedStudent.id_eleve ? updatedStudent : student
          )
        );
        setSuccessMessage('تم تعديل الطالب بنجاح!');
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" align="center" gutterBottom>إدارة الطلاب</Typography>

      {/* Add New Student Form */}
      <Box sx={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: '100%', maxWidth: '600px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <Typography variant="h5" gutterBottom align="center">إضافة طالب جديد</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField label="الاسم" name="nom_eleve" value={newStudent.nom_eleve} onChange={(e) => setNewStudent({ ...newStudent, nom_eleve: e.target.value })} variant="outlined" size="small" />
            <TextField label="اللقب" name="prenom_eleve" value={newStudent.prenom_eleve} onChange={(e) => setNewStudent({ ...newStudent, prenom_eleve: e.target.value })} variant="outlined" size="small" />
            <TextField label="اسم ولي الأمر" name="nom_parent" value={newStudent.nom_parent} onChange={(e) => setNewStudent({ ...newStudent, nom_parent: e.target.value })} variant="outlined" size="small" />
            <TextField label="رقم ولي الأمر" name="num_parent" value={newStudent.num_parent} onChange={(e) => setNewStudent({ ...newStudent, num_parent: e.target.value })} variant="outlined" size="small" />
            <TextField label="تاريخ الميلاد" name="date_naissance" value={newStudent.date_naissance} onChange={(e) => setNewStudent({ ...newStudent, date_naissance: e.target.value })} variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} />

            <Box sx={{ display: 'flex', gap: '20px' }}>
              <FormControl fullWidth>
                <InputLabel>اسم القسم</InputLabel>
                <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} label="اسم القسم" size="small">
                  {classList.map((classe) => (
                    <MenuItem key={classe.id_classe} value={classe.nom_classe}>{classe.nom_classe}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>مستوى القسم</InputLabel>
                <Select value={selectedNiveau} onChange={(e) => setSelectedNiveau(e.target.value)} label="مستوى القسم" size="small">
                  <MenuItem value="7">7 أساسي</MenuItem>
                  <MenuItem value="8 أساسي">8 أساسي</MenuItem>
                  <MenuItem value="9">9 أساسي</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Button variant="contained" color="primary" onClick={addStudent} fullWidth>إضافة الطالب</Button>
          </Box>
        </Box>
      </Box>

      {/* Success Snackbar */}
      <Snackbar open={!!successMessage} autoHideDuration={4000} onClose={() => setSuccessMessage('')}>
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      {/* Search Students Section */}
      <Box sx={{ marginTop: '30px', textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>البحث عن الطلاب حسب القسم</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                    {/* Search Section */}
                    <FormControl fullWidth>
            <InputLabel>اسم القسم</InputLabel>
            <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)} label="اسم القسم" size="small">
              {classList.map((classe) => (
                <MenuItem key={classe.id_classe} value={classe.nom_classe}>{classe.nom_classe}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>مستوى القسم</InputLabel>
            <Select value={selectedNiveau} onChange={(e) => setSelectedNiveau(e.target.value)} label="مستوى القسم" size="small">
              <MenuItem value="7">7 أساسي</MenuItem>
              <MenuItem value="8 أساسي">8 أساسي</MenuItem>
              <MenuItem value="9">9 أساسي</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" color="primary" onClick={handleClassSearch} fullWidth>بحث</Button>
        </Box>
      </Box>

      {/* Students Table Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: '900px'
        }}>
          <Typography variant="h6" gutterBottom align="center">الطلاب في هذا القسم</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>الاسم</TableCell>
                  <TableCell>اللقب</TableCell>
                  <TableCell>اسم ولي الأمر</TableCell>
                  <TableCell>رقم ولي الأمر</TableCell>
                  <TableCell>تاريخ الميلاد</TableCell>
                  <TableCell>الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id_eleve}>
                    <TableCell>{student.nom_eleve}</TableCell>
                    <TableCell>{student.prenom_eleve}</TableCell>
                    <TableCell>{student.nom_parent}</TableCell>
                    <TableCell>{student.num_parent}</TableCell>
                    <TableCell>{student.date_naissance}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="warning" size="small" onClick={() => handleEditClick(student)}>تعديل</Button>
                      <Button variant="contained" color="error" size="small" onClick={() => handleDeleteClick(student.id_eleve)}>حذف</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button variant="contained" color="secondary" onClick={handleCloseModal} fullWidth sx={{ marginTop: '20px' }}>
            إغلاق
          </Button>
        </Box>
      </Modal>

      {/* Edit Student Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '80%', maxWidth: '600px'
        }}>
          <Typography variant="h6" gutterBottom align="center">تعديل بيانات الطالب</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField label="الاسم" name="nom_eleve" value={editStudent?.nom_eleve || ''} onChange={(e) => setEditStudent({ ...editStudent, nom_eleve: e.target.value })} variant="outlined" size="small" />
            <TextField label="اللقب" name="prenom_eleve" value={editStudent?.prenom_eleve || ''} onChange={(e) => setEditStudent({ ...editStudent, prenom_eleve: e.target.value })} variant="outlined" size="small" />
            <TextField label="اسم ولي الأمر" name="nom_parent" value={editStudent?.nom_parent || ''} onChange={(e) => setEditStudent({ ...editStudent, nom_parent: e.target.value })} variant="outlined" size="small" />
            <TextField label="رقم ولي الأمر" name="num_parent" value={editStudent?.num_parent || ''} onChange={(e) => setEditStudent({ ...editStudent, num_parent: e.target.value })} variant="outlined" size="small" />
            <TextField label="تاريخ الميلاد" name="date_naissance" value={editStudent?.date_naissance || ''} onChange={(e) => setEditStudent({ ...editStudent, date_naissance: e.target.value })} variant="outlined" size="small" type="date" InputLabelProps={{ shrink: true }} />

            <Button variant="contained" color="primary" onClick={handleEditSubmit} fullWidth>تعديل الطالب</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default AllStudents;

