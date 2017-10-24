var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app).listen(process.env.PORT || 9999);
var io = require("socket.io")(server);

io.on("connection", function (socket) {
    var list = [];

    for (r in socket.adapter.rooms) {
        list.push(r);
    }
    io.sockets.emit("create-room-success", list);

    socket.on("create-room", function (data) {
        socket.leave(socket.Room);
        socket.Room = data;
        socket.join(data);

        list = [];

        for (r in socket.adapter.rooms) {
            list.push(r);
        }
        io.sockets.emit("create-room-success", list);
        socket.emit("in-room", data);
    });

    socket.on("to-room", function (data) {
        socket.leave(socket.Room);
        socket.Room=data;
        socket.join(data);

        list=[];

        for (r in socket.adapter.rooms){
            list.push(r);
        }

        io.sockets.emit("create-room-success", list);
        socket.emit("in-room", data);
    });

    socket.on("message", function (data) {
        io.sockets.in(socket.Room).emit("message", data);
    });

});

app.get("/", function (req, res) {
    res.render("home");
});