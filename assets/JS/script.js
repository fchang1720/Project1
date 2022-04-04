alert("hello");
var url = "https://api.seatgeek.com/2/events?lat=42.3600825&lon=-71.0588801&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"

fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
