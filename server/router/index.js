const express = require('express');
const app = express()
const router = express.Router();
// const TOKEN = require("./token");
// const Axios = require('axios');
// const fs = require('fs');
const config = require('../../config')
const {SignupUser, LoginUser} = require('../controller/AuthController')
// const axios = require("axios");
// const multer = require('multer');

// const {registerUser, singinUser} = require('../controller/user_controller');
// var upload = multer();

// router.use('/users', adminusers);
// router.use('/customers', customer);
// router.use('/settings', settings);
router.post('/signup',SignupUser);
router.post('/login',LoginUser);


// router.post("/singin", (req,res) => {
//     console.log(req.body)
// });
// router.post("/register", (req,res) => {
//     console.log(req.body)
// });


// router.use("/register", registerUser);
// router.use("/singin", singinUser)



         
// async function downloadImage(url, filepath) {
//     const response = await Axios({
//         url,
//         method: 'GET',
//         responseType: 'stream'
//     });
//     return new Promise((resolve, reject) => {
//         response.data.pipe(fs.createWriteStream(filepath))
//             .on('error', reject)
//             .once('close', () => resolve(filepath)); 
//     });
//   }


//player 
// router.use("/profile",TOKEN.check_token,profile);
// router.use("/firstpage",TOKEN.check_token, firstpagedata);
// router.use("/players",TOKEN.check_token,netplay);
// router.use("/sports",TOKEN.check_token,SportsControl)

// router.use("/reports",TOKEN.check_token,ReportsModel);
// router.use("/Tools",TOKEN.check_token,Tools);
// router.use("/providermanager",TOKEN.check_token,ProviderManager);
// router.use("/netplay",TOKEN.check_token, netplay);
// router.use("/paymentGateWay",TOKEN.check_token,paymentGateWay);
// router.use("/gameprovider",TOKEN.check_token,GameProviders); 
// router.use("/revenue",TOKEN.check_token,revenueController);

// app.get('/file/download/:filename/:originalname' , function(req,res,next){ 
//   var filename = req.params.filename;
//   var originalname = req.params.originalname;
//   var directory = dl_dir.BASEURL + "/uploads/" + filename;
//   res.download(directory,originalname,'');
// })  

module.exports = router;