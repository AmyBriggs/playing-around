$(document).ready(function() {
    'use strict'
    $('.modal-trigger').leanModal();


    // Declare variables used in functions

    var bpm = 60
    var playIndex
    var startTime
    var noteTime
    var loop_length = 12
    var lastDrawTime
    var aheadTime = 0.200
    var gain
    var timeoutId
    var SCConnected = false
    var context
    var currentState = {}


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

    var sound0 = sounds.sound0
    var sound1 = sounds.sound1
    var sound2 = sounds.sound2
    var sound3 = sounds.sound3
    var sound4 = sounds.sound4

    var pitch5 = sound4
    var pitch4 = sound3
    var pitch3 = sound2
    var pitch2 = sound1
    var pitch1 = sound0
    var pitches = [pitch1, pitch2, pitch3, pitch4, pitch5]

    // Experimenting with click listeners on squares


    $(".pitch1").click(function() {
        this.style.backgroundColor = '#000099'
    });

    $(".pitch2").click(function() {
        this.style.backgroundColor = '#005ce6'
    });

    $(".pitch3").click(function() {
        this.style.backgroundColor = '#bf00ff'
    });

    $(".pitch4").click(function() {
        this.style.backgroundColor = '#d580ff'
    });

    $(".pitch5").click(function() {
        this.style.backgroundColor = '#4dffd2'
    });

    // add event handlers for adding/removing
    // 'active' or 'playing' classes to the grid/columns

    $('#play').click(function() {
        startPlay()
    })

    $('#stop').click(function() {
        stopPlay()
    })

    // Setting up the AudioContext

    context = new AudioContext();
    gain = context.createGain();
    gain.connect(context.destination);

    function startPlay() {
        playIndex = 0;
        noteTime = 0.0;
        startTime = context.currentTime + aheadTime;
        schedule();
    }

    function stopPlay(event) {
        cancelAnimationFrame(timeoutId);
        $(".square").removeClass("playing");
    }

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

            drawPlayhead(playIndex);

            advanceNote();
        }
        timeoutId = requestAnimationFrame(schedule)
    }

    function drawPlayhead(xindex) {
        var lastIndex = (xindex + loop_length - 1) % loop_length;
        var $newRows = $('.column_' + xindex);
        var $oldRows = $('.column_' + lastIndex);

        $newRows.addClass("playing");
        $oldRows.removeClass("playing");
    }

    function advanceNote() {
        var secondsPerBeat = 45.0 / bpm;
        playIndex++;
        if (playIndex == loop_length) {
            playIndex = 0;
        }

        noteTime += 0.25 * secondsPerBeat
    }




    $('#reset').click(function() {
        location.reload();

    });

    var squares = document.getElementsByClassName('square');

    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function(event) {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.style.backgroundColor = 'white';
            } else {
                this.classList.add('active')
            }
        })
    }



});
