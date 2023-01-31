const fileUpload = require('express-fileupload');

export function uplodadImage(file: any): string {
    if (!file) throw Error("Imagen Requerida");
    const { imagen } = file;

    const fileName: string = Date.now().toString() + '_' + imagen.name;
    imagen.mv(process.env.PATH_IMG + '/' + fileName);

    return fileName;
}

export function uplodadDoc(file: any): string {
    if (!file) throw Error("Documento Requerido");
    const { documento } = file;

    const fileName: string = Date.now().toString() + '_' + documento.name;
    documento.mv(process.env.PATH_DOC + '/' + fileName);

    return fileName;
}