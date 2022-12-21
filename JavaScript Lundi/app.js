import {Racer} from "./controllers/racerCtrl.js"
import {Scuderia} from "./controllers/scuderiaCtrl.js"
import path from "path";
import express from "express";
import mongoose from "mongoose";
const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://stbn:9jFkxNmdpKCjhX3r@cluster0.k9xnqgg.mongodb.net/?retryWrites=true&w=majority', () => {

    const Gasly = new Racer({
        firstName: 'Pierre',
        lastName: 'Gasly',
        team: 'Alpine' })
    Gasly.save().then(() => console.log('Gasly created!'))
    const Occon = new Racer({
        firstName: 'Esteban',
        lastName: 'Occon',
        team: 'Alpine' })
    Occon.save().then(() => console.log('Occon created!'))
    const Magnussen = new Racer({
        firstName: 'Kevin',
        lastName: 'Magnussen',
        team: 'Haas' })
    Magnussen.save().then(() => console.log('Magnussen created!'))



    app.get('/hello', function (req, res) {
        res.send('Hello, World!')
    });
    app.get('/hello/a', function (req, res) {
        res.send('Hello, World A!')
    });
    app.get('/hello/b', function (req, res, next) {
        console.log('wait...')
        next()
    }, function (req, res){
        res.send('Hello, World B!')
    });
    const cb0 = function (req, res, next) {
        console.log('cb0');
        next()
    }
    const cb1 = function (req, res, next) {
        console.log('cb1');
        next()
    }
    const cb2 = function (req, res) {
        console.log('cb2');
        res.send('Hello, World C!');
    }
    app.get('/hello/c', [cb0, cb1, cb2]);
    app.get('/hello/d', [cb0, cb1], function(req, res){
        res.send('Hello, World D!')
    });
    app.get('/ind+ex', function (req, res) {
        res.sendFile(path.join(__dirname, "public/index.html"))
    });
    app.get('/download', function (req, res) {
        res.download("./index.js")
    })

    app.get('/newRacer', function (req, res) {
        res.sendFile(path.join(__dirname, "public/newRacer.html"))
    });
    app.post('/newRacer', function (req, res) {
        console.log(req.body)
        const bodycontent = req.body
        const newRacer = new Racer({
            firstName: bodycontent.firstName,
            lastName: bodycontent.lastName,
            team: bodycontent.team})
        newRacer.save().then(() => console.log('newRacer created!'))
        res.send(newRacer)
    })
    app.post('/newScuderia', function (req, res) {
        console.log(req.body)
        const newScuderia = req.body
        const newRacer = new Scuderia({
            teamName: newScuderia.teamName,
            firstPilot: newScuderia.firstPilot,
            secondPilot: newScuderia.secondPilot})
        newRacer.save().then(() => console.log('newRacer created!'))
        res.send(newRacer)
    })
    app.post('/newScuderiaNRacers', function (req, res) {
        console.log(req.body)
        const newScuderiaNRacers = req.body
        const newRacer1 = new Scuderia({
            teamName: newScuderiaNRacers.Scuderia.scuderiaName,
            firstPilot: newScuderiaNRacers.racer1.firstName,
            secondPilot: newScuderiaNRacers.racer1.lastName,
            racerNumber: newScuderiaNRacers.racer1.number})
        newRacer1.save().then(() => console.log('newRacer1 created!'))
        const newRacer2 = new Scuderia({
            teamName: newScuderiaNRacers.Scuderia.scuderiaName,
            firstPilot: newScuderiaNRacers.racer2.firstName,
            secondPilot: newScuderiaNRacers.racer2.lastName,
            racerNumber: newScuderiaNRacers.racer2.number})
        newRacer2.save().then(() => console.log('newRacer2 created!'))
        const newScuderia = new Scuderia({
            teamName: newScuderiaNRacers.scuderia.scuderiaName,
            firstPilot: newScuderiaNRacers.racer1.lastName,
            secondPilot: newScuderiaNRacers.racer2.lastName})
        newScuderia.save().then(() => console.log('newScuderia created!'))
        res.send(newRacer)
    })

    /*app.use(express.static(path.join(__dirname, "public")));*/
});

export default app;