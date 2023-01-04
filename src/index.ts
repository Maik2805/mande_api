import { AppDataSource } from "./data-source"
import { Usuario } from "./entity/Usuario"

AppDataSource.initialize().then(async () => {

    //INICIA CON npm start

    // console.log("Inserting a new user into the database...")
    // const user = new Usuario()
    // user.id = "12354"
    // user.name = "Timber"
    // user.email = "email"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    console.log("Loading users from the database...")
    const userRepository = AppDataSource.getRepository(Usuario)
    const usuarios: Usuario[] = await userRepository.find()
    // const users = await AppDataSource.manager.find()
    console.log("Loaded users: ", usuarios)

    console.log("Here you can setup and run express / fastify / any other framework.")

}).catch(error => console.log(error))
