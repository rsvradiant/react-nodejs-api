const express = require('express');
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 80;

// place holder for the data
const users = [
  {
    firstName: "first1",
    lastName: "last1",
    email: "abc@gmail.com"
  },
  {
    firstName: "first2",
    lastName: "last2",
    email: "abc@gmail.com"
  },
  {
    firstName: "first3",
    lastName: "last3",
    email: "abc@gmail.com"
  }
];

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../react-app-prj/build')));

app.get('/api/users', (req, res) => {
  console.log('api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});

app.post('/api/wellnesstopics', (req, res) => {
  const url='https://health.gov/myhealthfinder/api/v3/itemlist.json?Type=topic'
  const axios = require('axios');

  axios.post(url)
    .then(response => {
      console.log(response.data);
      const res_data=response.data;
    })
    .catch(error => {
      console.error('Error:', error.message);
    });
    const jsonData = JSON.parse(res_data);
    
    // Access a specific item
    const final_res = jsonData.Items.Item;
    console.log(final_res);
    res.json(final_res);
});

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../react-app-prj/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});