'use strict';
const { Client } = require('node-osc');
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

app.listen(3000)
