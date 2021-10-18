const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const task = new Schema({
    name:String,
    deadline:Date,
    user_id:String,
    description: String,
    tags:[],
    priority: Number,
    column_id: String,
    isDone: Boolean
});
module.exports = mongoose.model("task", task);