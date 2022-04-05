alert("hello");
var userInput = $("#textarea1");
var searchList = [];
var clientID = "MjY0MTc0MDV8MTY0OTA5NjY1Ni4yOTYzNDMz"
var searchResults = $("event-results")
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

// Function that fetches weather information from past searches. Allows easy access to previous search results.
function renderCities(){
    searchList.innerHTML = "";

    for (var j = 0; j < cityList.length; j++) {
        var cityContent = cityList[j];

        var li = document.createElement("button");
        li.textContent = cityContent;
        li.style.width = '100%';
        li.style.marginBottom = '5px';
        searchList.appendChild(li);
    }
    searchList.addEventListener("click", function(event){
        event.preventDefault();
        
        var element= event.target;
        if(element.matches("button") === true){
            city = element.textContent;
        
            getWeather(city);
            get5Forecast(city);
            
        }

    });
}

// Function to save searched cities and display them
function getCities(){
    var cities = JSON.parse(localStorage.getItem("City Name"));
  
    if (cities !== null) {
        cityList = cities;
      }
    renderCities();
}
    // event listener for search button
submitBtn.on("click", function (event) {
    event.preventDefault();
    var zip = userInput.val();
    
    searchList.push(zip);
    localStorage.setItem("Search List", JSON.stringify(searchList));
    getEvents(zip);

});