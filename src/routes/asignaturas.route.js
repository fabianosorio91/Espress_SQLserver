const { Router } = require('express');
const router = Router();

const { mostrarAsignaturas, mostrarAsignautrasXid, crearAsignaturas, actualizarAsignaturas, eliminarAsignatura } = require('../controllers/asignaturas.controller');

router.get('/asignaturas', mostrarAsignaturas);
router.get('/asignaturas/:id', mostrarAsignautrasXid);
router.post('/asignaturas/crear', crearAsignaturas);
router.put('/asignaturas/actualizar/:id', actualizarAsignaturas);
router.put('/asignaturas/eliminar/:id', eliminarAsignatura);

module.exports = router;