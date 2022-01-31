const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const hbs=require('hbs')
const app = express();
const connectDB= require('./server/database/connection')
dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();
// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "hbs")
hbs.registerPartials(path.join(__dirname,'views/partials'));

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

// load routers
app.use('/', require('./server/routes/router'))
app.use(express.urlencoded({ extended: true }));
  

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});