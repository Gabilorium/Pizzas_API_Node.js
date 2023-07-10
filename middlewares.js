import UsuariosServices from "./src/services/usuarios-services.js"
import log from "./src/modules/log-helper.js"

/*const apiKeyMiddleware = function (req, res, next){  
    const apiKey = req.headers['apikey'];

    if (apiKey && apiKey === '123456789'){
      next(); // Continúa con el siguiente middleware
    } 
    else{
      res.status(401).send('Unauthorized, es necesario una ApiKey válida.'); // Devuelve un código de estado 401 y un mensaje de error
    }
} 

function CreatedByMiddleware(req, res, next) {
  const nombreAlumno = "Tu Nombre"; // Reemplaza con tu nombre

  // Agrega el encabezado "CreatedBy" al objeto de respuesta
  res.setHeader("CreatedBy", nombreAlumno);

  next(); // Continúa con el siguiente middleware
}

const tiempoDeEjecucionMiddleware = function (req, res, next) {
  const inicio = performance.now(); // Obtiene el tiempo de inicio en milisegundos

  // Sobrescribe la función 'res.end' para calcular el tiempo transcurrido y mostrarlo por consola
  const antiguoResEnd = res.end;
  res.end = function () {
    const fin = performance.now(); // Obtiene el tiempo de fin en milisegundos
    const tiempoTranscurrido = fin - inicio; // Calcula el tiempo transcurrido en milisegundos
    console.log(`Tiempo de ejecución: ${tiempoTranscurrido} ms`);

    // Llama a la función 'res.end' original para finalizar la respuesta
    return antiguoResEnd.apply(this, arguments);
  };

  next(); // Llama a la siguiente función de middleware
}*/

class AutenticationMiddleware {
  RequiereAutenticacion = async function (req,res,next){
    let token;
    let usuario;
    let currentDate = new Date();
    let tokenExpirationDate = null;
    
    if (req.path.toLowerCase().startsWith("/front/")) return next();
    if (req.path.toLowerCase().startsWith("/api/usuarios/login")) return next();
    if (req.path.toLowerCase().startsWith("/api/ingxpizzas/")) return next();
    if (req.path.toLowerCase().startsWith("/api/ingredientes/")) return next();
    if (req.path.toLowerCase().startsWith("/api/unidades/")) return next();
 
    
    token = req.get('token');
    
    if((token == null)||(token == 'undefined')){
      res.status(401).send('401 Unauthorized, invalid token')
    }else{
      let svc = new UsuariosServices();
      usuario = await svc.getByToken(token);
      if(usuario != null){
        tokenExpirationDate = new Date(usuario.TokenExpirationDate);
        if(currentDate < tokenExpirationDate){
          next();
        }else{
          req.status(401).send('401 Unauthorized, token expired')
        }
      }else{
        res.status(401).send("401 Unauthorizer, invalid token/user")
      } 
    }
  }
}
export default AutenticationMiddleware;