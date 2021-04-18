import express, { Application } from "express";
import userRoutes from "../routes/usuario";
import cors from "cors";
import db from "../db/connection";

class Server {
    private app: express.Application;
    private port: string;
    private apiPath = {
        usuarios: '/api/usuarios'
    }
    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000';

        this.dbConnection();
        this.midlewares();
        this.routes();

    }
    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Databse Online");
        } catch (error) {
            console.log(error)

        }
    }
    routes() {
        this.app.use(this.apiPath.usuarios, userRoutes)
    }
    midlewares() {
        //CORS
        this.app.use(cors());
        //Lectura de body
        this.app.use(express.json());
        //Carpeta Publica
        this.app.use(express.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor funcionando en el puerto: ' + this.port);
        })
    }
}

export default Server;