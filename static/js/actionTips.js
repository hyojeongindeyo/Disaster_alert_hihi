$(document).ready(function(){
    $('ul.tab_menu li').click(function(){
      var tab_id = $(this).attr('data-tab');
  
      $('ul.tab_menu li').removeClass('current');
      $('.tab_content').removeClass('current');
  
      $(this).addClass('current');
      $("#"+tab_id).addClass('current');
    })
});