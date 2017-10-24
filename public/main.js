var id=0;
var socket=io("http://localhost:9999");

socket.on("create-room-success", function (data) {
    $("#room-list").html("");
    data.map(function (t) {
        if (t.length!==20)
            $("#room-list").append("<div id='room'>"+t+"</div>");
    })
});

socket.on("in-room", function (data) {
    $("#current-room").html("Room: "+data);
});

socket.on("message", function (data) {
    $("#list-message").append("<div class='mess'"+id+">"+data.name+": "+data.message+"</div>");
});

$(document).ready(function () {
    $("#btnCreate").click(function () {
        socket.emit("create-room", $("#txtRoom").val());
    });

    $("#btnSend").click(function () {
        var userName=$("#txtName").val();
        if (userName.length>0){
            socket.emit("message", {name:userName, message:$("#txtMessage").val()});
        } else {
            alert("Input your name!");
        }
    });
});