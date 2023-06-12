const apiKeyMiddleware = function (req, res, next){  
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
}


export {apiKeyMiddleware, tiempoDeEjecucionMiddleware, CreatedByMiddleware}