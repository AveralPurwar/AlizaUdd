function Bird()
{
    this.sX = 0;
    this.X = 75;
    this.Y = 150;
    this.time = 0;
    this.frame = 0;
    this.bounceSpeed = 0;  
    this.angle = 0;
    this.dead = false;
    this.suppressWingSound = false;
    
    this.swing = function()
        {
            // Only play wing sound if not suppressed
            if(!this.suppressWingSound)
            {
                var swingSound = new sound("sounds/sfx_wing.mp3");
                swingSound.play();
            }
        }
    
   
    this.hitSound = new sound("sounds/sfx_hit.mp3");
    this.hitPlayed = false;
    this.hitGroundSound = new sound("sounds/sfx_hitGround.mp3");
    this.hitGroundPlayed = false;
    
    
    this.drawBird = function()
    {
        // Removed animation frame logic
        this.sX = 0; // Keep first frame static

      if (!touchGround && start)
          {
        this.Y -= this.bounceSpeed;
        this.bounceSpeed -= 0.35;
          }        
        ctx.save();
        ctx.translate(this.X,this.Y);
        ctx.rotate(this.angle);
        
        // Enable image smoothing for better quality when scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        
        // Scale down: 30% smaller than before (28 * 0.7 = 19.6)
        var radius = 25 // 30% smaller
        
        // Create circular clipping path
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        
        // Draw the image to fill the circle
        var size = radius * 2;
        ctx.drawImage(images["birdImg"], 0, 0, 219, 280, -radius, -radius, size, size);
        
        ctx.restore();
        
        // Removed frame animation code
            
    }
    
    
    
}