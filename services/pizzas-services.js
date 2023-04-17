import config from '../../dbconfig.js'
import sql from 'mssql'

class PizzaSerice {
    GetAll = async () =>{
        let returnEntity = null;
        console.log('Estoy en: Pizzaservice.GetAll()')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query('SELECT * FROM Pizzas');
            returnEntity = result.recordset[0];
        }
        catch (error){
            console.log(error)
        }
        return returnEntity;
    }
    GetByID = async (id) =>{
        let returnEntity = null;
        console.log('Estoy en: Pizzaservice.GetByID(id)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query('SELECT * FROM Pizzas WHERE Id = @pId');
            returnEntity = result.recordset[0][0];
        }
        catch (error){
            console.log(error)
        }
        return returnEntity;
        
    }
    Insert = async (pizza) =>{
        let returnEntity = null;
        console.log('Estoy en: Pizzaservice.Insert(pizza)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pNombre'     , sql.NChar , pizza?.nombre ?? '')
                                    .input('plibreGluten', sql.Bit   , pizza?.libreGluten ?? false)
                                    .input('pimporte'    , sql.Float , pizza?.importe ?? 0)
                                    .input('pdescripcion', sql.NChar , pizza?.descripcion ?? '')
                                    .query('INSERT INTO Pizzas(Nombre,LibreGluten,Importe,Descripcion)VALUES(@pNombre,@plibreGluten,@pimporte, @pdescripcion');
            returnEntity = result.recordset[0][0];
        }
        catch (error){
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
                                    .input('pId'         , sql.Int   , pizza?.id ?? 0)
                                    .input('pNombre'     , sql.NChar , pizza?.nombre ?? '')
                                    .input('plibreGluten', sql.Bit   , pizza?.libreGluten ?? false)
                                    .input('pimporte'    , sql.Float , pizza?.importe ?? 0)
                                    .input('pdescripcion', sql.NChar , pizza?.descripcion ?? '')
                                    .query('UPDATE Pizzas SET Nombre = @pNombre,LibreGluten = @plibreGluten,Importe = @pimporte,Descripcion = @pdescripcion WHERE ID = @pId');
            returnEntity = result.recordset[0][0];
        }
        catch (error){
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
                                    .query('Delete * FROM Pizzas WHERE Id = @pId');
            rowsAffected = result.rowsAffected;
        }
        catch (error){
            console.log(error)
        }
        return returnEntity;
    }
}

export default PizzaSerice