import { AppDataSource } from "./data-source"
import { Usuario } from "./entity/Usuario"
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";

AppDataSource.initialize().then(async () => {
    const usuarioController = require("./controller/UsuarioController");



    //INICIA CON npm start

    //-------
    // console.log("Inserting a new user into the database...")
    // const user = new Usuario()
    // user.id = "12354"
    // user.name = "Timber"
    // user.email = "email"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const userRepository = AppDataSource.getRepository(Usuario)
    const usuarios: Usuario[] = await userRepository.find()
    // const users = await AppDataSource.manager.find()
    console.log("Loaded users: ", usuarios)

    console.log("Here you can setup and run express / fastify / any other framework.")


    //-------
    const app = express();
    app.use(bodyParser.json());

    // app.get('/', (req, res) => {
    //     res.send('Hello World! <br> Escribanme al WPP que estoy comiendo jaja')
    // });

    // app.get('/usuario/all', (req: Request, res: Response) => usuarioController.all);

    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    app.listen(3000);


}).catch(error => console.log(error))
