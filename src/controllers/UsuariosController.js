import {Router} from 'express';
import UsuariosServices from '../services/usuarios-services.js';

const UsuariosRouter = Router();
const svc = new UsuariosServices();

UsuariosRouter.post('/Login/', async (req,res) =>{

    let body = req.body;
    console.log(body);
    const newLogin = await svc.login(body) 
    return res.status(200).json(newLogin);
})

export default UsuariosRouter;