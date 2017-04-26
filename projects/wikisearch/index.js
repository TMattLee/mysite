$( document ).ready(function() { 

    var endpoint = "https://en.wikipedia.org/w/api.php?";
    var page = 'https://en.wikipedia.org/?curid=';
    var actions = "action=query&format=json&prop=extracts&generator=search&gsrnamespace=0&gsrlimit=10&exchars=150&exlimit=max&exintro&explaintext=1&gsrwhat=text&gsrsearch=";

    var nameValue = "";
    var jsonResult = null;
    var testUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&limit=5&namespace=0&format=json&search=';

    $(".search-button").on("click", function(){
      nameValue = document.getElementById("term").value
      //console.log(nameValue);
      var cb = '&callback=?';
      var searchUrl = endpoint + actions + nameValue + cb;
      //console.log(searchUrl);
      $.ajax({
        type: "GET",
        url: searchUrl,
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
          //console.log('success');
          //console.log(data);
          var htmlString = '';
          $.each(data.query.pages, function(index, value){
              var pageid = value.pageid;
              var title = value.title;
              var extract = '';
              var pageUrl = page + pageid;
              //console.log(pageUrl);
              if(value.hasOwnProperty("extract")){
                extract = value.extract               }
            htmlString += `<a ><div class = "display-box" href="`+ pageUrl + `">
      <div class="wiki-title">` + title + `</div>
      <div class="wiki-extract">` + extract + `</div>
      </div>
    </div>`
          });
          $(".body-center").html(htmlString);
          
        },
        error: function (errorMessage) {
        }
    });
  });

  $( ".body-center" ).on( "click", "div[href^='http']", function( event ) {
    var outbound_link = $(this).attr("href")
    //console.log(outbound_link);
    
    window.open(outbound_link);
  });
  
  $(".body-left").on("click", function(){
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
});
  
