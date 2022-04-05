var apiKey = '&appid=8710c92cc91b2be9b69b111ac287d778';
var currWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
var cityInput = $('#textarea1');
var dateInput; 
var lat;
var lon;
// var date = moment().format('YYYY-MM-DD');
// console.log(date);
$('#submit-btn').on('click', function(){
  dateInput = $('#datepicker').val();
  // console.log(cityInput.val());
  // console.log(dateInput);
  // if(date == dateInput){
  //   console.log('true');
  // }
  if(dateInput == '' || cityInput.val() == ''){
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
      // 
      
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
      for(var i = 0; i< 8; i++){
        if(dateInput == moment().add(i, 'days').format('YYYY-MM-DD')){
          console.log(moment().add(i, 'days').format('YYYY-MM-DD'));
          console.log(i)
          $('.card-title').text(cityInput.val() + moment().add(i, 'days').format('l'))
        }
      }
      
    })
  } 