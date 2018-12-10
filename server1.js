var mysql = require('mysql');
var express = require('express');
var app = express();
var router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(cors());
router.use(cors());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'test'
});

con.connect(function(err) {
  if (err) throw err;
  else {
    console.log("Connected!");
  }
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3100, function () {
  console.log('app listening on port 3000!');
});




router.get('/users', function(req, res) {
  con.query('SELECT * FROM users', function(err, data) {
    if(err) {
      console.log(err);
      res.json({success: false, message: 'Server error', error: err});
    } else {
      if(data.length != 0) {
        res.json({data: data});
      } else {
        res.json({success: false, message: 'data not found'});
      }
    }
  });
});

router.get('/assets', function(req, res) {
    con.query('SELECT * FROM asset', function(err, data) {
      if(err) {
        console.log(err);
        res.json({success: false, message: 'Server error', error: err});
      } else {
        if(data.length != 0) {
          res.json({data: data});
        } else {
          res.json({success: false, message: 'data not found'});
        }
      }
    });
});




router.post('/annotations', function(req, res) {
  const asset = req.body.data;
    con.query('SELECT * FROM key_table WHERE type_id in (SELECT type_id from key_map WHERE timeline_name in(SELECT timeline_name from timeline WHERE timeline.asset = "'+asset+'"))', function(err, data) {
      if(err) {
        console.log(err);
        res.json({success: false, message: 'Server error', error: err});
      } else {
        if(data.length != 0) {
          res.json({data: data});
        } else {
          res.json({success: false, message: 'data not found'});
        }
      }
    });
});

router.get('/timeline', function(req, res) {
  con.query('SELECT * FROM timeline', function(err, data) {
    if(err) {
      console.log(err);
      res.json({success: false, message: 'Server error', error: err});
    } else {
      if(data.length != 0) {
        res.json({data: data});
      } else {
        res.json({success: false, message: 'data not found'});
      }
    }
  });
});

router.post('/login', function(req, res) {
  const data = req.body;
  con.query('SELECT * FROM users where email = "'+data.email+'"  AND password ="'+data.password+'" ', function(err, data) {
    if(err) {
      console.log(err);
      res.json({success: false, message: 'Server error', error: err});
    } else {
      if(data.length != 0) {
        res.json({success: true, message: 'user logged In successfully', data: data});
      } else {
        res.json({success: false, message: 'User not found'});
      }
    }
  });
});

router.post('/storeAnnotation', function(req, res) {
  const data = req.body;
  con.query('INSERT INTO video_annotation (user_id, asset_id, start_time, end_time, title, description, type_id, user_name) VALUES ("'+data.user_id+'", "'+data.asset_id+'", "'+data.start_time+'", "'+data.end_time+'", "'+data.title+'", "'+data.description+'", "'+data.type_id+'" , "'+data.user_name+'" )', function(err, data) {
    if(err) {
      console.log(err);
      res.json({success: false, message: 'Server error', error: err});
    } else {
      res.json({success: true, message: 'Annotation saved successfully'});
    }
  });
});


router.post('/getPreStoredAnnotations', function(req, res) {
  const asset_id = req.body.asset_id;
  const user_id = req.body.user_id;
    con.query('SELECT * FROM video_annotation WHERE asset_id  = "'+asset_id+'"  AND user_id = "'+user_id+'"', function(err, data) {
      if(err) {
        console.log(err);
        res.json({success: false, message: 'Server error', error: err});
      } else {
        if(data.length != 0) {
          res.json({success: true, data: data});
        } else {
          res.json({success: false, message: 'data not found'});
        }
      }
    });
});