const DIMENSION = 25;
window.onload = function() {
    let canvas = document.getElementById("drawingCanvas");
    let context = canvas.getContext("2d");
    let canvasWidth = canvas.width;
    let canvasHeight = canvas.height;
    let PIXELSIZE = canvasWidth / DIMENSION;

    drawGridline(context, canvasWidth, canvasHeight);

    canvas.addEventListener("mousemove", mouseFill);
    canvas.addEventListener("mousedown", mouseFill);
    canvas.addEventListener("touchmove", mouseFill);
    canvas.addEventListener("touchstart", mouseFill);

    function mouseFill(e) {
        e.preventDefault(); // Disables scrolling for touch events.

        const isTouch = e.type === 'touchstart' || e.type === 'touchmove';
        const isLeftMouseDown = e.which === 1;
        
        const canvasElement = document.getElementById("drawingCanvas");
        const offsetX = isTouch ? e.targetTouches[0].pageX - canvasElement.offsetLeft : e.offsetX;
        const offsetY = isTouch ? e.targetTouches[0].pageY - canvasElement.offsetTop : e.offsetY;
        if (!isLeftMouseDown && !isTouch) return;

        const pixel = [Math.floor(offsetX / PIXELSIZE), Math.floor(offsetY / PIXELSIZE)];
        fillPixel(pixel);
    }
    
    function fillPixel(pixel) {
        const selectedColor = document.getElementById("selectedColor").value;
        context.fillStyle = selectedColor;
        context.fillRect(pixel[0] * PIXELSIZE, pixel[1] * PIXELSIZE, PIXELSIZE - 1, PIXELSIZE - 1);
    }
}

function drawGridline(ctx, canvasWidth, canvasHeight) {
    if(!ctx) return;
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    for (let i = 0; i < DIMENSION; ++i) {
        x = Math.floor(i * canvasWidth / DIMENSION);
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();

        y = Math.floor(i * canvasHeight / DIMENSION);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }

}

function clearCanvas() {
    let canvas = document.getElementById("drawingCanvas");
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawGridline(context, canvas.width, canvas.height);
}
