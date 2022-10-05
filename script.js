//Object for storing functions and variables
let weather = {
    //apiKey from Openweathermaps
    "apiKey": "393a902fb25c50a0069c159c92bc71b4",

    //function fetchWeather with parameter city
    fetchWeather: function(city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
            + city 
            + "&units=metric&appid=" 
            + this.apiKey
        )
        //Once url is fetched, do response, take data and log data to displayWeather
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    //function takes parameter data
    displayWeather: function(data){

        //get city name from object
        const { name } = data;
        //get icon and description from object
        const { icon, description } = data.weather[0];
        //get temperature and humidity from object
        const { temp, humidity} = data.main;
        //get wind speed from object
        const { speed } = data.wind;

        //Returns first element matching specified CSS selector
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";

        //When display weather is called, remove dummy input
        document.querySelector(".weather").classList.remove("loading");

        //display images from searched city
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900?" + name + "')"
    },

    //function for search bar
    search: function(){
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

//Search bar configuration, get search bar content and search
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

//Event listener for when enter key is pressed
document.querySelector(".search-bar").addEventListener("keyup", function(event){
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Gothenburg");
