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

//Show all professionals
app.get("/professionals", function (req, res){
    let data = `SELECT * FROM professionals`
    result(data, res)
})

//Show professionals by id
app.get("/professionals/:number", function (req, res){
    let number = req.params
    let data = `SELECT * FROM professionals WHERE professionals_id = ${number.number}`
    result(data, res)
})

//Add a professional
app.post("/professionals", function (req, res){ 
    const newActor = new professional.Professional(req.body.name, req.body.age, req.body.genre, req.body.weight, req.body.height, req.body.hairColor, req.body.eyeColor, req.body.race, req.body.isRetired, req.body.nationality, req.body.oscarNumbers, req.body.profession);
    
    let data = `INSERT INTO professionals (name, age, genre, weight, height, hair_color, eye_color, race, isRetired, nationality, oscarNumbers, profession) VALUES ("${newActor.name}", ${newActor.age}, "${newActor.genre}", "${newActor.weight}", "${newActor.height}", "${newActor.hairColor}", "${newActor.eyeColor}", "${newActor.race}", "${newActor.isRetired}", "${newActor.nationality}", ${newActor.oscarNumbers}, "${newActor.profession}")`
   
    result(data, res)  

})

//update a professional
app.put("/professionals", function (req, res){ 
    let data = `UPDATE professionals SET name = "${req.body.name}", age = ${req.body.age}, genre = "${req.body.genre}", weight ="${req.body.weight}", height = "${req.body.height}", hair_color = "${req.body.hair_color}", eye_color = "${req.body.eye_color}", race = "${req.body.race}", isRetired = "${req.body.isRetired}" , nationality = "${req.body.nationality}", oscarNumbers = "${req.body.oscarNumbers}", profession = "${req.body.profession}" WHERE name = "${req.body.name}"`
   
    result(data, res)  
})

//Delete a professional

app.delete("/professionals", function (req, res){ 
    let data = `DELETE FROM professionals WHERE name = "${req.query.id}"`
    result(data, res)  
})


app.listen(3000)
