import config from './dbconfig.js'
import sql from 'mssql'
import PizzaSerice from './src/services/pizzas-services.js'
import Pizza from './src/models/Pizza.js';


let pool = await sql.connect(config)
let result = await pool.request().query('')
let svc = new PizzaSerice();
//let miPizza = svc.GetByID(2);
//miPizza.nombre = 
/*let miPizza = new Pizza();
miPizza.id = 2;
miPizza.nombre = "Super Pizzza";
let afectqdos  = svc.Update(miPizza);*/
await GetAll()
let NuevaPizza = new Pizza()
NuevaPizza = await GetByID(1)
console.log(NuevaPizza);
//let NuevaPizza = new Pizza('Muzzarella', false, 1500, 'Pizza con queso mozzarella')
NuevaPizza.Importe = NuevaPizza.Importe * 2;
await Insert(NuevaPizza)
//await Delete(15)
//await GetByID(21)


async function GetAll()
{
    let resul = await svc.GetAll()
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