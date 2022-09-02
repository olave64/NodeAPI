const sql = require('mssql');
const { response, request } = require('express');
//_____________________GET_________________________\\


const getProductos = async (req=request, res=response)=>{
    try {
        const result = await sql.query("USE [examen] DECLARE	@return_value int EXEC	@return_value = [dbo].[consultaProductos] SELECT	'Return Value' = @return_value")
        const mostrar = result.recordset;     
        res.json(mostrar)
         
        
        
    } catch (error) {
        console.log(error);
        
    }
            
}


//______________________GET______________________________\\


// ----------------------CONSULTAR TODOS LOS PRODUCTOS------------------------

 /*const getProductos = async (req = request, res = response) =>{
    try {
        
        const listaProducto = await sql.query('select * from Productos')
        const misProductos = listaProducto.recordset;
        res.json(
            misProductos
        )
        
        
    } catch (error) {
        res.json({
            ok: false,
            msg: 'error en la transaccion'
        });
    }
}*/


//-----------------INSERTAR UN NUEVO PRODUCTO---------------------------------
const insertarProducto = async(req= request, res= response)=>{
    console.log('entrando a insertar producto')
    
    const nombre = req.param('nombreP');
    const cantidad = req.param('cantidadP');
    const tipo = req.param('tipoP');
    
    
    console.log(nombre, cantidad, tipo)
    try {
       const insertar =  await sql.query("insert into Productos (Nombre,Cantidad,Tipo) values ( '"+nombre+"',"+cantidad+",'"+tipo+"'); SELECT SCOPE_IDENTITY() AS [ID]")
       const  ID = insertar.recordset[0].ID
       res.json({
         Id:ID,
         Nombre:nombre,
         Cantidad:cantidad,
         Tipo:tipo
       })
        
       
    } catch (error) {
        console.log(error);
     res.json({
        ok: false,
        msg: 'Consultar log en insertar '
     })
    }
   
}

// ---------------------ACTUALIZAR PRODUCTO--------------------------------
const actualizarProducto = async (req = request, res = response)=>{
    console.log('tratando de actualizar')
    const ID = req.param('id');
    
    console.log('producto verificado')
    const nombre = req.param('nombreP');
    const cantidad = req.param('cantidadP');
    const tipo = req.param('tipoP');
    try {

        const actualizar = await sql.query("UPDATE Productos SET Nombre = '"+nombre+"', Cantidad = "+cantidad+", Tipo = '"+tipo+"' where ID = "+ID+"") 
        console.log(actualizar)
        res.json({
            Id:ID,
            Nombre:nombre,
            Cantidad:cantidad,
            Tipo:tipo
        })
    } catch (error) {
        console.log(error);
        }
    }
    
//-----------------------COMPLETADA-------------------------------------\\

const eliminarProducto = async (req = request, res = response)=>{
    const myId = req.param('id');
    console.log(myId)
    try {
        const eliminar = await sql.query("DELETE FROM Productos WHERE ID = "+myId+" ")
        res.json({
            ok: true,
            msg: eliminar
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg: 'consulte log eliminar'
        })
    }
}

const verificarExiste =  async(req = request, res = response, next)=>{
    
    console.log('verificando')
    const myId = req.param('id');
    console.log(myId)
    try {
        console.log('verificado-------------------')
        const consulta = await sql.query("SELECT ID from Productos WHERE ID = "+myId+"");
        console.log(consulta.recordset.length)
        if (consulta.recordset.length === 0) {
            res.json({
                ok: true,
                msg: 'articulo no encontrado'
            })

        }
        console.log('articulo encontrado')
        next();
        
        
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            msg: 'hay un error en la verificacion'
        })
    }
    
}
module.exports = {eliminarProducto,actualizarProducto, insertarProducto, getProductos,verificarExiste}