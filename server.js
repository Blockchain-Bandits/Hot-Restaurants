var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;
var PORT = process.env.PORT || 3000;

var arr = [];