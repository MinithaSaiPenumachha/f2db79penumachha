var express = require('express');
const tennis_controlers= require('../controllers/tennis'); 
var router = express.Router();

const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}

/* GET home page. */

// router.get('/', function (req, res, next) {
//     res.render('tennis',{title:'Search Results'});
// });
router.get('/', tennis_controlers.tennis_view_all_Page ); 
router.get('/detail', tennis_controlers.tennis_view_one_Page);
router.get('/create', secured, tennis_controlers.tennis_create_Page);
router.get('/update', secured, tennis_controlers.tennis_update_Page);
router.get('/delete', secured, tennis_controlers.tennis_delete_Page);
module.exports = router;
