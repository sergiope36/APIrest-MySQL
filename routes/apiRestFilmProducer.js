const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let filmProducer = require('../FilmProducer');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Create connection
var mysql = require('mysql');
var db = mysql.createConnection({
    host : 'localhost',
    database : 'movies IMDB',
    password: null,
    user: 'root',
});

//Connect
db.connect()

//return values
const result =(data, res) => {
    db.query(data, (err, result) => {
        if (err) throw err;
        res.send(result)
    })
}

//Show all film producers
app.get("/film_producers", function (req, res){
    let data = `SELECT * FROM film_producer`
    result(data, res)
})

//Show film producers by id
app.get("/film_producers/:number", function (req, res){
    let number = req.params
    let data = `SELECT * FROM film_producer WHERE film_producer_id = ${number.number}`
    result(data, res)
})

//Add a film_producer
app.post("/film_producers", function (req, res){ 
    const newFilmProducer = new filmProducer.FilmProducer(req.body.name, req.body.year, req.body.country, req.body.movies_id);
    let data = `INSERT INTO film_producer (name, year, country, movies_id) VALUES ("${newFilmProducer.name}", ${newFilmProducer.year}, "${newFilmProducer.country}", "${newFilmProducer.movies_id}")`
   
    result(data, res)  
})

//update a film_producer
app.put("/film_producers", function (req, res){ 
    let data = `UPDATE film_producer SET name = "${req.body.name}", year = ${req.body.year}, country = "${req.body.country}", name ="${req.body.movies_ide}"`

    result(data, res)  
})

//Delete a film_producer
app.delete("/film_producers", function (req, res){ 
    let data = `DELETE FROM film_producer WHERE name = "${req.query.id}"`
    result(data, res)  
})


app.listen(3000)
