import config from '../../dbconfig.js'
import sql from 'mssql'
import log from '../modules/log-helper.js';

class UnidadesService {
    GetAll = async (top,orderField,sortOrder) =>{
        let returnEntity = null;
        let queryTop = 'top ' + top;
        let queryOrderField ='order by ' + orderField;
        let querySortOrder = sortOrder;
        
        let query = `SELECT ${top == null ? '' : queryTop } * FROM Unidades ${orderField == null ? '' : queryOrderField} ${sortOrder == null ? '' : querySortOrder}`;

        try{
            console.log('Estoy en: UnidadesService.GetAll(top,orderField,sortOrder)')
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

    GetByID = async (id) =>{
        let returnEntity = null;
        let query = 'SELECT * FROM Unidades WHERE Id = @pId;'
        try{
            console.log('Estoy en: UnidadesService.GetByID(id)')
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query(query);
            returnEntity = result.recordset;
        }
        catch (error){
            log('Error al cargar los objetos de la base de datos en GetById():'+ error)
            console.log(error)
        }
        //console.log(returnEntity)
        return returnEntity;
        
    }

    Insert = async (unidad) =>{
        let returnEntity = null;
        let query = ` 
        INSERT INTO Unidades(Nombre)
                    VALUES(@pNombre)`
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pNombre'     , sql.NChar , unidad?.Nombre ?? '')
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
            Delete FROM Unidades WHERE Id = @pId; 
            DECLARE @MAXID INT SET @MAXID = (SELECT MAX(ID) FROM Unidades); 
            DECLARE @sql NVARCHAR(MAX) SET @sql = 'DBCC CHECKIDENT (''Unidades'', RESEED, ' + CAST(@MAXID AS NVARCHAR(10)) + ')'  EXEC(@sql)
        `
        console.log('Estoy en: UnidadesService.Delete(id)')
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

    Update = async (id, unidad) =>{
        let returnEntity = null;
        let query = ` 
                UPDATE Unidades SET Nombre = @pNombre
                WHERE ID = @pId`
        console.log('Estoy en: UnidadesService.Update(unidad)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId'         , sql.Int   , id ?? 0)
                                    .input('pNombre'     , sql.NChar , unidad?.Nombre ?? '')
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
export default UnidadesService