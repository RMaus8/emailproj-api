const express = require('express');
const router = express.Router();

//model
const User = require('../model/user');

const auth = (req, res, next) => {
    if(req.session && req.session.user) {
        return next();
    } else {
        return res.redirect('/')
    }
}

router.get('/', (req, res) => {
    if(req.session && req.session.user) {
        res.json({email: req.session.user, valid: true, message: null})
    } else {
        res.json({email: null, valid: false, message: 'please log in'})
    }    
})

router.post('/', (req, res) => {
    const userData = req.body.user;
    User.findOne({email: userData.email})
        .then(user => {
            if(user.password === userData.password) {
                req.session.user = userData.email;
                res.json(user)
            } else {
                res.json({valid: false, message: 'wrong password'})
            }
        })
        .catch(err => res.json({valid: false, message: 'user doesn\'t exist'}))
})

router.get('/create', auth, (req, res) => {
    res.json({message: 'create a login'})
})

router.post('/create', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
        valid: true,
        message: null
    });

    newUser.save().then( (user) => res.json(user))
})

router.get('/logout', (req, res, next) => {
    if (req.session) {
      req.session.destroy((err) => {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });

// router.get('/change', auth, (req, res) => {
//     res.sendFile('/change.html', {root: './public'})
// })

router.post('/change', (req, res) => {
    const oldData = req.body.user.email
    console.log(req.body)
    const newData = { email: req.body.newUserName, password: req.body.newPassword };
    if(newData.email === null) {
        newData.email = req.body.user.email;
    }
    User.findOneAndUpdate({email: oldData}, { $set: {"email": newData.email, "password": newData.password}})
        .then(() => res.redirect('/logout'))
        .catch(err => res.json({valid: false, message: err}));
})

module.exports = router;