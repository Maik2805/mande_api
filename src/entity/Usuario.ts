import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Geometry } from 'geojson';
import { MedioPago } from "./MedioPago";
import { Servicio } from "./Servicio";
import { LaborTrabajador } from "./LaborTrabajador";

@Entity("usuarios")
export class Usuario {

    @PrimaryColumn()
    celular: String

    @Column({ name: "tipo_documento" })
    tipoDocumento: string

    @Column()
    documento: string

    @Column()
    nombre: string

    @Column()
    apellido: string

    @Column({ name: "correo_electronico" })
    correoElectronico: string

    @Column({ type: 'timestamp', name: "fecha_nacimiento" })
    fechaNacimiento: Date

    @Column({ name: "foto_perfil" })
    fotoPerfil: string

    @Column({ name: "foto_documento" })
    fotoDocumento: string

    @Column({ name: "foto_recibo" })
    fotoRecibo: string

    @Column()
    direccion: string

    @Column({ type: 'point' })
    ubicacion: Geometry

    @Column()
    estado: string

    @OneToMany(() => MedioPago, (medio) => medio.usuario)
    mediosPago: MedioPago[]

    @OneToMany(() => Servicio, (servicio) => servicio.trabajador)
    serviciosPrestados: Servicio[]

    @OneToMany(() => Servicio, (servicio) => servicio.cliente)
    serviciosAdquiridos: Servicio[]

    @OneToMany(() => LaborTrabajador, (labor) => labor.usuario)
    laborTrabajador!: LaborTrabajador[]
}
