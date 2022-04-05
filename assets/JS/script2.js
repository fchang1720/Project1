alert("hello");
// modify 
// var url = "https://api.seatgeek.com/2/events?per_page=20&lat=42.3600825&lon=-71.0588801&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
// var url = "https://api.seatgeek.com/2/events?per_page=20&postal_code=55411&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
// var url = "https://api.seatgeek.com/2/events?highest_price.lte=40&per_page=20&postal_code=55411&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"

var url = 'https://api.seatgeek.com/2/events?taxonomies.name=sports&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz'
fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })