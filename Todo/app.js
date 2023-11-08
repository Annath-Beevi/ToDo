const express = require("express")
const app = express();
const connectDB = require("./DB/connect")
const cors = require("cors")
app.use(express.json());
app.use(cors({origin: "http://localhost:5173",}))
require('dotenv').config();
const notFound = require('./Middlewares/not-found')
const errorHandleMiddleware = require('./Middlewares/errorHandler')

const tasks = require("./Routes/tasks")
app.use("/api/tasks",tasks)
app.use(notFound)
app.use(errorHandleMiddleware)


const port = 5000;

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`server listen at port ${port}`))
    } catch(error) {
        console.log(error);
    }
}

start();
