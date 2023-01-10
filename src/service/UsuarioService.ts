import { AppDataSource } from "../data-source";
import { Usuario } from "../entity/Usuario";
import { Equal } from "typeorm";

const userRepository = AppDataSource.getRepository(Usuario);

export async function all(): Promise<Usuario[]> {
    return userRepository.find();
};

export async function findById(id: string): Promise<Usuario> {
    return userRepository.findOneBy({ celular: id });

};

export async function save(usuario: Usuario) {
    await userRepository.save(usuario);
}