$(document).ready(function() {
    'use strict'
    console.log("DOM fully loaded and parsed,grids is connected");
    console.log('grids is connected');



    var col1 = $('div.square.One')
    var col2 = $('div.square.Two')
    var col3 = $('div.square.Three')
    var col4 = $('div.square.Four')
    var col5 = $('div.square.Five')
    var col6 = $('div.square.Six')
    var col7 = $('div.square.Seven')
    var col8 = $('div.square.Eight')
    var col9 = $('div.square.Nine')
    var col10 = $('div.square.Ten')
    var col11 = $('div.square.Eleven')
    var col12 = $('div.square.Twelve')

    var cols = [col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12]

    var interval = setInterval(playCol, 2000)

    var playCol = function() {
      for (var i = 0; i < cols.length; i++) {
        setInterval(function() {
          sounds.sound0.play();
          sounds.sound1.play();
          sounds.sound2.play();
          sounds.sound3.play();
          sounds.sound4.play();
          console.log('hi');
        }, 2000)
      }
    }

    playCol()


    $('#stop').click(function() {
        clearInterval()
    })


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









});
