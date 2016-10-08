let express = require('express');
let app     = express();
let pjson  = require('./package.json');
// Banks ===============================
let brou    = require('./controllers/brou.js') 



app.use('/brou', brou);
app.listen(pjson.config.port);
console.log('"One man’s crappy software is another man’s full time job." -Jessica Gaston');
console.log("Running on port: " + pjson.config.port)

exports = module.exports = app;
