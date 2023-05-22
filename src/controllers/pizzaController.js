import {Router} from 'express';
import PizzaService from '../services/pizzas-services.js';
import log from './../modules/log-helper.js';

const router = Router();
const svc = new PizzaService();

router.get('/GetAll/', async (req,res) =>{
    
    let top         = req.query.top
    let orderField  = req.query.orderField
    let sortOrder   = req.query.sortOrder

    let listadoPizzas = await svc.GetAll((top == undefined ? null : top),(orderField == undefined ? null : orderField),(sortOrder == undefined ? null : sortOrder))
    
    /*listadoPizzas.then(val => {
        log('se obtuvieron todos los datos del GetAll() exitosamente');
        res.send(val);
    })*/
    log('se obtuvieron todos los datos del GetAll() exitosamente');
    return res.status(200).json(listadoPizzas);
})


router.get('/GetById/:id', async (req,res) =>{

    let pizzaXID = await svc.GetByID(req.params.id);
    if (pizzaXID != null) {
        pizzaXID.then(val => {
            log('se obtuvieron todos los datos del GetById() exitosamente');
            res.send(val);
        })
    }else{
        res.send('Algo fallo adentro del try');
        log('Error al obtener las pizzas: ' + error.message, 'desde Index.js/GetbyId('+id+')');
    }
})



router.delete('/Delete/:id', async function(req,res) {
    
    let id = req.params.id
    let rowsAffected = await svc.Delete(id);
    if (rowsAffected[0] === 1) {
        res.status(200).send(`Se eliminó la pizza con el ID: ${id}`);
        log('se pudo borrar el objeto de la base de datos exitosamente');
    }else{
        res.status(400).send(`No se borro la pizza con el ID: ${id}`);
        log('Error al eliminar el ojeto: ' + error.message, 'desde Index.js/Delete('+id+')');
    }
})


router.post('/Insert/', async (req,res) =>{

    let body        = req.body;
    let Nombre      = body.Nombre
    let LibreGluten = body.LibreGluten
    let Importe     = body.Importe
    let Descripcion = body.Descripcion

    let pizzaNueva = new Pizza(0,(Nombre == undefined ? null : Nombre),(LibreGluten == undefined ? null : LibreGluten),(Importe == undefined ? null : Importe),(Descripcion == undefined ? null : Descripcion))
    let rowsAffected = await svc.Insert(pizzaNueva)
    if (rowsAffected[0] === 1) {
        res.status(200).send(`Se creo la pizza ${pizzaNueva.Nombre}`);
        log('se pudo crear el objeto de la base de datos exitosamente');
    }else{
        res.status(400).send(`No se creo la pizza`)
        log('Error al crear el ojeto: ' + error.message, 'desde Index.js/Insert(pizza), el objeto pasado fue: '+ pizzaNueva);
    }
})

router.put('/Update/', async (req,res) =>{

    let body        = req.body;
    let Id          = body.Id;
    let Nombre      = body.Nombre
    let LibreGluten = body.LibreGluten
    let Importe     = body.Importe
    let Descripcion = body.Descripcion

    //let pizza = new Pizza((Id == undefined ? null : Id),(Nombre == undefined ? null : Nombre),(LibreGluten == undefined ? null : LibreGluten),(Importe == undefined ? null : Importe),(Descripcion == undefined ? null : Descripcion))
    let rowsAffected = await svc.Update(body)
    if (rowsAffected[0] === 1) {
        res.status(200).send(`Se modificó la pizza ${pizza.Nombre}`)
        log('se pudo modificar el objeto de la base de datos exitosamente');
    }else{
        res.status(400).send(`No existe esa pizza mi bro`)
        log('Error al modificar el ojeto: ' + error.message, 'desde Index.js/Update(pizza), el objeto pasado fue: '+ pizza);
    }
})

export default router;