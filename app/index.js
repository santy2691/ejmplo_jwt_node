const express = require('express');
const morgan = require('morgan');
const createRole = require("./libs/initialSetup");
require('./database');

createRole();

const app = express();
app.use(morgan('dev'));

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// llamada de la rutas 
app.use("/api/products",require('./routes/products.routes'));
app.use("/api/auth",require('./routes/auth.routes'));



app.listen(3000,()=>{
    console.log("escuchando en el puerto 3000");
});