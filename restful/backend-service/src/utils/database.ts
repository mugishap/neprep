import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const databaseUsername: string = process.env.DATABASE_USERNAME as string
const databasePassword: string = process.env.DATABASE_PASSWORD as string
const databaseName: string = process.env.DATABASE_NAME as string

// const sequelize = new Sequelize('', {})

const sequelize = new Sequelize(databaseName, databaseUsername, databasePassword, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

export const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error({ message: 'Unable to connect to the database:', error: error });
    }
}

export default sequelize