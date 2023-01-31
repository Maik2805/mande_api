import { AppDataSource } from "../data-source";
import { MedioPago } from "../entity/MedioPago";
import { Request, Response } from "express";
import * as medioPagoService from "../service/MedioPagoService"

const medioPagoRepository = AppDataSource.getRepository(MedioPago);

export async function all(req: Request, res: Response) {
    const medioPago: MedioPago[] = await medioPagoService.all();
    res.send(medioPago);
};

export async function findById(req: Request, res: Response) {
    const medioPago: MedioPago = await medioPagoService.findById(req.params.id);
    if (!medioPago) {
        res.status(404);
        res.end();
        return;
    }
    res.send(medioPago);
};

export async function findByUsuario(req: Request, res: Response) {
    const medioPago: MedioPago[] = await medioPagoService.findByUsuario(req.params.usuario);
    res.send(medioPago);
};

export async function save(req: Request, res: Response) {
    const newMedioPago = medioPagoRepository.create(req.body);
    await medioPagoService.save(newMedioPago);
    res.send(newMedioPago);
}

