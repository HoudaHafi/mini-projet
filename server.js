const express = require('express');
const morgan = require('morgan')

const productRoute = require('./routes/product');
const userRoute = require('./routes/user');

require('./config/connect');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(morgan('combined'))

app.use('/product', productRoute);
app.use('/user', userRoute);

app.use('/getimage', express.static('./uploads'))

const port = process.env.PORT
app.listen(port, ()=>{
    console.log(`server work in port : ${port}`);
});