
var userInput = $("#textarea1");
var searchList = [];
var clientID = "MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
var APIKey = "6d7bc9f4afbf01277e0e2187714f7bc1";
var searchResults = document.querySelector(".search-list");
var eventResults = $("#event-results");
var submitBtn = $("#submit-btn");

// modify 
// var url = "https://api.seatgeek.com/2/events?per_page=20&lat=42.3600825&lon=-71.0588801&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
// var url = "https://api.seatgeek.com/2/events?per_page=20&postal_code=55411&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
// var url = "https://api.seatgeek.com/2/events?highest_price.lte=40&per_page=20&postal_code=55411&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"

// var url = 'https://api.seatgeek.com/2/events?taxonomies.name=sports&datetime_utc=2022-04-12&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz'
function getEvents(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data.coord.lat;
            var lon = data.coord.lon;
        
        var url = "https://api.seatgeek.com/2/events?" + "lat=" + lat + "&lon=" + lon +"&per_page=10&taxonomies.name=sports&datetime_utc.gte=2022-04-05&client_id=" + clientID;
        
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            
            for (let i = 0; i < data.events.length; i++) {

            console.log(data.events[i].datetime_utc)
            var d = new Date(data.events[i].datetime_utc),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
   
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
   
          
            var eventName = $("<h5>");
            var link = $("<a>");
            var favorite =$("<button>");
            var date =$("<h4>");
            link.attr('href', data.events[i].performers[0].url)
            date.text([month, day, year].join('/'))
            favorite.text("Favorite");
            link.text("Buy Tickets");   
            eventName.text(data.events[i].performers[0].name +"-"+ date.text());
            eventResults.append(eventName);
            // eventResults.append(date);
            eventResults.append(favorite);
            eventResults.append(link);
            
            eventName.on("click", function(event){
                event.preventDefault();

                var element= event.target;
                console.log(element)
                // if(element.matches("button") === true){
                //     localStorage.setItem("Search Favorite", JSON.stringify(eventResults[element]));
                //     console.log(eventResults[element]);
                // }
            });
            
            }



        })
    })

}


submitBtn.on("click", function (event) {
    event.preventDefault();
    var city = userInput.val();
    console.log(city);
    searchList.push(city);
    localStorage.setItem("Search List", JSON.stringify(searchList));
    getEvents(city);

});