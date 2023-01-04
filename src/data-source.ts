import "reflect-metadata"
import { DataSource } from "typeorm"
import { Usuario } from "./entity/Usuario"
import { Labor } from "./entity/Labor"
import { LaborTrabajador } from "./entity/LaborTrabajador"
import { MedioPago } from "./entity/MedioPago"
import { Pago } from "./entity/Pago"
import { Servicio } from "./entity/Servicio"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "admin",
    password: "admin",
    database: "univalle",
    schema: "mande",
    synchronize: false,
    logging: true,
    entities: [Usuario, Labor, LaborTrabajador, MedioPago, Pago, Servicio],
    migrations: [],
    subscribers: [],
})
