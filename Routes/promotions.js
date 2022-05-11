const routes = require('express').Router();
const promotions = require('../controllers/promotions.js');
const validation = require('../middleware/validate');

routes.get('/', promotions.findAll);

routes.post('/', validation.savePromotion, promotions.create);

routes.put('/:id', validation.savePromotion, promotions.update);

routes.delete('/:id', promotions.delete);

module.exports = routes;
