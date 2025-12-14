var ctx = null;
var gGame = null;
var clicked = false;
var start = false;
var over = false;
var images = {};
var touchGround = false;
var canvas = null;

// Scale factor for responsive sizing
var scaleFactor = 1;
var baseWidth = 288;
var baseHeight = 512;

function appOnLoad()
{
    canvas = document.getElementById("game_canvas");
    ctx = canvas.getContext("2d");
    
    // Set up responsive canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);
    
    gGame = new Game();
    gGame.init();
    
    // Mouse events
    canvas.addEventListener("mousedown", function(e){
        e.preventDefault();
        clicked = true;
    });
    canvas.addEventListener("mouseup", function(e){
        e.preventDefault();
        clicked = false;
    });
    
    // Touch events
    canvas.addEventListener("touchstart", function(e){
        e.preventDefault();
        clicked = true;
    }, {passive: false});
    
    canvas.addEventListener("touchend", function(e){
        e.preventDefault();
        clicked = false;
    }, {passive: false});
    
    canvas.addEventListener("touchcancel", function(e){
        e.preventDefault();
        clicked = false;
    }, {passive: false});
    
    // Prevent scrolling on mobile
    document.body.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, {passive: false});
    
    setInterval(loop, 16);
}

function resizeCanvas() {
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    
    // Calculate scale to fit screen while maintaining aspect ratio
    var scaleX = windowWidth / baseWidth;
    var scaleY = windowHeight / baseHeight;
    scaleFactor = Math.min(scaleX, scaleY);
    
    // Apply scale to canvas display size (CSS)
    canvas.style.width = (baseWidth * scaleFactor) + 'px';
    canvas.style.height = (baseHeight * scaleFactor) + 'px';
    
    // Keep internal resolution the same for consistent game logic
    canvas.width = baseWidth;
    canvas.height = baseHeight;
    
    // Disable image smoothing for pixel-perfect rendering
    ctx.imageSmoothingEnabled = false;
}

function loop()
{
    gGame.update();
    gGame.render();
}