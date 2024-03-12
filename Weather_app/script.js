const apiKey = "1fd956fff7d0874eeecf14d78d41c508";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; 
const searchBox=document.querySelector(".search input");
const searchBtn=document.querySelector(".search button");
const weatherIcon=document.querySelector(".weather-icon");
const weatherIcon1=document.querySelector(".col1");
const weatherIcon2=document.querySelector(".col2");
async function checkWeather(city){
    const response = await fetch(apiUrl + city +`&appid=${apiKey}`);
    let data = await response.json();
    console.log(data);
    
    if (data.cod !== 200) {
        // City not found or other error
        document.querySelector(".city").innerHTML = "City not found";
        
        weatherIcon.src = ""; // Clear the weather icon
        weatherIcon1.src = ""; // Clear the weather icon
        weatherIcon2.src = ""; // Clear the weather icon
        return;
    }

    document.querySelector(".city").innerHTML=data.name;
    document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°C";
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".wind").innerHTML=data.wind.speed+"km/hr";

    if(data.weather[0].main =="Clouds"){
        weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main =="Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main =="Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main =="Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    } 
    else if(data.weather[0].main =="Mist"){
        weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display="block";
}
searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value);
})

searchBox.addEventListener("keydown", (event) => {
    // Check if the pressed key is the "Enter" key (key code 13)
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});