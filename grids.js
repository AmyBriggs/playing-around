$(document).ready(function() {
    'use strict'
    console.log("DOM fully loaded and parsed,grids is connected");
    console.log('grids is connected');

var col1 = $('div.square.One')
    $('#play').click(function() {
      $(col1).css('background-color', 'red')
      sounds.sound0.play();
      sounds.sound1.play();
      sounds.sound2.play();
      sounds.sound3.play();
      sounds.sound4.play();
  });








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

    $('.4').click(function() {
        this.style.backgroundColor = '#b23232'
        sounds.sound0.play();
    });

    $(".3").click(function() {
        this.style.backgroundColor = '#ff6c6c'
        sounds.sound1.play();
    });

    $(".2").click(function() {
        this.style.backgroundColor = '#fff748'
        sounds.sound2.play();
    });

    $(".1").click(function() {
        this.style.backgroundColor = '#39cc4b'
        sounds.sound3.play();
    });
    $(".0").click(function() {
        this.style.backgroundColor = '#3248b2'
        sounds.sound4.play();
    });





    // function playSound(){
    //   sound: new Howl({
    //     urls: ['sounds/piano-f#.mp3'],
    //   }
    // })
    //
    // $('#sound').click() {
    //   sound
    // }(function)



    // var data = {
    //     sound: new Howl({
    //             urls: ['A/bubbles.mp3']
    //         })
    //
    //
    //         let body = document.querySelector('body');
    //         let table = document.createElement('div');
    //
    //
    //
    //         body.appendChild(table); table.className = "table";
    //
    //
    //
    //         function makeCell() {
    //             let br = document.createElement('br');
    //             var i = 0;
    //             while (i <= 2) {
    //                 var cell = document.createElement('div');
    //                 cell.addEventListener("click", function() {
    //                     console.log('hi');
    //                     sound: new Howl({
    //                         src: ['A/bubbles.mp3']
    //                     });
    //                     sound.play();
    //                 });
    //                 cell.className = "cell";
    //                 table.appendChild(cell);
    //                 i++;
    //             }
    //             console.log(table);
    //
    //             table.appendChild(br);
    //         }
    //         for (var i = 0; i <= 2; i++) {
    //             makeCell();
    //
    //         }
    //
    //
    //         console.log(table);
    //
    //
    //
    //
    //         console.log(table); console.log(cell);
    //
    //


});
