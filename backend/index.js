const express = require("express");
const Database = require("sync-mysql-database").Database;
const database_auth = require("./database_auth");
const database_structure = require("./database_structure.json");

//sql connection
var database = new Database(database_auth, database_structure);
var paintings = database.getTable("paintings").query();

var app = new express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//fetch all paintings
app.get("/paintings", (req,res)=>{
    res.send(paintings.get());
});

//fetch all artists
app.get("/artists", (req,res)=>{
    res.send(paintings.select("artist").distinct().orderby("artist").get());
});

//fetch all themes
app.get("/themes", (req,res)=>{
    res.send(paintings.select("theme").distinct().get());
});

//fetch all medium
app.get("/mediums", (req,res)=>{
    res.send(paintings.select("medium").distinct().get());
});

//search-artist
app.get("/artists/search", (req,res)=>{
    let query = req.query.q;
    if (query == undefined || query == ""){
        res.status(400).send("Must specify query in 'q' parameter.");
    }
    else {
        res.send(paintings.select("artist").distinct().where(`artist regexp '${query}.*'`).orderby("artist").get());
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

app.listen(6000, ()=>{
    console.log("Listening at 6000");
});