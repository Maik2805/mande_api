import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Labor } from "../entity/Labor";
import * as laborService from "../service/LaborService"
import { LaboresViewFormat } from "../interface/LaboresViewFormat";

const laborRepository = AppDataSource.getRepository(Labor);

export async function all(req: Request, res: Response) {
    const labores: Labor[] = await laborService.all();
    res.send(labores);
};

export async function findById(req: Request, res: Response) {
    const labor: Labor = await laborService.findById(req.params.id);
    res.send(labor);
};

export async function findByUsuario(req: Request, res: Response) {
    const labor: Labor[] = await laborService.findByUsuario(req.params.id);
    res.send(labor);
};

export async function listarDisponibles(req: Request, res: Response) {
    const labor: Labor[] = await laborService.listarDisponibles();
    res.send(labor);
};

export async function listarDisponiblesRaw(req: Request, res: Response) {
    const labor: Labor[] = await laborService.listarDisponibles();
    res.send(formatView(labor));
};

export async function save(req: Request, res: Response) {
    const newLabor: Labor[] = laborRepository.create(req.body);
    await laborService.save(newLabor);
    res.send(newLabor);
}

function formatView(labores: Labor[]): LaboresViewFormat[] {
    const result: LaboresViewFormat[] = [];
    labores.forEach((labor) => {
        labor.laborTrabajador.forEach((labTrabajador) => {
            let info: LaboresViewFormat = {
                id: labor.id.toString(),
                tipo: labor.tipo,
                descripcion: labor.descripcion,
                usuarioId: labTrabajador.usuarioId,
                precio: labTrabajador.precio,
                unidadPrecio: labTrabajador.unidadPrecio,
                nombre: labTrabajador.usuario.nombre,
                apellido: labTrabajador.usuario.apellido,
                nombreCompleto: labTrabajador.usuario.nombre + ' ' + labTrabajador.usuario.apellido,
                fechaNacimiento: labTrabajador.usuario.fechaNacimiento
            }
            result.push(info);

        })
    })
    return result;
}