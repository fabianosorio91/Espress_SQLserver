IF OBJECT_ID('escuela') IS NOT NULL
DROP DATABASE escuela

CREATE DATABASE escuela

USE escuela

IF OBJECT_ID('asignaturas') IS NOT NULL
DROP TABLE asignaturas

CREATE TABLE asignaturas(
	id int identity(1,1),
	codigo varchar(30) primary key,
	nombre varchar(45) not null,
	creditos tinyint not null,
	estado varchar(45) default 'Activo' not null
)


IF OBJECT_ID('estudiantes') IS NOT NULL
DROP TABLE estudiantes

CREATE TABLE estudiantes(
	id int identity(1,1),
	codigo varchar(30) primary key,
	nombre varchar(45) not null,
	apellidos varchar(45) not null,
	semestre varchar(45) not null,
	carrera varchar(45) not null,
	estado varchar(45) default 'Activo' not null,
	cod_asignatura varchar(30) not null
	CONSTRAINT fk_asignatura_01 REFERENCES asignaturas(codigo)
	ON UPDATE CASCADE
)


IF OBJECT_ID('docentes') IS NOT NULL
DROP TABLE docentes

CREATE TABLE docentes(
id int identity(1,1),
codigo varchar(30) primary key,
nombre varchar(45) not null,
apellido varchar(45) not null,
estado varchar(45) default 'Activo' not null,
cod_asignatura varchar(30) not null
CONSTRAINT fk_asignatura REFERENCES asignaturas(codigo)
ON UPDATE CASCADE
)

IF OBJECT_ID('Record_Academico') IS NOT NULL
DROP TABLE Record_Academico

create table Record_Academico(
	id int identity (1,1),
	codigo varchar(15) not null,
	fecha date default getdate(),
	periodo varchar(15) not null,
	nota1 decimal(3,2) not null,
	nota2 decimal(3,2) not null, 
	promedio as Nota1 * 0.4 + Nota2 * 0.6,
	estado varchar(45) default 'Activo' not null,
	cod_estudiante varchar(30) not null
	CONSTRAINT fk_estudiante REFERENCES estudiantes(codigo),
	cod_docente varchar(30) not null
	CONSTRAINT fk_docente REFERENCES docentes(codigo)
	ON UPDATE CASCADE
	)

GO
---Asiganturas
---mostrar asignaturas
CREATE PROC sp_mostrarAsig
AS
	BEGIN
		Select * from asignaturas Where estado = 'Activo' 
	END
---Mostrar ASigantura por ID
GO
CREATE PROC sp_mostrarAsigXid(
@id int
)
AS
	BEGIN
		Select * from asignaturas Where id = @id AND estado = 'Activo'
	END
GO
---Crear Asignaturas
GO
CREATE PROC sp_crearAsig(
@codigo varchar(30),
@nombre varchar(45),
@creditos tinyint
)
AS
	BEGIN
		Insert into asignaturas(codigo, nombre, creditos)
		Values(@codigo, @nombre, @creditos)
	END
GO
---Actualizar Asignaturas
GO
CREATE PROC sp_ActualiarAsig(
@id int,
@codigo varchar(30),
@nombre varchar(45),
@creditos tinyint
)
AS
	BEGIN
		UPDATE asignaturas SET codigo = @codigo, nombre = @nombre, creditos = @creditos
		Where id = @id
	END
GO
---Eliminar Asignaturas
GO
CREATE PROC sp_EliminarAsig(
@id int
)
AS
	BEGIN
		UPDATE asignaturas SET estado = 'inactivo'
		Where id = @id
	END
GO

--- Docentes
--- mostrar docentes
GO
CREATE PROC sp_mostrarDoc
AS
	BEGIN
		Select d.id, d.codigo, d.nombre, d.apellido, d.estado, a.nombre  As asignatura from docentes d 
		JOIN asignaturas a on d.cod_asignatura = a.codigo
		Where d.estado = 'Activo'
	END
GO
---Mostrar Docentes por ID
GO
CREATE PROC sp_mostrarDocXid(
@id int
)
AS
	BEGIN
		Select d.id, d.codigo, d.nombre, d.apellido, d.estado, a.nombre  As asignatura from docentes d 
		JOIN asignaturas a on d.cod_asignatura = a.codigo
		Where d.id = @id AND d.estado = 'Activo'
	END
GO
---Crear Docentes
GO
CREATE PROC sp_crearDoc(
@codigo varchar(30),
@nombre varchar(45),
@apellido varchar(45),
@cod_asignatura varchar(30)
)
AS
	BEGIN
		Insert into docentes(codigo, nombre, apellido,cod_asignatura)
		Values(@codigo, @nombre, @apellido, @cod_asignatura)
	END
GO
---Actualizar Docentes
GO
CREATE PROC sp_ActualiarDoc(
@id int,
@codigo varchar(30),
@nombre varchar(45),
@apellido varchar(45),
@cod_asignatura varchar(30)
)
AS
	BEGIN
		UPDATE docentes SET codigo = @codigo, nombre = @nombre, 
		apellido = @apellido, cod_asignatura = @cod_asignatura
		Where id = @id
	END
