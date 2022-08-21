const sql = require('mssql');
const config = require('../controller/config')

const dbConnect = async () =>{
    try {
        const conexion = await sql.connect(config);
        
        console.log('conexion exitosa a base DB');
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect