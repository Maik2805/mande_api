import { AppDataSource } from "../data-source";
import { validate } from "class-validator"
import { Usuario } from "../entity/Usuario";
import { Request, Response } from "express";
import bcrypt = require('bcrypt');
import * as usuarioService from "../service/UsuarioService"
import * as fileService from "../service/FileService"
import { Labor } from "../entity/Labor";
import { LaborTrabajador } from "../entity/LaborTrabajador";
import { BasicUserInfo } from "../interface/BasicUserInfo";
import { PublicUserInfo } from "../interface/PublicUserInfo";

const userRepository = AppDataSource.getRepository(Usuario);
const laborTrabajadorRepository = AppDataSource.getRepository(LaborTrabajador);

export async function all(req: Request, res: Response) {
    const usuarios: Usuario[] = await usuarioService.all();
    res.send(usuarios);
};

export async function findById(req: Request, res: Response) {
    const user: BasicUserInfo = req.user;

    if (user.isAdmin || req.params.id == user.celular) {
        const usuario: Usuario = await usuarioService.findById(req.params.id);
        if (!usuario) {
            res.status(404);
            res.end();
            return;
        }
        res.send(usuario);
    } else {
        res.status(403);
        res.end("Forbidden");
        return;
    }
};

export async function getPublicInfo(req: Request, res: Response) {
    const usuario: PublicUserInfo = await usuarioService.findPublicInfo(req.params.id);
    if (!usuario) {
        res.status(404);
        res.send("Registro no encontrado");
        return;
    }
    res.send(usuario);
};

export async function save(req: Request, res: Response) {
    const tempUser: Usuario = req.body;
    const newUsuario = userRepository.create(tempUser);
    const errors = await validate(newUsuario, { validationError: { target: false } })
    if (errors.length > 0) {
        res.status(400);
        res.send(errors);
        return;
    }
    if (newUsuario.celular === req.user.celular) {
        await usuarioService.save(newUsuario);
        res.send(newUsuario);
    } else {
        res.status(403);
        res.send('Metodo no permitido para el usuario');
        return;
    }
}

export async function saveFotoPerfilUsuario(req: Request, res: Response) {
    try {
        const user: BasicUserInfo = req.user;
        const { imagen } = req.files;
        const filename = fileService.uplodadImage(req.files)
        const result = await userRepository.update({ celular: user.celular }, { fotoPerfil: filename });
        usuarioService.validateTrabajadorDisponible(user.celular)

        res.send(filename);
    } catch (error) {
        res.status(400);
        res.send(error);
        return;
    }
};

export async function saveDocumentFile(req: Request, res: Response) {
    try {
        const user: BasicUserInfo = req.user;
        const filename = fileService.uplodadDoc(req.files)
        const result = await userRepository.update({ celular: user.celular }, { fotoDocumento: filename });
        usuarioService.validateTrabajadorDisponible(user.celular)
        res.send(filename);
    } catch (error) {
        res.status(400);
        res.send(error);
        return;
    }
};

export async function saveFotoRecibo(req: Request, res: Response) {
    try {
        const user: BasicUserInfo = req.user;
        const filename = fileService.uplodadImage(req.files)
        const result = await userRepository.update({ celular: user.celular }, { fotoRecibo: filename });

        res.send(filename);
    } catch (error) {
        console.error(error);
        res.status(400);
        res.send("Error Cargando la imagen");
        return;
    }
};

export async function addLaborUsuario(req: Request, res: Response) {
    const user: BasicUserInfo = req.user;
    const labor: LaborTrabajador = laborTrabajadorRepository.create(req.body.laborTrabajador as LaborTrabajador)
    labor.active = true;
    if (!user.isAdmin || !labor.usuarioId) {
        labor.usuarioId = user.celular;
    }
    const result = await laborTrabajadorRepository.upsert(labor, ["usuarioId", "laborId"]);
    res.send(labor);
}

export async function inactiveLaborUsuario(req: Request, res: Response) {
    const user: BasicUserInfo = req.user;
    const labor: LaborTrabajador = laborTrabajadorRepository.create(req.body.laborTrabajador as LaborTrabajador)
    if (!user.isAdmin || !labor.usuarioId) {
        labor.usuarioId = user.celular;
    }
    const result = await laborTrabajadorRepository.update({ usuarioId: labor.usuarioId, laborId: labor.laborId }, { active: false });
    labor.active = false;
    res.send(labor);
}