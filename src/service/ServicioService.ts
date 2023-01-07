import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Servicio } from "../entity/Servicio";
import { Equal } from "typeorm";

const servicioRepository = AppDataSource.getRepository(Servicio);

export async function all(): Promise<Servicio[]> {
    // const servicio: Servicio[] = await servicioRepository.find();
    return servicioRepository.find();
};

export async function findById(id: number): Promise<Servicio> {
    return servicioRepository.findOneBy({ id: id });
};

export async function findByClienteId(clienteId: number): Promise<Servicio[]> {
    return servicioRepository.findBy({ cliente: { celular: Equal(clienteId) } });
};

export async function findByTrabajadorId(trabajadorId: number): Promise<Servicio[]> {
    return servicioRepository.findBy({ trabajador: { celular: Equal(trabajadorId) } });
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
