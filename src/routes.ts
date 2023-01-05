import * as usuarioController from "./controller/UsuarioController";
import * as laborController from "./controller/LaborController";
import * as medioPagoController from "./controller/MedioPagoController";

export const AppRoutes = [
    {
        path: "/usuarios/all",
        method: "get",
        action: usuarioController.all
    },
    {
        path: "/usuarios/find/:id",
        method: "get",
        action: usuarioController.findById
    },
    {
        path: "/usuarios",
        method: "post",
        action: usuarioController.save
    },
    {
        path: "/labores/all",
        method: "get",
        action: laborController.all
    },
    {
        path: "/labores/find/:id",
        method: "get",
        action: laborController.findById
    },
    {
        path: "/labores",
        method: "post",
        action: laborController.save
    },
    {
        path: "/medio_pago/all",
        method: "get",
        action: medioPagoController.all
    },
    {
        path: "/medio_pago/find/:id",
        method: "get",
        action: medioPagoController.findById
    },
    {
        path: "/medio_pago/findByUsuario/:usuario",
        method: "get",
        action: medioPagoController.findByUsuario
    },
    {
        path: "/medio_pago",
        method: "post",
        action: medioPagoController.save
    }
];

