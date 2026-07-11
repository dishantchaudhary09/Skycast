const api = "97f944c75f746fc37298e9e584579191";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cld = document.querySelector(".weather_icon");




async function checkWeather(city){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`);

        if (response.status == 404){
            document.querySelector('.error').style.display = 'block';
            document.querySelector('.weather').style.display = 'none'
        } else{
        document.querySelector('.error').style.display = 'none';  
        const data = await response.json();
       
        
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.floor(data.main.temp) + "°c";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

        const currentTime = data.dt;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        //for png change according to clouds...
        
            if(currentTime > sunset || currentTime < sunset){
                
                    if(data.weather[0].main == "Clear"){
                        cld.src = "https://cdn-icons-png.flaticon.com/128/7651/7651008.png"
                    }
                
                    else if(data.weather[0].main == "Clouds"){
                        cld.src = "https://cdn-icons-png.flaticon.com/128/3094/3094156.png"
                    }

                    else if(data.weather[0].main == "Drizzle"){
                        cld.src = "https://www.flaticon.com/free-icon/night-rain_17639997"
                    }

                    else if(data.weather[0].main == "Mist"){
                        cld.src = "https://cdn-icons-png.flaticon.com/128/2930/2930127.png"
                    }

                    else if(data.weather[0].main == "Rain"){
                        cld.src = "https://www.flaticon.com/free-icon/heavy-rain_2930139"
                    }

                    else{
                        cld.src = "https://www.flaticon.com/free-icon/night-snow_6319915"
                    }
               
                    }

            if(currentTime >= sunrise && currentTime <= sunset ){

                    if(data.weather[0].main == "Clouds"){
                    cld.src = "images/clouds.png"
                    }

                    else if(data.weather[0].main == "Clear"){
                        cld.src = "images/clear.png"
                    }

                    else if(data.weather[0].main == "Drizzle"){
                        cld.src = "images/drizzle.png"
                    }

                    else if(data.weather[0].main == "Mist"){
                        cld.src = "images/mist.png"
                    }

                    else if(data.weather[0].main == "Rain"){
                        cld.src = "images/rain.png"
                    }

                    else{
                        cld.src = "images/snow.png"
                    }
            }
        document.querySelector('.weather').style.display = 'block'    
           
    } 

        }

    catch(error){
            console.error("error",error);
    }
   

}


searchBtn.addEventListener('click',()=>{
    checkWeather(searchBox.value);
});

