let express = require('express');
let app     = express();

// Banks ===============================
let brou    = require('./controllers/brou.js') 



app.use('/brou', brou);
app.listen( process.env.npm_package_config_port )
console.log('"One man’s crappy software is another man’s full time job." -Jessica Gaston');
console.log("Running on port: " + process.env.npm_package_config_port)

exports = module.exports = app;
