import config from './dbconfig.js';
import sql from 'mssql';
import PizzaService from './src/services/pizzas-services.js';
import Pizza from './src/models/Pizza.js';
import express from 'express';

const app  = express();
const port = 3000;


/*let pool = await sql.connect(config)
let result = await pool.request().query('')
await GetAll(null,'nombre','desc')
let NuevaPizza = new Pizza()
NuevaPizza = await GetByID(1)
console.log(NuevaPizza);
NuevaPizza.Importe = NuevaPizza.Importe * 2;
await Insert(NuevaPizza)*/

app.get('/',(req,res) => {
    res.send('Hola mundo!')
})

// localhost:3000/pizzas?order=importe
app.get('/pizzas/getAll/:top/:orderField/:sortOrder', async (req,res) =>{
    let svc = new PizzaService();

    /*let top = req.query.top
    let orderField = req.query.orderField
    let sortOrder = req.query.sortOrder*/

    let resul = await svc.GetAll(req.params.top?? null, req.params.orderField?? null, req.params.sortOrder??null)
    //console.log(resul)
    res.send(resul)
})

/*app.get('/not-found',(req,res) => {
    res.status(404).send('No se encontró')
})

app.get('/get-params/:id', (req,res) =>{
    let parametros = req.query
    console.log(parametros)
    res.send('id: ' + req.params.id)
})*/

app.post({

})

app.put({

})

app.listen(port, () =>{
    console.log(`App listening on port ${port}`)
})


/*async function GetAll(top,orderField,sortOrder)
{
    let resul = await svc.GetAll(top,orderField,sortOrder)
    console.log(resul)
    return resul
    
}

async function GetByID(id)
{
    let resul = await svc.GetByID(id);
    console.log(resul);
    return resul;
    
}

async function Insert(pizza)
{
    let resul = await svc.Insert(pizza)
    console.log(resul)
    return resul
    
}

async function Delete(id)
{
    let resul = await svc.Delete(id)
    console.log(resul)
    return resul
    
}*/