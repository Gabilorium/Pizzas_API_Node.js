import {Router} from 'express';
import IngredienteXPizzaService from '../services/ingredienteXPizza-services.js';

const IngXPizzaRouter = Router();
let svc = new IngredienteXPizzaService();

IngXPizzaRouter.get('/GetAll/', async (req,res) =>{
    
    let top         = req.query.top
    let orderField  = req.query.orderField
    let sortOrder   = req.query.sortOrder
    const listadoIngXPizza = await svc.GetAll((top == undefined ? null : top),(orderField == undefined ? null : orderField),(sortOrder == undefined ? null : sortOrder))
    
    return res.status(200).json(listadoIngXPizza);
})

IngXPizzaRouter.get('/GetByIdPizza/:id', async (req,res) =>{
    
        let respuesta;
        const IngXPizzaXID = await svc.GetByIdPizza(req.params.id);
        if (IngXPizzaXID != null) {
            console.log(req.params.id)
            respuesta = res.status(200).json(IngXPizzaXID);
            
        }else{
            respuesta = res.status(404).send("Esta pizza no esxiste");
        }
        return respuesta
})

IngXPizzaRouter.post('/Insert', async (req,res) =>{

    let body = req.body;
    const IngXPizzaNuevo = await svc.Insert(body);

    return res.status(201).json(IngXPizzaNuevo);
})

IngXPizzaRouter.delete('/Delete/:id', async function(req,res) {
    
    let id = req.params.id
    const ingXPizza = await svc.Delete(id);

    return res.status(200).json(ingXPizza);
})

IngXPizzaRouter.put('/Update/:id', async (req,res) =>{

    let body = req.body;
    let id = req.params.id
    const pizza = await svc.Update(id,body);

    return res.status(200).json(pizza);
})
export default IngXPizzaRouter;

