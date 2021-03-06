$( document ).ready(function() {  
  var json = null;
  var isCelsius = false;
  var currentTemp = null;
  var weather = "Clear";
  var weatherSummary = 'Clear';
  $.get("https://api.darksky.net/forecast/f7ab20b2e722f5b8da12df12f15a1d42/51.5,0.5",       
    function(data, status){
      //console.log(data) ;
      json = data;

      currentTemp = json.currently.temperature;

      weather = json.currently.icon;
      weatherSummary = json.currently.summary;
      $(".city").html(json.timezone);
      $(".temp").html(currentTemp.toFixed(1) + "&deg F, " + weatherSummary) ;
      switch (weather){
        case "partly-cloudy-night":
          $(".img-container").html('<img src="https://image.ibb.co/cKBU35/120px_Antu_folder_cloud_svg.png" alt="120px Antu folder cloud svg" border="0" />');
          break;  
          case "partly-cloudy-day":
          $(".img-container").html('<img src="https://image.ibb.co/cKBU35/120px_Antu_folder_cloud_svg.png" alt="120px Antu folder cloud svg" border="0" />');
          break;  
        case "clear-night":
          $(".img-container").html('<img src="https://image.ibb.co/mg3bi5/clear_day_2x.png" alt="clear day 2x" border="0" />');
          break; 
          case "clear-day":
          $(".img-container").html('<img src="https://image.ibb.co/mg3bi5/clear_day_2x.png" alt="clear day 2x" border="0" />');
          break; 
        default:
          $(".img-container").html('<img src="https://image.ibb.co/dgQp35/5a43da5a9f565929f17ea5eec6669acd.png" alt="5a43da5a9f565929f17ea5eec6669acd" border="0" />');
          break;         
      }
  }, "jsonp");
  
  $(".button-temp-change").on("click", function(){
    //console.log("clicked");
    
    if(isCelsius){
      currentTemp = currentTemp * 1.8 + 32;
      $(".temp").html(currentTemp.toFixed(1) + "&deg F, " + weatherSummary);
      isCelsius = false ;
    }
    else{
      currentTemp = (currentTemp - 32) / 1.8;
      $(".temp").html(currentTemp.toFixed(1) + "&deg C, " + weatherSummary);
      isCelsius = true;
    }
  });

  
});
