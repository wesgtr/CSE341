const db = require('../models');
const Promotions = db.promotions;

const apiKey =
  'E3E1815E2BB889BAB7DCCFF7E6F70E3DEAFCA9A9CE8FB22F297798814A3B4E0A';

exports.create = async (req, res) => {

  if (!req.body.promo_percentage) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  const promotion = new Promotions({
    promotion_id: req.body.promotion_id,
    promo_percentage: req.body.promo_percentage,
    promo_name: req.body.promo_name,
    promo_description: req.body.promo_description,
    promo_url: req.body.promo_url,
    promo_start: req.body.promo_start,
    promo_end: req.body.promo_end,
    promo_owner: req.body.promo_owner
  });
  promotion
    .save(promotion)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the promotion.',
      });
    });
};

exports.findAll = async (req, res) => {
  if (req.header('apiKey') === apiKey) {
    Promotions.find({})
      .then((data) => {
        console.log('data', data)
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || 'Some error occurred while retrieving promotions.',
        });
      });
  } else {
    res.send('Invalid apiKey, please read the documentation2.');
  }
};

// exports.findOne = async (req, res) => {
//   const promotion_id = req.params.id;
//   if (req.header('apiKey') === apiKey) {
//     Promotions.find({ promotion_id: promotion_id })
//       .then((data) => {
//         if (!data)
//           res
//             .status(404)
//             .send({ message: 'Not found promotion with id ' + promotion_id });
//         else res.send(data[0]);
//       })
//       .catch((err) => {
//         res.status(500).send({
//           message: 'Error retrieving promotion with promotion_id=' + promotion_id,
//         });
//       });
//   } else {
//     res.send('Invalid apiKey, please read the documentation.');
//   }
// };

exports.update = (req, res) => {
  const id = req.params.id;

  Promotions.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Promotion with id=${id}. Maybe Promotion was not found!`,
        });
      } else res.send({ message: 'Promotion was updated successfully.' });
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Promotion with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Promotions.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Promotion with id=${id}. Maybe Promotion was not found!`,
        });
      } else {
        res.send({
          message: 'Promotion was deleted successfully!',
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Promotion with id=' + id,
      });
    });
};

