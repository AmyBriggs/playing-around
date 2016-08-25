var pitch = {
  '7' : 'sonjvw3c.mp3',
  '6' : 'chopyuxv.mp3',
  '5' : 'bfchuayq.mp3',
  '4' : 'tw4znoba.mp3',
  '3' : 'euv2bb5h.mp3',
  '2' : 'pyd2g144.mp3',
  '1' : '4o3jsmmx.mp3',
  '0' : 'kjlblbga.mp3'
};

function ding(squareId){
  var audio = document.createElement("audio");
  audio.src = "http://clyp.it/" + pitch[squareId];
  audio.addEventListener("ended", function () {
    document.removeChild(this);
  }, false);
  audio.play();
}

//jQuery
$(document).ready(function() {

  /**
  var spinner = $( "#spinner" ).spinner();
  spinner.spinner( "value", 120 );
  **/

  $('.square').click(function(){
    $(this).toggleClass('on');
  });
  //var bpm = spinner.spinner( "value" );
  //var time = bpm * 250/120;
  var time = 250;
  $('.column').repeat(1000).each($).wait(time, function(index) {
    //bpm = spinner.spinner( "value" );
    //time = bpm * 250/120;

    /**
    $(this).find( ".on" ).each(function(i) {
      ding($(this).attr('id'));
      $(this).css({backgroundColor:'lime'}).animate({backgroundColor:'#AAAAAA'},'slow');
    });
    **/

    $(this).children().each(function(i) {
      if ($(this).hasClass("on")) {
        ding($(this).attr('id'));
        $(this).css({backgroundColor:'lime'}).animate({backgroundColor:'#AAAAAA'},'slow');
      };
    });

    $(this).toggleClass('cursor').wait(time, function(index) {
      $(this).toggleClass('cursor');
    });
  });
});
