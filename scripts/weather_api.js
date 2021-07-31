
// fetch data by coords

async function fetchData(pos)
{
    let cityWeather = await getName(pos);
    
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+cityWeather+'&appid=bc30d08247c266b44037f2c19cb4172c';
    try
    {let res = await fetch(url);
    
    return await res.json();
    }
    catch(error)
        {
            console.log(error);
        }
    
}

async function data(pos){
    
    let data = await fetchData(pos);
    
    return await data;
}

//fetch data by name

async function fetchDataName(name)
{
    let cityWeather = name;
    
    let url = 'http://api.openweathermap.org/data/2.5/weather?q='+cityWeather+'&appid=bc30d08247c266b44037f2c19cb4172c';
    try
    {let res = await fetch(url);
    
    return await res.json();
    }
    catch(error)
        {
            console.log(error);
        }
    
}

async function dataByName(name){
    
    let data = await fetchDataName(name);
    
    return await data;
}
