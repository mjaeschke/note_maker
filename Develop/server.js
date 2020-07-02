// Dependencies
// =============================================================
const fs = require("fs");
const express = require("express");
const path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;
const mainDir = path.join(__dirname,"/public");
// Sets up the Express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Routes
// =============================================================


app.get("/notes", function(req, res) {
  res.sendFile(path.join(mainDir, "notes.html"));
});
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("/api/notes/:id", function(req, res) {
  let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(savedNotes[Number(req.params.id)]);
});
app.get("*", function(req, res) {
  res.sendFile(path.join(mainDir, "index.html"));
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
