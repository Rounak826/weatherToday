
async function getName(position){
    
    let zip = await getZip(position);
    let url ='https://api.postalpincode.in/pincode/'+zip+'';
    
    let res = await fetch(url);
    
    try{
        let data =  await res.json();
        let cityName=data[0].PostOffice[0].Block;
        console.log(cityName);
        return await cityName;
    }
    catch(error){console.log(error);}
}

async function getZip(position){
    let c=0;
    let pos= position;
    let data = await positionIq(pos);
    zip=data.address.postcode;
    return await zip;
}


async function positionIq(pos){
    
    let lat = pos.latitude;
    let long= pos.longitude;
    let url =' https://eu1.locationiq.com/v1/reverse.php?key=pk.dbba3add5cfe9f4f88b5f093e0c90981&lat='+lat+'&lon='+long+'&format=json';
    
    let res = await fetch(url);
    return await res.json();

}






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