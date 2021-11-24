'use strict';
const { Client } = require('node-osc');
const fs = require("fs")
var express = require("express"),
    app = express();

app.use(express.static('public'))

const OSC_PORT     = "127.0.0.1"

const OSC_ADDRESS1 = "/d3/oscAddress1"
const OSC_ADDRESS2 = "/d3/oscAddress2"
const OSC_ADDRESS3 = "/d3/oscAddress3"
const OSC_ADDRESS4 = "/d3/oscAddress4"
const OSC_ADDRESS5 = "/d3/oscAddress5"
const OSC_ADDRESS6 = "/d3/oscAddress6"

app.get('/', (req, res) => { res.sendFile("index.html") })

app.get('/:tal1/:tal2/:tal3/:tal4/:tal5/:tal6', (req, res) => {

    const client = new Client(OSC_PORT, 3333);
    client.send(OSC_ADDRESS1, parseFloat(req.params.tal1), () => {
        client.send(OSC_ADDRESS2, parseFloat(req.params.tal2), () => {
            client.send(OSC_ADDRESS3, parseFloat(req.params.tal3), () => {
                client.send(OSC_ADDRESS4, parseFloat(req.params.tal4), () => {
                    client.send(OSC_ADDRESS5, parseFloat(req.params.tal5), () => {
                        client.send(OSC_ADDRESS6, parseFloat(req.params.tal6), () => {
                            client.close();
                        })
                    })
                })
            })
        })
    })
    res.end()
})

app.get('/save/:path/:data', (req, res) => {
    console.log(req.params.data)
    let datetime = new Date();
    let obj = req.params.data.split(',')
    //console.log(obj)

    fs.writeFile(`saved_games/${req.params.path}`, JSON.stringify(obj), function (err) {
        if (err) return console.log(err);
    });
    res.end()
})

app.get('/load/:data', (req, res) => {
    fs.readFile('saved_games/'+req.params.data, 'UTF-8', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        res.setHeader('Content-Type', 'application/json');
        console.log(data)
        res.send(data)
    })
})

app.get('/getGames', (req, res) => {
    fs.readdir(__dirname+'/saved_games', (err, files) => {
        if (err) {
            console.log(err)
            return
        }

        res.send(JSON.stringify(files))
    })
})

app.get('/newGame/:data', (req, res) => {
    console.log(req.params.data)
    fs.writeFile('saved_games/'+req.params.data+'.txt', '["0","0","0","0","0","0"]', (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        res.sendStatus(200)
    })
})

app.listen(3000)
