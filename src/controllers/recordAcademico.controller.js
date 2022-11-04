const sql = require('mssql');
const { db } = require('../libs/db');


const mostrarRecordAcademico= async (req, res, next) => {
    try {
        let conn = await db();
        let data = await conn.request().execute('sp_mostrarRecord');
        if (data.recordset.length == 0) {
            res.json({
             message: 'No existen Records Academicos'
            });
         }
        res.json({
            message: 'Record Academico',
            data: data.recordset
        });        
    } catch (error) {
        next(error);
    }
};

const mostrarRecordAcademicoXid = async (req, res, next) =>{
    try {
        let id = req.params.id;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int,id)
        .execute('sp_mostrarRecordXid');

        if (data.recordset.length !=0 ) {
        res.json({
            message: 'Record Academico',
            data: data.recordset
        });

    }else{
        res.json({
            message: 'El Record Academico no se encuientra en la db'
        });
    }
    } catch (error) {
        next(error);
    }
};

const crearRecord = async (req, res, next) => {
    try {
        let { codigo, periodo, nota1, nota2, cod_estudiante, cod_docente} = req.body;
        let conn = await db();
        let data = await conn.request()
        .input('codigo', sql.NVarChar, codigo)
        .input('periodo', sql.NVarChar, periodo)
        .input('nota1', sql.Decimal(3,2), nota1)
        .input('nota2', sql.Decimal(3,2), nota2)
        .input('cod_estudiante', sql.NVarChar, cod_estudiante)
        .input('cod_docente', sql.NVarChar, cod_docente)
        .execute('sp_crearRecord');
        res.json({
            message: 'Record Academico Creado'
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const actualizarRecord = async (req, res ,next) => {
    try {
        let id = req.params.id;
        let {codigo, periodo, nota1, nota2, cod_estudiante, cod_docente } = req.body;
        let conn = await db();
        let data = await conn.request()
        .input('id', sql.Int, id)
        .input('codigo', sql.NVarChar, codigo)
        .input('periodo', sql.NVarChar, periodo)
        .input('nota1', sql.Decimal(3,2), nota1)
        .input('nota2', sql.Decimal(3,2), nota2)
        .input('cod_estudiante', sql.NVarChar, cod_estudiante)
        .input('cod_docente', sql.NVarChar, cod_docente)
        .execute('sp_ActualiarRecord');
        if (data.rowsAffected != 0) {
        res.json({
            message: 'Record Academico Actualizado con exito'
        });

    }else{
        res.json({
            message: 'Record No Actualizado'
        });
    }; 
    } catch (error) {
        next(error);
    }
};

const eliminarRecord = async (req, res, next) => {
    try {
        let id = await req.params.id;
        let conn = await db();
        conn.request()
        .input('id', sql.Int, id)
        .execute('sp_EliminarRecord');
        res.json({
            message: 'Record Academico Eliminado con exito'
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    mostrarRecordAcademico,
    mostrarRecordAcademicoXid,
    crearRecord,
    actualizarRecord,
    eliminarRecord

}