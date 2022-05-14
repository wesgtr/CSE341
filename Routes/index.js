const routes = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth')

const promotions = require('./promotions');
const dashboard = require('./dashboard');
const auth = require('./auth');

routes.use('/auth', auth);
routes.use('/dashboard', dashboard);
routes.use('/promotions', promotions);

routes.get('/', (req, res) => {
  res.send('Welcome! Please authenticate in "/auth/google"')
})

module.exports = routes;
