import config from './dbconfig.js'
import sql from 'mssql'
import PizzaSerice from './services/pizzas-services.js'
import Pizza from './models/pizza.js';


let pool = await sql.connect(config)
let result = await pool.request().query('')
let svc = new PizzaSerice();
//let miPizza = svc.GetByID(2);
//miPizza.nombre = 


/*let miPizza = new Pizza();
miPizza.id = 2;
miPizza.nombre = "Super Pizzza";


let afectqdos  = svc.Update(miPizza);*/

GetAll


async function GetAll()
{
    let resul = await svc.GetAll()
    console.log(resul)
    //return resul
    
}