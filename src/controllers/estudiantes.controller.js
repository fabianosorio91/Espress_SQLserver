const sql = require('mssql');
const { db } = require('../libs/db');


const mostrarEstudiantes = async (req, res, next) => {
    try {
        let conn = await db();
        let data = await conn.request().execute('sp_mostrarEstu');
        if (data.recordset.length == 0) {
           res.json({
            message: 'No existen estudiantes'
           });
        }else{
            res.json({
                message: 'Estudiantes',
                data: data.recordset
            }); 
        }        
    } catch (error) {
        next(error);
    }
};

const mostrarEstudiantesXid = async (req, res, next) =>{
    try {
        let id = req.params.id;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int,id)
        .execute('sp_mostrarEstuXid');
        
        if (data.recordset.length !=0 ) {
            res.json({
                message: 'Estudiante',
                data: data.recordset
            });
        }else{
            res.json({
                message: 'El Estudiante no se encuientra en la db'
            });
        }
    } catch (error) {
        next(error);
    }
};

const crearEstudiante = async (req, res, next) => {
    try {
        let { codigo, nombre, apellidos, semestre, carrera, cod_asignatura } = req.body;
        let conn = await db();
        await conn.request()
        .input('codigo', sql.NVarChar, codigo)
        .input('nombre', sql.NVarChar, nombre)
        .input('apellidos', sql.NVarChar, apellidos)
        .input('semestre', sql.NVarChar, semestre)
        .input('carrera', sql.NVarChar, carrera)
        .input('cod_asignatura', sql.NVarChar, cod_asignatura)
        .execute('sp_crearEstu');
        res.json({
            message: 'Estudiante Creado'
        })
    } catch (error) {
        next(error)
    }
};

const actualizarEstudiante = async (req, res ,next) => {
    try {
        let id = req.params.id;
        let {codigo, nombre, apellidos, semestre, carrera, cod_asignatura } = req.body;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int, id)
        .input('codigo', sql.NVarChar, codigo)
        .input('nombre', sql.NVarChar, nombre)
        .input('apellidos', sql.NVarChar, apellidos)
        .input('semestre', sql.NVarChar, semestre)
        .input('carrera', sql.NVarChar, carrera)
        .input('cod_asignatura', sql.NVarChar, cod_asignatura)
        .execute('sp_ActualiarEstu');
        if (data.rowsAffected != 0) {
            res.json({
                message: 'Estudiante Actualizado con exito'
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

const eliminarEstudiante = async (req, res, next) => {
    try {
        let id = req.params.id;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int, id)
        .execute('sp_EliminarEstu');
        if (data.rowsAffected != 0) {
            res.json({
                message: 'Estudiante Eliminado con exito'
            })
        }else{
            res.json({
                message: 'No se ha eliminado el estudiante'
            })
        }
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    mostrarEstudiantes,
    mostrarEstudiantesXid,
    crearEstudiante,
    actualizarEstudiante,
    eliminarEstudiante
}