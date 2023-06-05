// npm run server-middleware
import express from "express";
import cors    from "cors";

//
// Variables/Constantes del Modulo
//
const app  = express();
const port = 5000;                  // Puerto en donde levanta express (5000)

//
// funcion de Middleware (notar que hay un next!)
//
const horaMiddleware = function (req, res, next) {
  console.log('Middleware (Antes): ' + new Date().toISOString());

  // Ir al proximo middleware
  next();
  console.log('Middleware (Despues): ' + new Date().toISOString());
}

const agregarAlgoMiddleware = function (req, res, next) {

  // Ir al proximo middleware
  next();
}

//
// Inclusion de los Middlewares
//
app.use(cors());                    // agrego el middleware de CORS
app.use(express.json());            // agrego el middleware para parsear y comprender JSON
app.use(horaMiddleware);

// 
// Endpoints
//
app.get('/', (req, res) => {
  console.log('EndPoint app.get/: ' + new Date().toISOString());
  res.send('Respuesta del EndPoint!' + req.startDate);
})

app.get('/hola', (req, res) => {
  console.log('EndPoint app.get/hola: ' + new Date().toISOString());
  res.send('Respuesta del EndPoint!' + req.startDate);
})

//
// Levanto el servidor WEB (pongo a escuchar)
//
app.listen(port, () => {
  console.log(`"server-middleware" Listening on port ${port}`);
})
