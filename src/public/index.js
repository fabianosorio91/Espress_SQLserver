const express = require('express');
const app = express();
const cors = require('cors');

//Configuracion
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(
    cors({
        origin: ["http://localhost:4200"],
        credentials: true,
    })
);


//Routes
const estudiantes = require('../routes/estudiantes.route');
const docentes = require('../routes/docentes.route');
const asignaturas = require('../routes/asignaturas.route')
const record_academico = require('../routes/recordAcademico.route');

app.use('/api', [estudiantes, docentes, asignaturas, record_academico]);

//Listen
app.listen(app.get('port'), () =>{
    console.log("Server listen on port" + " " + `http://localhost:${app.get("port")}`);
});