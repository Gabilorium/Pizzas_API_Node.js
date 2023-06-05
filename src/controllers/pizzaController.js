import {Router} from 'express';
import PizzaService from '../services/pizzas-services.js';

const PizzaRouter = Router();
const svc = new PizzaService();

PizzaRouter.get('/GetAll/', async (req,res) =>{
    
    let top         = req.query.top
    let orderField  = req.query.orderField
    let sortOrder   = req.query.sortOrder
    const listadoPizzas = await svc.GetAll((top == undefined ? null : top),(orderField == undefined ? null : orderField),(sortOrder == undefined ? null : sortOrder))
    
    return res.status(200).json(listadoPizzas);
})


PizzaRouter.get('/GetById/:id', async (req,res) =>{
    let respuesta;
    const pizzaXID = await svc.GetByID(req.params.id);
    if (pizzaXID != null) {
        respuesta = res.status(200).json(pizzaXID);
    }else{
        respuesta = res.status(404).send("Esta pizza no esxiste");
    }
    return respuesta
})



PizzaRouter.delete('/Delete/:id', async function(req,res) {
    
    let id = req.params.id
    const pizza = await svc.Delete(id);

    return res.status(200).json(pizza);
})


PizzaRouter.post('/Insert', async (req,res) =>{

    let body = req.body;
    const pizzaNueva = await svc.Insert(body);

    return res.status(201).json(pizzaNueva);
})

PizzaRouter.put('/Update/:id', async (req,res) =>{

    let body = req.body;
    let id = req.params.id
    const pizza = await svc.Update(id,body);

    return res.status(200).json(pizza);
})

export default PizzaRouter;