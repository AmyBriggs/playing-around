// // SoundCloud API Authentication
// //
//
// var SC = require('soundcloud');
SC.initialize({
    client_id: '384341a25ad74d5323ef65c04636690f',
    redirect_uri: 'https://amybriggssixty.firebaseapp.com'
});

console.log('this is awesome')
);
//
//
// // SoundCloud Recorder
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

});
