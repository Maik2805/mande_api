import { AppDataSource } from "../data-source";
import { MedioPago } from "../entity/MedioPago";
import { Request, Response } from "express";

const medioPagoRepository = AppDataSource.getRepository(MedioPago);

export async function all(req: Request, res: Response) {
    const medioPago: MedioPago[] = await medioPagoRepository.find();
    res.send(medioPago);
};

export async function findById(req: Request, res: Response) {
    const medioPago: MedioPago = await medioPagoRepository.findOneBy({ id: req.params.id });
    if (!medioPago) {
        res.status(404);
        res.end();
        return;
    }
    res.send(medioPago);
};

export async function findByUsuario(req: Request, res: Response) {
    const medioPago: MedioPago[] = await medioPagoRepository.findBy({ usuario: { celular: req.params.usuario } });
    res.send(medioPago);
};

export async function save(req: Request, res: Response) {
    const newUsuario = medioPagoRepository.create(req.body);
    await medioPagoRepository.save(newUsuario);
    res.send(newUsuario);
}

