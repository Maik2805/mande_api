import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Servicio } from "../entity/Servicio";
import * as servicioService from "../service/ServicioService";
import { BasicUserInfo } from "../interface/BasicUserInfo";

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

export async function createByTrabajadorClienteCantidad(req: Request, res: Response) {
    try {
        const user: BasicUserInfo = req.user;
        const body: any = req.body;
        if (body.trabajador && body.cantidad && body.labor) {

            await servicioService.createByTrabajadorClienteCantidad(body.labor, body.trabajador, user.celular, body.cantidad);
            res.send("ok");
        } else {
            res.status(400);
            res.send("Parametros Requeridos");
            return;
        }

    } catch (error) {
        res.status(400);
        res.send(error.message);
        return;
    }
};
