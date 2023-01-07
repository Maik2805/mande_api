import { Request, Response } from "express";
import { Pago } from "../entity/Pago";
import * as pagoService from "../service/PagoService"
import { AppDataSource } from "../data-source";

const pagoRepository = AppDataSource.getRepository(Pago);

export async function all(req: Request, res: Response) {
    const pagos: Pago[] = await pagoService.all();
    res.send(pagos);
};

export async function findById(req: Request, res: Response) {
    const pago: Pago = await pagoService.findById(req.params.id);
    if (!pago) {
        res.status(404);
        res.end();
        return;
    }
    res.send(pago);
};

export async function findByServicioId(req: Request, res: Response) {
    const pagos: Pago[] = await pagoService.findByServicioId(req.params.servicio);
    res.send(pagos);
};

export async function save(req: Request, res: Response) {
    const pagos = pagoRepository.create(req.body);
    await pagoService.save(pagos);
    res.send(pagos);
}