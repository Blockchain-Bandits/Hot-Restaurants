console.log("request called");
$("#reserve").on("click", function(event) {
    event.preventDefault();
    var newReservation = {
        "name": $("#name").val().trim(),
        "phone": $("#phone").val().trim(),
        "email": $("#email").val().trim(),
        "id": $("#unique-id").val().trim()
    };

    $.post("/api/new", newReservation)
        .done(function(data) {
            console.log(data);
        });
});

