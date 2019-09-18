const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js');

router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      console.log(users)
      res.json({ users, loggedInUser: req.users});
    })
    .catch(err => res.send(err));
});

module.exports = router;
