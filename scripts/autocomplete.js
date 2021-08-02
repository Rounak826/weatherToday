let datalist = document.getElementById("cityList");



searchInput.onkeyup= async function(){
    clearAuto();
    autocomplete(await list(searchInput.value));
}
    async function autocompleteReq(query){
        
        let url ='https://api.locationiq.com/v1/autocomplete.php?key=pk.dbba3add5cfe9f4f88b5f093e0c90981&q='+query+'&limit=5' ;
        let res = await fetch(url);
        
        return await res.json();
    }
 

   async function list(query){
       
       let data = await autocompleteReq(query);
       let list =[];

       for(let i=0; i<=4;i++)
       {
           list[i] = await data[i].display_place;
       }
       
       return await list;
   }

 function autocomplete(arr) {
    
     for(let i=0;i<=4;i++)
    {   
        let a = document.createElement("option");
        a.value=arr[i];
        datalist.appendChild(a);   
    }
 }

function clearAuto(){
    datalist.innerHTML="";
}
