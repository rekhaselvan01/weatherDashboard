var formEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#cityname");
var buttonEl = document.querySelector("#searchButton");
var WeatherContainerEl = document.querySelector(".container-CurrentWeather");
var fiveDayForecastEl = document.querySelector(".container-fivedayForecast");
var buttonContainer= document.querySelector(".searchHistory-buttons");
var searchCityList= document.querySelector("#searchCity-list");
var cityName= [];

// The following function renders items in cityname as buttons
function renderstoredcityName() {
    
    searchCityList.innerHTML = "";
    
  console.log("this is cityname:" + cityName)
     for (var i = 0; i < cityName.length; i++) {
       var cityHistory = cityName[i];
       var li = document.createElement("li");
       //li.textContent = cityHistory;
       li.setAttribute("data-index", i)
   
       var button = document.createElement("button");
       button.textContent = cityHistory;
       button.setAttribute("class", "btnlocalstorage");
       
       li.appendChild(button);
       searchCityList.appendChild(li);
       
   
       
     }
   }

   // Add click event to todoList element
   searchCityList.addEventListener("click", function(event) {
    var element = event.target;
  
    // Checks if element is a button
    if (element.matches("button") === true) {
      // Get its data-index value and remove the todo element from the list
      var buttonText = element.textContent;
      
      customCurrentWeather(buttonText)
      // Store updated todos in localStorage, re-render the list
      //storeTodos();
      //renderTodos();
    }
  });

// This function is being called below and will run when the page loads.
function init() {
    // Get stored searchCity from localStorage
    var storedcityName = JSON.parse(localStorage.getItem("cityName"));
  console.log("this is storedcityName:" +storedcityName)
    // If cityName were retrieved from localStorage, update the storedcityName array to it
    if (storedcityName !== null) {
        cityName = storedcityName;
    }
  
    // This is a helper function that will render cityNames to the DOM
    renderstoredcityName();
  }

  function storecityName() {
    // Stringify and set key in localStorage to todos array
    localStorage.setItem("cityName", JSON.stringify(cityName));
  }


var formSubmitHandler = function (event) {
    event.preventDefault();
    var searchcityName = cityInputEl.value.trim();

    console.log("this is the cityname: " + cityName);

    customCurrentWeather(searchcityName);

    // Return from function early if submitted todoText is blank
  if (searchcityName === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  cityName.push(searchcityName);
  cityInputEl.value = "";

  // Store updated todos in localStorage, re-render the list
  storecityName();
  renderstoredcityName();
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

    var currentTemp = FiveDayforecastData.current.temp;
    console.log(currentTemp);
    var currentWindSpeed = FiveDayforecastData.current.wind_speed;
    console.log(currentWindSpeed);
    var currentHumidity = FiveDayforecastData.current.humidity;
    console.log(currentHumidity);
    var currentUVIndex = FiveDayforecastData.current.uvi;
    console.log(currentUVIndex);
    var uvindex = document.querySelector(".uvindex");

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

// Calls init to retrieve data and render it to the page on load
init()




