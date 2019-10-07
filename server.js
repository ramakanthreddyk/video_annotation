var mysql = require('mysql');
var express = require('express');
var app = express();
var router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser');
var jwt = require('jwt-simple');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/api', router);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());
router.use(cors());
const hostName = "videoannotation.csgu2ca8zuyp.us-east-2.rds.amazonaws.com";
const secret = '@nnotation@';
var con = mysql.createConnection({
    host: hostName,
    user: "admin",
    password: "Bittu!9870",
    database: 'annotation_tool'
});

con.connect(function (err) {
    if (err) throw err;
    else {
        console.log("Connected!");
    }
});

app.get('/', function (req, res) {
    res.send('Hello you are connected to the server!');
});

app.listen(3000, function () {
    console.log('app listening on port 3000!');
});


router.get('/users', function (req, res) {
    con.query('SELECT * FROM users', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (data.length != 0) {
                res.json({
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    message: 'data not found'
                });
            }
        }
    });
});


router.get('/assets', function (req, res) {
    con.query('SELECT * FROM asset', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (data.length != 0) {
                res.json({
                    data
                });
            } else {
                res.json({
                    success: false,
                    message: 'data not found'
                });
            }
        }
    });
});

router.post('/deleteUser', function (req, res) {
    const user_id = req.body.user_id;
    con.query('DELETE FROM users WHERE user_id = "' + user_id + '"', function (err, delete_data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (delete_data.length != 0) {
                con.query('SELECT * FROM users', function (err, data) {
                    if (err) {
                        console.log(err);
                        res.json({
                            success: false,
                            message: 'Server error',
                            error: err
                        });
                    } else {
                        if (data.length != 0) {
                            res.json({
                                data: data
                            });
                        } else {
                            res.json({
                                success: false,
                                message: 'data not found'
                            });
                        }
                    }
                });
            } else {
                res.json({
                    success: false,
                    message: 'data not found'
                });
            }
        }
    });
});

router.post('/getAsset', function (req, res) {
    console.log(req.body);
    const timeline_id = req.body.timelineId;
    const user_id = req.body.userId;
    con.query('SELECT * FROM asset WHERE asset.asset_id in (SELECT asset_timeline_cross_table.asset_id from asset_timeline_cross_table INNER JOIN annotator_jobs ON asset_timeline_cross_table.asset_id = annotator_jobs.asset_id WHERE asset_timeline_cross_table.timeline_id = "' + timeline_id + '" and annotator_jobs.annotator_id="' + user_id + '")', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (data.length != 0) {
                res.json({
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    message: 'data not found'
                });
            }
        }
    });
});

router.post('/possible_annotations', function (req, res) {
    const asset_id = req.body.data;
    con.query('SELECT * FROM annotation_key_table WHERE key_type_id in (SELECT key_type_id from annotation_key_map WHERE timeline_id in(SELECT timeline_id from asset_timeline_cross_table WHERE asset_id = "' + asset_id + '"))', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (data.length != 0) {
                res.json({
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    message: 'data not found'
                });
            }
        }
    });
});

router.get('/timeline', function (req, res) {
    con.query('SELECT * FROM timeline', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (data.length != 0) {
                res.json({
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    message: 'data not found'
                });
            }
        }
    });
});


router.post('/register', function (req, res) {
    const data = req.body;
    const encoded_password = jwt.encode(data.password, secret);
    con.query('INSERT INTO  users (First_name,last_name,email,password,user_type) VALUES ("' + data.firstName + '","' + data.lastName + '","' + data.email + '","' + encoded_password + '","' + data.usertype + '")', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (data.length != 0) {
                res.json({
                    success: true,
                    message: 'user registered In successfully',
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    message: 'data not found'
                });
            }
        }
    });
});
router.post('/login', function (req, res) {
    const data = req.body;
    const encoded_password = jwt.encode(data.password, secret);
    con.query('SELECT * FROM users where email = "' + data.email + '"  AND password ="' + encoded_password + '" ', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (data.length != 0) {
                res.json({
                    success: true,
                    message: 'user logged In successfully',
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    message: 'User not found'
                });
            }
        }
    });
});

