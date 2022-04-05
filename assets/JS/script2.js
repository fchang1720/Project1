alert("hello");
var userInput = $("#textarea1");
var searchList = [];
var clientID = "MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
var submitBtn = $("#submit-btn");

// modify 
// var url = "https://api.seatgeek.com/2/events?per_page=20&lat=42.3600825&lon=-71.0588801&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
// var url = "https://api.seatgeek.com/2/events?per_page=20&postal_code=55411&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
// var url = "https://api.seatgeek.com/2/events?highest_price.lte=40&per_page=20&postal_code=55411&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"

// var url = 'https://api.seatgeek.com/2/events?taxonomies.name=sports&datetime_utc=2022-04-12&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz'
function getEvents(zip){
var url = "https://api.seatgeek.com/2/events?postal_code=" + zip + "per_page=30&taxonomies.name=sports&datetime_utc.gte=2022-04-05&client_id=" + clientID;
fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })

}
    // event listener for search button
submitBtn.on("click", function (event) {
    event.preventDefault();
    var zip = userInput.val();
    
    searchList.push(zip);
    localStorage.setItem("Search List", JSON.stringify(searchList));
    getEvents(zip);

});