const {db} = require('./db')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('./config')

module.exports.verify_token= function(req, res, next){
    const auth_header = req.headers.authorization;
    if(!auth_header){
        return res.status(500).send({status: "failure", message: "Token missing"})
    }
    const token = auth_header.split(" ")[1];
    if(!token){
        return res.status(500).send({status: "failure", message: "Invalid token"})
    }
    var decoded = jwt.verify(token, SECRET_KEY);
    if(decoded){
        req.user = decoded;
        return next()
    }else{
        return res.status(500).send({status: "failure", message: "Invalid token"})
    }
    
}