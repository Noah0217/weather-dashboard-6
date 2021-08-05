function initPage() 
 const inputEl=document.getElementById("city-input");
 const searchEl=document.getElementById("search-button");
 const clearEl=document.getElementById("clear-history");
 const nameEl=document.getElementById("city-name");
 const currentPicEl=document.getElementById("current-pic");
 const currentTempEl=document.getElementById("temperature");
 const currentHumidityEl=document.getElementById("humidity");
 const currentWindEl = document.getElementById("wind-speed");
    const currentUVEl = document.getElementById("UV-index");
    const historyEl = document.getElementById("history");

    //Recent Searches Stored Here
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
    console.log(searchHistory);

    //API Key For Weather API
    const APIKey = "c9a9ed03a355403f4cb9a36e931c0b4a";
          
              
          
