$(document).ready(function() {
    'use strict'
    console.log("DOM fully loaded and parsed,grids is connected");
    console.log('grids is connected');

// Define some of the variables used in functions

    var bpm = 60
    var volume
    var playIndex
    var startTime
    var noteTime
    var loop_length = 12
    console.log(loop_length);
    var pitch5
    var pitch4
    var pitch3
    var pitch2
    var pitch1
    var sound0
    var sound1
    var sound2
    var sound3
    var sound4

    var lastDrawTime
    var aheadTime = 0.200

    var rec
    var gain
    var timeoutId

    var SCConnected = false

    var context
    var pitches = [pitch1, pitch2, pitch3, pitch4, pitch5]
    var sample = [sound0, sound1, sound2, sound3, sound4]
    var currentState = {}




    // Define the 12 columns here

    var col1 = $('div.square.column_1')
    var col2 = $('div.square.column_2')
    var col3 = $('div.square.column_3')
    var col4 = $('div.square.column_4')
    var col5 = $('div.square.column_5')
    var col6 = $('div.square.column_6')
    var col7 = $('div.square.column_7')
    var col8 = $('div.square.column_8')
    var col9 = $('div.square.column_9')
    var col10 = $('div.square.column_10')
    var col11 = $('div.square.column_11')
    var col12 = $('div.square.column_12')

    var cols = [col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12]

    // Define the sounds object here

    var sounds = {
      sound0: new Howl({
        urls: ['acoustic_grand_piano-mp3/E4.mp3'],
      }),
      sound1: new Howl({
        urls: ['acoustic_grand_piano-mp3/Gb4.mp3']
      }),
      sound2: new Howl({
        urls: ['acoustic_grand_piano-mp3/B4.mp3']
      }),
      sound3: new Howl({
        urls: ['acoustic_grand_piano-mp3/Db5.mp3']
      }),
      sound4: new Howl({
        urls: ['acoustic_grand_piano-mp3/D5.mp3']
      }),
    }

    // Experimenting with click listeners on squares


    $(".pitch1").click(function() {
      console.log('hi');
      this.style.backgroundColor = '#b23232'
      sounds.sound0.play();
    });

    $(".pitch2").click(function() {
      this.style.backgroundColor = '#ff6c6c'
      sounds.sound1.play();
    });

    $(".pitch3").click(function() {
      this.style.backgroundColor = '#fff748'
      sounds.sound2.play();
    });

    $(".pitch4").click(function() {
      this.style.backgroundColor = '#39cc4b'
      sounds.sound3.play();
    });
    $(".pitch5").click(function() {
      this.style.backgroundColor = '#3248b2'
      sounds.sound4.play();
    });

    // add event handlers for buttons here, to experiment with adding/removing
    // 'active' or 'playing' classes to the grid/columns

    $('#play').click(function(){
      startPlay()

      // $('.square.column_1.pitch5').addClass('active')
      // $('.square.column_1.pitch1').addClass('active')
      // if($('.square.column_1.pitch5').hasClass('active')){
      //   $('.square.column_1.pitch5').css('background-color', 'pink')
      //   sounds.sound4.play()
      // } if($('.square.column_1.pitch1').hasClass('active')){
      //   $('.square.column_1.pitch1').css('background-color', 'pink')
      //   sounds.sound0.play()
      //   $(col12).removeClass('active')
      //   if(!$(col12).hasClass('active')){
      //       $(col12).css('background-color', 'white')
      //   }


      // $(col1).addClass('active')
      // if($(col1).hasClass('active')){
      //   $(col1).css('background-color', 'pink')
      // }
      // $(col12).addClass('active')
      // if($(col12).hasClass('active')){
      //   $(col12).css('background-color', 'blue')
        // sounds.sound0.play()
        // sounds.sound4.play()
      // }
      console.log(col1);
      console.log(col12);
    })

    $('#stop').click(function(){
      stopPlay()
      // $(col1).removeClass('active')
      // if(!$(col1).hasClass('active')){
      //     $(col1).css('background-color', 'white')
      // }
      // $('.square.column_12.pitch4').addClass('active')
      // $('.square.column_12.pitch3').addClass('active')
      // $('.square.column_12.pitch2').addClass('active')
      // if($('.square.column_12.pitch4').hasClass('active')){
      //   // $(col12).css('background-color', 'blue')
      //   $('.square.column_12.pitch4').css('background-color', 'blue')
      //   sounds.sound3.play()
      // } if($('.square.column_12.pitch3').hasClass('active')){
      //   $('.square.column_12.pitch3').css('background-color', 'blue')
      //   sounds.sound2.play()
      // } if($('.square.column_12.pitch2').hasClass('active')) {
      //     $('.square.column_12.pitch2').css('background-color', 'blue')
      //     sounds.sound1.play()
      // }
      // $('.square.column_12.pitch4').addClass('active')
        // sounds.sound1.play()
        // sounds.sound2.play()
        // sounds.sound3.play()
      })
      console.log(col1);
      console.log(col12);

    // })





    // Setting up the AudioContext


    context = new AudioContext();
    console.log(context.currentTime);
    gain = context.createGain();
    gain.connect(context.destination);


    // // context.number
    //
    //
    // function playSound(sample){
    //   sound0 = sample[0]
    //   sound1 = sample[1]
    //   sound2 = sample[2]
    //   sound3 = sample[3]
    //   sound4 = sample[4]
    //   sounds[sample[i]].play();
    // }
    //
    //
    //
    function startPlay() {
        playIndex = 0;
        noteTime = 0.0;
        startTime = context.currentTime + aheadTime;
        // startTime = context.currentTime;
        schedule();

    }
    //
    // startPlay()
    //
    function stopPlay(event) {
        cancelAnimationFrame(timeoutId);
        $(".square").removeClass("playing");
    }
    //
    function schedule() {
        var currentTime = context.currentTime;
        currentTime -= startTime;
        while (noteTime < currentTime + aheadTime) {
            var contextPlayTime = noteTime + startTime;
            var $currentSquares = $(".column_" + playIndex);
            $currentSquares.each(function() {
                if ($(this).hasClass("active") && $(this).hasClass("pitch1")) {
                    sounds.sound0.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("pitch2")) {
                    sounds.sound1.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("pitch3")) {
                    sounds.sound2.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("pitch4")) {
                    sounds.sound3.play();
                }
                if ($(this).hasClass("active") && $(this).hasClass("pitch5")) {
                    sounds.sound4.play();
                }

            })
            // if (noteTime != lastDrawTime) {
            //     lastDrawTime = noteTime;
                drawPlayhead(playIndex);
            // }
            advanceNote();
        }
        timeoutId = requestAnimationFrame(schedule)
    }
    //
    function drawPlayhead(xindex) {
        var lastIndex = (xindex + loop_length - 1) % loop_length;
        var $newRows = $('.column_' + xindex);
        var $oldRows = $('.column_' + lastIndex);

        $newRows.addClass("playing");
        $oldRows.removeClass("playing");
    }
    //
    function advanceNote() {
        var secondsPerBeat = 45.0 / bpm;
        playIndex++;
        if (playIndex == loop_length) {
            playIndex = 0;
        }
        //0.25 because each square is a 16th note
        noteTime += 0.25 * secondsPerBeat
        console.log(secondsPerBeat);
    }


    function reset(){
       $('.square').removeClass('active');
     }

     $('#reset').click(function(){
       reset();
     });

     var squares = document.getElementsByClassName('square');

     for (var i = 0; i < squares.length; i++) {
       squares[i].addEventListener('click', function(event){
       // console.log(event.target);
         if(this.classList.contains('active')){
           this.classList.remove('active');
         } else {
           this.classList.add('active')
         }
       })
     };

     console.log(col12);
















});
