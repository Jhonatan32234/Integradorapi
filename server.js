const express = require("express");
const https = require("https")

const fs = require("fs")
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const rateLimit = require('express-rate-limit')
const app = express();


// Define a rate limiter with options

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/gameonschoolbd.integrador.xyz/fullchain.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/gameonschoolbd.integrador.xyz/privkey.pem')
  };
const apiLimiter = rateLimit({

  windowMs: 10 * 60 * 1000, // 15 minutes
  
  max: 50, // limit each IP to 100 requests per windowMs
  
  message: 'Too many requests from this IP, please try again later.',
  
  });

  // Apply the rate limiter to all requests with the '/api/' prefix

app.use('/api/', apiLimiter);


// Define a simple API endpoint

app.get('/api/data', (req, res) => {

  res.json({ message: 'API data response' });
  
  });
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// database
const db = require("./app/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Integrador application." });
});

require("./app/routes/tutorial.routes.js")(app);
require("./app/routes/actividad.routes.js")(app);
require("./app/routes/alumno.routes.js")(app);
require("./app/routes/asistencia.routes.js")(app);
require("./app/routes/conducta.routes.js")(app);
require("./app/routes/examen.routes.js")(app);
require("./app/routes/grupo.routes.js")(app);
require("./app/routes/logro.routes.js")(app);
require("./app/routes/materia.routes.js")(app);


require('./app/routes/auth.routes.js')(app);
require('./app/routes/user.routes.js')(app);

https.createServer(options, app).listen(3000, () => {
  console.log('Servidor HTTPS corriendo en el puerto 3000');
  });
/*
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  //console.log(app);
  console.log(`Server is running on port ${PORT}.`);
});*/



function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}