const fileUpload = require('express-fileupload');

export function uplodadImage(file: any): string {
    if (!file) throw Error("Imagen Requerida");
    const { imagen } = file;

    const fileName: string = Date.now().toString() + '_' + imagen.name;
    imagen.mv(process.env.PATH_IMG + '/' + fileName);

    return fileName;


}