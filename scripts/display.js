let wIcon =document.getElementById("weatherIcon");
let wDesc= document.getElementById("wDescr");
let temprature= document.getElementById("temprature");
let feelT=document.getElementById("feelT");
let city=document.getElementById("city");
let speed=document.getElementById("wSpeed");
let direction=document.getElementById("direction");
let rain=document.getElementById("rain");
let humidity=document.getElementById("humidity");
let pressure=document.getElementById("pressure");
let visibility=document.getElementById("visibility");
let sunrise =document.getElementById("sunrise");
let sunset= document.getElementById("sunset");
var locationDisplay= document.getElementById('locationd');
var searchInput=document.getElementById("searchInput");
var searchBtn = document.getElementById("searchBtn");
getLocation();
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayInfo, showError,options);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

async function coordinates(position)
{
    var pos = position.coords;
    let wData =await data(pos);
    let cityName= getName(pos);
    locationDisplay.innerHTML=await cityName ;
    return await wData;
}

async function displayInfo(pos){
    let data= await coordinates(pos);
    console.log(data);
    let code= await data.weather[0].icon;
    let degree= await data.wind.deg;
    city.innerHTML=data.name;
    
    
    temprature.innerHTML=(data.main.temp-273).toPrecision(3)+"<span>&#176;</span>C";
    feelT.innerHTML="feels like "+(data.main.feels_like -273).toPrecision(3)+"<span>&#176;</span>C";
    speed.innerHTML=data.wind.speed;
    wDesc.innerHTML=data.weather[0].description;
    humidity.innerHTML=data.main.humidity+ " %";
    pressure.innerHTML=data.main.pressure+ " hPa";
    visibility.innerHTML=data.visibility+ " m";
    if(data.rain!=undefined)
    { 
        rain.innerHTML=data.rain["1h"] + "%";
    }
    sunrise.innerHTML= timeConverter(data.sys.sunrise);
    sunset.innerHTML= timeConverter(data.sys.sunset);
    wIcon.src=imageUrl(code);
    if(!document.getElementById("title-icon"))
        {
            var link=document.createElement('link');
            link.id="title-icon";
            link.rel="icon";
            link.href='http://openweathermap.org/img/wn/'+code+'@2x.png';
            link.type="image/x-icon";
            document.head.appendChild(link);
        }
    
    
    direction.style.transform = "rotate("+degree+"deg"+")";
    
}
function imageUrl(code){
    if(code=="01d")
        {
            return "svg/a_1_sunny.svg";
        }
    if(code=="02d")
        {
            return "svg/b_1_partly_cloudy.svg";
        }
    if(code=="03d"||code=="03n")
        {
            return "svg/b_2_cloudy.svg";
        }
    if(code=="04d"||code=="04n")
        {
            return "svg/b_3_very_cloudy.svg";   
        }
    if(code=="09d"||code=="09n")
        {
            return "svg/d_3_sleet.svg"
        }
    if(code=="10d"||code=="10n")
        {
            return "svg/c_1_rainy.svg";
        }
    if(code=="11d"||code=="11n")
        {
            return "svg/c_3_thunderstorm.svg";
        }
    if(code=="13d"||code=="13n")
        {
            return "svg/g_3_snowflake.svg";
        }
    if(code=="50d"||code=="50n")
        {
            return "svg/d_4_fog.svg";
        }
    if(code=="01n")
        {
            return"svg/a_4_night.svg";
        }
    if(code=="02n")
        {
            return"svg/b_4_cloudy_night.svg";
        }
}
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var hour = a.getHours();
  var min = a.getMinutes();
  var time = hour + ':' + min ;
  return time;
}

searchBtn.onclick= function(){search()};
async function search(){
    console.log("search");
    var cityn = searchInput.value;
    let data = await dataByName(cityn);
    console.log(data);
    let code= await data.weather[0].icon;
    let degree= await data.wind.deg;
    
    city.innerHTML= await data.name;
    temprature.innerHTML=(data.main.temp-273).toPrecision(3)+"<span>&#176;</span>C";
    feelT.innerHTML="feels like "+(data.main.feels_like -273).toPrecision(3)+"<span>&#176;</span>C";
    speed.innerHTML=data.wind.speed;
    wDesc.innerHTML=data.weather[0].description;
    humidity.innerHTML=data.main.humidity+ " %";
    pressure.innerHTML=data.main.pressure+ " hPa";
    visibility.innerHTML=data.visibility+ " m";
    if(data.rain!=undefined)
    { 
        rain.innerHTML=data.rain["1h"] + "%";
    }else{
        rain.innerHTML="-- %"
    }
    sunrise.innerHTML= timeConverter(data.sys.sunrise);
    sunset.innerHTML= timeConverter(data.sys.sunset);
    
    wIcon.src=imageUrl(code);
    
    direction.style.transform = "rotate("+degree+"deg"+")";
    
    
}