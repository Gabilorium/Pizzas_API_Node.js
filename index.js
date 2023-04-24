import config from './dbconfig.js'
import sql from 'mssql'
import PizzaService from './src/services/pizzas-services.js'
import Pizza from './src/models/Pizza.js';


let pool = await sql.connect(config)
let result = await pool.request().query('')
let svc = new PizzaService();
await GetAll(5,'id')
//let NuevaPizza = new Pizza()
//NuevaPizza = await GetByID(1)
//console.log(NuevaPizza);
//NuevaPizza.Importe = NuevaPizza.Importe * 2;
//await Insert(NuevaPizza)


async function GetAll(top,orderField,sortOrder)
{
    let resul = await svc.GetAll(top,orderField,sortOrder)
    console.log(resul)
    return resul
    
}

async function GetByID(id)
{
    let resul = await svc.GetByID(id);
    //console.log(resul);
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
    
}