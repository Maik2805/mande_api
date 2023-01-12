const fileUpload = require('express-fileupload');

export function uplodadImage(file: any): string {
    console.log(file.constructor);
    const { imagen } = file;

    // If no image submitted, exit
    //if (!image) return res.sendStatus(400);
    const fileName: string = Date.now().toString() + '_' + imagen.name;
    imagen.mv(process.env.PATH_IMG + '/' + fileName);

    return fileName;


}