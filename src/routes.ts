import * as usuarioController from "./controller/UsuarioController";

export const AppRoutes = [
    {
        path: "/usuarios/all",
        method: "get",
        action: usuarioController.all
    },
    {
        path: "/usuarios/find/:id",
        method: "get",
        action: usuarioController.find
    },
    {
        path: "/usuarios",
        method: "post",
        action: usuarioController.save
    }
];

