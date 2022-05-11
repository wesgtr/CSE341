const validate = require('../helpers/validate');

const savePromotion = (req, res, next) => {
  const validationRule = {
    promo_percentage: 'required|integer',
    promo_name: 'required|string',
    promo_description: 'required|string',
    promo_url: 'required|string',
    promo_start: 'required|date',
    promo_end: 'required|date',
  };
  validate(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savePromotion
};