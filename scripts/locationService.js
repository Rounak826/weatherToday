const geokey='AIzaSyCuI9LJ2lPJ_Kx4tbjDARLMOB9kRGOmVvA';

var locationDisplay= document.getElementById('locationd');
getLocation();
var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};


function getLocation() {
    console.log('getLocaton function');
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError,options);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
    lat= position.coords.latitude;
    long=position.coords.longitude;
    sessionStorage.setItem("lat2", lat);
    sessionStorage.setItem("long2", long);
/*console.log('lat:'+lat+'long:'+long);
    //api Request    
    //var request = new XMLHttpRequest()
    
    //request.open('GET', 'http://api.geonames.org/findNearbyJSON?lat='+lat+'&lng='+long+'&username=dont_panic000', true)
    //request.open('GET', 'https://us1.locationiq.com/v1/reverse.php?key=pk.dbba3add5cfe9f4f88b5f093e0c90981&format=json&lat='+lat+'&lon='+long+', true)
    
    //request.onload = function () {
      // Begin accessing JSON data here
      //var data = JSON.parse(this.response);
      //var obj=data.geonames;
    //get object    
      //if (request.status >= 200 && request.status < 400){
          //console.log(obj);
        
        // append data to site
        
      //}
}
    //request.send()    
    


//console.log('lat:'+lat+'long:'+long);
//reverse geocoding to find pincode
        */
//lat=21.8809846;
//    long=81.609586;
    
    
var cityname;
var zip;
var c=0;    
fetch('http://api.positionstack.com/v1/reverse?access_key=3a5e579338377988b9f854b8da1ee39f&query='+lat+','+long+'')

.then(response =>  response.json())
    .then(data=>{
    //console.log(data);
    zip=data.data[c].postal_code;
    
    while(zip==null){
        c++;
       zip= data.data[c].postal_code;
    }
    
    
// pincode to city api
 var counts=[];
    var citydata=[];    
fetch('https://api.postalpincode.in/pincode/'+zip+'')

.then(response =>  response.json())
    .then(data=>{
    //console.log(data)
    //console.log(data[0].PostOffice[0].Block);
    cityName=data[0].PostOffice[0].Block;
 
    locationDisplay.innerHTML=cityName;
    
})
.catch(err => {
	console.error(err);
});
    


    
    
    
})
.catch(err => {
	console.error(err);
});
    

}


// distance calculator (between two geo points)        
//alert(distanceC(22.068541900000003,81.68568080000001 ,22.068541900000003 ,81.68568080000001 ).toFixed(1));


//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function distanceC(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      
		return d;    
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }



//error handling
function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert( "Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.try refreshing page \n or search your city manually");
      break;
  }
}


//update location if not found
//updateLocation(locationDisplay.innerHTML)
   var updater= setInterval(function(){updateLocation(locationDisplay.innerHTML)},2000);
    function updateLocation(x)
          {   //console.log("updateLocation");
              if(x=="Location")
                  { console.log({x});
                    getLocation(); 
                  }
              else{
                  clearInterval(updater);
              }
              
          }
