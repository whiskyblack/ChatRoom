var id=0;
var socket=io("http://localhost:9999");

socket.on("create-room-success", function (data) {
    $("#room-list").html("");
    data.map(function (t) {
        if (t.length!==20) {
            var now = new Date();
            var id = 'room-' + now.getTime();
            $("#room-list").append("<div id='"+id+"'>" + t + "</div>");
            $('#' + id).bind('click', function (e) {
                alert('clicked on div in #room-list: ' + $(this).attr('id'));
            });
        }
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
    // $('#room-list > div').live('click', function (e) {
    //     alert('clicked on div in #room-list');
    // });
});