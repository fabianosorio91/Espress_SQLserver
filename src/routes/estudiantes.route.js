const { Router } = require('express');
const router = Router();

const { mostrarEstudiantes, mostrarEstudiantesXid, crearEstudiante, actualizarEstudiante, eliminarEstudiante } = require('../controllers/estudiantes.controller');

router.get('/estudiantes', mostrarEstudiantes);
router.get('/estudiantes/:id', mostrarEstudiantesXid);
router.post('/estudiantes/crear', crearEstudiante);
router.put('/estudiantes/actualizar/:id', actualizarEstudiante);
router.put('/estudiantes/eliminar/:id', eliminarEstudiante);

module.exports = router;