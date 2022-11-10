var express = require('express'); 
var router = express.Router(); 
 
// Require controller modules. 
var api_controller = require('../controllers/api'); 
var tennis_controller = require('../controllers/tennis'); 
 
/// API ROUTE /// 
 
// GET resources base. 
router.get('/', api_controller.api); 
 
/// COSTUME ROUTES /// 
 
// POST request for creating a Costume.  
router.post('/tennises', tennis_controller.tennis_create_post); 
 
// DELETE request to delete Costume. 
router.delete('/tennises/:id', tennis_controller.tennis_delete); 
 
// PUT request to update Costume. 
router.put('/tennises/:id', tennis_controller.tennis_update_put); 
 
// GET request for one Costume. 
router.get('/tennises/:id', tennis_controller.tennis_detail); 
 
// GET request for list of all Costume items. 
router.get('/tennises', tennis_controller.tennis_list); 
 
module.exports = router; 
 