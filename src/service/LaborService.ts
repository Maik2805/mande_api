import { AppDataSource } from "../data-source";
import { Labor } from "../entity/Labor";

const laborRepository = AppDataSource.getRepository(Labor);

export async function all(): Promise<Labor[]> {
    return laborRepository.find();
};

export async function findById(id: number): Promise<Labor> {
    return await laborRepository.findOneBy({ id: id });
};

export async function save(labor: Labor[]) {
    await laborRepository.save(labor);
}