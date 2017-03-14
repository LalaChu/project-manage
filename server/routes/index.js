var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
    // res.redirect('/login');
});

router.get('/login', function(req, res) {
    res.render('login')
})
router.get('/register', function(req, res) {
    res.render('login')
})

module.exports = function (app) {
    app.use('/', router);
};
