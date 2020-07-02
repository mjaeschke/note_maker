// Dependencies
// =============================================================
var notesData = require("../../../db/db.json");
var express = require("express");
var path = require("path");
const { json } = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page


app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../../notes.html"));
});
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../../index.html"));
});


app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname,"./db.json"));
  });
  app.get("/api/notes/:id", function(req, res) {
    let notes = JSON.parse(fs.readFileSync("./db.json"));
    res.json(notes);
  });


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
