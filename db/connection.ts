import { Sequelize } from "sequelize";

const db = new Sequelize('express', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});

export default db;