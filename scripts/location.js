
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
    let data = await zipRequest(pos);
    
    
    zip=data.data[c].postal_code;
    
    while(zip==null){
        c++;
       zip= data.data[c].postal_code;
    }
    return await zip;
}

async function zipRequest(pos){
    
    let lat = pos.latitude;
    let long= pos.longitude;
    let url ='http://api.positionstack.com/v1/reverse?access_key=3a5e579338377988b9f854b8da1ee39f&query='+lat+','+long+'';
    
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