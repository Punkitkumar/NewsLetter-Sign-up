const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { options } = require("request");
const app = express();

app.use(express.static("public")); //public is static folder for static file transfer to server
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  // res.send("Get request");
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: fname,
          LNAME: lname,
        },
      },
    ],
  };
  const url = "https://us10.api.mailchimp.com/3.0/lists/9e5fb63178";
  const jsonData = JSON.stringify(data);
  const options = {
    method: "POST",
    auth: "punkit:0c7b7ca65a38505b42de42fc8bc89312-us10",
  };
  const request = https.request(url, options, function (response) {
    console.log(response.statusCode);
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("Server is started on port 3000");
});

// api key
//0c7b7ca65a38505b42de42fc8bc89312-us10

//Audience ID /List ID
// 9e5fb63178
