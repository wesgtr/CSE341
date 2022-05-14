const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config({ path: './config/.env' })

require('./config/passport')(passport)

connectDB()

const app = express();

app.use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
  })
)

app.use(passport.initialize())
app.use(passport.session())
app.use('/', require('./Routes'))

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
