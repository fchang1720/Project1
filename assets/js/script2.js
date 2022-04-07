var userInput = $("#textarea1");
var searchList = [];
var clientID = "MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz";
var APIKey = "6d7bc9f4afbf01277e0e2187714f7bc1";
var searchResults = document.querySelector(".search-list");
var eventResults = $("#event-results");
var submitBtn = $("#submit-btn");
var favorites = $("#favorites");
var favList = [];
var dateInput; 

eventResults.hide();

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
        if(data.cod == '404')
        {
          noCityFound();
        }else{
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      console.log(data);
      var endDate;
      for(var i = 0; dateInput >= moment().add(i, 'days').format('YYYY-MM-DD'); i++ ){
          var addDay = i+1
              if(dateInput == moment().add(i, 'days').format('YYYY-MM-DD'))
              {
                      endDate = moment().add(addDay, 'days').format('YYYY-MM-DD');
                      console.log(endDate);
              }
      }
  
      var url =
          "https://api.seatgeek.com/2/events?lat=" + lat + "&lon=" + lon + "&per_page=10" +
          "&taxonomies.id=1010100,1030100,1020100,1050100,1040100,1040200,1010200,1030200,1020200" +
          "&datetime_local.gte=" + dateInput + "&datetime_local.lt=" + endDate +
           "&client_id=" +
          clientID;
    //   var url =
    //     "https://api.seatgeek.com/2/events?" +
    //     "lat=" +
    //     lat +
    //     "&lon=" +
    //     lon +
    //     "&per_page=10&taxonomies.name=sports&datetime_utc.gte=2022-04-05&client_id=" +
    //     clientID;

        fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          eventResults.show();
          console.log(data);
          eventResults.text('');
          eventResults.children().remove();
          if(data.events.length == 0)
          {
              noEvents();
              console.log('no data');
            }else{ 
          for (let i = 0; i < data.events.length; i++) {
            var d = new Date(data.events[i].datetime_local),
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
            // link.text("Buy Tickets");   
            // eventName.text(data.events[i].performers[0].name +"-"+ date.text());
            // eventName.attr("data-eventName", data.events[i].performers[0].name +"-"+ date.text())
            // favorite.attr("data-eventName", data.events[i].performers[0].name +"-"+ date.text())
            link.text("Buy Tickets");
            eventName.text(
              data.events[i].short_title + "-" + date.text()
            );
            favorite.attr(
              "data-eventName",
              data.events[i].short_title + "-" + date.text()
            );
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
        }
        });
      }
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
//
function noEvents(){
    var cityName = userInput.val();
    eventResults.text('There are no events near the city of ' + cityName + ' for the date you selected.');
}

 function expireDate(){
    eventResults.show();
    eventResults.children().remove();
    eventResults.text('Error - Expired Date: No events to display. Please select a valid date to see events in your desired City.');
 };

 function noInput() {
    eventResults.show(); 
    eventResults.text('Search fields incomplete.  Please enter a city name, and select a valid date.');

  }

  function noCityFound(){
    eventResults.show(); 
    eventResults.text('Error - City Input: Unable to recognize city name.  Please verify city name is spelled correctly.');
  }

submitBtn.on("click", function (event) {
  event.preventDefault();
  var city = userInput.val();
  dateInput = $('#datepicker').val();
  if(dateInput == '' || city == ''){
    noInput();
  }else{
    if(dateInput < moment().format('YYYY-MM-DD')){
      expireDate();
    }else{
  searchList.push(city);
  // localStorage.setItem("Search List", JSON.stringify(searchList));
  getEvents(city);
  }
}
});

//error types
//no entry
//only date
//only city
//past date
//date beyond 7 days in future
//no event on the specified day
//city name spelled incorrectly
//error types
//resolve error of an empty array, no events that day



//mlb id = 1010100
//nba id = 1030100
//nfl id = 1020100
//mls id = 1050100
//nhl id = 1040100
//ncaa hockey id = 1040200
//ncaa baseball id = 1010200
//ncaa basketball id = 1030200
//ncaa football id = 1020200
//data.events[i].short_title +"-"+ date.text()); for calling event name
