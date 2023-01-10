import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { Request, Response } from "express";
import bcrypt = require('bcrypt');
import * as usuarioService from "../service/UsuarioService"
import { Labor } from "../entity/Labor";
import { LaborTrabajador } from "../entity/LaborTrabajador";
import { BasicUserInfo } from "../interface/BasicUserInfo";

const userRepository = AppDataSource.getRepository(Usuario);
const laborTrabajadorRepository = AppDataSource.getRepository(LaborTrabajador);

export async function all(req: Request, res: Response) {
    const usuarios: Usuario[] = await usuarioService.all();
    res.send(usuarios);
};

export async function findById(req: Request, res: Response) {
    const usuario: Usuario = await usuarioService.findById(req.params.id);
    if (!usuario) {
        res.status(404);
        res.end();
        return;
    }
    res.send(usuario);
};

export async function save(req: Request, res: Response) {
    console.log(req.user)
    const tempUser: Usuario = req.body;
    const newUsuario = userRepository.create(tempUser);
    if (newUsuario.celular === req.usuario.celular) {
        await usuarioService.save(newUsuario);
        res.send(newUsuario);
    } else {
        res.status(403);
        res.send('Metodo no permitido para el usuario');
        return;
    }
}

export async function addLaborUsuario(req: Request, res: Response) {
    const user: BasicUserInfo = req.user;
    const labor: LaborTrabajador = laborTrabajadorRepository.create(req.body.laborTrabajador as LaborTrabajador)
    if (!user.isAdmin || !labor.usuarioId) {
        labor.usuarioId = user.celular;
    }
    const result = await laborTrabajadorRepository.insert(labor);
    res.send(labor);
}