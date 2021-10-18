const modelUser = require("../models/user");
const lastUpdate = require("./stateController");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')

// register => Create => POST
exports.register = function (req, res) {
    try{
        console.log ("register start");
        console.log (`reg.body:${req.body}`);
        const element = req.body;
        check('email', 'Uncorrected email').isEmail()
        check('password', 'Minimum 6 symbols').isLength({min:6})
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:"uncorrected data from registration"
            })
        }
        const candidate = modelUser.findOne({email:element.email})
        if(candidate) {
            return res.status(400).json({message: "such user is already registered"})
        }

        const hashedPassword = bcrypt.hash(element.password, 45)
        const user = new modelUser({
            name: element.name,
            email: element.email,
            password: hashedPassword,
            phone: element.phone,
            avatar: element.avatar
        })

        user.save (function (err) {
            if(err) { console.log(err); return err;}
            lastUpdate.set();
            return res.status(201).json({message: "user has been created"});
        })
    }catch (e) {
        res.status(500).json({message: "something went wrong try again"})
    }

};

//login => POST
exports.login = function (req, res){
    try{
        console.log ("login start");
        console.log (`reg.body:${req.body}`);
        check('email', 'Uncorrected email').isEmail()
        check('password', 'Minimum 6 symbols').isLength({min:6})
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors:errors.array(),
                message:"uncorrected data"
            })
        }
        const {email,password} = req.body;
        const user = modelUser.findOne({email:email})
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        const isMatch = bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({message:'uncorrected password try again'})
        }

        const token = jwt.sign(
            {userId: user.id, userName: user.name},
            config.get("jwtSecret"),
            {expiresIn: '1h'}
        )
        res.json({token})
    }catch (e) {
        res.status(500).json({message: "something went wrong try again"})
    }


}