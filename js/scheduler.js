
// Scheduling vars
var isPlaying = false;
var scheduleAheadTime = .1; //var scheduleAheadTime = 0.1; in secs
var lookahead = 25; // var lookahead = 25; in ms
var timerID = 0;

var nextNoteCount = 0;
var singleBeat = false;
var isNextNote = true;

var index = 0;
var nextNoteTime = 0;

function scheduler(sequence) {
    if (sequence[index] !== undefined) {
        while (nextNoteTime < context.currentTime + scheduleAheadTime) {

            // // NEW:
            // // INSTEAD of having next not/check beat etc, just have the unchanged sequence, then a prepped cropped version that loops if needed
            nextNoteTime = sequence[index].time;

            scheduleNote(nextNoteTime, bufferList[1]);

            index++;
        }
    }
    
    //theBeat = Math.floor(context.currentTime / oneBeat); 

    timerID = window.setTimeout( function() {
        scheduler(SEQUENCE);
         //console.log('NEXT NOTE TIME: ' + context.currentTime);
    } , lookahead);

}


function scheduleNote( time, bufferSound ) {
    playSample( time, bufferSound );
}

//TODO: next note is not accurate per sequence/this is a mess.
//      ie it fires at the right time, but the time it's using to set next time is not always correct
//      I believe this has to do with the beat resetting.
// function nextNote(array, index) {

//     //ALL THIS FUNCTION DOES IS FIND THE NEXT NOTETIME

//     console.log(index);

//     //if (theSequence === 1) {

//         if (index + 1 === triggerArray.length){
//             index = 0;
//         }
//         nextNoteTime += triggerArray[index + 1].nextNoteTime;
//     //} else {
//     //    nextNoteTime += triggerArray[index].nextNoteTime;
//     //}

//     if (triggerArray.length > 1){
//         // RESTART BEAT
//         if (nextNoteCount === triggerArray.length || singleBeat){
//             newBeat = false;

//             isNextNote = false;
//             console.log('I should stop!');
//             nextNoteCount = 0;

//         } else {
//             nextNoteCount = nextNoteCount % triggerArray.length;
//         }

//     } else {
//         nextNoteCount = 0;
//         singleBeat = true;
//     }

//     nextNoteCount++;
// }

//scheduler(SEQUENCE);

