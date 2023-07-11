import config from '../../dbconfig.js'
import sql from 'mssql'
import log from '../modules/log-helper.js';

class CommonServices{

    constructor(nombreTabla,nombreService){
        this.nombreTabla = nombreTabla;
        this.nombreService = nombreService;
    }

    getNombreTabla(){
        return this.nombreTabla;
    }

    getNombreService(){
        return this.nombreTabla;
    }

    GetAll = async (top,orderField,sortOrder) =>{
        let returnEntity = null;
        let queryTop = 'top ' + top;
        let queryOrderField ='order by ' + orderField;
        let querySortOrder = sortOrder;
        
        let query = `SELECT ${top == null ? '' : queryTop } * FROM ${this.getNombreTabla()} ${orderField == null ? '' : queryOrderField} ${sortOrder == null ? '' : querySortOrder}`;

        try{
            console.log(`Estoy en: ${this.getNombreService()}=>GetAll()`)
            let pool = await sql.connect(config);
            let result = await pool.request().query(query);
            returnEntity = result.recordset;
        }
        catch (error){
            console.log(error)
            log(`Error al cargar los objetos de la base de datos en ${this.getNombreService()}GetAll():`, error.message)
            throw error;
        }
        return returnEntity;
    }

    GetByID = async (id) =>{
        let returnEntity = null;
        let query = `SELECT * FROM ${this.getNombreTabla()} WHERE Id = @pId;`
        try{
            console.log(`Estoy en: ${this.getNombreService()} => GetByID(id)`)
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query(query);
            returnEntity = result.recordset[0];
            console.log(returnEntity)
        }
        catch (error){
            log(`Error al cargar los objetos de la base de en: ${this.getNombreService()} => GetByID(id)`+ error)
            console.log(error)
            throw error
        }
        //console.log(returnEntity)
        return returnEntity;
    }

    Delete = async (id) =>{
        let rowsAffected = 0;
        let query = `
            Delete FROM ${this.getNombreTabla()} WHERE Id = @pId; 
            DECLARE @MAXID INT SET @MAXID = (SELECT MAX(ID) FROM Ingredientes); 
            DECLARE @sql NVARCHAR(MAX) SET @sql = 'DBCC CHECKIDENT (''Ingredientes'', RESEED, ' + CAST(@MAXID AS NVARCHAR(10)) + ')'  EXEC(@sql)
        `
        console.log(`Estoy en: ${this.getNombreService()} => Delete(id)`)
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId', sql.Int, id)
                                    .query(query);
            rowsAffected = result.rowsAffected;
        }
        catch (error){
            log(`Error al eliminar los objetos de la base de datos en ${this.getNombreService()} => Delete():`+ error)
            console.log(error)
        }
        return rowsAffected;
    }
}

export default CommonServices;