const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const config = require("config")

app.use(express.static(path.join(__dirname,"public")));
app.use(cors());

const multer = require("multer");
app.use(multer(
    {dest: path.join(__dirname,"public/uploads")})
    .single("fileData"));

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const router = require("./routes");
app.use(router);
const PORT = config.get('port') || 3030

const mongoUri = config.get('mongoUri')
const mongoose = require("mongoose");

mongoose.connect(mongoUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err) {
        if (err) {console.log(err); return;}
        console.log(`server has been started on port ${PORT}`);
        app.listen(PORT); }
);
