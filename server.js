let express = require('express');
let app     = express();

// Banks ===============================
let brou    = require('./controllers/brou.js') 



app.use('/brou', brou);
app.listen('8081')
console.log('"One man’s crappy software is another man’s full time job." -Jessica Gaston');
console.log('Server started...');
exports = module.exports = app;
