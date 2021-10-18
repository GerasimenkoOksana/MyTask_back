const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const column = new Schema({
    name:String,
    deadline:Date,
    user_id:String,
    tags:[],
    isDone: Boolean
});
module.exports = mongoose.model("column", column);