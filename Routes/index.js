const routes = require('express').Router();
const promotions = require('./promotions');
const auth = require('./auth');

routes.use('/auth', auth);
routes.use('/promotions', promotions);

module.exports = routes;
