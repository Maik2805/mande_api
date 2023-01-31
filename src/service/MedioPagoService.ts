import { Equal } from "typeorm";
import { AppDataSource } from "../data-source";
import { MedioPago } from "../entity/MedioPago";

const medioPagoRepository = AppDataSource.getRepository(MedioPago);

export async function all(): Promise<MedioPago[]> {
    return medioPagoRepository.find();
};

export async function findById(id: number): Promise<MedioPago> {
    return medioPagoRepository.findOneBy({ id: id });
};

export async function findByUsuario(usuarioId: string): Promise<MedioPago[]> {
    return medioPagoRepository.findBy({ usuario: { celular: Equal(usuarioId) } });
};

export async function save(mediiPago: MedioPago[]) {
    await medioPagoRepository.save(mediiPago);
}

