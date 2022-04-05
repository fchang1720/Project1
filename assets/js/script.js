var apiKey = '&appid=8710c92cc91b2be9b69b111ac287d778';
var currWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var cityInput = $('#textarea1');
var lat;
var lon;
var date = moment().format('YYYY-MM-DD');
var datePlus = moment().add(1, 'days').format('YYYY-MM-DD');
console.log(date);
console.log(datePlus);
$('#submit-btn').on('click', function(){
  var calendarDate = $('.datepicker').val();
  console.log(cityInput.val());
  console.log(calendarDate);
  if(date == calendarDate){
    console.log('true');
  }
  if(calendarDate == '' || cityInput.val() == ''){
    console.log('empty');
  }else{
    getLatLon();
  }
});

function getLatLon() {
var currentWeathURL = (currWeather + cityInput.val() + apiKey + '&units=imperial');
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