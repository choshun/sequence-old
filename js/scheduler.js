
// Scheduling vars
var isPlaying = false;
var scheduleAheadTime = .1; //var scheduleAheadTime = 0.1; in secs
var lookahead = 25; // var lookahead = 25; in ms
var timerID = 0;

var nextNoteCount = 0;
var singleBeat = false;
var isNextNote = true;

var index = 0;
var eventTime = 0 + context.currentTime;

// new

var trigger = {},
    type = '',
    eventKey = '';

var addedTime = 0;

var currentBeat = 1;

//ghettoooo
var loopIndex = 0;

function scheduler(sequence) {

    while (eventTime < context.currentTime + scheduleAheadTime) {

        if (sequence[index] !== undefined) {
            trigger = sequence[index];
            eventTime = trigger.time + loopIndex;

            for (eventKey in trigger.events) {
                if (trigger.events[eventKey].type === 'audio') {
                    scheduleEvent(eventTime, bufferList[trigger.events[eventKey].params.sample]);
                    console.log(index, eventTime);
                } else {
                    playOsc(eventTime);
                }

                //console.log(eventKey);
            }
            
            

            // // NEW:
            // // INSTEAD of having next not/check beat etc, just have the unchanged sequence, then a prepped cropped version that loops if needed

            index++;

            //console.log('next event:', sequence[index]);
            // super ghetto way to make it loop
        } else {
            console.log('next event:', eventTime);
            index = 0;
            loopIndex++;
            //clearTimeout(timerID);
            //return;
        }
    }

    timerID = window.setTimeout( function() {
        scheduler(SEQUENCE);
    } , lookahead);
}

function scheduleEvent(time, bufferSound) {
    playSample( time, bufferSound );
}


