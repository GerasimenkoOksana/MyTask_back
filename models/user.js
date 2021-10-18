const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
    name: String,
    email: {type: String, required:true, unique: true},
    password: {type: String,required:true},
    phone: String,
    avatar: String,
    roles: [],
    tasks:[{type:mongoose.Types.ObjectId, ref: 'tasks'}],
    columns:[{type:mongoose.Types.ObjectId, ref: 'columns'}]

});

module.exports = mongoose.model("user", user);