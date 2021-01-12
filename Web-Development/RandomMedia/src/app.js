require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override'); // Para poder usar los métodos PUT y DELETE
const session = require('express-session');
const cookieParser = require('cookie-parser');

const createLocals = require('./middlewares/createLocals');
const hasCookie = require('./middlewares/hasCookie');
const isAdmin = require('./middlewares/isAdmin');

// ************ Middlewares ************ //
app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({secret:process.env.SESSION_SECRET}));

app.use(hasCookie);
app.use(createLocals);

// ************ Template Engine ************ //
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ************ Route System require and use() ************ //
const mainRouter = require('./routes/mainRouter');
const userRouter = require('./routes/userRouter');
const newsRouter = require('./routes/newsRouter');
const endpointsRouter = require('./routes/endpointRouter');
const adminRouter = require('./routes/adminRouter');

app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/news', newsRouter);
app.use('/endpoints', endpointsRouter);
app.use('/admin', isAdmin, adminRouter);

// ************ Route System require and use() ************ //
app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));