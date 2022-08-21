const config = {
    "user": 'emberth',
    "password": 'dante1125',
    "server": 'localhost',
    "database": 'examen',
    "port": 1433, // make sure to change port
    "dialect": "mssql",
    "dialectOptions": {
        "instanceName": "OLAVE"
    },
    "options":{
      encrypt: true, // for azure
      trustServerCertificate: true
    }
    };
  
  module.exports = config;