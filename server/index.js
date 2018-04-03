const express = require("express");
const bodyParser = require("body-parser");
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const app = express();
const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

app.use( bodyParser.json())
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    // cookie: {
    //     maxAge: 100000000
    // }
}))

app.use(checkForSession); 
app.use( express.static( `${__dirname}/build` ) );

app.get('/api/swag', swag_controller.read)

app.post('/api/login', auth_controller.login)
app.post('/api/register', auth_controller.register)
app.post('/api/signout', auth_controller.signout)
app.get('/api/user',auth_controller.getUser)

app.post('/api/cart', cart_controller.add)
app.post('/api/cart/checkout', cart_controller.checkout)
app.delete('/api/cart', cart_controller.delete)

app.get('/api/search', search_controller.search)

const port = process.env.PORT || 3000;
app.listen( port, ()=> {console.log(`Server listening on port ${port}.`)})