router.post('/editAnnotationData', function (req, res) {
    const data = req.body.data;
    con.query("UPDATE annotation SET title = '" + data.title + "', description = '" + data.description + "' WHERE annotation_id = " + data.uniqueId + "", function (err, data3) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            con.query("SELECT * FROM annotation WHERE asset_id=" + data.asset_id + "  AND user_id=" + data.user_id + "", function (err, data2) {
                res.json({
                    success: true,
                    message: 'Annotation saved successfully!!',
                    data: data2
                });
            })
        }
    });
});

router.post('/storeAnnotation', function (req, res) {
    const data = req.body;
    con.query('SELECT SEC_TO_TIME(' + data.start_time + ') as annotation_start_time', function (error1, start) {
        con.query('SELECT SEC_TO_TIME(' + data.end_time + ') as annotation_end_time', function (error2, end) {
            con.query("SELECT DISTINCT DATE_FORMAT(asset_from, '%Y-%m-%d %H:%i:%s') as datefrom  FROM asset WHERE asset_id=" + data.asset_id + "", function (error3, datefrom) {
                con.query('SELECT ADDTIME("' + datefrom[0].datefrom + '", "' + start[0].annotation_start_time + '") as assetfrom', function (error4, assetfrom) {
                    con.query('SELECT ADDTIME("' + datefrom[0].datefrom + '", "' + end[0].annotation_end_time + '") as assetto', function (error5, assetto) {
                        con.query('INSERT INTO annotation (user_id, asset_id, start_time, end_time, title, description, key_type_id, vote_up, vote_down, asset_annotation_start_time, asset_annotation_end_time, annotation_id) VALUES ("' + data.user_id + '", "' + data.asset_id + '", "' + data.start_time + '", "' + data.end_time + '", "' + data.title + '", "' + data.description + '", "' + data.key_type_id + '" , "' + data.vote_up + '", "' + data.vote_down + '", "' + assetfrom[0].assetfrom + '", "' + assetto[0].assetto + '", "' + data.annotation_id + '" )', function (error6, data3) {
                            if (error1 || error2 || error3 || error4 || error5 || error6) {
                                res.json({
                                    success: false,
                                    message: 'Server error',
                                    error: error1
                                });
                            } else {
                                con.query("SELECT * FROM annotation WHERE asset_id=" + data.asset_id + " AND user_id=" + data.user_id + "", function (error, data2) {
                                    res.json({
                                        success: true,
                                        message: 'Annotation saved successfully!!',
                                        data: data2
                                    });
                                })

                            }
                        });
                    })
                })
            });
        });
    });
});


router.post('/getPreStoredAnnotations', function (req, res) {
    const asset_id = req.body.asset_id;
    const user_id = req.body.user_id;
    con.query('SELECT * FROM annotation WHERE asset_id  = "' + asset_id + '"  AND user_id = "' + user_id + '"', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (data.length != 0) {
                res.json({
                    success: true,
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    message: 'data not found'
                });
            }
        }
    });
});


router.post('/deleteAnnotation', function (req, res) {
    const annotation_id = req.body.annotation_id;
    const asset_id = req.body.asset_id;
    const user_id = req.body.user_id;
    con.query('DELETE FROM annotation WHERE annotation_id  = "' + annotation_id + '" ', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            con.query("SELECT * FROM annotation WHERE asset_id=" + asset_id + " AND user_id=" + user_id + "", function (err, data2) {
                res.json({
                    success: true,
                    message: 'Annotation deleted successfully!!',
                    data: data2
                });
            })
        };
    });
});



router.post('/voteUp', function (req, res) {
    const annotation_id = req.body.annotation_id;
    const asset_id = req.body.asset_id;
    const user_id = req.body.user_id;
    con.query('UPDATE annotation SET vote_up = vote_up + 1 WHERE annotation_id  = "' + annotation_id + '" ', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            con.query("SELECT * FROM annotation WHERE asset_id=" + asset_id + " AND user_id=" + user_id + "", function (err, data2) {
                res.json({
                    success: true,
                    message: 'Voted successfully!!',
                    data: data2
                });
            })
        };
    });
});

router.post('/voteDown', function (req, res) {
    const annotation_id = req.body.annotation_id;
    const asset_id = req.body.asset_id;
    const user_id = req.body.user_id;
    con.query('UPDATE annotation SET vote_down = vote_down + 1 WHERE annotation_id  = "' + annotation_id + '" ', function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            con.query("SELECT * FROM annotation WHERE asset_id=" + asset_id + " AND user_id=" + user_id + "", function (err, data2) {
                res.json({
                    success: true,
                    message: 'Voted successfully!!',
                    data: data2
                });
            })
        };
    });
});

