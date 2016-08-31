// // SoundCloud API Authentication
// //
//
var SC = require('soundcloud');
SC.initialize({
    client_id: '384341a25ad74d5323ef65c04636690f',
    redirect_uri: 'https://amybriggssixty.firebaseapp.com/callback.html'
});

console.log('this is awesome')
// );
//
//
// //
// Soundcloud experiment!

// SC.initialize({
//     client_id: "384341a25ad74d5323ef65c04636690f",
//     redirect_uri: "https://amybriggssixty.firebaseapp.com/callback"
// });
//
//
// console.log('yeah');
//
// $("#recorderUI.reset #controlButton").click(function(e) {
//     updateTimer(0);
//     SC.record({
//         start: function() {
//             setRecorderUIState("recording");
//         },
//         progress: function(ms, avgPeak) {
//             updateTimer(ms);
//         }
//     });
//     e.preventDefault();
// });

//
// $("#recorderUI.recording #controlButton, #recorderUI.playing #controlButton").live("click", function(e) {
//     setRecorderUIState("recorded");
//     SC.recordStop();
//     e.preventDefault();
// });

//
// $("#recorderUI.recorded #controlButton").live("click", function(e) {
//     updateTimer(0);
//     setRecorderUIState("playing");
//     SC.recordPlay({
//         progress: function(ms) {
//             updateTimer(ms);
//         },
//         finished: function() {
//             setRecorderUIState("recorded");
//         }
//     });
//     e.preventDefault();
// });

//
// $("#reset").live("click", function(e) {
//     SC.recordStop();
//     setRecorderUIState("reset");
//     e.preventDefault();
// });
//
// $("#upload").live("click", function(e) {
//     setRecorderUIState("uploading");
//
//     SC.connect({
//         connected: function() {
//             $("#uploadStatus").html("Uploading...");
//             SC.recordUpload({
//                 track: {
//                     title: "Untitled Recording",
//                     sharing: "private"
//                 }
//             }, function(track) {
//                 $("#uploadStatus").html("Uploaded: <a href='" + track.permalink_url + "'>" + track.permalink_url + "</a>");
//             });
//         }
//     });
//
//     e.preventDefault();
// });

//
// function updateTimer(ms) {
//     $("#timer").text(SC.Helper.millisecondsToHMS(ms));
// }
//
// function setRecorderUIState(state) {
//     // state can be reset, recording, recorded, playing, uploading
//     // visibility of buttons is managed via CSS
//     $("#recorderUI").attr("class", state);
// }
//
//
// });

// function savePattern(pitches) {
//     if (!currentState[pitches]) {
//         console.log('adding value');
//         currentState[pitches] = [];
//     }
//     var array = $('#' + pitches).children('.square');
//     for (var i = 0; i < array.length; i++) {
//         currentState[pitches][i] = $(array[i]).hasClass('active');
//     }
// }
// function loadPattern(pitches) {
//     if (!currentState[pitches]) return;
//     var array = $('#' + pitches).children('.square');
//     for (var i = 0; i < array.length; i++) {
//         if (currentState[pitches][i]) {
//             $(array[i]).addClass('active');
//             console.log('active');
//         } else {
//             $(array[i]).removeClass('active');
//             console.log('remove active');
//         }
//     }
// }

// console.log(pitches);
//
// function saveState() {
//     for (var i = 0; i < pitches.length; i++) {
//         savePattern(pitches[i]);
//     }
//     return JSON.stringify(currentState);
// }
//
// console.log(currentState);
//
// function loadState(pattern) {
//     // for pattern
//     if (pattern) {
//         currentState = JSON.parse(pattern)
//     }
//     for (var i = 0; i < pitches.length; i++) {
//         loadPattern(pitches[i]);
//     }
// }

//
//
// ///////////Event listeners for record buttons//////////////////////
//
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

// $('#load').click(function() {
//     // $('#savePanel').hide();
//     $('#save').addClass('deselectedPanel');
//     $('#save').removeClass('selectedPanel');
//     // $('#loadPanel').show();
//     $('#load').addClass('selectedPanel');
//     $('#load').removeClass('deselectedPanel');
//     // $('#recordPanel').hide();
//     $('#record').addClass('deselectedPanel');
//     $('#record').removeClass('selectedPanel');
//     console.log('load');
//
// });
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
    $('#recordStart').click(function() {
        if (!SCConnected) {
            SC.connect().then(function() {
                return SC.get('/me');
            }).then(function(user) {
                SCConnected = true;
            })
        }
    });
})

// $('#savePattern1').click(function() {
//     localStorage.setItem('pattern1', saveState());
// });
//
// $('#loadPattern1').click(function() {
//     loadState(localStorage.pattern1);
// });

// // // SoundCloud API Authentication
// // //
// //
// // var SC = require('soundcloud');
SC.initialize({
    client_id: '384341a25ad74d5323ef65c04636690f',
    redirect_uri: 'https://amybriggssixty.firebaseapp.com/callback.html'
});

console.log('this is awesome');
// //
// //

