const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;

const url = "mongodb://localhost:27017";

const dbset = function () {
  mongo.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) {
      console.log("Connection error: ", err);
      throw err;
    }

    const db = client.db("db_ports");
    const users = db.createCollection("ports");

    db.collection("ports").insertMany(
      [
        {
          Portid: 1,
          Latitude: "unknown",
          Longitude: "unknown",
        },
        {
          Portid: 2,
          Latitude: "unknown",
          Longitude: "unknown",
        },
        {
          Portid: 3,
          Latitude: "unknown",
          Longitude: "unknown",
        },
      ],
      (err, result) => {
        if (err) {
          console.log("Unable insert user: ", err);
          throw err;
        }
      }
    );

    client.close();
  });
};

const dbshow = function (req, res) {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    

    const db = client.db("db_ports");

    db.collection("ports")
      .find({})
      .toArray()
      .then((docs) => {
        //docs.to_mongo()

        console.log(typeof docs);

        r = JSON.stringify(docs);

        console.log(typeof r);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(r);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        client.close();
      });
  });
};

const dbupdate = function (portid, lat, long) {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;

    const db = client.db("db_ports");

    let matchdb = { Portid: portid };
    let updatedb = { $set: { Latitude: lat, Longitude: long } };

    db.collection("ports")
      .updateOne(matchdb, updatedb)
      .then((result) => {
        console.log("DB updated");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        client.close();
      });
  });
};

exports.dbshow = dbshow;
exports.dbupdate = dbupdate;
exports.dbset = dbset;
