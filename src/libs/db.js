const sql = require('mssql');

const sqlConfig = {
    user: 'sa',
    password: 'siesa123456',
    database: 'escuela',
    server: 'P553D46',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustServerCertificate: true 
    }
  };

  const db = async () => {
    try {
        const conn =  await sql.connect(sqlConfig);
        console.log('connection successfully');
        return conn;
    } catch (error) {
        console.log(error);
    }
  };
  
  module.exports = {
      db
  }