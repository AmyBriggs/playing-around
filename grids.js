$(document).ready(function() {
    console.log("DOM fully loaded and parsed");


    var sounds = {
      sound0: new Howl({
        urls: ['sounds/bubbles.mp3']
      }),
      sound1: new Howl({
        urls: ['sounds/clay.mp3']
      }),
      sound2: new Howl({
        urls: ['sounds/confetti.mp3']
      }),
      sound3: new Howl({
        urls: ['sounds/corona.mp3']
      }),
      sound4: new Howl({
        urls: ['sounds/dotted-spiral.mp3']
      }),
      sound5: new Howl({
        urls: ['sounds/flash-1.mp3']
      }),
      sound6: new Howl({
        urls: ['sounds/moon.mp3']
      }),
      sound7: new Howl({
        urls: ['sounds/pinwheel.mp3']
      })
    }

    $('#0, #8, #16').click(function() {
        this.style.backgroundColor = '#b23232'
        sounds.sound0.play();
    });

    $("#1, #9, #17").click(function() {
      this.style.backgroundColor = '#ff6c6c'
        sounds.sound1.play();
    });

    $("#2, #10, #18").click(function() {
        this.style.backgroundColor = '#fff748'
        sounds.sound2.play();
    });

    $("#3, #11, #19").click(function() {
        this.style.backgroundColor = '#39cc4b'
        sounds.sound3.play();
    });
    $("#4, #12, #20").click(function() {
        this.style.backgroundColor = '#3248b2'
        sounds.sound4.play();
    });
    $("#5, #13, #21").click(function() {
        this.style.backgroundColor = '#6432b2'
        sounds.sound5.play();
    });
    $("#6, #14, #22").click(function() {
        this.style.backgroundColor = '#bb91ff'
        sounds.sound6.play();
    });
    $("#7, #15, #23").click(function() {
        this.style.backgroundColor = '#ff6c6c'
        sounds.sound7.play();
    });











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
