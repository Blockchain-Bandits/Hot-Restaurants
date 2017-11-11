var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var resObj = {
    reservations:[]
};

fs.readFile("reservations.json", "utf8", function(error, data) {
    
    if (error) {
        return console.log(error);
    }

    // console.log(data);

    if (data) {
        resObj.reservations = JSON.parse(data).reservations;
    }

});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/make", function (req, res) {
    res.sendFile(path.join(__dirname, "make.html"));
});

app.get("/view", function (req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/all", function (req, res) {
    res.json(reservations);
});

app.get("/api/:reservations?", function (req, res) {
    var chosen = req.params.reservations;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < reservations.length; i++) {
            if (chosen === reservations[i].routeName) {
                return res.json(reservations[i]);
            }
        }
        return res.json(false);
    }
    return res.json(reservations);
});

app.post("/api/new", function (req, res) {
    var newreservation = req.body;
    newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
    resObj.reservations.push(newreservation);
    console.log(resObj);
    fs.writeFile("reservations.json", JSON.stringify(resObj), function(err) {
        
        if (err) {
            return console.log(err);
        }

        console.log("reservations.json was updated!");
        
    });

    res.json(newreservation);
});

app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});