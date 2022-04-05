const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "seatgeek-seatgeekcom.p.rapidapi.com",
    "X-RapidAPI-Key": "91391145a8msh9f7bd0021971887p1809eajsnd21f71ef307e",
  },
};

fetch("https://seatgeek-seatgeekcom.p.rapidapi.com/taxonomies", options)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));


var apiKey = '&appid=8710c92cc91b2be9b69b111ac287d778';
var currWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var lat;
var lon;
$('.datepicker').on('change', console.log($('.datepicker').val()));
getLatLon();
function getLatLon() {
var currentWeathURL = (currWeather + 'Boston' + apiKey + '&units=imperial');
    fetch(currentWeathURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      lat = data.coord.lat;
      lon = data.coord.lon;
      getWeather();
    }) 
  }

  function getWeather () {
    var ForecastURL = ('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=minutely,hourly,alerts' + apiKey + '&units=imperial');
    fetch(ForecastURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      
      console.log(data);
    
    })
  } 