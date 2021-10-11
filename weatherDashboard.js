var formEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
var buttonEl = document.querySelector("#searchButton");
var WeatherContainerEl = document.querySelector(".container-CurrentWeather");
var fiveDayForecastEl = document.querySelector(".container-fivedayForecast");
var SearchCity = [];
var cityName;


var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    console.log("this is the cityname: " + cityName);

    customCurrentWeather(cityName);
};



var customCurrentWeather = function (city) {

    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3d65def8eca7c79698bc182f1466c1b8';

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(function (data) {
            coordData = data;
            return fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + coordData.coord.lat + '&lon=' + coordData.coord.lon + '&exclude=minutely,alerts&appid=3d65def8eca7c79698bc182f1466c1b8');
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(response);
            }
        }).then(function (weatherData) {
            console.log(coordData, weatherData);
            console.log(coordData.name)
            console.log(coordData.dt)
            displayWeather(coordData, weatherData, city);
        }).catch(function (error) {
            console.log(error);
        });


};





var displayWeather = function (currentWeatherData, FiveDayforecastData, currentCity) {
    console.log(currentWeatherData.name)

    var unixTimestamp = currentWeatherData.dt;
    const milliseconds = (unixTimestamp * 1000);
    const dateobject = new Date(milliseconds);
    const dateFormat = dateobject.toLocaleString();
    var humandDateFormat = dateFormat.slice(0, 10);


    var dayOneTimestamp= FiveDayforecastData.daily[0].dt
    const dayOneMilliseconds = (dayOneTimestamp * 1000);
    const dayOneDateobject = new Date(dayOneMilliseconds);
    const dayOneDateFormat = dayOneDateobject.toLocaleString();
    var dayOneDate = dayOneDateFormat.slice(0, 10);

    var dayTwoTimestamp= FiveDayforecastData.daily[1].dt
    const dayTwoMilliseconds = (dayTwoTimestamp * 1000);
    const dayTwoDateobject = new Date(dayTwoMilliseconds);
    const dayTwoDateFormat = dayTwoDateobject.toLocaleString();
    var dayTwoDate = dayTwoDateFormat.slice(0, 10);

    var dayThreeTimestamp= FiveDayforecastData.daily[2].dt
    const dayThreeMilliseconds = (dayThreeTimestamp * 1000);
    const dayThreeDateobject = new Date(dayThreeMilliseconds);
    const dayThreeDateFormat = dayThreeDateobject.toLocaleString();
    var dayThreeDate = dayThreeDateFormat.slice(0, 10);

    var dayFourTimestamp= FiveDayforecastData.daily[3].dt
    const dayFourMilliseconds = (dayFourTimestamp * 1000);
    const dayFourDateobject = new Date(dayFourMilliseconds);
    const dayFourDateFormat = dayFourDateobject.toLocaleString();
    var dayFourDate = dayFourDateFormat.slice(0, 10);

    var dayFiveTimestamp= FiveDayforecastData.daily[4].dt
    const dayFiveMilliseconds = (dayFiveTimestamp * 1000);
    const dayFiveDateobject = new Date(dayFiveMilliseconds);
    const dayFiveDateFormat = dayFiveDateobject.toLocaleString();
    var dayFiveDate = dayFiveDateFormat.slice(0, 10);






    var currentTemp = FiveDayforecastData.current.temp;
    console.log(currentTemp);
    var currentWindSpeed = FiveDayforecastData.current.wind_speed;
    console.log(currentWindSpeed);
    var currentHumidity = FiveDayforecastData.current.humidity;
    console.log(currentHumidity);
    var currentUVIndex = FiveDayforecastData.current.uvi;
    console.log(currentUVIndex);
    var uvindex = document.querySelector(".uvindex");


    WeatherContainerEl.innerHTML = `   
     <div class ="card">
    
   <h1 class = "customHeader">${currentWeatherData.name} ${humandDateFormat} ${currentWeatherData.weather[0].icon}</h1>
  </br>
    <p>Temp: ${currentTemp} F </p>
    <p>Wind: ${currentWindSpeed}mph</p>
    <p>Humidity: ${currentHumidity}%</p>
    <div class="uvindexContainer">
    <p>UV Index:${currentUVIndex}</p>
    <span class="uvindex">uuuu</span>
    </div>

   
    </div>`
    fiveDayForecastEl.innerHTML = `
    <div class="customForecastContainer">

   


    <div class="forecast">       
        <h1 class="custom">date:${dayOneDate}</h1>
          <p>Temp: ${FiveDayforecastData.daily[0].temp.day}</p>
          <p>Wind: ${FiveDayforecastData.daily[0].wind_speed}</p>
          <p>Humidity: ${FiveDayforecastData.daily[0].humidity}</p>     
    </div>

    <div class="forecast">
        <h1 class="custom">date:${dayTwoDate}</h1>
        <p>Temp:${FiveDayforecastData.daily[1].temp.day}</p>
        <p>Wind:${FiveDayforecastData.daily[1].wind_speed}</p>
        <p>Humidity:${FiveDayforecastData.daily[1].humidity}</p>     
    </div>

    <div class="forecast">
        <h1 class="custom">date:${dayThreeDate}</h1>
        <p>Temp:${FiveDayforecastData.daily[2].temp.day}</p>
        <p>Wind:${FiveDayforecastData.daily[2].wind_speed}</p>
        <p>Humidity:${FiveDayforecastData.daily[2].humidity}</p>  
    </div>

    <div class="forecast">
    <h1 class="custom">date:${dayFourDate}</h1>
        <p>Temp:${FiveDayforecastData.daily[3].temp.day}</p>
        <p>Wind:${FiveDayforecastData.daily[3].wind_speed}</p>
        <p>Humidity:${FiveDayforecastData.daily[3].humidity}</p> 
    </div>
    
    <div class="forecast">  
    <h1 class="custom">date:${dayFiveDate}</h1>
        <p>Temp:${FiveDayforecastData.daily[4].temp.day}</p>
        <p>Wind:${FiveDayforecastData.daily[4].wind_speed}</p>
        <p>Humidity:${FiveDayforecastData.daily[4].humidity}</p>        
    </div>
  
    </div>`



}





formEl.addEventListener('click', formSubmitHandler);






