import express from "express"
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from "mongoose"
import upload from "express-fileupload"
import chat from "./websockets/chat.js"
import usersRoutes from "./routes/usersRoutes.js"
import volunteerRoutes from "./routes/volunteer.js"
import AuthenticationRoute from "./routes/authenticationRoutes.js"
import shelterRoutes from "./routes/shelterRoutes.js"
import breedsRoutes from "./routes/breedsRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import homeRoutes from "./routes/homeRoutes.js"
//Backend
import menuRoutes from "./routes/backend/menu.js"
import userBroutes from "./routes/backend/userBroutes.js"
import chatBroutes from "./routes/backend/chatBroutes.js"
import breedBroutes from "./routes/backend/breedBRoutes.js"
import petCatBRoutes from "./routes/backend/petCatBRoutes.js"
import shelterBRoutes from "./routes/backend/shelterBRoutes.js"
import productBRoutes from "./routes/backend/productBRoutes.js"
import orderBRoutes from "./routes/backend/orderBRoutes.js"
import appContentRoutes from "./routes/backend/appContentRoutes.js"
import twilio from "twilio";

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import Helper from "./helpers/Helper.js"

dotenv.config()

var PORT = process.env.PORT,
DB_URL = process.env.DB_URL

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



mongoose.connect(DB_URL,
{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("Db connected");
});

chat.initChat()

const app = express()
app.use(cors())
app.use(express.json())
app.use(upload())
app.use(express.static('public'))

app.use("/api/home", homeRoutes)
app.use("/api/Authentication", AuthenticationRoute)
app.use("/api/users", usersRoutes)
app.use("/api/volunteer", volunteerRoutes)
app.use("/api/shelter", shelterRoutes)
app.use("/api/breeds", breedsRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)


//Backend
app.use("/api/menu", menuRoutes)
app.use("/api/b_users", userBroutes)
app.use("/api/b_chat", chatBroutes)
app.use("/api/b_breed", breedBroutes)
app.use("/api/b_petCat", petCatBRoutes)
app.use("/api/b_shelter", shelterBRoutes)
app.use("/api/b_product", productBRoutes)
app.use("/api/b_order", orderBRoutes)
app.use("/api/b_content", appContentRoutes)



app.use(express.static(path.join(__dirname, 'backpanel')));

//For Admin Panel UI
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname,'backpanel', 'index.html'));
// });


app.get('/twilio/sendSms',async(req,res) =>{

    let result = await Helper.sendOtp('+923489090034',"633b8360973455037ee616bd");
    res.send({message : "Message Sent"});
})


app.listen(PORT, () =>console.log(`Server running on port: http://localhost:${PORT}`))