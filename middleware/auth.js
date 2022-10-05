const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticate = (req, res, next) => {

    try {
        const token = req.header('Authorization');
        console.log(token);
        const user= jwt.verify(token, 'secret-key');
        console.log("USERID>>>>>>>",user);
        User.findByPk(user).then(user => {
            console.log(JSON.stringify(user));
            req.user = user;
            //console.log("reqbodyyyy",req.body.user);
            next();
        }).catch(err => { throw new Error(err)})

      } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
        // err
      }

}

module.exports = {
    authenticate
}