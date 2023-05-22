import fs from 'fs';
const LOG_FILE_PATH = 'logs.txt';

export default function log(message, objetoError) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp}: ${message} - ${objetoError}\n`;

  fs.appendFile(LOG_FILE_PATH, logMessage, (err) => {
    if (err) { 
      console.error('Error al escribir en el archivo de registro de log:', err );
      throw err;
    }
  });

}


/*function error (texto){

    fs.writeFile('error.txt',texto, (err) =>{
        if (err) throw err;
    });
}*/

