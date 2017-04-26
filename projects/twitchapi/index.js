/*eslint-env browser */
var codeCampStreamStatus = null;

var channels = ['freecodecamp','comster404','ESL_SC2', 'OgamingSC2', 'cretetion', 'curse'];

function loadTwitchChannels(){
  var htmlString = '';
  channels.forEach(function(channel){
    var channelEndpoint = 'https://wind-bow.gomix.me/twitch-api/channels/'
    var channelUrl = channelEndpoint + channel;
    $.get(channelUrl, function(data,status) {
      //console.log(data);
      
      var twitchStreamStatus = null;
      if(data.status == 404){
        var twitchLogoUrl = 'https://codepen.io/assets/avatars/user-avatar-80x80-bdcd44a3bfb9a5fd01eb8b86f9e033fa1a9897c3a15b33adfc2649a002dab1b6.png';
        var twitchChannelName = channel;
        var twitchChannelStatus = 'not found';
        $("#stream-container").append( `<div class = "twitch-box row" id = "` + channel + `">
        <div class ="channel-image"><img class ="channel-image" src="` + twitchLogoUrl + `"></div>
        <div class = "channel-name">`+ channel.toUpperCase() +`</div>
        <div class = "channel-status unknown">`+ twitchChannelStatus.toUpperCase() + `</div>        
      </div>`);     
      }
      else{
        var twitchLogoUrl = data.logo;
        var twitchChannelName = data.name;
        var twitchChannelUrl = data.url;
        var streamEndpoint = 'https://wind-bow.gomix.me/twitch-api/streams/'
        var streamUrl = streamEndpoint + channel;
        var streamStatus = null;
        $.get(streamUrl, function(data){
          //console.log(data);
          var gamePlayed = '';
          if(data.stream == null){
            streamStatus = "Offline";
            
          }
          else{
            streamStatus = "Online";            
            gamePlayed += ' -   Curently Playing: '  + data.stream.game;
          }
          $("#stream-container").append( `<div class = "twitch-box row" id = "` + channel + `" href = "` + twitchChannelUrl + `">
          <div class ="channel-image"><img class ="channel-image" src="`+twitchLogoUrl+`"></div>
          <div class = "channel-name">`+ channel.toUpperCase() +gamePlayed+`</div>
          <div class = "channel-status ` + streamStatus.toLowerCase() +`">`+ streamStatus.toUpperCase() + `</div>
          </div>`);
          
          if(data.stream){
            var className = '#'+ channel;
            $(className).addClass("online");
          }
          
          
          
        } ,"jsonp");
        
        
        
      }
    }, "jsonp" );
    
  });
  
};

$(document).ready(function(){
  
  
  loadTwitchChannels();
  $( "#stream-container" ).on( "click", "div[href^='http']", function( event ) {
    var outbound_link = $(this).attr("href")
    //console.log(outbound_link);
    
    window.open(outbound_link, '_blank');
  });
  
  
});
