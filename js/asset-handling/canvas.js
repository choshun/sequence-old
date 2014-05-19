window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };
})();

cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var canvas = document.getElementById('canvas'),
    canvasContext = canvas.getContext('2d');
    
    function canvasTest() {
        var wrapper = getComputedStyle(document.getElementById('canvas-wrapper'));

        var height = parseInt(wrapper.getPropertyValue('height')),
            width = parseInt(wrapper.getPropertyValue('width'));

        //console.log(height, width);

        //console.log(LFOArray);

        canvas.width = width;
        canvas.height = height;

        canvasContext.beginPath();
        canvasContext.moveTo(0, 50);
        canvasContext.lineTo(width, 50);
        canvasContext.moveTo(50, 0);
        canvasContext.lineTo(50, height);
        canvasContext.stroke();

        var myRectangle = {
            x: 0,
            y: 75,
            width: 100,
            height: 50,
            borderWidth: 5
          };

        drawRectangle(myRectangle, canvasContext);
        //console.log('AT INIT TIME', context.currentTime);
        animate(myRectangle, canvas, canvasContext, context.currentTime);
    }

    function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.rect(myRectangle.x, myRectangle.y, myRectangle.width * LFOArray[theIndex] / 1000, myRectangle.height * LFOArray[theIndex] / 1000);
        context.fillStyle = 'rgba(' + newX + ','+ newX/ 2+',200, '+ newX/ 300 +')';
        context.fill();
        context.lineWidth = myRectangle.borderWidth;
        context.strokeStyle = 'black';
        context.stroke();
    }
var thetime = 0,
    theIndex = 0,
    newX = 0;
    function animate(myRectangle, canvas, canvasContext) {
        // update

        console.log('CONTEXT TIME', context.currentTime);

        thetime += 10;
        if (LFOArray[theIndex] !== undefined) {
            theIndex += 35;
        } else {
            theIndex = 0;
        }
        
        var linearSpeed = 100;
        // pixels / second
        newX = linearSpeed * parseInt(LFOArray[theIndex]) / 1000;

        myRectangle.x = newX + canvas.height/4 + (300 - newX);
        myRectangle.y = newX * .3 + 50 + (200  - newX);

        // clear
        canvasContext.clearRect(0, 0, canvas.width, canvas.height);

        drawRectangle(myRectangle, canvasContext);

        // request new frame
        window.rFrame = requestAnimFrame(function() {

          animate(myRectangle, canvas, canvasContext);
        });
    }