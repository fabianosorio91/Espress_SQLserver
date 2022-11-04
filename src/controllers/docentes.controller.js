const sql = require('mssql');
const { db } = require('../libs/db');


const mostrarDocentes = async (req, res, next) => {
    try {
        let conn = await db();
        let data = await conn.request().execute('sp_mostrarDoc');
        if (data.recordset.length == 0) {
        res.json({             
            message: 'No existen Docentes'
        });
     }else{
         res.json({
            message: 'Docentes',
            data: data.recordset
        });  
    }
    } catch (error) {
        next(error);
    }
};

const mostrarDocentesXid = async (req, res, next) =>{
    try {
        let id = req.params.id;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int,id)
        .execute('sp_mostrarDocXid');

        if (data.recordset.length !=0 ) {
            res.json({
                 message: 'Docente',
                 data: data.recordset
        });
    }else{
        res.json({
            message: 'El Docente no se encuientra en la db'
        });
    }
    } catch (error) {
        next(error);
    }
};

const crearDocente = async (req, res, next) => {
    try {
        let { codigo, nombre, apellido, cod_asignatura } = req.body;
        let conn = await db();
        let data = await conn.request()
        .input('codigo', sql.NVarChar, codigo)
        .input('nombre', sql.NVarChar, nombre)
        .input('apellido', sql.NVarChar, apellido)
        .input('cod_asignatura', sql.NVarChar, cod_asignatura)
        .execute('sp_crearDoc');
        res.json({
            message: 'Docente Creado'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}


const actualizarDocente = async (req, res ,next) => {
    try {
        let id = req.params.id;
        let {codigo, nombre, apellido, cod_asignatura  } = req.body;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int, id)
        .input('codigo', sql.NVarChar, codigo)
        .input('nombre', sql.NVarChar, nombre)
        .input('apellido', sql.NVarChar, apellido)
        .input('cod_asignatura', sql.NVarChar, cod_asignatura)
        .execute('sp_ActualiarDoc');
        if (data.rowsAffected != 0) {
        res.json({
            message: 'Docente Actualizado con exito'
        });

    }else{
        res.json({
            message: 'Docente No Actualizado'
        });
    }; 
    } catch (error) {
        next(error);
    }
};

const eliminarDocente = async (req, res, next) => {
    try {
        let id = req.params.id;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int, id)
        .execute('sp_EliminarDoc');
        if (data.rowsAffected != 0) {
        res.json({
            message: 'Docente Eliminado con exito'
        })
    }else{
        res.json({
            message: 'No se ha eliminado el Docente'
        })
    } 
    } catch (error) {
        next(error);
    }
}


module.exports = {
    mostrarDocentes,
    mostrarDocentesXid,
    crearDocente,
    actualizarDocente,
    eliminarDocente
}

