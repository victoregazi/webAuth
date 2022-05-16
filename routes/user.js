const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

//User model
const User = require('/Users/victoregazi/Desktop/registerhbs/model/User.js');

router.get('/login', (req, res) => {
    res.render('login');
})
router.get('/register', (req, res) => {
    res.render('register');
})

//Create a new user in the database
router.post('/register', async (req, res) => {
    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword
  });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user
      .save(user)
      .then((data) => {
          res.render('login.hbs')
      })
});












module.exports = router;