/*import config from './dbconfig.js';
import sql from 'mssql';
import PizzaService from './src/services/pizzas-services.js';
import Pizza from './src/models/Pizza.js';
import express from 'express';
import cors from "cors"
import log from './src/modules/log-helper.js';

const app  = express();
const port = 3000;
const svc = new PizzaService();

app.use(cors());
app.use(express.json());
app.use(express.static('FrontEnd'));


//let pool = await sql.connect(config)


app.get('/pizzas/GetAll/', async (req,res) =>{
    
    let top         = req.query.top
    let orderField  = req.query.orderField
    let sortOrder   = req.query.sortOrder

    let listadoPizzas = await svc.GetAll((top == undefined ? null : top),(orderField == undefined ? null : orderField),(sortOrder == undefined ? null : sortOrder))
    
    /*listadoPizzas.then(val => {
        log('se obtuvieron todos los datos del GetAll() exitosamente');
        res.send(val);
    })
    log('se obtuvieron todos los datos del GetAll() exitosamente');
    return res.status(200).json(listadoPizzas);
})


app.get('/pizzas/GetById/:id', (req,res) =>{
    
    try {
        let pizzaXID = svc.GetByID(req.params.id);
        if (pizzaXID != null) {
            pizzaXID.then(val => {
                log('se obtuvieron todos los datos del GetById() exitosamente');
                res.send(val);
            })
        }else{
            res.send('Algo fallo adentro del try');
            log('Error al obtener las pizzas: ' + error.message, 'desde Index.js/GetbyId('+id+')');
        }
    } catch (error) {
        res.send('Algo fallo en el catch');
        log('Error al obtener la pizzas: ' + error.message, 'desde Index.js/GetbyId('+id+')');
    }
})



app.delete('/pizzas/Delete/:id', async function(req,res) {
    
    let id = req.params.id
    try {
        let rowsAffected = await svc.Delete(id);
        if (rowsAffected[0] === 1) {
            res.status(200).send(`<p>Se eliminó la pizza con el ID: ${id}</p>`);
            log('se pudo borrar el objeto de la base de datos exitosamente');
        }else{
            res.status(400).send(`<p>No se borro la pizza con el ID: ${id}</p>`);
            log('Error al eliminar el ojeto: ' + error.message, 'desde Index.js/Delete('+id+')');
        }
    } catch (error) {
        res.status(404).send('Algo fallo en el catch');
        log('Error al eliminar el ojeto: ' + error.message, 'desde Index.js/Delete('+id+')');
    }
})


app.post('/pizzas/Insert/', async (req,res) =>{

    let body        = req.body;
    let Nombre      = body.Nombre
    let LibreGluten = body.LibreGluten
    let Importe     = body.Importe
    let Descripcion = body.Descripcion

    try {
        let pizzaNueva = new Pizza(0,(Nombre == undefined ? null : Nombre),(LibreGluten == undefined ? null : LibreGluten),(Importe == undefined ? null : Importe),(Descripcion == undefined ? null : Descripcion))
        let rowsAffected = await svc.Insert(pizzaNueva)
        if (rowsAffected[0] === 1) {
            res.status(200).send(`Se creo la pizza ${pizzaNueva.Nombre}`);
            log('se pudo crear el objeto de la base de datos exitosamente');
        }else{
            res.status(400).send(`No se creo la pizza`)
            log('Error al crear el ojeto: ' + error.message, 'desde Index.js/Insert(pizza), el objeto pasado fue: '+ pizzaNueva);
        }
    } catch (error) {
        res.status(404).send(`No se creo la pizza debido a un error`);
        log('Error al crear el ojeto: ' + error.message, 'desde Index.js/Insert(pizza), el objeto pasado fue: '+ pizzaNueva);
    }
})

app.put('/pizzas/Update/', async (req,res) =>{

    let body        = req.body;
    let Id          = body.Id;
    let Nombre      = body.Nombre
    let LibreGluten = body.LibreGluten
    let Importe     = body.Importe
    let Descripcion = body.Descripcion

    try {
        let pizza = new Pizza((Id == undefined ? null : Id),(Nombre == undefined ? null : Nombre),(LibreGluten == undefined ? null : LibreGluten),(Importe == undefined ? null : Importe),(Descripcion == undefined ? null : Descripcion))
        let rowsAffected = await svc.Update(pizza)
        if (rowsAffected[0] === 1) {
            res.status(200).send(`Se modificó la pizza ${pizza.Nombre}`)
            log('se pudo modificar el objeto de la base de datos exitosamente');
        }else{
            res.status(400).send(`No existe esa pizza mi bro`)
            log('Error al modificar el ojeto: ' + error.message, 'desde Index.js/Update(pizza), el objeto pasado fue: '+ pizza);
        }
    } catch (error) {
        res.status(404).send(`No se modifico la pizza debido a un error`)
        log('Error al modificar el ojeto: ' + error.message, 'desde Index.js/Update(pizza), el objeto pasado fue: '+ pizza);
    }
})

app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
})*/