import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import userRouter from './Src/Routes/user.routes.js'


const app=express()

app.use(cors({
     origin:[process.env.ORIGIN],
     methods:['GET','POST','PUT','PATCH','DELETE'],
     credentials:true,
}))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(morgan(' :method :url :response-time'))

app.use(cookieParser())


app.use('/api/v1',userRouter)


export default app;
