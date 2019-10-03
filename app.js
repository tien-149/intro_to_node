const express = require('express');
const hbs = require('hbs');
const path= require('path');
const sql = require('./utils/sql');

const port = process.env.PORT || 5050;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname + "/views"));

app.get('/', (req,res)=> {
  res.render('home', { homemessage: "hey there!", bio: "some generic bio info"});
})

app.get ('/users',(req,res) => {

  //get user data when we hit this route
  //try a databas connection
  //if the connection dails , log errors to the console and 

  sql.getConnection((err, connection) => {
    if (err) {
      return console.log(err.message);
    }

  let query = "SELECT * FROM tbl_card";
  sql.query(query, (err,rows) => {

  // We are done with DB connection
    connection.release();
    //If somthing broke, quit and show an error message
    if (err) {return console.log(err.message)}

    //show me the data
    console.log(rows);
  
    res.render('user', rows[0]);
  })


  })
})

app.listen(port, ()=> {
  console.log(`app is running on port ${port}`)
})
  //server.listen(port, hostname, () => {
    //console.log(`Server running at http://${hostname}:${port}/`);
 // });