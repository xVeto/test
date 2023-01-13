const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io =require('socket.io')(server, { cors: {origin: "*"}})


function godzina()
{
    var date = new Date();
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}


server.listen(8080, () => {
    console.log(`${godzina()}: Server is runing... (listening on port: 8080)`);
})

io.on("connection", (socket) => {
    var clientIp = socket.conn.remoteAddress;
    console.log(`${godzina()}: New connection from: ${socket.id} (${clientIp})`);

    socket.on("url", (data) => {
            console.log(`${godzina()}: New data arrived: ${data}   // (from: ${socket.id})`);
            socket.broadcast.emit("url", data);
    });

    socket.on("play", (data) => {
        socket.broadcast.emit("play", data);
    })

    socket.on("disconnect", () => {
        console.log(`${godzina()}: User disconnected: ${socket.id}`);
    });
})