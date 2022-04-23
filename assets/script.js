var apiKey = '042500ef7180356ba1ec2ece525c6cd0';
var citySearch = document.getElementById("city-search");
var searchcity = document.getElementById("searchbutton");
var cityEl = document.getElementById("cityname")
var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var uvindexEl = document.getElementById("uvindex")

var searchedcity;

function apiCall(sometext) {
    searchedcity = citySearch.value

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedcity}&appid=${apiKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function(data) {
            // console.log(data)
            cityweather(data)
        });
}

function cityweather (weatherData) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&units=imperial&appid=${apiKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function(data) {
            // console.log(data)
            currentweather(data.current)
            futureforecast(data.daily)
        });
}

function currentweather (todaysweather){
    console.log(todaysweather)
    cityEl.textContent = searchedcity
    tempEl.textContent = `Temp: ${todaysweather.temp}`
    windEl.textContent = todaysweather.wind_speed
    humidityEl.textContent = todaysweather.humidity
    uvindexEl.textContent = todaysweather.uvi

}

function futureforecast (fivedayforecast){
    console.log(fivedayforecast)
    // dayone example:
    // weathericon1El.innerHtml = <img src=" http://openweathermap.org/img/wn/${fivedayforecast[0].weather[0].icon}.png">
    // temp1El.textConent = fivedayforecast[0].temp 
    // wind1El.textContent = fivedayforecast[0].wind_speed

    // daytwo example:
    // temp2El.textContent = fivedayforecast[1].temp 
    // wind1El.textContent = fivedayforecast[1].wind_speed
}

searchcity.addEventListener('click', apiCall)