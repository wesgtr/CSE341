const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session')

const connectDB = require('./config/db');

dotenv.config({ path: './config/.env' })

require('./config/passport')(passport)

connectDB()

const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


app.use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', require('./Routes'))

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    // store: MongoStore.create({mongoUrl: process.env.MONGO_URI,}),
  })
)

app.use(passport.initialize())
  .use(passport.session())

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
