import { Point } from "geojson";

export interface LaboresViewFormat {
    id: string,
    tipo: string,
    descripcion: string,
    usuarioId: string,
    precio: number,
    unidadPrecio: string,
    nombre: string,
    apellido: string,
    nombreCompleto: string,
    fechaNacimiento: Date
}