var userInput = $("#textarea1");
var searchList = [];
var clientID = "MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz";
var APIKey = "6d7bc9f4afbf01277e0e2187714f7bc1";
var searchResults = document.querySelector(".search-list");
var eventResults = $("#event-results");
var submitBtn = $("#submit-btn");
var favorites = $("#favorites");
var favList = [];

function getEvents(city) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    APIKey;

  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data.coord.lat;
      var lon = data.coord.lon;

      var url =
        "https://api.seatgeek.com/2/events?" +
        "lat=" +
        lat +
        "&lon=" +
        lon +
        "&per_page=10&taxonomies.name=sports&datetime_utc.gte=2022-04-05&client_id=" +
        clientID;

        fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
            eventResults.children().remove();
          for (let i = 0; i < data.events.length; i++) {
            var d = new Date(data.events[i].datetime_utc),
              month = "" + (d.getMonth() + 1),
              day = "" + d.getDate(),
              year = d.getFullYear();

            if (month.length < 2) month = "0" + month;
            if (day.length < 2) day = "0" + day;

            var eventName = $("<h5 >").addClass("event-name");
            var link = $("<a>");
            var favorite = $("<button>");
            var date = $("<h4>");
            link.attr("href", data.events[i].url);
            date.text([month, day, year].join("/"));
            favorite.text("Favorite");
            link.text("Buy Tickets");   
            eventName.text(data.events[i].performers[0].name +"-"+ date.text());
            // eventName.attr("data-eventName", data.events[i].performers[0].name +"-"+ date.text())
            favorite.attr("data-eventName", data.events[i].performers[0].name +"-"+ date.text())
            // to make favorite button work, added to button instead line above.
            eventResults.append(eventName);

            eventResults.append(favorite);
            eventResults.append(link);

            // eventName.on("click", function (event) {
              favorite.on("click", function (event) {
              event.preventDefault();

              var element = event.target;
 
              if (!favList.includes($(element).attr("data-eventName"))){
              favList.push($(element).attr("data-eventName"));
             
              console.log(favList);
              
              localStorage.setItem("favorites", JSON.stringify(favList));
              getFav();
              }
            });
          }
        });
    });
}
function renderFav(){
    favorites.innerHTML = "";
    for (var j = 0; j < favList.length; j++) {
        var favContent = favList[j];

        var li = $("<h6>");
        li.text(favContent + " ");


        li.append('<button class="delete-btn">Delete</button>')
        favorites.append(li);


    }
    
}

// function removeBtn(){

// }


function getFav(){
    var favors = JSON.parse(localStorage.getItem("favorites"));
    if (favors !== null) {
        favList = favors;
    }
    renderFav();
}
getFav();
submitBtn.on("click", function (event) {
  event.preventDefault();
  var city = userInput.val();

  searchList.push(city);
  // localStorage.setItem("Search List", JSON.stringify(searchList));
  getEvents(city);
});
