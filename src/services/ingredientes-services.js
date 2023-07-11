import config from '../../dbconfig.js'
import sql from 'mssql'
import log from '../modules/log-helper.js';
import CommonServices from './common-services.js';

const NOMBRE_TABLA =    'Ingredientes';
const NOMBRE_SERVICE =  'IngredienteService';

class IngredienteService extends CommonServices{


    constructor(){
        super(NOMBRE_TABLA,NOMBRE_SERVICE);
        //console.log("Hola")
    }


    Insert = async (ingrediente) =>{
        let returnEntity = null;
        let query = ` 
        INSERT INTO Ingredientes(Nombre)
                    VALUES(@pNombre)`
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pNombre'     , sql.NChar , ingrediente?.Nombre ?? '')
                                    .query(query);
            returnEntity = result.rowsAffected;
        }
        catch (error){
            log('Error al insertar los objetos de la base de datos en Insert():'+ error)
            console.log(error)
        }
        return returnEntity;
    }

    Update = async (id, ingrediente) =>{
        let returnEntity = null;
        let query = ` 
                UPDATE Ingredientes SET Nombre = @pNombre,
                WHERE ID = @pId`
        console.log('Estoy en: IngredienteService.Update(ingrediente)')
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId'         , sql.Int   , id ?? 0)
                                    .input('pNombre'     , sql.NChar , ingrediente?.Nombre ?? '')
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
export default IngredienteService