const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let professional = require('../Professional');

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

//Show all films
app.get("/movies", function (req, res){
    let data = `SELECT * FROM movies`
    result(data, res)
})

//Show film by id
app.get("/movies/:number", function (req, res){
    let number = req.params
    let data = `SELECT * FROM movies WHERE movies_id = ${number.number}`
    result(data, res)
})

//Show actores/director/writer/film_producer details by movie_id
app.get("/movies/:profession/:number", function (req, res){
    let number = req.params
    let profession = req.params
    if ( profession.profession == "film_producer") {
        let data = `SELECT * FROM film_producer JOIN movies ON film_producer.movies_id = movies.movies_id WHERE movies.movies_id = ${number.number}`
        result(data, res)

    } else {
        let data = `SELECT * FROM professionals JOIN movies_professionals ON professionals.professionals_id = movies_professionals.professionals_id JOIN movies ON movies_professionals.movies_id = movies.movies_id WHERE movies.movies_id = ${number.number} AND professionals.profession = "${profession.profession}"`
        result(data, res)
    } 
})


//Add a film
app.post("/movies", function (req, res){ 
    const newFilm = new movie.Movie(req.body.title, req.body.release_year, req.body.nationality, req.body.genre);
   
    let data = `INSERT INTO movies (title, release_year, nationality, genre) VALUES ("${newFilm.title}", ${newFilm.releaseYear}, "${newFilm.nationality}", "${newFilm.genre}")`
    result(data, res)  
})

//Add an actor to the film 
app.post("/:movies/actor", function (req, res){ 
    let movies = req.params
    const newActor = new professional.Professional(req.body.name, req.body.age, req.body.genre, req.body.weight, req.body.height, req.body.hairColor, req.body.eyeColor, req.body.race, req.body.isRetired, req.body.nationality, req.body.oscarNumbers, req.body.profession);
    

    let data = `INSERT INTO professionals (name, age, genre, weight, height, hair_color, eye_color, race, isRetired, nationality, oscarNumbers, profession) VALUES ("${newActor.name}", ${newActor.age}, "${newActor.genre}", "${newActor.weight}", "${newActor.height}", "${newActor.hairColor}", "${newActor.eyeColor}", "${newActor.race}", "${newActor.isRetired}", "${newActor.nationality}", ${newActor.oscarNumbers}, "${newActor.profession}")`
   
    db.query(data, (err, result) => {
        if (err) throw err;
        let results = `INSERT INTO movies_professionals (movies_id, professionals_id) VALUES (${req.query.id}, ${result.insertId})`
        db.query(results, (err, result) => {
            if (err) throw err;
            res.send(result)
        })
        
    })
})

////Delete a film
app.delete("/movies", function (req, res){ 
    let data = `DELETE FROM movies WHERE title = "${req.query.id}"`
    result(data, res)  
})

////Delete an actor/director/writer from a film
app.delete("/:movies/:name", function (req, res){ 
    let movies = req.params
    let name = req.params
    if (name.name == "director" || name.name == "writer")  {

        let data = `DELETE movies_professionals FROM movies_professionals JOIN movies ON movies_professionals.movies_id = movies.movies_id JOIN professionals ON movies_professionals.professionals_id = professionals.professionals_id WHERE title = "${movies.movies}" AND profession = "${name.name}"`
        result(data, res)  

    } else {

        let data = `DELETE movies_professionals FROM movies_professionals JOIN movies ON movies_professionals.movies_id = movies.movies_id JOIN professionals ON movies_professionals.professionals_id = professionals.professionals_id WHERE title = "${movies.movies}" AND name = "${name.name}"`
        result(data, res)
    }       
})

app.listen(3000)