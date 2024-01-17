import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import employeeRouter from './routes/employee.route';
import userRouter from './routes/user.route';
import { connectToDB } from './utils/database'

const app = express()

app.use(json())
app.use(cors({ origin: '*' }))
app.use('/api/v1/employee', employeeRouter)
app.use('/api/v1/user', userRouter)

connectToDB()

app.listen(5001, () => {
    console.log('Server is running at port 5001')
})