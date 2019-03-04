const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let User = require('./models/User');
const app = express();
app.use(bodyParser.json());

let db = mongoose.connect('mongodb://localhost:27017/cms', function(err, response){
    if(err)
        console.log("There is error in connecting with mongodb.");
    console.log("Connection has been added");
});

app.post('/users', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;
    let password = req.body.password;
    let phoneNumber = req.body.phoneNumber;

    //szukamy uzytkownika po emailu (ktory jest unikalny w kolekcji)
    User.findOne({email: email}, (error, user) =>{
        if(error){
            console.log("There was an error while registering user, please try again", error);
        } else{
            if(!user){  // Można założyć użytkownika
                // tworzymy nowy dokument (Usera)
                let user = new User();
                user.firstName = firstName;
                user.lastName = lastName;
                user.email = email;
                user.password = password;
                user.phoneNumber = phoneNumber;
                // zapisujemy go w kolekcji
                user.save((err, result) => {
                    if(err){
                        console.log("There is an error in adding user into collection");
                        res.status(400).send("Error");
                    }
                    res.status(200).send(user);
                });
            } else{ // Emial podany w rejestracji już istnieje 
                res.status(500).send("Podany email już jest w bazie");
            }
        }
    })    
});

app.listen(3000, function(err, response){
    console.log("Server is running on port:", 3000);
});