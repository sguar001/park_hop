//all the middleware goes here
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next)
{
     //is user logged in?
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id, function(err, foundCampground)
        {
            if(err)
            {
                req.flash("error", "Campground not found");
                res.redirect("back");
            }
            else
            {
                //does user own the campground?
                if(foundCampground.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You don't have permission to do that");
                    //if not, redirect to previous page
                    res.redirect("back");
                }
            }
        });
    }
    else    //otherwise, redirect
    {
        req.flash("error", "You need to be logged in to do that");
        //redirect back to previous page
        res.redirect("back");
    }  
};

middlewareObj.checkCommentsOwnership = function(req, res, next)
{
    //is user logged in?
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err, foundComment)
        {
            if(err)
            {
                req.flash("error", "Comment not found");
                res.redirect("back");
            }
            else
            {
                //does user own the comment?
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();
                }
                else
                {
                    req.flash("error", "You dont have permission to do that");
                    //if not, redirect to previous page
                    res.redirect("back");
                }
            }
        });
    }
    else    //otherwise, redirect
    {
        req.flash("error", "You need to be logged in to do that");
        //redirect back to previous page
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    //if authentication failed, return to login page
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}

module.exports = middlewareObj;