$( document ).ready(function() {  
  var json = null;
  var isCelsius = true;
  var currentTemp = null;
  var weather = "Clear" ;
  $.get("http://api.openweathermap.org/data/2.5/find?lat=51.5&lon=0&cnt=20&appid=efe9cf45e84067df9f79da5f23bb74b1&units=metric", function(data, status){
    json = data;
    var myMax = 20;
    var myMin = 0;
    var jsonNum = Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
    console.log(json.list[jsonNum]);
    currentTemp = json.list[jsonNum].main.temp;
    weather = json.list[jsonNum].weather[0].main;
    $(".city").html(json.list[jsonNum].name);
    $(".temp").html(currentTemp.toFixed(1) + "&deg C, " + weather) ;
    switch (weather){
      case "Clouds":
        $(".img-container").html('<img src="https://image.ibb.co/cKBU35/120px_Antu_folder_cloud_svg.png" alt="120px Antu folder cloud svg" border="0" />');
        break;  
      case "Clear":
        $(".img-container").html('<img src="https://image.ibb.co/mg3bi5/clear_day_2x.png" alt="clear day 2x" border="0" />');
        break; 
      case "Rain":
        $(".img-container").html('<img src="https://image.ibb.co/dgQp35/5a43da5a9f565929f17ea5eec6669acd.png" alt="5a43da5a9f565929f17ea5eec6669acd" border="0" />');
        break;         
    }
    
   

  });
  
  $(".button-temp-change").on("click", function(){
    console.log("clicked");
    
    if(isCelsius){
      currentTemp = currentTemp * 1.8 + 32;
      $(".temp").html(currentTemp.toFixed(1) + "&deg F, " + weather);
      isCelsius = false ;
    }
    else{
      currentTemp = (currentTemp - 32) / 1.8;
      $(".temp").html(currentTemp.toFixed(1) + "&deg F, " + weather);
      isCelsius = true;
    }
  });

  
});
