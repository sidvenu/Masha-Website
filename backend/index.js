const express = require("express");
const Database = require("sync-mysql-database").Database;
const database_auth = require("./database_auth");
const database_structure = require("./database_structure.json");
const path = require("path");

//sql connection
var database = new Database(database_auth, database_structure);
var paintings = database.getTable("paintings").query();
var shawls = database.getTable("shawls").query();
var carpets = database.getTable("carpets").query();

var app = new express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../")));
app.use(express.urlencoded({extended: true}));

//fetch all paintings
app.get("/paintings", (req,res)=>{
    let number = req.query.num;
    if (number == undefined || number == '')   
        res.send(paintings.get());
    else {
        number = Number.parseInt(number);
        res.send(paintings.limit(0, number).get());
      }
});


//fetch all artists
app.get("/artists", (req,res)=>{
    let number = req.query.num;
    let artistList = paintings.select("artist").distinct().orderby("artist");
    if (number != undefined) {
        number = Number.parseInt(number);
        artistList = artistList.limit(0, number);
    }
    res.send(artistList.get());
});

//fetch all themes
app.get("/themes", (req,res)=>{
    res.send(paintings.select("theme").distinct().get());
});

//fetch all medium
app.get("/mediums", (req,res)=>{
    let number = req.query.num;
    let mediumList = paintings.select("medium").distinct();
    
    if (number != undefined) {
        number = Number.parseInt(number);
        mediumList = mediumList.limit(0, number);
    }
    
    res.send(mediumList.get());
});

//search-artist
app.get("/artists/search", (req,res)=>{
    let query = req.query.q;
    let number = req.query.num;
    if (query == undefined || query == ""){
        res.status(400).send("Must specify query in 'q' parameter.");
    }
    else {
        let result = paintings.select("artist").distinct().where(`artist regexp '${query}.*'`).orderby("artist");
        if (number != undefined) {
            result = result.limit(0, number);
        }
        res.send(result.get());
    }
});

//search-theme
app.get("/themes/search", (req,res)=>{
    let query = req.query.q;
    if (query == undefined || query == ""){
        res.status(400).send("Must specify query in 'q' parameter.");
    }
    else {
        res.send(paintings.select("theme").distinct().where(`theme regexp '${query}.*'`).get());
    }
});

//filter-paintings
app.get("/paintings/search", (req,res)=>{
    let artist = req.query.artist;
    let title = req.query.title;
    let theme = req.query.theme;
    let medium = req.query.medium;
    let size = req.query.size;
    let number = req.query.num;

    let query = paintings.selectAll();
    if (artist != undefined) {
        query = query.where(`artist regexp '${artist}.*'`);
    }

    if (title != undefined) {
        query = query.where(`title regexp '${title}.*'`);
    }

    if (theme != undefined) {
        query = query.where(`theme regexp '${theme}.*'`);
    }

    if (medium != undefined) {
        query = query.where(`medium regexp '${medium}.*'`);
    }

    if (size != undefined) {
        query = query.where(`size regexp '${size}.*'`);
    }

    if (number != undefined) {
        query = query.limit(0, number);
    }

    res.send(query.get());
});

app.get("/painting", (req,res)=>{
    let id =  req.query.id;
    if (id == undefined) {
        res.status(400).send("Require parameter 'id'.");
    }
    else {
        res.send(paintings.where(`id = ${id}`).get());
    }
});

app.post("/painting", (req,res)=>{
    let painting = req.body;
    let query = paintings.select("title, painting_thumbnail, size, medium, artist, painting_code");
    if (!painting.title || !painting.thumbnail || !painting.size || !painting.medium || !painting.product_code || !painting.artist)
        res.status(400).send("One or more required fields are missing.");
    else {
        query.insert(painting.title, painting.thumbnail, painting.size, painting.medium, painting.artist, painting.product_code);
        res.send();
    }
});

app.post("/shawl", (req,res)=>{
    let shawl = req.body;
    let query = shawls.select("item_number", "name", "colour", "type", "gender", "photo_code", "size");
    if (!shawl.item_number || !shawl.name || !shawl.colour || !shawl.type || !shawl.gender || !shawl.photo_code || !shawl.size) {
        res.status(400).send("One or more fields missing!");
    }
    else {
        query.insert(shawl.item_number, shawl.name, shawl.colour, shawl.type, shawl.gender, shawl.photo_code, shawl.size);
        res.send();
    }

});

app.post("/carpet", (req,res)=>{
    let carpet = req.body;
    let query = carpets.select("item_number", "name", "size", "type", "colour", "photo_code", "details", "origin");
    if (!carpet.item_number || !carpet.name || !carpet.size || !carpet.type || !carpet.colour || !carpet.photo_code || !carpet.details || !carpet.origin) {
        res.status(400).send("One or more fields missing!");
    }
    else {
        query.insert(carpet.item_number, carpet.name, carpet.size, carpet.type, carpet.colour, carpet.photo_code, carpet.details, carpet.origin);
        res.send();
    }
});

app.listen(6001, ()=>{
    console.log("Listening at 6000");
});