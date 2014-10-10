var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
  res.render('index', { title: 'Express' });
});

/* new router for our tutorial */
router.get("/helloworld", function (req, res) {
	res.render('helloworld', {
		title: "Hello, World!!"
	})
});

/* new router to be able to pull data from db collection */
router.get('/userlist', function (req, res) {
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({}, {}, function(e,docs) {
		res.render('userlist', {
			"userlist": docs
		});
	});
});

/* here is how we get data into our db collection */
router.post('/adduser', function (req, res) {
	// set our internal db variable
	var db = req.db;
	// get our form values. these rely on the name attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;
	// set our collectoin
	var collection = db.get('usercollection');
	// submit to the db
	collection.insert({
		"username": userName,
		"email": userEmail
	}, function (err, doc) {
		if (err) {
			// if it failed return error
			res.send("there was a problem adding the information to the database.")
		}
		else {
			// if it worked, set the header so the address bar doesn't still say /adduser
			res.location("userlist");
			// add forward to success page
			res.redirect("userlist");
		}
	});
});


/* adding a route so that we can input data to database through webpage */
/* GET New User page. */
router.get('/newuser', function (req, res) {
    res.render('newuser', { title: 'Add New User' });
});

module.exports = router;
