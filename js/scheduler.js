
// Scheduling vars
var isPlaying = false;
var scheduleAheadTime = .1; //var scheduleAheadTime = 0.1; in secs
var lookahead = 25; // var lookahead = 25; in ms
var timerID = 0;

var index = 0;
var eventTime = 0;

// new
var trigger = {},
    type = '',
    eventKey = '';

var addedTime = 0;

var currentBeat = 1;

//ghettoooo
var loopIndex = 0;
var time = 0;
var pauseTime = 0;

function scheduler(sequence) {
    // console.log('CURRENT TIME', context.currentTime);
    // console.log('TIME', time);

    while (eventTime < context.currentTime + scheduleAheadTime) {

        if (sequence[index] !== undefined) {
            trigger = sequence[index];
            eventTime = trigger.time + loopIndex + time;

            // TODO: make this seperate where you just pass in the callback object
            for (eventKey in trigger.events) {
                if (trigger.events[eventKey].type === 'audio') {
                    scheduleEvent(eventTime, bufferList[trigger.events[eventKey].params.sample]);
                    //console.log(index, eventTime);
                } else {
                    playOsc(eventTime);
                }
            }

            // // NEW:
            // // INSTEAD of having next not/check beat etc, just have the unchanged sequence, then a prepped cropped version that loops if needed

            index++;
        } else {
            //console.log('next event:', eventTime);
            index = 0;
            loopIndex++;
        }
    }

    timerID = window.setTimeout(function() {
        scheduler(SEQUENCE);
    }, lookahead);
}

function pause() {
    clearTimeout(timerID);
    loopIndex = 0;
}

function scheduleEvent(time, bufferSound) {
    playSample( time, bufferSound );
}


