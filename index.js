import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js";
import jwt from "jsonwebtoken";

const app = express()

app.use(express.json())

app.use(
    (req,res,next)=>{

        let token = req.header("Authorization")

        if(token != null){
            token = token.replace("Bearer ","")
            jwt.verify(token,"jwt-secret",
                (err, decoded)=>{
                    if(decoded == null){
                        res.json({
                            message: "Invalid token please login again"
                        })
                        return
                    }else{
                        req.user = decoded
                    }
                }
            )

        }
        next()
    }
)

const connectionString = ""


mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected")
    }
).catch(
    ()=>{
        console.log("Database connection failed")
    }
)




app.use("/users",userRouter)



app.listen(5000, 
    ()=>{
        console.log("Server is started")
        console.log("Thank you")
    }
)