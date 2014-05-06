var bufferList = [];

var sampleArray = '../assets/FH2_Kick_26.wav ../assets/FH2_Hat_09.wav ../assets/FH2_Snare_05.wav ../assets/l960big_empty_church.wav'.split(' ');

console.log(sampleArray);

function init() {
    bufferLoad();
}

function bufferLoad() {
    var bufferLoader = new BufferLoader(
         context,
         sampleArray,
         loadCallback
    );

    bufferLoader.load(); // from audio-helpers.js
}

function loadCallback(buffers){
    bufferList = buffers;
    bufferLoaded = true;
    console.log(bufferList);
    //$('.loading').addClass('hidden');
}

function playSample(time, asset) {
    var source = context.createBufferSource();
    source.buffer = asset;

    /** SAMPLE COMPRESSOR **/
    sampleCompressor = context.createDynamicsCompressor();
    sampleCompressor.ratio.value = 30;
    sampleCompressor.threshold.value = 500;
    source.connect(sampleCompressor);
    sampleCompressor.connect(context.destination);

    // console.log(source);
    source.start(time);
}

init();