import express from "express";
import cors    from "cors";
import PizzaRouter from "./src/controllers/pizzaController.js";
import IngXPizzaRouter from "./src/controllers/pizzaXIngredienteController.js";
import IngredienteRouter from "./src/controllers/IngredientesController.js";
import UnidadesRouter from "./src/controllers/UnidadesController.js";
import UsuariosRouter from "./src/controllers/UsuariosController.js";
import AutenticationMiddleware from "./middlewares.js";

const app  = express();
const port = 5000;
const middle = new AutenticationMiddleware();

//MidleWares
app.use(cors());
app.use(express.json());
/*app.use(apiKeyMiddleware);
app.use(tiempoDeEjecucionMiddleware);
app.use(CreatedByMiddleware)*/
//app.use(middle.RequiereAutenticacion);
app.use('/Front', express.static('FrontEnd'));

//Endpoint
app.use("/api/Pizzas/", PizzaRouter);
app.use("/api/IngXPizzas/",IngXPizzaRouter)
app.use("/api/Ingredientes/",IngredienteRouter)
app.use("/api/Unidades/",UnidadesRouter)
app.use("/api/Usuarios/",UsuariosRouter)

//Donde se levanto el sitio
app.listen(port, () =>{
    console.log(`server-router listening on port ${port}`)
})