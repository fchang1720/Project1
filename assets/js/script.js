var apiKey = '&appid=8710c92cc91b2be9b69b111ac287d778';
var currWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var lat;
var lon;
var date = moment().format('YYYY-MM-DD');
console.log(date);

$('#submit-btn').on('click', function(){
  var calendarDate = $('.datepicker').val();
  
  console.log(calendarDate);
  if(date == calendarDate){
    console.log('true');
  }
});
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