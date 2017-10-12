var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comments");
var User =  require("./models/user");
var seedDB = require("./seeds");
var methodOverride = require("method-override");

var commentRoutes = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes = require("./routes/index");

mongoose.Promise = global.Promise;

//create mongoose db inside mongodb
//mongodb://localhost/yelp_camp_v11
//account for missing databse
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v11";
mongoose.connect(url, {useMongoClient: true});

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

//dirname refers to directory that file is ran in
//allow use of public directory 
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//seed the database
//seedDB();

//===================
//FLASH CONFIGURATION
//===================
app.use(flash());

//======================
//PASSPORT CONFIGURATION
//======================
app.use(require("express-session")(
{
    secret: "cat in the hat",
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//this authenticate method is included in passport-local-mongoose
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//own middleware to include currentUser in all files
app.use(function(req, res, next)
{
    //what ever is in locals is included in all templates!
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    //must have next to continue!
    next();
});

//can use app.use("/campgrounds", campgroundRoutes) to shorten
//even more as it would be appended in the routes file, so no longer need
//app.get("/campgrounds/new") -> app.get("/new")
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

app.listen(process.env.PORT, process.env.IP);