import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from "typeorm"
import { Labor } from "./Labor"
import { Usuario } from "./Usuario"
import { Pago } from "./Pago"

@Entity("servicios")
export class Servicio {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Labor, (labor) => labor.servicios, {
        eager: true,
    })
    @JoinColumn({ name: "id_labor" })
    labor: Labor

    @ManyToOne(() => Usuario, (usuario) => usuario.serviciosPrestados, {
        eager: true,
    })
    @JoinColumn({ name: "id_trabajador" })
    trabajador: Usuario

    @ManyToOne(() => Usuario, (usuario) => usuario.serviciosAdquiridos, {
        eager: true,
    })
    @JoinColumn({ name: "id_cliente" })
    cliente: Usuario

    @OneToOne(() => Pago, (pago) => pago.servicio)
    pago: Pago

    @Column()
    descripcion: string

    @Column()
    precio: number

    @Column()
    calificacion: number

    @Column()
    estado: string

    @Column({ type: 'timestamp', name: "fecha_creacion" })
    fechaCreacion: Date

    @Column({ type: 'timestamp', name: "fecha_terminacion" })
    fechaTerminacion: Date

}