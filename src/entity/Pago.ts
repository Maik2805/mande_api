import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Servicio } from "./Servicio";
import { MedioPago } from "./MedioPago";

@Entity("pagos")
export class Pago {
    @PrimaryGeneratedColumn()
    id: number

    @OneToOne(() => Servicio, (servicio) => servicio.pago)
    @JoinColumn({ name: "id_servicio" })
    servicio: Servicio

    @OneToOne(() => MedioPago, (medioPago) => medioPago.pago)
    @JoinColumn({ name: "id_medio_pago" })
    medioPago: MedioPago

    @Column()
    valor: number

    @Column()
    estado: string

}