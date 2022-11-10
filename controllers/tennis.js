var tennis = require('../models/tennis');
// List of all tennis
exports.tennis_list = async function(req, res) {
    try{
    theTennises = await tennis.find();
    res.send(theTennises);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};
exports.tennis_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await tennis.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle tennis create on POST.

exports.tennis_create_post = async function (req, res) {
    console.log(req.body)
    let document = new tennis();
    document.Player_Name = req.body.Player_Name;
    document.Player_Age = req.body.Player_Age;
    document.No_Of_Matches_Played = req.body.No_Of_Matches_Played;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle tennis delete form on DELETE.
exports.tennis_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await tennis.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

// Handle tennis update form on PUT.
exports.tennis_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await tennis.findById(req.params.id)
        // Do updates of properties
        if (req.body.Player_Name) toUpdate.Player_Name = req.body.Player_Name;
        if (req.body.Player_Age) toUpdate.Player_Age = req.body.Player_Age;
        if (req.body.No_Of_Matches_Played) toUpdate.No_Of_Matches_Played = req.body.No_Of_Matches_Played;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};


// VIEWS
// Handle a show all view
exports.tennis_view_all_Page = async function (req, res) {
    try {
        thezoos = await tennis.find();
        res.render('tennis', { title: 'tennis Search Results', results: theTennises });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.tennis_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await tennis.findById(req.query.id)
        res.render('tennisdetail',
            { title: 'tennis Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a zoo.
// No body, no in path parameter, no query.
// Does not need to be async
exports.tennis_create_Page =  function(req, res) {
    console.log("create view")
    try{
        res.render('tenniscreate', { title: 'tennis Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a zoo.
// query provides the id
exports.tennis_update_Page =  async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await tennis.findById(req.query.id)
        res.render('tennisupdate', { title: 'Tennis Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.tennis_delete_Page = async function(req, res) {
    console.log("Delete view for id "  + req.query.id)
    try{
        result = await zoo.findById(req.query.id)
        res.render('tennisdelete', { title: 'Tennis Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};