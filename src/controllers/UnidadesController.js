import {Router} from 'express';
import UnidadesService from '../services/unidades-services.js';

const UnidadesRouter = Router();
const svc = new UnidadesService();

UnidadesRouter.get('/GetAll/', async (req,res) =>{
    
    let top         = req.query.top
    let orderField  = req.query.orderField
    let sortOrder   = req.query.sortOrder
    const listadoUnidad = await svc.GetAll((top == undefined ? null : top),(orderField == undefined ? null : orderField),(sortOrder == undefined ? null : sortOrder))
    
    return res.status(200).json(listadoUnidad);
})

UnidadesRouter.get('/GetById/:id', async (req,res) =>{
    let respuesta;
    const unidadXId = await svc.GetByID(req.params.id);
    if (unidadXId != null) {
        respuesta = res.status(200).json(unidadXId);
    }else{
        respuesta = res.status(404).send("Esta pizza no esxiste");
    }
    return respuesta
})



UnidadesRouter.delete('/Delete/:id', async function(req,res) {
    
    let id = req.params.id
    const unidad = await svc.Delete(id);

    return res.status(200).json(unidad);
})


UnidadesRouter.post('/Insert/', async (req,res) =>{

    let body = req.body;
    const unidadNueva = await svc.Insert(body);

    return res.status(201).json(unidadNueva);
})

UnidadesRouter.put('/Update/:id', async (req,res) =>{

    let body = req.body;
    let id = req.params.id
    const unidad = await svc.Update(id,body);

    return res.status(200).json(unidad);
})

export default UnidadesRouter;