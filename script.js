
function handle(key){
    if(event.key=="Enter"){
        fetchdata();
    }
}


async function fetchdata(){
    const city=document.getElementById("city");
    const button=document.getElementById("butt");
    let cityname=city.value;
    const div=document.getElementById("weather-data");
    const apikey="";

    if (cityname==""){
        div.style.display="block";
        div.innerHTML=`
        <div>
            <h2> Please Enter a City</h2>
        </div>`;
        return;
    }


    async function getcoor( ) {
        const contcode="US";
        const geocodeurl=`https://api.openweathermap.org/geo/1.0/direct?q=${cityname.replace(" ", "%20")},${contcode}&limit=1&appid=${apikey}`;
        const response=await fetch(geocodeurl);
        if(!response.ok){
            console.log("error",response.status);
            return;
        }
        const data =await response.json();
        if (data.length == 0) {
            console.log("Something went wrong here.");
            div.innerHTML = `
            <div>
              <h2>Invalid Input: "${cityname}"</h2>
              <p>Please try again with a valid <u>city name</u>.</p>
            </div>
            `;
            return;
          } else {
            return data[0];
          }

          console.log(data);


    }

    async function weatherdata(lon,lat) {
        const weatherurl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
        const response=await fetch(weatherurl);

        if(!response.ok){
            console.log("error",response.status);
            return;
        }
        

        const data= await response.json();
        div.style.display = "flex";
        console.log(data);
        div.innerHTML=`
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" />
        <div>
                <h2>${data.name}</h2>
                <p><strong> Temperature : <strong> ${Math.round(data.main.temp - 273.15)} C </p>
                <p><strong> Description : <strong> ${data.weather[0].description} </p>

        </div>


        `


    }

    const geocodedata=await getcoor();
    if (geocodedata){
        city.value="";
        await weatherdata(geocodedata.lon,geocodedata.lat);}
    
}

