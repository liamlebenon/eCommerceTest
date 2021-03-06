const express = require('express');
const app = express();
//Importing morgan for logging data
const morgan = require('morgan');
//Importing body parsing middleware
const bodyParser = require('body-parser');
const db = require('./db');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
//importing the passport function from Passportconfig
const initializePassport = require('./passportConfig');

initializePassport(passport);

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//LOGGING AND PARSING
//Using morgan to log data
app.use(morgan('dev'));
//Using body-parser to parse.  Will extract JSON data and make it more easily readable
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Routers for API
const homeRouter = require('./api/routes/home');
const productsRouter = require('./api/routes/products');
const ordersRouter = require('./api/routes/orders');
const usersRouter = require('./api/routes/users');
const signupRouter = require('./api/routes/signup');
const loginRouter = require('./api/routes/login/login');
const authRouter = require('./api/routes/login/auth');
//importing pool so we can CRUD DB data
const pool = require('./db');



//HEADERS
//Append headers to any response we send back.  Should be done before routes
app.use((req, res, next) => {
    //Will not send response, it will adjust it so response has header
    res.header('Access-Control-Allow-Origin', '*');
    //Define which kind of headers to allow access.
    res.header('Access-Control-Allow-Headers', '*');
    //Browser checks if you are allowed to make a specific request
    if(req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});


//ROUTERS
//Mounting the routers
app.use('/', homeRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/auth', authRouter);

//ERROR HANDLING
//Can handle errors by catching all requests passing the 2 middlewares
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    //This will forward the error request instead of original
    next(error);
});

//Should handle errors thrown from anywhere else in the application
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        //Returning an error object with a message in JSON format
        error: {
            message: error.message
        }
    })
});

module.exports = app;