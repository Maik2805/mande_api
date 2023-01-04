import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Labor } from "./Labor";
import { Usuario } from "./Usuario";

@Entity("labores_trabajador")
export class LaborTrabajador {
    @PrimaryColumn({ name: "id_usuario" })
    usuarioId: string

    @ManyToOne(() => Usuario, (usuario) => usuario.laborTrabajador)
    @JoinColumn({ name: "id_usuario" })
    usuario!: Usuario

    @PrimaryColumn({ name: "id_labor" })
    laborId: string

    @ManyToOne(() => Labor, (labor) => labor.laborTrabajador)
    @JoinColumn({ name: "id_labor" })
    labor: Labor

    @Column()
    precio: number

    @Column({ name: "unidad_precio" })
    unidadPrecio: string

    @Column()
    active: boolean
}