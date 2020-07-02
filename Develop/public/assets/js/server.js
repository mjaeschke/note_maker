// Dependencies
// =============================================================
const fs = require("fs");
const express = require("express");
const path = require("path");
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
    res.sendFile(path.join(__dirname,"../../../db/db.json"));
  });
  app.post("/api/notes", function(req, res) {
    let newNotes = req.body;
    fs.readFile("../../../db/db.json",function(err,data){
      if(err){
        throw err;
      }
      let notes = JSON.parse(data);
      notes.push(newNotes);
    fs.writeFile("../../../db/db.json",JSON.stringify(notes),function(err){
      if(err){
        throw err;
      }
      console.log("write file sucsessfull")
      return res.json(newNotes);
    });
    });
  });

  app.delete("api/notes/:id",function(res, req){
    let deleteNotes = req.params.id;
    fs.readFile("../../../db/db.json", function(err, data){
      if(err){
        throw err;
      }
      let notes = JSON.parse(data);
      for(var i = 0;i<notes.length;i++){
        if(notes[i].id === deleteNotes){
          notes.splice(i,1);
          fs.writeFile("../../../db/db.json",JSON.stringify(notes),function(err){
            if(err){
              throw err;
            }
            return res.json(notes);
          });
        }
      }
    });
  });


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
