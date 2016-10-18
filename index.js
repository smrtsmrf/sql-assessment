var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://smrtsmrf@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(err, resp){
        if (err) {
            console.log(err)
        }
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(err, resp){
        if (err) {
            console.log(err)
        }
      console.log("Vehicle Table Init")
    });
})

app.get('/api/users', function(req, res) {
    db.get_users(function(err, resp) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.get('/api/vehicles', function(req, res) {
    db.get_vehicles(function(err, resp) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.post('/api/users', function(req, res) {
    db.post_user(req.body.firstname, req.body.lastname, req.body.email, function(err, resp) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.post('/api/vehicles', function(req, res) {
    db.post_vehicle(req.body.make, req.body.model, req.body.year, parseInt(req.body.ownerId), function(err, resp) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.get('/api/users/:userId/vehiclecount', function(req, res) {
    db.vehicle_count(parseInt(req.params.userId), function(err, resp) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.get('/api/user/:userId/vehicle', function(req, res) {
    db.user_vehicles(parseInt(req.params.userId), function(err, resp) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.get('/api/vehicle', function(req, res) {
    if (req.query.userFirstStart) {
        var query = req.query.userFirstStart + '%';
        db.get_vehicle_by_firstname(query, function(err, resp) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(resp)
            }
        })
    } else {
        db.get_vehicle_by_email(req.query.email, function(err, resp) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.status(200).send(resp)
            }
        })
    }
})

app.get('/api/newervehiclesbyyear', function(req, res) {
    var year = 2000;
    db.vehicles_by_year(year, function(err, resp) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res) {
    var vehicleId = parseInt(req.params.vehicleId);
    var userId = parseInt(req.params.userId);
    db.change_ownership(vehicleId, userId, function(err, resp) {
         if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res) {
    var vehicleId = parseInt(req.params.vehicleId);
    var userId = parseInt(req.params.userId);
    db.orphan_vehicle(vehicleId, function(err, resp) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.delete('/api/vehicle/:vehicleId', function(req, res) {
    var id = parseInt(req.params.vehicleId);
    db.remove_vehicle(id, function(err, resp) {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(resp)
        }
    })
})

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
