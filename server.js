const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

var db, collection;
const dbName = "tennisWiki";
const url =
  `mongodb+srv://abdullahidev:Github2035@cluster0.rasf3io.mongodb.net/tennisWiki?retryWrites=true&w=majority`;

app.listen(5000, () => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (error, client) => {
      if (error) {
        throw error;
      }
      db = client.db();
      console.log("Connected to `" + dbName + "`!");
    }
  );
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  db.collection("playerInfo")
    .find()
    .toArray((err, allDocuments) => {
      if (err) return console.log(err);
      res.render("index.ejs", { tennisPokedox : allDocuments });
    });
});

app.post("/saveTennisInfo", (req, res) => {
  db.collection("playerInfo").insertOne(
    { playerName: req.body.name, playerCountry: req.body.country, highestRank: req.body.rankhigh, numberGrandSlam: req.body.numberGrandSlam},
    (err, result) => {
      if (err) return console.log(err);
      console.log("saved to database");
      res.redirect("/");
    }
  );
});
app.delete("/delete", (req, res) => {
  db.collection("playerInfo").findOneAndDelete(
    { playerName: req.body.deleteName, playerCountry: req.body.deleteCountry, highestRank: req.body.deleteRankHigh, numberGrandSlam: req.body.deleteGrandSlam },
    (err, result) => {
      if (err) return res.send(500, err);
      res.send("Message deleted!");
    }
  );
});


// ====================== Refer Later ==============================
app.put("/messages", (req, res) => {
  db.collection("results").findOneAndUpdate(
    { name: req.body.name, msg: req.body.msg },
    {
      $set: {
        thumbUp: req.body.thumbUp + 1,
      },
    },
    {
      sort: { _id: -1 },
      upsert: true,
    },
    (err, result) => {
      if (err) return res.send(err);
      res.send(result);
    }
  );
});

