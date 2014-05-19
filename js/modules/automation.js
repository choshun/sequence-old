// Handles input and construction of automation data
// Right now it's the kaos pad thingy as the only controller, the constructed array should be able to drive any asset type, 
// as of now it's osc and canvas (canvas kind of :/)

// chaos pad
var $pad = $('#chaos-pad');
var $padWidth = $pad.width(),
    $padHeight = $pad.height();

var cursorX, cursorY;

function init() {
	kaosPad();
	createLFOArray();
}


/** KAOS PAD **/
function kaosPad() {
    // for chaos pad x and y
    cursorY = 0;
    cursorX = 0;

    $pad.mousemove(function(e){

        /** TODO: only change these when the command key is on **/

        cursorX = (window.Event) ? e.pageX : event.clientX;
        cursorX = cursorX - $pad.offset().left;
        cursorY = (window.Event) ? e.pageY : event.clientY;
        cursorY = cursorY - $pad.offset().top;

        var section = $padWidth * 30;

        cursorX = Math.floor($padWidth / section * cursorX) * .1 * 2.5 + .1;
        cursorY = Math.floor($padWidth / section * cursorY) * .1 * 5 + .1;

        //console.log('CURSOR Y' + cursorY);

        createLFOArray();

    });
    
}

// from http://chimera.labs.oreilly.com/books/1234000001552/ch02.html#s02_6
// Need to make an lfo sin multiplier for lowpass... can't figure out how to make it work like the gain example :(
function createLFOArray() {
    var DURATION = noteLength;
    var FREQUENCY = (lowPassIsOn) ? 2.0 * cursorY : 2.0;
    //var FREQUENCY = 2 * cursorY;
    var SCALE = 1;

    var chaosFreqMultiplier = 3000 * cursorX;

    // Split the time into valueCount discrete steps.
    var valueCount = 4096;
    // Create a sinusoidal value curve.
    // Why I used a typed array: http://stackoverflow.com/questions/15823021/when-to-use-float32array-instead-of-array-in-javascript
    // Basically use a normal array, except when you need to quickly access its values in multiple different places
    var values = new Float32Array(valueCount);

    console.log('LENGTH', values);

    for (var i = 0; i < valueCount; i++) {
        var percent = (i / valueCount) * DURATION*FREQUENCY;
        values[i] = Math.abs(1 + (Math.sin(percent * 2 * Math.PI) * SCALE) * ((lowPassIsOn) ? chaosFreqMultiplier : 3000));
        // Set the last value to one, to restore playbackRate to normal at the end.
        if (i == valueCount - 1) {
            values[i] = 1 * ((lowPassIsOn) ? chaosFreqMultiplier : 3000);
        }
    }

    //console.log(values);

    LFOArray = values;
}

init();
