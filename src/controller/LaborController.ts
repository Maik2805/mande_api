import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Labor } from "../entity/Labor";

const laborRepository = AppDataSource.getRepository(Labor);

export async function all(req: Request, res: Response) {
    const labores: Labor[] = await laborRepository.find();
    res.send(labores);
};

export async function findById(req: Request, res: Response) {
    const labor: Labor = await laborRepository.findOneBy({ id: req.params.id });
    res.send(labor);
};

export async function save(req: Request, res: Response) {
    const newLabor = laborRepository.create(req.body);
    await laborRepository.save(newLabor);
    res.send(newLabor);
}