import config from '../../dbconfig.js';
import sql from 'mssql';
import log from '../modules/log-helper.js';
import crypto from 'crypto';

const NOMBRE_SERVICES = "UsuariosService";
const NOMBRE_TABLA = "Usuarios";

class UsuariosServices{
    login = async (usuario) =>{
        let returnEntity = null;
        let token;

        console.log("HOla")
        returnEntity = await this.getByUsernamePassword(usuario.UserName,usuario.Password);
        console-log('returnEntity');        
        console-log(returnEntity);

        if (returnEntity != null) {
            token = await this.refreshTokenById(returnEntity.Id);
            if (token != null) {
                returnEntity = await this.getByUsernamePassword(usuario.UserName,usuario.Password);
            }
        }
        console.log(token);
        return returnEntity;
    }

    getByUsernamePassword = async(userName, password) =>{
        let returnEntity = null;
        
        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pUserName', sql.VarChar, userName)
                                    .input('pPassword', sql.VarChar, password)
                                    .query(`SELECT * FROM ${NOMBRE_TABLA} WHERE UserName = @pUserName and  Password = @pPassword`);
            returnEntity = result.recordset[0];
            console.log('ok polshu');
            console.log(returnEntity);

        }
        catch(error)
        {
            console.log(error);
            log('Error al obtener el username:', error.message);
        }
        return returnEntity;
    }
    
    addMinutes = (minutes, date) =>{
        date = date || new Date();

        if (typeof minutes !== 'number') {
            throw new error("Innvalid minutes argument");
        }
        if (!(date instanceof Date)) {
            throw new error("Innvalid date argument");
        }

        date.setMinutes(date.getMinutes() + minutes);
        
        return date;
    }

    refreshTokenById = async (id) =>{
        let rowsAffected = 0;
        let token = crypto.randomUUID();
        let expirationDate = this.addMinutes(15, new Date());

        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pId'                    , sql.Int       , id)
                                    .input('pToken'                 , sql.VarChar   , token)
                                    .input('pTokenExpirationDate'   , sql.VarChar   , expirationDate.toISOString())
                                    .query(` UPDATE ${NOMBRE_TABLA} SET 
                                                Token               = @pToken,
                                                TokenExpirationDate = @pTokenExpirationDate
                                                WHERE Id = @pId`);

            rowsAffected = result.rowsAffected;
            console.log(rowsAffected)
        }
        catch(error)
        {
            console.log(error);
            log('Error al refrescar el token:', error.message);
        }
        return rowsAffected;
    }

    getByToken = async(token) =>{
        let returnEntity = null;

        try{
            let pool = await sql.connect(config);
            let result = await pool.request()
                                    .input('pToken', sql.VarChar, token)
                                    .query(`SELECT * FROM ${NOMBRE_TABLA} WHERE Token = @pToken`);
            returnEntity = result.recordset[0];
        }
        catch(error)
        {
            console.log(error);
            log('Error al obtener el username:', error.message);
        }
        return returnEntity;
    }
}
export default UsuariosServices