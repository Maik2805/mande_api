import { Equal, Not } from "typeorm";
import { AppDataSource } from "../data-source";
import { Labor } from "../entity/Labor";
import { LaborTrabajador } from "../entity/LaborTrabajador";

const laborRepository = AppDataSource.getRepository(Labor);
const laborTrabajadorRepository = AppDataSource.getRepository(LaborTrabajador);

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

export async function listarInactivasByUsuario(userId: string): Promise<Labor[]> {
    let query = laborTrabajadorRepository.createQueryBuilder("lt")
        .select("lt.id_labor")
        .where("lt.id_usuario = :userId", { userId: userId })
        .andWhere("lt.active IS TRUE");
    const resulta = await laborRepository.createQueryBuilder("Labor")
        .where("Labor.id NOT IN (" + query.getQuery() + ")")
        .setParameters(query.getParameters())
        .getMany();
    return resulta;
}

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