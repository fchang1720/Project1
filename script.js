var seatGeekKey = 'MjY0MTc0NjR8MTY0OTA5Njk3MS41NjgzNDk0';
var reqSeatGeekURL = ('https://api.seatgeek.com/2/events?client_id=' + seatGeekKey);
console.log(reqSeatGeekURL);
fetch(reqSeatGeekURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    console.log(data.events[2].type);
  });
