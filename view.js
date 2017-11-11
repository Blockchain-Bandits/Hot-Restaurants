var reservations = [];
fs.readFile("reservations.json", "utf8", function(error, data) {
    
    if (error) {
        return console.log(error);
    }

    reservations = JSON.parse(data)

    console.log(reservations);

    var resNum = 1;
    reservations.forEach(function(item) {
        if (resNum < 6) {
            $("#name-display").append("<span class='label label-primary'>" + resNum + "</span> | " + item.name);
        } else {
            $("#waitlist-display").append("<span class='label label-primary'>" + resNum + "</span> | " + item.name);
        }
        resNum++;
    }

});
