const { Router } = require('express');
const router = Router();

const { mostrarRecordAcademico, mostrarRecordAcademicoXid, crearRecord, actualizarRecord, eliminarRecord } = require('../controllers/recordAcademico.controller');

router.get('/record', mostrarRecordAcademico);
router.get('/record/:id', mostrarRecordAcademicoXid);
router.post('/record/crear', crearRecord);
router.put('/record/actualizar/:id', actualizarRecord);
router.put('/record/eliminar/:id', eliminarRecord);

module.exports = router;