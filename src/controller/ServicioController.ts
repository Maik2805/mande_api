import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Servicio } from "../entity/Servicio";
import * as servicioService from "../service/ServicioService";

const servicioRepository = AppDataSource.getRepository(Servicio);


export async function all(req: Request, res: Response) {
    const servicio: Servicio[] = await servicioService.all();
    res.send(servicio);
};

export async function findById(req: Request, res: Response) {
    const servicio: Servicio = await servicioService.findById(req.params.id);
    res.send(servicio);
};

export async function findByCliente(req: Request, res: Response) {
    const servicios: Servicio[] = await servicioService.findByClienteId(req.params.usuario);
    res.send(servicios);
};

export async function findByTrabajador(req: Request, res: Response) {
    const servicios: Servicio[] = await servicioService.findByTrabajadorId(req.params.usuario);
    res.send(servicios);
};

export async function save(req: Request, res: Response) {
    const servicio: Servicio[] = servicioRepository.create(req.body);
    await servicioService.save(servicio);
    res.send(servicio);
};
