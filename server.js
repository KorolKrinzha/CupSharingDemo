const http = require("http"); //моодуль http
var url = require("url"); //url parsing
const responses = require("./apps");
const dbresponses = require("./apps/mongol");

dbresponses.dbset()

http
  .createServer((req, res) => {
    URL = req.url;

    switch (URL) {
      case "/":
      case "/sayhi":
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Hello db!");
        break;

      case "/detect":
        dbresponses.dbshow(req, res)
        break;

      case (URL.match(/receiveport1/) || {}).input:
        var q = url.parse(req.url, true).query;

        //console.log(q.lat)
        let checklat = q.lat!=undefined && q.lat!="";
        let checklong =  q.long!=undefined && q.long!="";
        if (checklat && checklong) {
          res.writeHead(200, { "Content-Type": "application/json" });

          let lat = q.lat;
          let long = q.long;
          dbresponses.dbupdate(1, lat, long);
          //dbresponses.dbshow();
          res.end("Sent");
          break;
        } else {
          responses.ErrorCodeDB(req, res);
          break;
        }

      default:
        responses.ErrorCode(req, res);
        break;
    }

    // console.log(req.url)//url на который сделан запрос
    // console.log(req.method)//например, GET или POST
    // console.log(req.headers)//хэдер страницы

    //res.writeHead(200, {'Content-Type':'text/plain'})//хэдер страницы: статус 200, так как все ок, вид текст, очевидно
    //res.end('Meow!')
  })
  .listen(8080, () => console.log("Server is on"));
