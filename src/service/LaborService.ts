import { Equal, Not } from "typeorm";
import { AppDataSource } from "../data-source";
import { Labor } from "../entity/Labor";

const laborRepository = AppDataSource.getRepository(Labor);

export async function all(): Promise<Labor[]> {
    return laborRepository.find();
};

export async function findById(id: number): Promise<Labor> {
    return await laborRepository.findOneBy({ id: id });
};
export async function findByUsuario(id: string): Promise<Labor[]> {
    return await laborRepository.find({
        where: {
            laborTrabajador: {
                usuarioId: id,
                active: true
            }
        },
        relations: {
            laborTrabajador: true
        }
    });
};

export async function listarDisponibles(excludeUser?: string): Promise<Labor[]> {
    const filter = {
        laborTrabajador: {
            active: true,
            usuario: {
                estado: Equal("DISPONIBLE")
            }
        }
    }
    if (excludeUser) {
        filter.laborTrabajador.usuario["celular"] = Not(excludeUser);
    }
    return await laborRepository.find({
        where: filter,
        relations: {
            laborTrabajador: {
                usuario: true
            }
        }
    });
};

export async function save(labor: Labor[]) {
    await laborRepository.save(labor);
}