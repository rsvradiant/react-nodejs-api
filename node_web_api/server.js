const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const axios = require('axios');
const { hostname } = require('os');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 8000;

app.use(cors());
// app.use(bodyParser.json());
app.use(express.json());
// app.use(express.static(path.join(__dirname, '../react-app-prj/build')));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "rsvradiant-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
    sameSite: 'strict'
  })
);

// database
const db = require("./app_core/models");
const Role = db.role;

db.sequelize.sync();
// force: true will drop the table if it already exists
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Database with { force: true }');
//   initial();
// });

const fetchData = async (req, res, next) => {
  try {    
    const response = await axios.get('https://health.gov/myhealthfinder/api/v3/itemlist.json?Type=topic');
    req.healthData = response.data.Result.Items.Item;
    next();
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
};

app.get('/api/wellnesstopics', fetchData,(req, res) => {
  const responseData = req.healthData;
  console.log('received');
  res.json(responseData);
});

app.get('/api/wellnesstopics2', fetchData,(req, res) => {
  const responseData = req.healthData;
  res.json(responseData);
});

// app.get('/', (req,res) => {
//   res.sendFile(path.join(__dirname, '../react-app-prj/build/index.html'));
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Niralars Forum." });
});

// routes
require("./app_core/routes/auth.routes")(app);
require("./app_core/routes/user.routes")(app);


// const PORT = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

// place holder for the data
function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "admin",
  });
}
// initial()