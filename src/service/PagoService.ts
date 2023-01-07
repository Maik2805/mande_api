import { Equal } from "typeorm";
import { AppDataSource } from "../data-source";
import { Pago } from "../entity/Pago";

const pagoRepository = AppDataSource.getRepository(Pago);

export async function all(): Promise<Pago[]> {
    return pagoRepository.find();
};

export async function findById(id: number): Promise<Pago> {
    return pagoRepository.findOneBy({ id: id });
};

export async function findByServicioId(servicioId: number): Promise<Pago[]> {
    return pagoRepository.findBy({ servicio: { id: Equal(servicioId) } });
};

export async function save(pago: Pago[]) {
    await pagoRepository.save(pago);
}

