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



    var lastDrawTime
    var aheadTime = 0.200

    var rec
    var gain
    var timeoutId

    var SCConnected = false

    var context

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

    // add event handlers for buttons here, to experiment with adding/removing
    // 'active' or 'playing' classes to the grid/columns

    $('#play').click(function() {
        startPlay()


        console.log(col1);
        console.log(col12);
    })

    $('#stop').click(function() {
        stopPlay()

    })
    console.log(col1);
    console.log(col12);







    // Setting up the AudioContext


    context = new AudioContext();
    console.log(context.currentTime);
    gain = context.createGain();
    gain.connect(context.destination);



    function startPlay() {
        playIndex = 0;
        noteTime = 0.0;
        startTime = context.currentTime + aheadTime;
        // startTime = context.currentTime;
        schedule();

    }

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


    // function reset(){
    //   //  $('.square').removeClass('active');
    //    location.reload;
    //  }

    $('#reset').click(function() {
        location.reload();
        //  reset();
    });

    var squares = document.getElementsByClassName('square');

    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', function(event) {
            // console.log(event.target);
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                this.classList.add('active')
            }
        })
    };


    //  Make event listeners for local storage

    function localStorageSupported() {
        try {
            return "localStorage" in window && window["localStorage"] !== null;
        } catch (e) {
            return false;
        }
    }

    if (localStorageSupported('localStorage')) {
        console.log('yes');
        // Yippee! We can use localStorage awesomeness
    } else {
        console.log('no');
        // Too bad, no localStorage for us
    }


    function savePattern(pitches) {
        if (!currentState[pitches]) {
            console.log('adding value');
            currentState[pitches] = [];
        }
        var array = $('#' + pitches).children('.square');
        for (var i = 0; i < array.length; i++) {
            currentState[pitches][i] = $(array[i]).hasClass('active');
        }
    }

    function loadPattern(pitches) {
        if (!currentState[pitches]) return;
        var array = $('#' + pitches).children('.square');
        for (var i = 0; i < array.length; i++) {
            if (currentState[pitches][i]) {
                $(array[i]).addClass('active');
                console.log('active');
            } else {
                $(array[i]).removeClass('active');
                console.log('remove active');
            }
        }
    }

    console.log(pitches);

    function saveState() {
        for (var i = 0; i < pitches.length; i++) {
            savePattern(pitches[i]);
        }
        console.log(currentState);
        return JSON.stringify(currentState);
    }


    function loadState(pattern) {
        // for pattern
        if (pattern) {
            currentState = JSON.parse(pattern)
        }
        for (var i = 0; i < pitches.length; i++) {
            loadPattern(pitches[i]);
        }
    }


    ///////////Event listeners for record buttons//////////////////////

    $('#save').click(function() {
        // $('#savePanel').show();
        $('#save').addClass('selectedPanel');
        $('#save').removeClass('deselectedPanel');
        // $('#loadPanel').hide();
        $('#load').addClass('deselectedPanel');
        $('#load').removeClass('selectedPanel');
        // $('#recordPanel').hide();
        $('#record').addClass('deselectedPanel');
        $('#record').removeClass('selectedPanel');
        console.log('save');

    });

    $('#load').click(function() {
        // $('#savePanel').hide();
        $('#save').addClass('deselectedPanel');
        $('#save').removeClass('selectedPanel');
        // $('#loadPanel').show();
        $('#load').addClass('selectedPanel');
        $('#load').removeClass('deselectedPanel');
        // $('#recordPanel').hide();
        $('#record').addClass('deselectedPanel');
        $('#record').removeClass('selectedPanel');
        console.log('load');

    });


    $('#record').click(function() {
        // $('#savePanel').hide();
        $('#save').addClass('deselectedPanel');
        $('#save').removeClass('selectedPanel');
        // $('#loadPanel').hide();
        $('#load').addClass('deselectedPanel');
        $('#load').removeClass('selectedPanel');
        // $('#recordPanel').show();
        $('#record').addClass('selectedPanel');
        $('#record').removeClass('deselectedPanel');
        console.log('record');
    })

    $('#savePattern1').click(function() {
        localStorage.setItem('pattern1', saveState());
    });

    $('#loadPattern1').click(function() {
        loadState(localStorage.pattern1);
    });



    $('#recordStart').click(function(){
        if (!SCConnected) {
            SC.connect().then(function() {
                return SC.get('/me');
            }).then(function(user) {
                SCConnected = true;
            })
        }
    });






    // SoundCloud API Authentication

    // SC.initialize({
    //   client_id: '384341a25ad74d5323ef65c04636690f',
    //   redirect_uri:
    // });







});
