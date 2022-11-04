const sql = require('mssql');
const { db } = require('../libs/db');


const mostrarAsignaturas= async (req, res, next) => {
    try {
        let conn = await db();
        let data = await conn.request().execute('sp_mostrarAsig');
        if (data.recordset.length == 0) {
            res.json({
             message: 'No existen Asignaturas'
            });
         }
        res.json({
            message: 'Asignaturas',
            data: data.recordset
        });        
    } catch (error) {
        next(error);
    }
};

const mostrarAsignautrasXid = async (req, res, next) =>{
    try {
        let id = req.params.id;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int, id)
        .execute('sp_mostrarAsigXid');

        if (data.recordset.length !=0 ) {
        res.json({
            message: 'Asignaturas',
            data: data.recordset
        });
    }else{
        res.json({
            message: 'La Asignatura no se encuientra en la db'
        });
    }

    } catch (error) {
        next(error);
    }
};

const crearAsignaturas = async (req, res, next) => {
    try {
        let { codigo, nombre, creditos} = req.body;
        let conn = await db();
        let data = await conn.request()
        .input('codigo', sql.NVarChar, codigo)
        .input('nombre', sql.NVarChar, nombre)
        .input('creditos', sql.TinyInt, creditos)
        .execute('sp_crearAsig');
        res.json({
            message: 'Asignaturas Creada'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const actualizarAsignaturas = async (req, res ,next) => {
    try {
        let id = req.params.id;
        let {codigo, nombre, creditos } = req.body;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int, id)
        .input('codigo', sql.NVarChar, codigo)
        .input('nombre', sql.NVarChar, nombre)
        .input('creditos', sql.TinyInt, creditos)
        .execute('sp_ActualiarAsig');
        if (data.rowsAffected != 0) {
        res.json({
            message: 'Asignatura Actualizada con exito'
        });
    }else{
        res.json({
            message: 'Estudiante No Actualizado'
        });
    };
    } catch (error) {
        next(error);
    }
};

const eliminarAsignatura = async (req, res, next) => {
    try {
        let id = req.params.id;
        let conn = await db();
        let data = conn.request()
        .input('id', sql.Int, id)
        .execute('sp_EliminarAsig');
        if (data.rowsAffected != 0) {
        res.json({
            message: 'Asignatura Eliminada con exito'
        })
    }else{
        res.json({
            message: 'No se ha eliminado la Asignatura'
        })
    };
    } catch (error) {
        next(error);
    }
}



module.exports = {
    mostrarAsignaturas,
    mostrarAsignautrasXid,
    crearAsignaturas,
    actualizarAsignaturas,
    eliminarAsignatura
}