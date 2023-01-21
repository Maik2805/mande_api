import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Servicio } from "../entity/Servicio";
import { Equal } from "typeorm";
import { Labor } from "../entity/Labor";
import { Usuario } from "../entity/Usuario";
import { LaborTrabajador } from "../entity/LaborTrabajador";

const servicioRepository = AppDataSource.getRepository(Servicio);
const laborRepository = AppDataSource.getRepository(Labor);
const usuarioRepository = AppDataSource.getRepository(Usuario);

export async function all(): Promise<Servicio[]> {
    // const servicio: Servicio[] = await servicioRepository.find();
    return servicioRepository.find();
};

export async function findById(id: number): Promise<Servicio> {
    return servicioRepository.findOneBy({ id: id });
};

export async function findByClienteId(clienteId: string): Promise<Servicio[]> {
    return servicioRepository.findBy({ cliente: { celular: clienteId } });
};

export async function findByTrabajadorId(trabajadorId: string): Promise<Servicio[]> {
    return servicioRepository.findBy({ trabajador: { celular: trabajadorId } });
    // const servicios: Servicio[] = await servicioRepository.findBy({ trabajador: { celular: req.params.usuario } });
    // const servicios: Servicio[] = await servicioRepository.find({
    //     where: {
    //         trabajador: {
    //             celular: req.params.usuario
    //         }
    //     },
    //     relations: {
    //         cliente: true
    //     }
    // });
};

export async function save(servicios: Servicio[]) {
    return servicioRepository.save(servicios);
};

export async function createByTrabajadorClienteCantidad(laborId: number, trabajadorId: string, celularId: string, cantidad: number): Promise<Servicio> {

    const trabajador: Usuario = await usuarioRepository.createQueryBuilder("Usuario")
        .innerJoinAndSelect("Usuario.laborTrabajador", "lt")
        .where("Usuario.celular = :celular", { celular: trabajadorId })
        .andWhere("lt.id_labor = :labor", { labor: laborId })
        .getOne();
    console.log(trabajador);
    if (!trabajador) throw new Error("Labor/Trabajador no encontrado")
    const laborDetail: LaborTrabajador = trabajador.laborTrabajador[0];
    const servicio: Servicio = servicioRepository.create({
        id: undefined,
        labor: laborRepository.create({
            id: laborId
        }),
        trabajador: trabajador,
        cliente: usuarioRepository.create({
            celular: celularId
        }),
        descripcion: "",
        precio: laborDetail.precio * cantidad,
        calificacion: undefined,
        estado: "EN PROCESO",
        fechaCreacion: new Date(),
        fechaTerminacion: undefined
    });
    try {
        await servicioRepository.save(servicio);
        await usuarioRepository.update({ celular: trabajador.celular }, { estado: "OCUPADO" })
    } catch (error) {
        throw new Error("Ocurrió un error guardando el servicio");
    }


    return servicio;
}
