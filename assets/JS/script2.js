alert("hello");
var userInput = $("#userInput");
// modify 
// var url = "https://api.seatgeek.com/2/events?per_page=20&lat=42.3600825&lon=-71.0588801&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
// var url = "https://api.seatgeek.com/2/events?per_page=20&postal_code=55411&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
// var url = "https://api.seatgeek.com/2/events?highest_price.lte=40&per_page=20&postal_code=55411&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"

// var url = 'https://api.seatgeek.com/2/events?taxonomies.name=sports&datetime_utc=2022-04-12&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz'
var url = 'https://api.seatgeek.com/2/events?per_page=30&taxonomies.name=sports&datetime_utc.gte=2022-04-05&client_id=MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz'
fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })


    // event listener for search button
srchBtn.on("click", function (event) {
    event.preventDefault();
    var zip = userInput.val();
    
    cityList.push(city);
    localStorage.setItem("City Name", JSON.stringify(cityList));
    getCities();
    getWeather(city);
    get5Forecast(city);

});