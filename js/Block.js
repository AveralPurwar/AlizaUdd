function Block()
{
    this.X = 300;    
    this.botY = 0;  
    this.topY = 0;    
    this.time = 0;
    this.passed = false;
    this.passSound = new sound("sounds/sfx_point.mp3");
    
    this.drawBlock = function()
    {
        this.time ++;
        if (!over && start)
        this.X -=1.6;
        
        // Draw bottom pillar (normal)
        ctx.drawImage(images["bot"], this.X, this.botY, 52, 320);
        
        // Draw top pillar (rotated 180 degrees)
        ctx.save();
        ctx.translate(this.X + 26, this.topY + 160); // Move to center of pillar
        ctx.rotate(Math.PI); // Rotate 180 degrees
        ctx.drawImage(images["top"], -26, -160, 52, 320); // Draw centered
        ctx.restore();
    }   
    
}