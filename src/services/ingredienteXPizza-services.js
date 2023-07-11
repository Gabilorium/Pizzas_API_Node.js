import config from '../../dbconfig.js'
import sql from 'mssql'
import log from '../modules/log-helper.js';
import UnidadesService from './unidades-services.js';

const NOMBRE_TABLA =    'Ingredientes';
const NOMBRE_SERVICE =  'PizzaService';

class IngredienteXPizzaService {
    
    GetAll = async (top,orderField,sortOrder) =>{
        let returnEntity = null;
        
        let queryTop = 'top ' + top;
        let queryOrderField ='order by ' + orderField;
        let querySortOrder = sortOrder;
        let query = `SELECT ${top == null ? '' : queryTop } * FROM Ingredientes
                    INNER JOIN IngredientesXPizzas on IngredientesXPizzas.IdIngrediente = Ingredientes.Id
                    INNER JOIN Unidades on IngredientesXPizzas.IdUnidad = Unidades.ID
                    ${orderField == null ? '' : queryOrderField} ${sortOrder == null ? '' : querySortOrder} `

        console.log('Estoy en: IngredienteXPizzaService.GetAll()')

        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .query(query);
            returnEntity = result.recordset;
        }
        catch (error){
            console.log(error)
            log('Error al cargar los objetos de la base de datos en GetAll():', error.message)
        }
        return returnEntity;
    }

    GetByIdPizza = async  (id, incluirUnidades) =>{
        let returnEntity = null;
        let svc = new UnidadesService();
        incluirUnidades = incluirUnidades || false;

        let query= `
        SELECT 
                IngredientesXPizzas.Id          AS Id,
                Ingredientes.Id                 AS IdIngrediente,
                Ingredientes.Nombre             AS Nombre,
                IngredientesXPizzas.Cantidad    AS Cantidad,
                Unidades.Id                     AS IdUnidad,
                Unidades.Nombre                 AS Unidad
        From Ingredientes
        INNER JOIN IngredientesXPizzas on IngredientesXPizzas.IdIngrediente = Ingredientes.Id
        INNER JOIN Unidades on IngredientesXPizzas.IdUnidad = Unidades.ID
        Where IngredientesXPizzas.IdPizza = @pid
        `;
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query(query);
            returnEntity = result.recordset;
            if (incluirUnidades) {
                if ((returnEntity != null) && (returnEntity.length > 0))
                {
                    for (let i = 0; i < returnEntity.length; i++) {
                        if ((returnEntity != null) && (incluirUnidades))
                        {
                            returnEntity[i].Unidades = await svc.GetByID(returnEntity[i].Id)
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

    Insert = async (IngxPizza) =>{
        let returnEntity = null;
        let query = ` 
        INSERT INTO IngredientesXPizzas(IdPizza,IdIngrediente,Cantidad,IdUnidad)
                    VALUES(@pIdPizza, @pIdIngrediente, @pCantidad, @pIdUnidad)`;
        console.log("Insert")
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pIdPizza'     , sql.Int , IngxPizza?.IdPizza ?? 0)
                                    .input('pIdIngrediente', sql.Int   , IngxPizza?.IdIngrediente ?? 0)
                                    .input('pCantidad'    , sql.Int , IngxPizza?.Cantidad ?? 0)
                                    .input('pIdUnidad', sql.Int , IngxPizza?.IdUnidad ?? 0)
                                    .query(query);
            returnEntity = result.rowsAffected;
        }
        catch (error){
            log('Error al insertar los objetos de la base de datos en Insert():'+ error)
            console.log(error)
        }
        return returnEntity;
    }

    Delete = async (id) =>{
        let rowsAffected = 0;
        let query = `
            Delete FROM IngredientesXPizzas WHERE Id = @pId; 
            DECLARE @MAXID INT SET @MAXID = (SELECT MAX(ID) FROM IngredientesXPizzas); 
            DECLARE @sql NVARCHAR(MAX) SET @sql = 'DBCC CHECKIDENT (''IngredientesXPizzas'', RESEED, ' + CAST(@MAXID AS NVARCHAR(10)) + ')'  EXEC(@sql)
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

    Update = async (id,IngxPizza) =>{
        let returnEntity = null;
        let query = ` 
                UPDATE IngredientesXPizzas SET 
                IdPizza         = @pIdPizza,
                IdIngrediente   = @pIdIngrediente,
                Cantidad        = @pCantidad,
                IdUnidad        = @pIdUnidad 
                WHERE ID        = @pId`
        console.log('Estoy en: Pizzaservice.Update(pizza)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId'         , sql.Int   , id ?? 0)
                                    .input('pIdPizza'     , sql.Int , IngxPizza?.IdPizza ?? 0)
                                    .input('pIdIngrediente', sql.Int   , IngxPizza?.IdIngrediente ?? 0)
                                    .input('pCantidad'    , sql.Int , IngxPizza?.Cantidad ?? 0)
                                    .input('pIdUnidad', sql.Int , IngxPizza?.IdUnidad ?? 0)
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
}

export default IngredienteXPizzaService;