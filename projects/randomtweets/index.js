$( document ).ready(function() {  
  var currentQuote = "Everything has its beauty, but not everyone sees it. It does not matter how slowly you go so long as you do not stop. Our greatest glory is not in never falling, but in rising every time we fall.";
  var currentAuthor = '-- Confucious';
  $(".quote").html(currentQuote);
  $(".author").html("-- " + currentAuthor);
  
  $(".button2").on("click", function(){
          $.get("https://gist.githubusercontent.com/jbmartinez/6982650ade1ee5e9527f/raw/e7099c184abec96b9d3c63ecb1fa44170eaf5299/quotes.json", function(data){
        var json = JSON.parse(data);
        var myMax = 50;
        var myMin = 0;
        var jsonNum = Math.floor(Math.random() * (myMax - myMin + 1) + myMin);
        currentQuote = json[jsonNum].text;
        currntAuthor = json[jsonNum].author
        $(".quote").html(currentQuote);
        $(".author").html("-- " + currentAuthor);
        //console.log(json[jsonNum].text);
        //console.log(json[jsonNum].author);

    });
    
    
  });
  $(".button1").on('click', function() {
    window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + currentQuote + '" ' + currentAuthor));
    
  });
  
});
