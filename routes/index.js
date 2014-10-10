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


module.exports = router;
