import { AppDataSource } from "./data-source"
import { Usuario } from "./entity/Usuario"
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";

AppDataSource.initialize().then(async () => {
    //INICIA CON npm start
    //nodemon --exec "npm run start"

    const app = express();
    app.use(bodyParser.json());

    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            route.action(request, response)
                .then(() => next)
                .catch(err => next(err));
        });
    });

    app.listen(3000);

}).catch(error => console.log(error))
