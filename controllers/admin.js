
const User = require('../models/User');
var bcrypt = require("bcrypt");


exports.signup = (req, res)=>
{
  const { name, email, password } = req.body;
  const saltRounds = 10;
   {
      bcrypt.hash(password, saltRounds, function(err, hash) {
          // Store hash in your password DB.
          if(err){
              console.log('Unable to create new user')
              res.json({message: 'Unable to create new user'})
          }
          User.create({ name, email, password: hash }).then(() => {
              res.status(201).json({message: 'Successfuly create new user'})
          }).catch(err => {
              res.status(403).json(err);
          })

   
  });
}
}


exports.login = (req, res, next) => {
  //const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  
 console.log("request is",email,password);
 if(email.length===0|| password.length===0)
 {
  return res.status(400).json({badparamter})
 }
 User.findAll({where:{email}}).then(user=>
  {
    console.log(user);
    if(user.length>0)
    {
      bcrypt.compare(password, user[0].password,(err, response)=>
      {
        if(!err){
          res.status(201).json({success:true,message:"user logged in Successfully"})
        }
       
        else
        {
          return res.status(400).json({sucess:false,message:"password is incorrect"})
        }
        
      });
      
    
    
    
  }

  });
 
};
