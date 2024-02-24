const express = require('express');
const axios = require('axios');
const { hostname } = require('os');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 8000;

// place holder for the data

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../react-app-prj/build')));


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
  res.json(responseData);
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../react-app-prj/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});