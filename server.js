var express = require("express");
var app = express();
var http = require("http").Server(app);
var fs = require("fs");
var io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", function (socket) {
  fs.readFile("image.png", function (err, data) {
    socket.emit("imageConversionByClient", { image: true, buffer: data });
    socket.emit(
      "imageConversionByServer",
      "data:image/png;base64," + data.toString("base64")
    );
  });
});

http.listen(4000, function () {
  console.log("listening on *:4000");
});
