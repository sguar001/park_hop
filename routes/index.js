var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

//HOME ROUTE
router.get("/", function(req, res)
{
    res.render("landing");
});

//===================
//AUTH ROUTES
//===================

//show register form
router.get("/register", function(req, res) 
{
    res.render("register");
});

//handle registration logic
router.post("/register", function(req, res) 
{
    //register using User model (add user to DB)
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user)
    {
        if(err)
        {
            req.flash("error", err.message);
            //must return here because next statement will be ran regardless
            return res.redirect("/register");
        }
        //redirect to campgrounds upon successful authentication
        passport.authenticate("local")(req, res, function()
        {
            req.flash("success", "Welcome to ParkHop " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
});

//show login form
router.get("/login", function(req, res) 
{
    res.render("login");
});

//handling login logic (use authenticate function as middleware)
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res)
{
});

//logout route
router.get("/logout", function(req, res)
{
   req.logout();
   req.flash("success", "Logged you out!");
   res.redirect("/campgrounds");
});

module.exports = router;