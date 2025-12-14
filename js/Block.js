function Block()
{
    this.X = 300;    
    this.botY = 0;  
    this.topY = 0;    
    this.time = 0;
    this.passed = false;
    this.passSound = new sound("sounds/sfx_point.mp3");
    
    // Randomly choose which image set to use (50% chance)
    this.useAlternate = Math.random() < 0.5;
    
    this.drawBlock = function()
    {
        this.time ++;
        if (!over && start)
        this.X -=1.6;
        
        // Choose which images to use based on random selection
        var botImage = this.useAlternate ? images["bot1"] : images["bot"];
        var topImage = this.useAlternate ? images["top1"] : images["top"];
        
        // Draw bottom pillar (normal)
        ctx.drawImage(botImage, this.X, this.botY, 52, 320);
        
        // Draw top pillar (rotated 180 degrees)
        ctx.save();
        ctx.translate(this.X + 26, this.topY + 160); // Move to center of pillar
        ctx.rotate(Math.PI); // Rotate 180 degrees
        ctx.drawImage(topImage, -26, -160, 52, 320); // Draw centered
        ctx.restore();
    }   
    
}
