var mongoose = require("mongoose");

//COMMENTS SCHEMA
var commentSchema = mongoose.Schema({
    text: String, 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            //ref refers to the model that will be used
            ref: "User"
        },
        username:String
    }
});

module.exports = mongoose.model("Comment", commentSchema);