var apiKey = '042500ef7180356ba1ec2ece525c6cd0';
var citySearch = document.getElementById("city-search");
var searchcity = document.getElementById("searchbutton");
var cityEl = document.getElementById("cityname")
var weathericonEl = document.getElementById("weather")
var tempEl = document.getElementById("temp")
var windEl = document.getElementById("wind")
var humidityEl = document.getElementById("humidity")
var uvindexEl = document.getElementById("uvindex")
var cityButtonsEl = document.getElementById("citybuttons")

var searchedcity;

function apiCall(event) {
    console.log(event.target)
    if(event.target.innerText !== 'Search'){
        searchedcity = event.target.innerText
    } else {
        searchedcity = citySearch.value
    }
    if(searchedcity === ""){
        return
    }
    saveSearch(searchedcity)
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchedcity}&appid=${apiKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // console.log(data)
            cityweather(data)
        });
}

function cityweather(weatherData) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${weatherData[0].lat}&lon=${weatherData[0].lon}&units=imperial&appid=${apiKey}`)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            // console.log(data)
            currentweather(data.current)
            futureforecast(data.daily)
        });
}

function currentweather(todaysweather) {
    // console.log(todaysweather)
    cityEl.textContent = searchedcity
    tempEl.textContent = `Temp: ${todaysweather.temp}`
    windEl.textContent = `Wind: ${todaysweather.wind_speed}`
    humidityEl.textContent = `Humidity: ${todaysweather.humidity}`
    uvindexEl.textContent = `UvIndex: ${todaysweather.uvi}`


}

function addDaysToDate(date, numberDays) {
    var res = new Date(date);
    res.setDate(res.getDate() + numberDays);
    return res.toDateString();
}

function futureforecast(fivedayforecast) {
    var today = new Date()
    var date1El = document.getElementById("date1")
    var weathericon1El = document.getElementById("weathericon1")
    var temp1El = document.getElementById("temp1")
    var wind1El = document.getElementById("wind1")
    var humidity1El = document.getElementById("humidity1")
    var image1El = document.createElement("img")
    image1El.setAttribute('src', `http://openweathermap.org/img/wn/${fivedayforecast[0].weather[0].icon}.png`)
    weathericon1El.appendChild(image1El)
    date1El.textContent = addDaysToDate(today, 1);
    temp1El.textContent = `Temp: ${fivedayforecast[0].temp.day}`
    wind1El.textContent = `Wind: ${fivedayforecast[0].wind_speed}`
    humidity1El.textContent = `Humidity: ${fivedayforecast[0].humidity}`

    var date2El = document.getElementById("date2")
    var weathericon2El = document.getElementById("weathericon2")
    var temp2El = document.getElementById("temp2")
    var wind2El = document.getElementById("wind2")
    var humidity2El = document.getElementById("humidity2")
    var image2El = document.createElement("img")
    image2El.setAttribute('src', `http://openweathermap.org/img/wn/${fivedayforecast[1].weather[0].icon}.png`)
    weathericon2El.appendChild(image2El)
    date2El.textContent = addDaysToDate(today, 2);
    temp2El.textContent = `Temp: ${fivedayforecast[1].temp.day}`
    wind2El.textContent = `Wind: ${fivedayforecast[1].wind_speed}`
    humidity2El.textContent = `Humidity: ${fivedayforecast[1].humidity}`

    var date3El = document.getElementById("date3")
    var weathericon3El = document.getElementById("weathericon3")
    var temp3El = document.getElementById("temp3")
    var wind3El = document.getElementById("wind3")
    var humidity3El = document.getElementById("humidity3")
    var image3El = document.createElement("img")
    image3El.setAttribute('src', `http://openweathermap.org/img/wn/${fivedayforecast[2].weather[0].icon}.png`)
    weathericon3El.appendChild(image3El)
    date3El.textContent = addDaysToDate(today, 3);
    temp3El.textContent = `Temp: ${fivedayforecast[2].temp.day}`
    wind3El.textContent = `Wind: ${fivedayforecast[2].wind_speed}`
    humidity3El.textContent = `Humidity: ${fivedayforecast[2].humidity}`


    var date4El = document.getElementById("date4")
    var weathericon4El = document.getElementById("weathericon4")
    var temp4El = document.getElementById("temp4")
    var wind4El = document.getElementById("wind4")
    var humidity4El = document.getElementById("humidity4")
    var image4El = document.createElement("img")
    image4El.setAttribute('src', `http://openweathermap.org/img/wn/${fivedayforecast[3].weather[0].icon}.png`)
    weathericon4El.appendChild(image4El)
    date4El.textContent = addDaysToDate(today, 4);
    temp4El.textContent = `Temp: ${fivedayforecast[3].temp.day}`
    wind4El.textContent = `Wind: ${fivedayforecast[3].wind_speed}`
    humidity4El.textContent = `Humidity: ${fivedayforecast[3].humidity}`

    var date5El = document.getElementById("date5")
    var weathericon5El = document.getElementById("weathericon5")
    var temp5El = document.getElementById("temp5")
    var wind5El = document.getElementById("wind5")
    var humidity5El = document.getElementById("humidity5")
    var image5El = document.createElement("img")
    image5El.setAttribute('src', `http://openweathermap.org/img/wn/${fivedayforecast[4].weather[0].icon}.png`)
    weathericon5El.appendChild(image5El)
    date5El.textContent = addDaysToDate(today, 5);
    temp5El.textContent = `Temp: ${fivedayforecast[4].temp.day}`
    wind5El.textContent = `Wind: ${fivedayforecast[4].wind_speed}`
    humidity5El.textContent = `Humidity: ${fivedayforecast[4].humidity}`

}

function saveSearch(cityName) {
    var savedCities = JSON.parse(localStorage.getItem('savedcities')) || []
    if (savedCities.includes(cityName)){
        return
    }
    savedCities.push(cityName)
    localStorage.setItem('savedcities', JSON.stringify(savedCities))
    cityButtons()
}

function cityButtons() {
    cityButtonsEl.innerHTML = ""
    var savedCities = JSON.parse(localStorage.getItem('savedcities')) || []
    for (var index = 0; index < savedCities.length; index++) {
        var city = savedCities[index];
        var div = document.createElement('div')
        var button = document.createElement('button')
        button.addEventListener('click', apiCall)
        button.textContent = city
        div.appendChild(button)
        cityButtonsEl.appendChild(div)
    }
}

cityButtons()


searchcity.addEventListener('click', apiCall)