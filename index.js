$(document).ready(function(){
	
	$('.tab').click(function(){
        var clicked_tab = $(this).attr('id');
        var tab_id = '.'+ clicked_tab + '-tab';
        $('.tab-content').addClass('hide-content');
        $('.tab').removeClass('active');
        $(this).addClass('active');
        $(tab_id).removeClass('hide-content');
    });
    
    $('.frame').click(function(){
        var url = $(this).attr('src');    
        console.log(url);
        var win = window.open(url, '_blank');
        win.focus();
    });

});
