//API Key Used To Pull From OpenWeatherAPP
var APIKey = "c9a9ed03a355403f4cb9a36e931c0b4a";

//Calling all Variables
function loadPage() {
   var nameEl = document.getElementById("city-name");
   var currentPicEl = document.getElementById("current-pic");
   var currentTempEl = document.getElementById("temperature");
   var inputEl = document.getElementById("city-input");
   var searchEl = document.getElementById("search-button");
   var clearEl = document.getElementById("clear-history");
   var currentWindEl = document.getElementById("wind-speed");
   var currentHumidityEl = document.getElementById("humidity");4
   var currentUVEl = document.getElementById("UV-index");
   var historyEl = document.getElementById("history");
   var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
   console.log(searchHistory);

//API Link Used To Pull From City
   function getWeather(cityName) {
       var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
       axios.get(queryURL)
       .then(function(response){
           console.log(response);

           //Displays Weather Conditions 
           var currentDate = new Date(response.data.dt*1000);
           console.log(currentDate);
           var day = currentDate.getDate();
           var month = currentDate.getMonth() + 1;
           var year = currentDate.getFullYear();
           nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
           var weatherPic = response.data.weather[0].icon;
           currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
           currentPicEl.setAttribute("alt",response.data.weather[0].description);
           currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
           currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
           currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
           var lat = response.data.coord.lat;
           var lon = response.data.coord.lon;
           var UVQueryURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&cnt=1";
           axios.get(UVQueryURL)
           .then(function(response){
           var UVIndex = document.createElement("span");
           UVIndex.setAttribute("class","badge badge-danger");
           UVIndex.innerHTML = response.data[0].value;
           currentUVEl.innerHTML = "UV Index: ";
           currentUVEl.append(UVIndex);
       });

       //API Link For Weather Forecast
       var cityID = response.data.id;
       var forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
       axios.get(forecastQueryURL)
       .then(function(response){
           console.log(response);
           const forecastEls = document.querySelectorAll(".forecast");
           for (i=0; i<forecastEls.length; i++) {
               forecastEls[i].innerHTML = "";
               var forecastIndex = i*8 + 4;
               var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
               var forecastDay = forecastDate.getDate();
               var forecastMonth = forecastDate.getMonth() + 1;
               var forecastYear = forecastDate.getFullYear();
               var forecastDateEl = document.createElement("p");
               forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
               forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
               forecastEls[i].append(forecastDateEl);
               var forecastWeatherEl = document.createElement("img");
               forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
               forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
               forecastEls[i].append(forecastWeatherEl);
               var forecastTempEl = document.createElement("p");
               forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
               forecastEls[i].append(forecastTempEl);
               var forecastHumidityEl = document.createElement("p");
               forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
               forecastEls[i].append(forecastHumidityEl);
               }
           })
       });  
   }

   searchEl.addEventListener("click",function() {
      var searchTerm = inputEl.value;
       getWeather(searchTerm);
       searchHistory.push(searchTerm);
       localStorage.setItem("search",JSON.stringify(searchHistory));
       renderSearchHistory();
   })
   clearEl.addEventListener("click",function() {
       searchHistory = [];
       renderSearchHistory();
   })
   function k2f(K) {
       return Math.floor((K - 273.15) *1.8 +32);
   }
   function renderSearchHistory() {
       historyEl.innerHTML = "";
       for (let i=0; i<searchHistory.length; i++) {
           var historyItem = document.createElement("input");
           historyItem.setAttribute("type","text");
           historyItem.setAttribute("readonly",true);
           historyItem.setAttribute("class", "form-control d-block bg-white");
           historyItem.setAttribute("value", searchHistory[i]);
           historyItem.addEventListener("click",function() {
               getWeather(historyItem.value);
           })
           historyEl.append(historyItem);
       }
   }
   renderSearchHistory();
   if (searchHistory.length > 0) {
       getWeather(searchHistory[searchHistory.length - 1]);
   }
}
loadPage();

//References
//https://www.youtube.com/watch?v=GXrDEA3SIOQ
//https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localstorage
//https://www.tutorialrepublic.com/faq/how-to-store-javascript-objects-in-html5-localstorage.php








// function renderSearchHistory() {
//    historyEl.innerHTML = "";
//    for (let i=0; i<searchHistory.length; i++) {
//        var historyItem = document.createElement("input");
//        historyItem.setAttribute("type","text");
//        historyItem.setAttribute("readonly",true);
//        historyItem.setAttribute("class", "form-control d-block bg-white");
//        historyItem.setAttribute("value", searchHistory[i]);
//        historyItem.addEventListener("click",function() {
//            getWeather(historyItem.value);
//        })
//        historyEl.append(historyItem);
//    }
// }

// for (i=0; i<forecastEls.length; i++) {
//    forecastEls[i].innerHTML = "";
//    var forecastIndex = i*8 + 4;