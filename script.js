function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

async function resolveWeather(location){
    const data = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=UAWC5H3MSBYH4GUBT6UF495KU&contentType=json`);
    const obj = await data.json();

    return obj
}

function search(e){
    if(e.key === "Enter"){
        e.preventDefault();
        const location = e.target.value;
        
        try {
            resolveWeather(location).then(result => postResult(result));
        } catch (error) {
            console.log(error);
        }
    }
}

function getBackground(icon){
    const statusArr = ["clear", "cloudy", "overcast", "rain"];
    const matchedStatus =  statusArr.find(status => icon.includes(status));
    const container = document.querySelector("#container");

    container.style.backgroundImage = `url("./images/${matchedStatus}.gif")`;
}

function postResult(obj){
    const temperature = Math.trunc(fahrenheitToCelsius(obj.currentConditions.temp));
    const status = obj.currentConditions.conditions;
    const location = obj.resolvedAddress;
    const icon = obj.currentConditions.icon;

    const temperatureContainer = document.querySelector("#temperature");
    const statusContainer = document.querySelector("#status");
    const locationContainer = document.querySelector("#location");
    const sup = document.createElement("sup");

    sup.textContent = "°C";
    temperatureContainer.textContent = temperature;
    temperatureContainer.appendChild(sup);
    statusContainer.textContent = status;
    locationContainer.textContent = location;

    getBackground(icon);
}

const searchBar = document.querySelector("#searchbar");
searchBar.addEventListener("keydown", (e)=>{search(e)});