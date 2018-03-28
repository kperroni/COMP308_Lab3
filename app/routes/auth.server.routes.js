const express = require('express');
const passport = require('passport');
const router = express.Router();
const studentController = require('../controllers/student.server.controller');

/*
 * SIGNUP
 */
router.post('/signup', studentController.signup);

/*
 * SIGIN
 */
router.post('/signin', studentController.signin);

/*
 * SIGNOUT
 */
router.get('/signout', studentController.signout);

/*
 * FACEBOOK
 */
router.get('/facebook', passport.authenticate('facebook', {
    failureRedirect: '/signin'
}));

router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin',
    successRedirect:'/'
}));

/*
 * TWITTER
 */
router.get('/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
}));

router.get('/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin',
    successRedirect: '/'
}));

/*
 * GOOGLE OAUTH
 */

router.get('/google', passport.authenticate('google', {
    scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email'
    ],
    failureRedirect: '/signin',    
}));

router.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin',
    successRedirect: '/'
}));


module.exports = router;