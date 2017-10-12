#YelpCamp V11

#Style the campgrounds page
* Add a better header/title
* Make campgrounds display in a grid

#Style the Navbar and Form
* Add a navbar to all templates
* Style the new campgrounds form

#Add Mongoose
* Install and configure mongoose
* Setup campground model
* Use campground model inside of our routes!

#Show Page
* Review the RESTful routes we've seen so far
* Add a description to our campground model
* Show db.collection.drop()
    * Delete everything in a DB
* Add a show route/template

#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

#Add a Seeds file
* Add a seeds.js file
* Run the seeds file everytime the server starts

#Add the comment model!
* Make our errors go away
* Display comments on campground show page

#Comment/New Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

#Style Show Page
* Add side bar to show page
* Display comments nicely

#Finish styling show page
* Add public directory
* Add custom stylesheet

#Auth Pt.1 - add user model
* Install all packages needed for auth
* Define user model

#Auth Pt.2 - Register
* Configure passport
* Add register routes
* Add register template 

#Auth Pt.3 - Login
* Add Login routes
* Add login template

#Auth Pt.4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in 
* Add links to navbar

#Auth Pt.5 - Show/Hide links
* Show/hide auth links in navbar correctly

#Refactor Routes
* Use Express router to reorganize all routes

#Users + Comments
* Associate users and comments
* Save author's name to a comment automatically 

#Users + Comments
* Prevent an unauthenticated user from creating a campground
* Save username + id to newly created campground

#Editing Campgrounds
* Add method-override
* Add edit route for campgrounds
* Add link to edit page
* Add update route

#Deleting Campgrounds
* Add Destroy Route
* Add Delete Button

#Authorization
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/show edit and delete buttons 

#Editing Comments
* Add Edit route for comments
* Add Edit buttons
* Add update route

#Deleting Comments
* Add Destroy route
* Add Delete button

#Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

#Adding in flash!
* Demo working version
* Install and configure connect-flash
* Add boostratp alerts to header

#Deplying App Using Heroku
* can run commands on remote heroku server using heroku run
    * heroku run ls 
* mLab allows us to use a remote (hosted) mongo db

#Environment Variables
* refers to environment where code is being run
* export -> create new enviornment variables
* create variables on heroku: config variables on dashboard
    * heroku config:set DATABASEURL= -> through command line


RESTFUL ROUTES
name    url     verb    desc.    
=================================================
INDEX   /dogs   GET     display a list of all dogs
NEW     /dogs/new GET   displays form to make a new dog
CREATE  /dogs   POST    add a new dog to DB
SHOW    /dogs/:id GET   shows info about one dog