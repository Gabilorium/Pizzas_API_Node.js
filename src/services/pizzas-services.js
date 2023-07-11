import config from '../../dbconfig.js'
import sql from 'mssql'
import log from '../modules/log-helper.js';
import IngredienteXPizzaService from './ingredienteXPizza-services.js';
import CommonServices from './common-services.js';


const NOMBRE_TABLA =    'Pizzas';
const NOMBRE_SERVICE =  'PizzaService';

class PizzaService extends CommonServices{
    constructor(){
        super(NOMBRE_TABLA,NOMBRE_SERVICE)

    }

    GetAll = async (top,orderField,sortOrder,incluirIngredientes, incluirUnidades) =>{
        let returnEntity = null;
        let queryTop = 'top ' + top;
        let queryOrderField ='order by ' + orderField;
        let querySortOrder = sortOrder;
        console.log(super.GetAll(top,orderField,sortOrder));
        let svc = new IngredienteXPizzaService();
        incluirIngredientes = incluirIngredientes || false; 
        incluirUnidades = incluirUnidades || false; 

        
        let query = `SELECT ${top == null ? '' : queryTop } * FROM Pizzas ${orderField == null ? '' : queryOrderField} ${sortOrder == null ? '' : querySortOrder}`;

        try{
            console.log('Estoy en: Pizzaservice.GetAll(top,orderField,sortOrder)')
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query(query);
            returnEntity = result.recordset;
            if (incluirIngredientes || incluirUnidades) {
                if ((returnEntity != null) && (returnEntity.length > 0))
                {
                    for (let i = 0; i < returnEntity.length; i++) {
                        if ((returnEntity != null) && (incluirIngredientes))
                        {
                            returnEntity[i].Ingredientes = await svc.GetByIdPizza(returnEntity[i].Id,incluirUnidades)
                        }
                    }
                }
            }
        }
        catch (error){
            console.log(error)
            log('Error al cargar los objetos de la base de datos en GetAll():', error.message)
        }
        return returnEntity;
    }
    GetByID = async (id, incluirIngredientes, incluirUnidades) =>{
        let returnEntity = null;
        let svc = new IngredienteXPizzaService();
        incluirIngredientes = incluirIngredientes || false; 
        incluirUnidades = incluirUnidades || false;

        let query = 'SELECT * FROM Pizzas WHERE Id = @pId;'
        
        try{
            console.log('Estoy en: Pizzaservice.GetByID(id)')
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query(query);
            returnEntity = result.recordset[0];

            console.log(incluirIngredientes)
            if (incluirIngredientes || incluirUnidades) {
               
                if ((returnEntity != null) && (incluirIngredientes))
                {
                    returnEntity.Ingredientes = await svc.GetByIdPizza(returnEntity.Id,incluirUnidades)
                }

            }
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
        let query = ` 
        INSERT INTO Pizzas(Nombre,LibreGluten,Importe,Descripcion)
                    VALUES(@pNombre, @pLibreGluten, @pImporte, @pDescripcion)`
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pNombre'     , sql.NChar , pizza?.Nombre ?? '')
                                    .input('pLibreGluten', sql.Bit   , pizza?.LibreGluten ?? false)
                                    .input('pImporte'    , sql.Float , pizza?.Importe ?? 0)
                                    .input('pDescripcion', sql.NChar , pizza?.Descripcion ?? '')
                                    .query(query);
            returnEntity = result.rowsAffected;
        }
        catch (error){
            log('Error al insertar los objetos de la base de datos en Insert():'+ error)
            console.log(error)
        }
        return returnEntity;
    }
    Update = async (id, pizza) =>{
        let returnEntity = null;
        let query = ` 
                UPDATE Pizzas SET Nombre = @pNombre,
                LibreGluten = @pLibreGluten,
                Importe = @pImporte,
                Descripcion = @pDescripcion 
                WHERE ID = @pId`
        console.log('Estoy en: Pizzaservice.Update(pizza)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId'         , sql.Int   , id ?? 0)
                                    .input('pNombre'     , sql.NChar , pizza?.Nombre ?? '')
                                    .input('pLibreGluten', sql.Bit   , pizza?.LibreGluten ?? false)
                                    .input('pImporte'    , sql.Float , pizza?.Importe ?? 0)
                                    .input('pDescripcion', sql.NChar , pizza?.Descripcion ?? '')
                                    .query(query);
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
        let query = `
            Delete FROM Pizzas WHERE Id = @pId; 
            DECLARE @MAXID INT SET @MAXID = (SELECT MAX(ID) FROM Pizzas); 
            DECLARE @sql NVARCHAR(MAX) SET @sql = 'DBCC CHECKIDENT (''Pizzas'', RESEED, ' + CAST(@MAXID AS NVARCHAR(10)) + ')'  EXEC(@sql)
        `
        console.log('Estoy en: Pizzaservice.Delete(id)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query(query);
            rowsAffected = result.rowsAffected;
        }
        catch (error){
            log('Error al eliminar los objetos de la base de datos en Delete():'+ error)
            console.log(error)
        }
        return rowsAffected;
    }
}

export default PizzaService