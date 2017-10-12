var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comments");

var data = [
        {
            name: "Clouds Rest", 
            image: "https://newsofhawaii.com/wp-content/uploads/2016/10/hawaii.jpg",
            description: "Hoodie listicle tbh, la croix YOLO mlkshk next level messenger bag. Chia pinterest yr salvia, pok pok leggings microdosing freegan VHS. Pour-over mustache tbh banh mi echo park blog godard hashtag fanny pack. Shaman paleo hammock, brunch adaptogen mumblecore meditation shoreditch meh swag waistcoat. Brooklyn cardigan tbh, tacos semiotics woke sriracha kickstarter organic. Fixie microdosing shoreditch, narwhal schlitz roof party you probably haven't heard of them before they sold out hexagon kickstarter sustainable coloring book health goth cronut everyday carry. Paleo vape venmo shaman. Neutra viral pork belly twee swag narwhal vaporware tofu kinfolk dreamcatcher etsy umami marfa. Seitan intelligentsia gluten-free, wayfarers kogi mumblecore health goth four dollar toast prism pour-over tacos bespoke kinfolk semiotics. Ugh quinoa retro palo santo, activated charcoal kinfolk food truck. Schlitz polaroid cold-pressed, gastropub man bun you probably haven't heard of them occupy succulents offal neutra waistcoat marfa."
        },
        {
            name: "Mountain Rest", 
            image: "http://www.nationalparks.nsw.gov.au/~/media/DF58734103EF43669F1005AF8B668209.ashx",
            description: "Hoodie listicle tbh, la croix YOLO mlkshk next level messenger bag. Chia pinterest yr salvia, pok pok leggings microdosing freegan VHS. Pour-over mustache tbh banh mi echo park blog godard hashtag fanny pack. Shaman paleo hammock, brunch adaptogen mumblecore meditation shoreditch meh swag waistcoat. Brooklyn cardigan tbh, tacos semiotics woke sriracha kickstarter organic. Fixie microdosing shoreditch, narwhal schlitz roof party you probably haven't heard of them before they sold out hexagon kickstarter sustainable coloring book health goth cronut everyday carry. Paleo vape venmo shaman. Neutra viral pork belly twee swag narwhal vaporware tofu kinfolk dreamcatcher etsy umami marfa. Seitan intelligentsia gluten-free, wayfarers kogi mumblecore health goth four dollar toast prism pour-over tacos bespoke kinfolk semiotics. Ugh quinoa retro palo santo, activated charcoal kinfolk food truck. Schlitz polaroid cold-pressed, gastropub man bun you probably haven't heard of them occupy succulents offal neutra waistcoat marfa."
        },
        {
            name: "Clouds Mountain", 
            image: "https://img.hipcamp.com/image/upload/c_limit,f_auto,h_1200,q_60,w_1920/v1433545882/qz6wpckg8nuutlntvoau.jpg",
            description: "Hoodie listicle tbh, la croix YOLO mlkshk next level messenger bag. Chia pinterest yr salvia, pok pok leggings microdosing freegan VHS. Pour-over mustache tbh banh mi echo park blog godard hashtag fanny pack. Shaman paleo hammock, brunch adaptogen mumblecore meditation shoreditch meh swag waistcoat. Brooklyn cardigan tbh, tacos semiotics woke sriracha kickstarter organic. Fixie microdosing shoreditch, narwhal schlitz roof party you probably haven't heard of them before they sold out hexagon kickstarter sustainable coloring book health goth cronut everyday carry. Paleo vape venmo shaman. Neutra viral pork belly twee swag narwhal vaporware tofu kinfolk dreamcatcher etsy umami marfa. Seitan intelligentsia gluten-free, wayfarers kogi mumblecore health goth four dollar toast prism pour-over tacos bespoke kinfolk semiotics. Ugh quinoa retro palo santo, activated charcoal kinfolk food truck. Schlitz polaroid cold-pressed, gastropub man bun you probably haven't heard of them occupy succulents offal neutra waistcoat marfa."
        },
        {
            name: "Clouds Canyon", 
            image: "https://www.fs.usda.gov/Internet/FSE_MEDIA/stelprdb5181083.jpg",
            description: "Hoodie listicle tbh, la croix YOLO mlkshk next level messenger bag. Chia pinterest yr salvia, pok pok leggings microdosing freegan VHS. Pour-over mustache tbh banh mi echo park blog godard hashtag fanny pack. Shaman paleo hammock, brunch adaptogen mumblecore meditation shoreditch meh swag waistcoat. Brooklyn cardigan tbh, tacos semiotics woke sriracha kickstarter organic. Fixie microdosing shoreditch, narwhal schlitz roof party you probably haven't heard of them before they sold out hexagon kickstarter sustainable coloring book health goth cronut everyday carry. Paleo vape venmo shaman. Neutra viral pork belly twee swag narwhal vaporware tofu kinfolk dreamcatcher etsy umami marfa. Seitan intelligentsia gluten-free, wayfarers kogi mumblecore health goth four dollar toast prism pour-over tacos bespoke kinfolk semiotics. Ugh quinoa retro palo santo, activated charcoal kinfolk food truck. Schlitz polaroid cold-pressed, gastropub man bun you probably haven't heard of them occupy succulents offal neutra waistcoat marfa."
        }
    ]

function seedDB()
{
    //remove all campgrounds!
    Campground.remove({}, function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("removed campgrounds!");
            //add a few campgrounds
            data.forEach(function(seed)
            {
                Campground.create(seed, function(err, campground){
                    if(err)
                    {
                        console.log(err);
                    }
                    else
                    {
                        console.log("added a campground");
                        //create a comment
                        Comment.create(
                            {
                                text: "this place is great, but no Internet!",
                                author: "Homer"
                            }, function(err, comment){
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {
                                    //Add the comment to campground object
                                    campground.comments.push(comment);
                                    //save the comment to DB
                                    campground.save(); 
                                    console.log("Created a new comment");
                                }
                            }
                        );
                    }
                });
            });
        }
    });
}

module.exports = seedDB;
