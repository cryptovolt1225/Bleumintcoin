const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const { Redirect } = require("react-router-dom");
const Axios = require('axios');
exports.SignupUser = (req, res) => {

    const { firstName,lastName,email,phone,password } = req.body;
    User.findOne({"email":email}).then((user) => {
        console.log(user)
        console.log("find result ")
        if (user) {
            console.log("user exist")
            return res.send({result : "already exist"});
        }
        Axios.get("http://65.108.169.160:3001/api/getnewaddress").then(function(response)  {
            resolve(response.data.result);
          })
          .catch(function(error) {
              console.log(error);
          });

          promise.then( result => {
            console.log("result is",result)
            const newUser = new User({firstName,lastName,email,phone,password});
            bcrypt.genSalt(12, (err, salt) =>
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save().then(res.send({result : "success"})).catch((err)=> console.log(err));
                })
            );
         }); 
    });
  
    // if(req.file){
    //   const avatar = req.file;
    //   path = 'client/public/avatar/' + name + '_' + Date.now() + avatar.originalname.replace(/(.*)([.][^.]*)/, function(a,b,c){return c});
  
    //   try {
    //     fs.writeFileSync(path, avatar.buffer);
    //   } catch (err) {
    //     return console.log(err);
    //   }
    // }
  
   
  
  };

  exports.LoginUser = (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
    if (!user) return res.send({result:"Not Register User"});
        console.log("exist user",user);
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (!isMatch) return res.send({result:"Incorrect password"});
            const sessUser = { user_id: user.id, name: user.name, authority: 'customer', email: user.mail };
            res.send({result:"Login Success", userdata:user});; // sends cookie with sessionID automatically in response
        });
    });
   
  };

//   exports.logout = (req, res) => {
//     req.session.destroy((err) => {
//       // delete session data from store, using sessionID in cookie
//       if (err) throw err;
//       res.clearCookie("session-id"); // clears cookie containing expired sessionID
//       res.send("Logged out successfully");
//     });
//   }