var fs = require("fs");

const dbinit = function () {
  var jsonstart = [
    {
       "Portid": 1,
       "Longtitude": "unknown",
       "Latitude": "unknown",       
       "Status": "free"
    },
    {
       "Portid": 2,
       "Longtitude": "unknown",
       "Latitude": "unknown",       
       "Status": "free"
    },
    {
       "Portid": 3,
       "Longtitude": "unknown",
       "Latitude": "unknown",       
       "Status": "free"
    }
 ]


  var jsonString = JSON.stringify(jsonstart);

  fs.writeFileSync("./JSON/ports.json", jsonString);
};
const dbupdate = function (port, lat, long) {
    fs.readFile("./JSON/ports.json", "utf8", (err, data) => {
    if (err) throw err;
    var data = JSON.parse(data);
    var objectToChange = data.filter((item) => item.Portid === port)[0];
    objectToChange["Latitude"] = lat;
    objectToChange["Longtitude"] = long;    
    var jsonString = JSON.stringify(data, null ,3);
    fs.writeFileSync("./JSON/ports.json", jsonString);
    });
}


const dbstatus = function (port) {
  fs.readFile("./JSON/ports.json", "utf8", (err, data) => {
  if (err) throw err;
  var data = JSON.parse(data);
  var objectToChange = data.filter((item) => item.Portid === port)[0];
  if (objectToChange["Status"] == "free"){
    objectToChange["Status"] = "busy"
    // console.log("busy")

  }  
  else if (objectToChange["Status"] == "busy") {
    objectToChange["Status"] = "free"
    // console.log("free")
  }
   
  var jsonString = JSON.stringify(data, null ,3);
  fs.writeFileSync("./JSON/ports.json", jsonString);
  });
}







const dbshow = function (req, res) {
    fs.readFile("./JSON/ports.json", "utf8", (err, data) => {
    if (err) throw err;
    var data = JSON.parse(data);
    console.log(typeof data)
    data = JSON.stringify(data)
    res.writeHead(200, {'Content-Type':'application/json'})
    res.end(data)
    });
}





exports.dbshow = dbshow;
exports.dbinit = dbinit;
exports.dbupdate = dbupdate;
exports.dbstatus = dbstatus;