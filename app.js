$(document).ready(function(){
  var $app = $('#app');
  var $navBar = $('<header><ul><li><a class="nav" href="#">Home</a></li><li><a class="nav" href="#">Log in</a></li><li><a class="nav" href="#">About</a></li></ul></header>');
  var $logo = $('<h1><span style="color:#3581B8">sked</span><span style="color: #FCB07E">addle</span></body></h1>');
  var $centerCard = $('<div class="centerCard"></div>')

  $navBar.appendTo($app);
  $logo.appendTo($app);
  $centerCard.appendTo($app);
}