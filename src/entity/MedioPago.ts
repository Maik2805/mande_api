import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "./Usuario";
import { Pago } from "./Pago";

@Entity("medios_pago_usuario")
export class MedioPago {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Usuario, (usuario) => usuario.mediosPago)
    @JoinColumn({ name: "id_usuario" })
    usuario: Usuario

    @OneToOne(() => Pago, (pago) => pago.medioPago)
    pago: Pago

    @Column()
    tipo: string

    @Column({ name: "numero_tarjeta" })
    numeroTarjeta: string

    @Column({ name: "fecha_expiracion" })
    fechaExpiracion: string

    @Column()
    codigo: string

    @Column()
    deleted: boolean

}