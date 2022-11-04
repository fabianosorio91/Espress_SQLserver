const { Router } = require('express');
const router = Router();

const { mostrarDocentes, mostrarDocentesXid, crearDocente, actualizarDocente, eliminarDocente } = require('../controllers/docentes.controller');

router.get('/docentes', mostrarDocentes);
router.get('/docentes/:id', mostrarDocentesXid);
router.post('/docentes/crear', crearDocente);
router.put('/docentes/actualizar/:id', actualizarDocente);
router.put('/docentes/eliminar/:id', eliminarDocente);

module.exports = router;