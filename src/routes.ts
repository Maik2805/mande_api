import * as usuarioController from "./controller/UsuarioController";
import * as laborController from "./controller/LaborController";
import * as medioPagoController from "./controller/MedioPagoController";
import * as servicioController from "./controller/ServicioController";
import * as pagoController from "./controller/PagoController";
import * as loginController from "./controller/LoginController";

export const AppRoutes = [
    {
        path: "/app/login",
        method: "post",
        action: loginController.login,
        adminRequired: false,
        notLogged: true
    },
    {
        path: "/app/register",
        method: "post",
        action: loginController.register,
        notLogged: true
    },
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
        path: "/usuarios/addLaborUsuario",
        method: "post",
        action: usuarioController.addLaborUsuario
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
    },
    {
        path: "/servicios/all",
        method: "get",
        action: servicioController.all
    },
    {
        path: "/servicios/find/:id",
        method: "get",
        action: servicioController.findById
    },
    {
        path: "/servicios/findByCliente/:usuario",
        method: "get",
        action: servicioController.findByCliente
    },
    {
        path: "/servicios/findByTrabajador/:usuario",
        method: "get",
        action: servicioController.findByTrabajador
    },
    {
        path: "/servicios",
        method: "post",
        action: servicioController.save
    },
    {
        path: "/pagos/all",
        method: "get",
        action: pagoController.all
    },
    {
        path: "/pagos/findByServicio/:servicio",
        method: "get",
        action: pagoController.findByServicioId
    },
    {
        path: "/pagos/findById/:id",
        method: "get",
        action: pagoController.findById
    },
    {
        path: "/pagos",
        method: "post",
        action: pagoController.save
    },
];

