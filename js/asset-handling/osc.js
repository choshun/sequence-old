var routeArray = new Array();

// Once everything is kicked off, vars for the things being triggered
var noteLength = 1;
//var LFOArray;
var gain, reverb, lowPass, square, sin;

var lowPassIsOn = false,
    freqIsOn = false;
        
    //initSpectrumBox();

function init() {
    bindRouter();
    checkChaosSettings();
}

/** TODO: Pretty sure the effects don't need **/
function playOsc( time ) {
    setOscGain();
    setOscReverb();
    setOscLowPassFilter();
    setOscCompressor();

    createSquareOsc( time );
    createSinOsc( time );

    configureConnections();

}

/** PLUGINS **/
function setOscGain() {
    gain = context.createGainNode();
    gain.gain.value = 0.2;
}

function setOscReverb() {
    reverb = context.createConvolver();
    //NEED IMPULSE RESPONSE SAMPLE
    var reverbBuffer = bufferList[3];
    reverb.buffer = reverbBuffer;

    //routeArray.push(reverb);
}

function setOscLowPassFilter() {
    lowPass = context.createBiquadFilter();
    lowPass.type = 0; // Low-pass filter. See BiquadFilterNode docs
    //lowPass.frequency.value = 1000; // Vanilla set cutoff to static 1000 HZ

    //console.log('LFOARRAY', LFOArray);
    // TODO: WHY 2?!?!?!?

    lowPass.frequency.setValueCurveAtTime(LFOArray, context.currentTime, 2);
    //lowPass.frequency.setValueCurveAtTime(LFOArray, context.currentTime, noteLength);
    lowPass.Q.value = 10; // filter resonance

    //routeArray.push(lowPass);
}

function setOscCompressor() {
    oscCompressor = context.createDynamicsCompressor();
    oscCompressor.ratio.value = 200;
    oscCompressor.threshold.value = 25;

    //routeArray.push(oscCompressor);
}
/** END PLUGINS **/

/** OSCILLATORS **/
function createSquareOsc( time ) {
    square = context.createOscillator();

    square.frequency.value = (freqIsOn) ? 100.0 * cursorX : 100.0;
    square.gain = .5;
    square.type = 1;
    square.noteOn( time );
    //console.log('asdasdasd',context.currentTime, time);
    square.noteOff( time + noteLength );
}

function createSinOsc( time ) {
    sin = context.createOscillator();
    sin.frequency.value = (freqIsOn) ? 200.0 * cursorY : 200.0;
    sin.type = 0;

    sin.noteOn( time );
    sin.noteOff( time + noteLength );
}
/** END OSCILLATORS **/

function checkChaosSettings() {

    var $input = $('#chaos-settings').find('input');
    var $lowpass = $('#chaos-lowpass');
    var $freq = $('#chaos-freq');

    $input.click(function() {

        lowPassIsOn = ($lowpass.prop('checked') === true) ? true : false;
        freqIsOn = ($freq.prop('checked') === true) ? true : false;

        //console.log('lowpass is on: ' + lowPassIsOn + ', freq is on:' + freqIsOn);
    });
}

/** OSC ROUTING **/
/** TODO: make routing dynamic **/
function bindRouter() {
    var $routerOptions = $('#router').find('input');

    $routerOptions.click(function(e){
        routeArray = [];

        $routerOptions.each(function(){
            var $this = $(this);

            if ($this.prop('checked') === true) {

                if ($(this).attr('id') === 'reverb') {
                    routeArray.push( 'reverb' );
                } else if ($(this).attr('id') === 'lowpass') {
                    routeArray.push( 'lowPass' );
                }
            }
                
        });

    });
}
function configureConnections() {
    square.connect( gain );
    sin.connect( gain );

    //console.log('routeArray.length'+routeArray.length);

    if (routeArray.length === 0) {
        gain.connect( oscCompressor );
    } else {

        var i=0;

        if (routeArray[i] === 'reverb') {
            gain.connect( reverb );
            if (routeArray[i + 1] === undefined) {
                //alert(routeArray[i + 1]);
                reverb.connect(oscCompressor);
            } else {
                reverb.connect(lowPass);
                lowPass.connect(oscCompressor);
            }
            i++;
        } 

        if (routeArray[i] === 'lowPass') {
            gain.connect( lowPass );
            lowPass.connect(context.destination);
            i++;
        } 

        //didn't work with lfo, but did with reverb
        //gain.connect( routeArray[i] );
        //routeArray[i].connect( context.destination );

    }
    
    oscCompressor.connect(context.destination);

}

// visualizer didn't work for some reason
function initSpectrumBox() {

    wavebox = new SpectrumBox(2048, 1000, 'spectrum', context);
    wavebox.setType(SpectrumBox.Types.TIME);
    wavebox.getCanvasContext().fillStyle = "#da4f49";
    // visualNodes.push(wavebox);
    // wavebox.getAudioNode();

    // alert('sup');
}

// this is an osc controlling a node example that works, but only for gain as far as I can tell
function lfodParamTest() {
    // This works, but doesn't translate to lowshelf

    var lfo = context.createOscillator();
    lfo.frequency.value = 8;
    lfo.connect(gain);

    gain.connect(gain.gain);

    lfo.start(0);
    lfo.stop(context.currentTime + noteLength);

    // This doesn't work.. don't think it does anything
    lfo.connect(lowPass);
    lowPass.connect(lowPass.frequency);
}

init();