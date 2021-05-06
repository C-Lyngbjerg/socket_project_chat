// imports
const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
 
const PORT = process.env.PORT || 3000;

// get method for index page
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// socket method
io.on("connection", (socket) => {
    console.log("A socket connected with id: ", socket.id);
    socket.on("message", (data) => {
        console.log(data.user+ ": " +data.chat);
        io.emit('response', data); // broadcast emit user: chat
    });
});


// listen method to run app
server.listen(PORT, (error) => {
    if(error) {
        console.log(error);
    }
    console.log('Server is running on port: ', PORT);

});