GO
---Eliminar Docentes
GO
CREATE PROC sp_EliminarDoc(
@id int
)
AS
	BEGIN
		UPDATE docentes SET estado = 'inactivo'
		Where id = @id
	END
GO
---Estudiantes
--- mostrar Estudiantes
GO
Create PROC sp_mostrarEstu
AS
	BEGIN
		Select e.id, e.codigo, e.nombre, e.apellidos, e.semestre, e.carrera, e.estado, a.nombre AS asignatura 
		from estudiantes e 
		JOIN asignaturas a on e.cod_asignatura = a.codigo
		Where e.estado = 'Activo'
	END
GO
---Mostrar Estudiantes por ID
GO
CREATE PROC sp_mostrarEstuXid(
@id int
)
AS
	BEGIN
		Select e.id, e.codigo, e.nombre, e.apellidos, e.semestre, e.carrera, e.estado, a.nombre AS asignatura 
		from estudiantes e 
		JOIN asignaturas a on e.cod_asignatura = a.codigo
		Where e.id = @id AND e.estado = 'Activo'
	END
GO
---Crear Estudiantes
GO
CREATE PROC sp_crearEstu(
@codigo varchar(30),
@nombre varchar(45),
@apellidos varchar(45),
@semestre varchar(45),
@carrera varchar(45),
@cod_asignatura varchar(30)
)
AS
	BEGIN
		Insert into estudiantes(codigo, nombre, apellidos, semestre, carrera, cod_asignatura)
		Values(@codigo, @nombre, @apellidos, @semestre, @carrera, @cod_asignatura)
	END
GO
---Actualizar Estudiantes
GO
CREATE PROC sp_ActualiarEstu(
@id int,
@codigo varchar(30),
@nombre varchar(45),
@apellidos varchar(45),
@semestre varchar(45),
@carrera varchar(45),
@cod_asignatura varchar(30)
)
AS
	BEGIN
		UPDATE estudiantes SET codigo = @codigo, nombre = @nombre, 
		apellidos = @apellidos, semestre = @semestre,
		carrera = @carrera, cod_asignatura = @cod_asignatura
		Where id = @id
	END
GO
---Eliminar Estudiantes
GO
CREATE PROC sp_EliminarEstu(
@id int
)
AS
	BEGIN
		UPDATE estudiantes SET estado = 'inactivo'
		Where id = @id
	END
GO
---Record_Academico
--- mostrar Record_Academico
GO
CREATE PROC sp_mostrarRecord
AS
	BEGIN
		Select r.id, r.codigo, r.fecha, r.periodo, r.nota1, r.nota2, r.promedio, r.estado, 
		CONCAT(e.nombre, ' ' ,e.apellidos) AS estudiante, CONCAT(d.nombre, ' ' ,d.apellido) AS docente
		from Record_Academico r
		JOIN estudiantes e on r.cod_estudiante = e.codigo
		JOIN docentes d on r.cod_docente = d.codigo
		Where r.estado = 'Activo'
	END
GO
---Mostrar Estudiantes por ID
GO
CREATE PROC sp_mostrarRecordXid(
@id int
)
AS
	BEGIN
		Select r.id, r.codigo, r.fecha, r.periodo, r.nota1, r.nota2, r.promedio, r.estado, 
		CONCAT(e.nombre, ' ' ,e.apellidos) AS estudiante, CONCAT(d.nombre, ' ' ,d.apellido) AS docente
		from Record_Academico r
		JOIN estudiantes e on r.cod_estudiante = e.codigo
		JOIN docentes d on r.cod_docente = d.codigo
		Where r.id = @id AND r.estado = 'Activo'
	END
GO
---Crear Record_Academico
GO
CREATE PROC sp_crearRecord(
@codigo varchar(30),
@periodo varchar(15),
@nota1 decimal(3,2),
@nota2 decimal(3,2),
@cod_estudiante varchar(30),
@cod_docente varchar(30)
)
AS
	BEGIN
		Insert into Record_Academico(codigo, periodo, nota1, nota2, cod_estudiante, cod_docente)
		Values(@codigo, @periodo, @nota1, @nota2, @cod_estudiante, @cod_docente)
	END
GO
---Actualizar Record_Academico
GO
CREATE PROC sp_ActualiarRecord(
@id int,
@codigo varchar(30),
@periodo varchar(15),
@nota1 decimal(3,2),
@nota2 decimal(3,2),
@cod_estudiante varchar(30),
@cod_docente varchar(30)
)
AS
	BEGIN
		UPDATE Record_Academico SET codigo = @codigo, periodo = @periodo, nota1 = @nota1,
		nota2 = @nota2, cod_estudiante = @cod_estudiante, cod_docente = @cod_docente 
		Where id = @id
	END
GO
---Eliminar Record_Academico
GO
CREATE PROC sp_EliminarRecord(
@id int
)
AS
	BEGIN
		UPDATE Record_Academico SET estado = 'inactivo'
		Where id = @id
	END
GO

