const mongoose = require('mongoose');
const express = require('express')

console.log('***== Program (RE)Start ==***');

var app = express()

mongoose.connect('mongodb+srv://stbn:8ygqiY@qXr$Fd48Q@cluster0.k9xnqgg.mongodb.net/?retryWrites=true&w=majority', () => {});

const Racer = mongoose.model('Racer', {
    firstName: String,
    lastName: String,
    team: String,
})

const Gasly = new Racer({ firstName: 'Pierre', lastName: 'Gasly', team: 'Alpine' })
const Occon = new Racer({ firstName: 'Esteban', lastName: 'Occon', team: 'Alpine' })

const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile('/static/index.html')
})

app.listen(3000)