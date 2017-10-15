var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comments");
//../middleware auto requires index.js (goes up a folder with ../)
var middleware = require("../middleware");

//INDEX ROUTE
router.get("/campgrounds", function(req, res)
{
    //Get all campgrounds from DB using model
    Campground.find({}, function(err, allcampgrounds)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            //passport auto fills req.user if user is logged in, otherwise, it is undefined
            res.render("campgrounds/index", {campgrounds:allcampgrounds, currentUser: req.user});
        }
    });
});

//CREATE ROUTE 
router.post("/campgrounds", middleware.isLoggedIn ,function(req, res)
{
   //get data from form
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   //add to campgrounds array
   var newCampground = {name: name, price: price, image: image, description: desc, author: author};

    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated)
    {
       if(err)
       {
           console.log(err);
       }
       else
       {
          //redirect back to campgrounds page
           //(default redirect is to a get)
           res.redirect("/campgrounds");    
       }
    });
});

//NEW ROUTE - show form to create a new campground
router.get("/campgrounds/new", middleware.isLoggedIn ,function(req, res) 
{
   res.render("campgrounds/new"); 
});

//SHOW ROUTE - show more info about one campground
router.get("/campgrounds/:id", function(req, res)
{
    //find the campground with passed-in ID, from DB, and populate comments using exec
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            //console.log(foundCampground);
            //render show template with that campground, found by id in DB
            res.render("campgrounds/show", {campground: foundCampground}); 
        }
    });
});

//EDIT Campground Route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership ,function(req, res)
{
        Campground.findById(req.params.id, function(err, foundCampground)
        {
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

//UPDATE Campground Route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership ,function(req, res)
{
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground)
    {
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            //redirect to show page
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DESTROY Campground Route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership ,function(req, res)
{
   Campground.findByIdAndRemove(req.params.id, function(err)
   {
       if(err)
       {
           res.redirect("/campgrounds");
       }
       else
       {
           res.redirect("/campgrounds");
       }
   });
});

module.exports = router;