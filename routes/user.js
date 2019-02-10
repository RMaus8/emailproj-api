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
    console.log(req.session)
    if(req.session && req.session.user) {
        res.sendFile('/home.html', { root: './public' })
    } else {
        res.sendFile('/index.html', { root: './public' })
    }    
})

router.post('/', (req, res) => {
    const userData = req.body;
    User.findOne({email: userData.email})
        .then(user => {
            if(user.password === userData.password) {
                req.session.user = userData.email;
                res.redirect('/home')
            } else if ( user.length <= 0 ){
                res.redirect('/create')
            } else {
                res.send('password was incorrect')
            }
        })
        .catch(err => res.sendFile('/create.html', { root: './public' }))
})

router.get('/home', auth, (req, res) => {
    res.sendFile('/home.html', { root: './public' })
})

router.get('/create', auth, (req, res) => {
    res.sendFile('/create.html', { root: './public' })
})

router.post('/create', (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password
    });

    newUser.save().then( () => res.redirect('/'))
})

router.get('/logout', (req, res, next) => {
    if (req.session) {
      // delete session object
      req.session.destroy((err) => {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      });
    }
  });

router.get('/change', auth, (req, res) => {
    res.sendFile('/change.html', {root: './public'})
})

router.post('/change', (req, res) => {
    const oldData = req.body.oldEmail
    const newData = { email: req.body.newEmail, password: req.body.newPassword };
    User.findOneAndUpdate({email: oldData}, { $set: {"email": newData.email, "password": newData.password}})
        .then(() => res.redirect('/'))
        .catch(err => res.send(err));
})

module.exports = router;