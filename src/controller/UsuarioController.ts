import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { Request, Response } from "express";

const userRepository = AppDataSource.getRepository(Usuario)

export async function all(req: Request, res: Response) {
    const usuarios: Usuario[] = await userRepository.find();
    res.send(usuarios);
};

export async function find(req: Request, res: Response) {
    const usuario: Usuario = await userRepository.findOneBy({ celular: req.params.id });
    console.log(req.params.id);
    if (!usuario) {
        res.status(404);
        res.end();
        return;
    }
    res.send(usuario);
};

export async function save(req: Request, res: Response) {
    const newUsuario = userRepository.create(req.body);
    await userRepository.save(newUsuario);
    res.send(newUsuario);
}