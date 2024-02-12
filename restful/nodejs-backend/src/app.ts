import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import http from 'http';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';
import ServerResponse from './utils/ServerResponse';
import swaggerDocs from './utils/swagger';

config()

const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT

swaggerDocs(app)

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin: "*" }))
app.disable('x-powered-by');

app.use('/api/v1/user', userRouter)
app.use('/api/v1/auth', authRouter)
app.use("*", (req, res) => {
    return ServerResponse.error(res, "Route not found")
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})