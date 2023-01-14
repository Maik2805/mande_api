import { AppDataSource } from "./data-source"
import { Request, Response } from "express";
import * as express from "express";
import * as bodyParser from "body-parser";
import { AppRoutes } from "./routes";
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const fileupload = require("express-fileupload");
const cors = require('cors');


AppDataSource.initialize().then(async () => {
    //INICIA CON npm start
    //nodemon --exec "npm run start"
    dotenv.config()
    const app = express();
    app.use(bodyParser.json());
    app.use(fileupload());
    app.use(cors({
        origin: '*'
    }));

    AppRoutes.forEach(route => {
        app[route.method](route.path, (request: Request, response: Response, next: Function) => {
            if (route.notLogged) {
                route.action(request, response)
                    .then(() => next)
                    .catch(err => next(err));
            } else {
                const authHeader = request.headers['authorization']
                // const authHeader = request.get("authorization");
                const token = authHeader && authHeader.split(' ')[1]
                jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
                    // console.log('Token Error: ', err)
                    if (err) return response.sendStatus(403)
                    request.user = user.usuario
                    // console.log(user)
                    if (route.adminRequired) {
                        if (!user.usuario.isAdmin) {
                            response.sendStatus(403);
                            return;
                        }
                    }
                    route.action(request, response)
                        .then(() => next)
                        .catch(err => next(err));
                });
            }
        });
    });

    app.listen(3000);

}).catch(error => console.log(error))