$('#recordStop').click(function() {
    // setTimeout(function(){
    recorder.stop();
    // recorder.play();
    var theBlob = recorder.getWAV();
    console.log(theBlob);
    recorder.saveAs('soundfile');

    // recorder.getWAV().then(function(blob) {
    // $('#states').show();
    // $('#soundcloud').hide();
    // console.log('blob');
    var files = 'shh.wav'
    if(files === 'shh.wav'){
      SC.upload({
        file: files, // a Blob of your WAV, MP3...
        title: 'This is my sound'
          // asset_data: theBlob,
          // title: 'track' + Date.now(),
          // sharing: 'public',
          // progress: (event) => {
          //     console.log('progress', event);
          // }
      });
    }

  });

// // // SoundCloud Recorder
// //
var recorder = new SC.Recorder();

$('#recordStart').click(function() {
    recorder.start();
});






SoundCloud Recorder
//
$('#recordStart').click(function() {
    if (!SCConnected) {
        SC.connect().then(function() {
            return SC.get('/me');
        }).then(function(user) {
            SCConnected = true;
            recorder.start();
        }).catch(function(error) {
            alert('Error: ' + error.message);
        });
    } else {
        $('#recordDisplay').addClass('loader-inner line-scale-party');
        recorder.start();
        }
    });


    $('#recordStop').click(function() {
        $('#states').addClass('loader-inner line-scale-party');
        $('#recordDisplay').removeClass('loader-inner line-scale-party');
        console.log('Recording stopped');
        recorder.stop();
        // recorder.play();
        var theBlob = recorder.getWAV();
        recorder.saveAs('myDopeJam');

        recorder.getWAV().then(function(blob) {
            $('#states').show();
            $('#soundcloud').hide();
            console.log('blob');
            SC.upload({
                asset_data: blob,
                title: 'track' + Date.now(),
                sharing: 'public',
                progress: (event) => {
                    console.log('progress', event);
                }
            }).then(function(track) {

                var checkProcessed = setInterval(function() {
                    var uri = track.uri + '?client_id=384341a25ad74d5323ef65c04636690f';
                    $.get(uri, function(result) {
                        console.log("get", this);
                        if (result.state === "failed" || result.state === "finished") {
                            var src = "https://w.soundcloud.com/player/?url=" + track.secret_uri + "&amp;color=bbbbbb&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"

                            console.log('uploaded', track);
                            $('#soundcloud').attr('src', src);
                            $('#states').hide();
                            $('#soundcloud').show();
                        }
                        clearInterval(checkProcessed);
                    })
                }, 3000)
            }).catch(function() {
                console.log('err', arguments);
            });
        })

        console.log('finish recordStop');

        // $('#load').click(function() {
        //   recorder.play(theBlob)
        // });
        // }, 5000);
        // });
        // /////////////////////////////////////////////////////////////////////////
        // /////////////////////////////////////////////////////////////////////////
        // SOUNDCLOUD RECORD, STOP, SHOW FUNCTIONS

        // if (!SCConnected) {
        //   console.log('gee whiz');
        //     SC.connect().then(function() {
        //         return SC.get('/me');
        //     }).then(function(user) {
        //         SCConnected = true;
        //         recorder.start();
        //     }).catch(function(error) {
        //         alert('Error: ' + error.message);
        //     });
        // } else {
        //     $('#recordDisplay').addClass('loader-inner line-scale-party');
        //     recorder.start();
        //     }
        // });

        // $('#recordStop').click(function() {
        //   console.log('whoa there');
        //     $('#states').addClass('loader-inner line-scale-party');
        //     $('#recordDisplay').removeClass('loader-inner line-scale-party');
        //     console.log('Recording stopped');
        //     recorder.stop();
        //     // recorder.play();
        //     var theBlob = recorder.getWAV();
        //     recorder.saveAs('soundfile');
        //
        // recorder.getWAV().then(function(blob) {
        //     $('#states').show();
        //     $('#soundcloud').hide();
        //     console.log('blob');
        //     SC.upload({
        //         asset_data: blob,
        //         title: 'track' + Date.now(),
        //         sharing: 'public',
        //         progress: (event) => {
        //             console.log('progress', event);
        //         }
        //     }).then(function(track) {
        //
        //         var checkProcessed = setInterval(function() {
        //             var uri = track.uri + '?client_id=384341a25ad74d5323ef65c04636690f';
        //             $.get(uri, function(result) {
        //                 console.log("get", this);
        //                 if (result.state === "failed" || result.state === "finished") {
        //                     var src = "https://w.soundcloud.com/player/?url=" + track.secret_uri + "&amp;color=bbbbbb&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false"
        //
        //                     console.log('uploaded', track);
        //                     $('#soundcloud').attr('src', src);
        //                     $('#states').hide();
        //                     $('#soundcloud').show();
        //                 }
        //                 clearInterval(checkProcessed);
        //             })
        //         }, 3000)
        //     }).catch(function() {
        //         console.log('err', arguments);
        //     });
        // })

        //         console.log('finish recordStop');
        //
        // });


});
