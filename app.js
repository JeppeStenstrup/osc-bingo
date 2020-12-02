'use strict';
const { Client, Message } = require('node-osc');
var express = require("express"),
    app = express();

app.use(express.static('public'))

const OSC_ADDRESS = "/oscAddress"

app.get('/', (req, res) => { res.sendFile("index.html") })

app.get('/:tal1/:tal2/:tal3/:tal4/:tal5/:tal6', (req, res) => {
    const client = new Client('127.0.0.1', 3333);
    client.send(OSC_ADDRESS, req.params.tal1, () => {
        client.send(OSC_ADDRESS, req.params.tal2, () => {
            client.send(OSC_ADDRESS, req.params.tal3, () => {
                client.send(OSC_ADDRESS, req.params.tal4, () => {
                    client.send(OSC_ADDRESS, req.params.tal5, () => {
                        client.send(OSC_ADDRESS, req.params.tal6, () => {
                            client.close();
                        })
                    })
                })
            })
        })
    })
})

app.listen(3000)