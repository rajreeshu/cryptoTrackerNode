const express = require('express');
const app = express();

//ejs
app.set('view engine', 'ejs');
//json
app.use(express.json());
app.use(express.urlencoded({ extended:false}));
app.use('/assets',express.static('assets')); //this should be above routes to prevent assets file from going to 404 error.
//
const router = require('./router');
app.use("/",router)
//setting up mongoose
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const mongo_url = process.env.MONGO_URL;

try{
    mongoose.connect(mongo_url);
    console.log('db connected')
}catch(err){
    console.log("db connection failed");
}

const port=5000;
app.listen(port,()=>{
    console.log("app running on http://localhost:"+port);
})
app.locals.baseURL ="http://localhost:"+port;