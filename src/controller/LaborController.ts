import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Labor } from "../entity/Labor";
import * as laborService from "../service/LaborService"

const laborRepository = AppDataSource.getRepository(Labor);

export async function all(req: Request, res: Response) {
    const labores: Labor[] = await laborService.all();
    res.send(labores);
};

export async function findById(req: Request, res: Response) {
    const labor: Labor = await laborService.findById(req.params.id);
    res.send(labor);
};

export async function save(req: Request, res: Response) {
    const newLabor: Labor[] = laborRepository.create(req.body);
    await laborService.save(newLabor);
    res.send(newLabor);
}