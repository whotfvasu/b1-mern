const express = require("express")

const app = express()

const mongoose = require("mongoose")

const dotenv = require("dotenv")

const User = require("./models/user.model")

dotenv.config()

mongoose
    .connect(process.env.URI)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(process.env.PORT || 8000 , (err)=>{
            if(err){
                console.log(err)
                }else{
                    console.log("Server is running on port ",process.env.PORT)
                    }
        })
    })
    .catch((err) => {
        console.log("error", err)
    })

app.post("/", async (req,res) => {
    const {name,email,password} = req.body
    
    

    try{
        const userAdded = await User.create({
            name: name,
            email: email,
            password: password
        })
        res.status(201).json(userAdded)
    }
    catch(err){
        res.send(400).json({error:error.message})
    }
})

app.get('/', (req, res) => {
    res.send("api running")
})



