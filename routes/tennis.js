var express = require('express');
const tennis_controlers= require('../controllers/tennis'); 
var router = express.Router();

/* GET home page. */

// router.get('/', function (req, res, next) {
//     res.render('tennis',{title:'Search Results'});
// });
router.get('/', tennis_controlers.tennis_view_all_Page ); 
router.get('/detail', tennis_controlers.tennis_view_one_Page);
router.get('/create', tennis_controlers.tennis_create_Page);
module.exports = router;
