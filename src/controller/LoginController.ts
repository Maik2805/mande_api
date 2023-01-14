import { Request, Response } from "express";
import * as usuarioService from "../service/UsuarioService"
import { Usuario } from "../entity/Usuario";
import { BasicUserInfo } from "../interface/BasicUserInfo";
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
import { AppDataSource } from "../data-source";
const userRepository = AppDataSource.getRepository(Usuario);
const saltRounds = 10;

interface LoginRequest {
    celular: string;
    password: string;
}

export async function login(req: Request, res: Response) {
    console.log(req.body);
    const data: LoginRequest = req.body;
    const usuario: Usuario = await usuarioService.findUserById(data.celular);
    if (!usuario) {
        res.status(400);
        res.send('Credenciales Incorrectas')
        return;
    }
    bcrypt.compare(data.password, usuario.password, function (err, result) {
        if (result) {
            const userInfo: BasicUserInfo = {
                celular: usuario.celular,
                tipoDocumento: usuario.tipoDocumento,
                documento: usuario.tipoDocumento,
                correoElectronico: usuario.correoElectronico,
                isAdmin: usuario.celular === '3057675078',
                nombre_completo: usuario.nombre + " " + usuario.apellido
            }
            res.send(generateAccessToken(userInfo))
        } else {
            res.status(400);
            res.send('Credenciales Incorrectas')
            return;
        }
    });
}

export async function register(req: Request, res: Response) {
    const tempUser: Usuario = req.body;
    try {
        const newUsuario: Usuario = userRepository.create(tempUser);
        newUsuario.estado = "ACTIVO"
        if (!newUsuario.password) {
            res.status(400);
            res.send('Contraseña requerida')
            return;
        }
        await bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(newUsuario.password, salt, async function (err, hash) {
                if (err) throw new Error(err);
                // console.log('SALT: ', salt)
                newUsuario.password = hash;
                try {
                    const resp = await userRepository.insert(newUsuario);
                    console.log('respp: ', resp)
                    res.send(newUsuario);

                } catch (error) {
                    res.status(400);
                    res.send('Usuario registrado previamente')
                    return;
                }
            });
        });

    } catch (error) {
        console.log('Error en register', error);
        res.sendStatus(500);
    }
}

const generateAccessToken = (usuario: BasicUserInfo) => {
    // console.log(process.env.TOKEN_SECRET)
    return jwt.sign({ usuario }, process.env.TOKEN_SECRET, { expiresIn: '6h' });
}