import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Servicio } from "./Servicio";
import { LaborTrabajador } from "./LaborTrabajador";

@Entity("labores")
export class Labor {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    tipo: string

    @Column()
    descripcion: string

    @OneToMany(() => Servicio, (servicio) => servicio.labor)
    servicios: Servicio[]

    @OneToMany(() => LaborTrabajador, (labor) => labor.labor)
    laborTrabajador!: LaborTrabajador[]

}