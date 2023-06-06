import express from "express";
import cors    from "cors";
import PizzaRouter from "./src/controllers/pizzaController.js";
import IngXPizzaRouter from "./src/controllers/pizzaXIngredienteController.js";
import IngredienteRouter from "./src/controllers/IngredientesController.js";
import UnidadesRouter from "./src/controllers/UnidadesController.js";
import {apiKeyMiddleware, tiempoDeEjecucionMiddleware, CreatedByMiddleware} from "./server-middleware.js";

const app  = express();
const port = 3000;

//MidleWares
app.use(cors());
app.use(express.json());
app.use(apiKeyMiddleware);
app.use(tiempoDeEjecucionMiddleware);
app.use(CreatedByMiddleware)
app.use(express.static('FrontEnd'));

//Endpoint
app.use("/Pizzas/", PizzaRouter);
app.use("/IngXPizzas/",IngXPizzaRouter)
app.use("/Ingredientes/",IngredienteRouter)
app.use("/Unidades/",UnidadesRouter)

//Donde se levanto el sitio
app.listen(port, () =>{
    console.log(`server-router listening on port ${port}`)
})