const http = require("http");
var url = require("url");
const responses = require("./apps");
const writer = require("./jsonwriter");

//writer.dbinit();

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
        writer.dbshow(req, res)
        break;

      case (URL.match(/receiveport/) || {}).input:
        var q = url.parse(req.url, true).query;


        let checkid = q.id != undefined && q.id != "";
        let checklat = q.lat != undefined && q.lat != "";
        let checklong = q.long != undefined && q.long != "";
        if (checklat && checklong && checkid) {
          res.writeHead(200, { "Content-Type": "application/json" });

          let id = Number(q.id);
          console.log(typeof id)
          let lat = q.lat;
          let long = q.long;
          writer.dbupdate(id, lat, long);
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
  })
  .listen(8080, () => console.log("Server is on"));
