const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("primary"));
app.get("/",function(req,res)
{
  res.sendFile(__dirname + "/signup.html");
});
app.post("/",function(req,res)
{
const x = req.body.x;
const y = req.body.y;
const z = req.body.z;

 const data = {
 members: [
   {
       email_address : z ,
       status :  "subscribed",
       merge_fields : {
         FNAME : x,
         LNAME : y
       }
     }
 ]
};
 const jsondata = JSON.stringify(data);
 const options = {
method : "POST",
auth : "loki560:2e546bec8f206a129a7a5db28944b4aa-us10"

}
 const url ="https://us10.api.mailchimp.com/3.0/lists/4df24923b1";
 const request = https.request(url ,options,function(response)
{
  response.on("data",function(data)
{
console.log(JSON.parse(data));
});
});
request.write(jsondata);
request.end();
});
app.listen(process.env.PORT||3000,function()
{
  console.log("the server is running smooth");
});
