 const express =require("express");
 const https =require("https");
 const bodyParser = require("body-parser");
 const path = require('path');
const router = express.Router();

//intitialization app 
const app = express();

//SETTING PUBLIC
app.use(express.static(__dirname+'/WEATHERPROJECTWITHAPI'));


 


 //body parser
 app.use(bodyParser.urlencoded({extended : true}));

//  get request for weather server
app.get("/", (req, res) => {
   res.sendFile(__dirname + "/index.html");   
 })

// router.get('/',function(req,res){
//   res.sendFile(path.join(__dirname+'/index.html'));
//   //__dirname : It will resolve to your project folder.
// });

 app.post("/",(req,res)=>{

 
    //query for cities and using body parser to get the city name from the user 
    // city name changes ,results changes
  const query = req.body.cityName;

  //api key 
     const apikey = "e8ade212bac3ec8d4416774720d1feb1";

  //units for tempreature
     const unit = "metric";

  // url for API requests
     const url ="https://api.openweathermap.org/data/2.5/weather?q= "+query+"&appid="+apikey+"&units="+unit;

     //http method for handling API requests
   https.get(url,function(response){

     console.log(response);//output in the console 
    // console.log("hello world!");
    
     response.on("data", function(data){
        // console.log(data);

        // handling json to object conversion
        const weatherData = JSON.parse(data)  
        console.log(weatherData);
        const temprature = weatherData.main.temp

        const description = weatherData.weather[0].description
        console.log(description);
        res.write("<h1>The temprature in "+query+ " is " + temprature + " degrees Celsius</h1>");
        res.write("<h3> description:"+description+"</h3>")
        const icon =   weatherData.weather[0].icon;
        const  imgurl="http://openweathermap.org/img/wn/10d@2x.png";
        res.write("<img src="+imgurl+"></img>");
        // res.sendFile(__dirname + "/index.html");  
        res.send();
     })
  })

   console.log("post request received"); 
 });

 


 app.listen(3000,function(){
    console.log("app is running on port 3000");

 });
