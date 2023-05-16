import config from '../../dbconfig.js'
import sql from 'mssql'
import log from '../modules/log-helper.js';

class PizzaSerice {
    GetAll = async (top,orderField,sortOrder) =>{
        let returnEntity = null;
        
        try{
            console.log('Estoy en: Pizzaservice.GetAll(top,orderField,sortOrder)')
            let queryTop = 'top ' + top;
            let queryOrderField ='order by ' + orderField;
            let querySortOrder = sortOrder;
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query(`SELECT ${top == null ? '' : queryTop } * FROM Pizzas ${orderField == null ? '' : queryOrderField} ${sortOrder == null ? '' : querySortOrder}`);
            returnEntity = result.recordset;
        }
        catch (error){
            log('Error al cargar los objetos de la base de datos en GetAll():'+ error)
            console.log(error)
        }
        return returnEntity;
    }
    GetByID = async (id) =>{
        let returnEntity = null;
        
        try{
            console.log('Estoy en: Pizzaservice.GetByID(id)')
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Pizzas WHERE Id = @pId;');
            returnEntity = result.recordset[0];
            console.log(returnEntity)
        }
        catch (error){
            log('Error al cargar los objetos de la base de datos en GetById():'+ error)
            console.log(error)
        }
        //console.log(returnEntity)
        return returnEntity;
        
    }
    Insert = async (pizza) =>{
        let returnEntity = null;
        console.log('Estoy en: Pizzaservice.Insert(pizza)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pNombre'     , sql.NChar , pizza?.Nombre ?? '')
                                    .input('pLibreGluten', sql.Bit   , pizza?.LibreGluten ?? false)
                                    .input('pImporte'    , sql.Float , pizza?.Importe ?? 0)
                                    .input('pDescripcion', sql.NChar , pizza?.Descripcion ?? '')
                                    .query('INSERT INTO Pizzas(Nombre,LibreGluten,Importe,Descripcion)VALUES(@pNombre, @pLibreGluten, @pImporte, @pDescripcion)');
            returnEntity = result.rowsAffected;
        }
        catch (error){
            log('Error al insertar los objetos de la base de datos en Insert():'+ error)
            console.log(error)
        }
        return returnEntity;
    }
    Update = async (pizza) =>{
        let returnEntity = null;
        console.log('Estoy en: Pizzaservice.Update(pizza)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId'         , sql.Int   , pizza?.Id ?? 0)
                                    .input('pNombre'     , sql.NChar , pizza?.Nombre ?? '')
                                    .input('pLibreGluten', sql.Bit   , pizza?.LibreGluten ?? false)
                                    .input('pImporte'    , sql.Float , pizza?.Importe ?? 0)
                                    .input('pDescripcion', sql.NChar , pizza?.Descripcion ?? '')
                                    .query('UPDATE Pizzas SET Nombre = @pNombre,LibreGluten = @pLibreGluten,Importe = @pImporte,Descripcion = @pDescripcion WHERE ID = @pId');
            returnEntity = result.rowsAffected;
            console.log(returnEntity)
        }
        catch (error){
            log('Error al actualizar los objetos de la base de datos en Update():'+ error)
            console.log(error)
        }
        
        return returnEntity;
    }
    Delete = async (id) =>{
        let rowsAffected = 0;
        console.log('Estoy en: Pizzaservice.Delete(id)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('Delete FROM Pizzas WHERE Id = @pId');
            rowsAffected = result.rowsAffected;
        }
        catch (error){
            log('Error al eliminar los objetos de la base de datos en Delete():'+ error)
            console.log(error)
        }
        return rowsAffected;
    }
}

export default PizzaSerice