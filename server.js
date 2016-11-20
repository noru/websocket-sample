var ws = require("nodejs-websocket")

// Simply redirecting messages server
var server = ws.createServer(function (conn) {
    console.log("New connection")
    conn.on("text", function (str) {
        console.log("Received " + str)
        broadcast(str)
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
    })
}).listen(8001)

function broadcast(msg) {
    server.connections.forEach(function (conn) {
        conn.sendText(msg)
    })
}

var path = require('path')
var fs = require('fs')
var express = require('express')

var app = express()

// serve dev build as static file
app.use('/', express.static('./'))

app.listen(8080, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:8080\n')
})
