import express from "express";
import cors    from "cors";
import router from "./src/controllers/pizzaController.js";

const app  = express();
const port = 3000;

//MidleWares
app.use(cors());
app.use(express.json());
app.use(express.static('FrontEnd'));

//Endpoint
app.use("/api/pizzas", router);

//Donde se levanto el sitio
app.listen(port, () =>{
    console.log(`server-router listening on port ${port}`)
})