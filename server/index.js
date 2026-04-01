import dotenv from "dotenv"
dotenv.config()

import app from "./server.js"
import mongodb from "mongodb"
import ReviewsDAO from "./dao/reviewsDAO.js"

const MongoClient=mongodb.MongoClient
const mongo_username=process.env['MONGO_USERNAME']
const mongo_password=process.env['MONGO_PASSWORD']
const uri=`mongodb+srv://${mongo_username}:${mongo_password}@cluster0.pw6yc6m.mongodb.net/?appName=Cluster0`
const port=8000

MongoClient.connect(
    uri,
    {
        maxPoolSize:50,
        wtimeoutMS:2500,
        
    })

    .catch(err =>{
        console.error(err.stack)
        process.exit(1)
    })

    .then(async client =>{
        await ReviewsDAO.injectDB(client)
        app.listen(port,()=>{
            console.log(`listening on port ${port}`)
        })
    })




//Uo6A97byjW1gifEC
//mohammadnihal86357_db_user
//mongodb+srv://mohammadnihal86357_db_user:Uo6A97byjW1gifEC@cluster0.pw6yc6m.mongodb.net/?appName=Cluster0

