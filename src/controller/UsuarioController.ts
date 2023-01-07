import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { Request, Response } from "express";
import * as usuarioService from "../service/UsuarioService"

const userRepository = AppDataSource.getRepository(Usuario);

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
    const newUsuario = userRepository.create(req.body);
    await usuarioService.save(newUsuario);
    res.send(newUsuario);
}