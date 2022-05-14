const {ensureAuth} = require("../middleware/auth");
const routes = require('express').Router();

routes.get('/', ensureAuth, async (req, res) => {
  try {
    res.send(`Successfully logged in as ${req.user.firstName}!`)
  } catch (err) {
    console.error(err)
  }
})

module.exports = routes;