router.post('/assignAssetsToAnnotator', function (req, res) {
    const data = req.body;
    data.asset_idList.forEach((id) => {
        con.query('INSERT INTO `annotator_jobs` ( `annotator_id` , `asset_id` ) SELECT * FROM (SELECT "' + data.annotator_id + '","' + id + '") AS tmp WHERE NOT EXISTS (SELECT `annotator_id` FROM `annotator_jobs` WHERE `annotator_id` = "' + data.annotator_id + '" AND `asset_id` = "' + id + '") LIMIT 1', function (err, data) {
            if (err) {
                console.log(err);
                res.json({
                    success: false,
                    message: 'Server error',
                    error: err
                });
            }
        });
    });
    res.json({
        success: true,
        message: 'Asset assigned successfully!!'
    });
});


router.post('/assignEvaluatorJobs', function (req, res) {
    const data = req.body;
    data.annotator_idList.forEach((annotator_id) => {
        con.query('SELECT * FROM annotator_jobs WHERE annotator_id =' + annotator_id, function (err, annotatordata) {
            annotatordata.forEach((annotat) => {
                con.query('SELECT timeline_id FROM asset_timeline_cross_table WHERE asset_id =' + annotat.asset_id, function (error1, time) {
                    con.query('INSERT INTO `evaluator_jobs` ( `evaluator_id`, `annotator_id` , `asset_id`, `timeline_id` ) SELECT * FROM (SELECT "' + data.evaluator_id + '","' + annotat.annotator_id + '","' + annotat.asset_id + '", "' + time[0].timeline_id + '") AS t1 WHERE NOT EXISTS (SELECT evaluator_id,annotator_id FROM evaluator_jobs AS t2 WHERE t2.evaluator_id ="' + data.evaluator_id + '" AND t2.annotator_id = "' + annotat.annotator_id + '" AND t2.asset_id = "' + annotat.asset_id + '") LIMIT 1',
                        function (err, evaluatorJobs) { });
                });
            });
        });
    });
    res.json({
        success: true,
        message: 'Assigned Evaluator Jobs successfully!!'
    });
});

router.post('/getJobs', function (req, res) {
    const evalId = req.body.evalId;
    con.query('SELECT * FROM evaluator_jobs WHERE evaluator_id =' + evalId, function (err, data) {
        if (err) {
            console.log(err);
            res.json({
                success: false,
                message: 'Server error',
                error: err
            });
        } else {
            if (data.length != 0) {
                res.json({
                    data: data
                });
            } else {
                res.json({
                    success: false,
                    message: 'data not found'
                });
            }
        }
    });
});

// aws upload videos
const hostEndPoint = new aws.Endpoint(hostName);
const fileUploadBucket = 'https://useruploadvideos.s3.eu-central-1.amazonaws.com';

const s3Config = new aws.S3({
    accessKeyId: 'AKIAI2X6A7CP3M3ZBH6A',
    secretAccessKey: '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',
    Bucket: hostEndPoint
});


const upload = multer({
    storage: multerS3({
        s3: s3Config,
        bucket: 'useruploadvideos',
        acl: 'public-read',
        key: (request, file, cb) => {
            console.log(file);
            cb(null, file.originalname);
        },
    })
}).single('upload', 1);

router.post('/uploadAssets', (request, response, next) => {
    upload(request, response, (error) => {
        if (error) {
            console.log(error);
        }
        const filePath = `${fileUploadBucket}/${request.file.originalname}`;
        con.query(`INSERT INTO userUploadAssets (filePath) VALUES ('${filePath}')`, (err, data) => {
            if (!err) {
                console.log('File uploaded successfully.');
                response.status(200).json({ success: true, message: 'File uploaded successfully.' });
            } else {
                console.log(err);
            }
        });
    });
});

router.get('/getUserUploadAssets', (req, res) => {
    con.query('SELECT * FROM userUploadAssets', (err, data) => {
        if (!err) {
            res.status(200).send({success: true, data: data});
        } else {
            console.log(err);
        }
    })
})