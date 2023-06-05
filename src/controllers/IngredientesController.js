import {Router} from 'express';
import IngredienteService from '../services/ingredientes-services.js';

const IngredienteRouter = Router();
const svc = new IngredienteService();

IngredienteRouter.get('/GetAll/', async (req,res) =>{
    
    let top         = req.query.top
    let orderField  = req.query.orderField
    let sortOrder   = req.query.sortOrder
    const listadoIngrediente = await svc.GetAll((top == undefined ? null : top),(orderField == undefined ? null : orderField),(sortOrder == undefined ? null : sortOrder))
    
    return res.status(200).json(listadoIngrediente);
})

IngredienteRouter.get('/GetById/:id', async (req,res) =>{
    let respuesta;
    const ingredienteXId = await svc.GetByID(req.params.id);
    if (ingredienteXId != null) {
        respuesta = res.status(200).json(ingredienteXId);
    }else{
        respuesta = res.status(404).send("Esta pizza no esxiste");
    }
    return respuesta
})



IngredienteRouter.delete('/Delete/:id', async function(req,res) {
    
    let id = req.params.id
    const ingrediente = await svc.Delete(id);

    return res.status(200).json(ingrediente);
})


IngredienteRouter.post('/Insert/', async (req,res) =>{

    let body = req.body;
    const ingredienteNuevo = await svc.Insert(body);

    return res.status(201).json(ingredienteNuevo);
})

IngredienteRouter.put('/Update/:id', async (req,res) =>{

    let body = req.body;
    let id = req.params.id
    const ingrediente = await svc.Update(id,body);

    return res.status(200).json(ingrediente);
})

export default IngredienteRouter;