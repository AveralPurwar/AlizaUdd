function Game()
{
    var birdOb = null;
    var groundOb = null;
    var blockOb = null;
//    var touchGround = false;
    var rotSpeed = 2*Math.PI/180;
    var score = 0;
    var won = false;
    var wonSoundPlayed = false;
    
    // ADJUSTABLE GAP BETWEEN TOP AND BOTTOM PILLARS
    var pillarGap = 125; // Vertical gap between top and bottom pillars (default was 100)
    
    // ADJUSTABLE SPACING BETWEEN PILLAR PAIRS
    var pillarSpacing = 165; // Horizontal distance between pillar pairs (default was 144)
    
    var sources = {};    
   
    
    
    this.init = function()
    {
        birdOb = new Bird();
        groundOb = new Ground();
        blockOb = new Array();
        
        touchGround = false;        
        rotSpeed = 2*Math.PI/180;
        score = 0;
        start = false;
        over = false;
        won = false;
        wonSoundPlayed = false;
        
        
        
        sources = 
            {
                BGI: 'images/BGI.png',
                birdImg: 'images/bird.png',
                groundImg: 'images/ground.png',
                bot: 'images/bot.png',
                top: 'images/top.png',
                bot1: 'images/bot1.png',
                top1: 'images/top1.png',
                aliza: 'images/aliza.png',
                start: 'images/start.png'
            };
        loadImages(sources);
        
        for( i = 1; i<5; i++)
            {
                blockOb[i] = new Block();
                blockOb[i].botY = Math.round(150 + Math.random()*200);
                blockOb[i].topY = blockOb[i].botY - pillarGap - 320; // Using pillarGap variable
                if(i==1) blockOb[i].X = 400;
                else
                blockOb[i].X = blockOb[i-1].X + pillarSpacing; // Using pillarSpacing variable
            }
    }
    
    this.update = function()
    {
        if(over && clicked && touchGround) gGame.init();
        
        // Check if player won (reached 17 points)
        if(score >= 17 && !won)
        {
            won = true;
            over = true;
            if(!wonSoundPlayed)
            {
                var wonSound = new sound("sounds/won.mp4");
                wonSound.play();
                wonSoundPlayed = true;
            }
        }
        
        for( i = 1; i<5; i++)
            {
                if(i==1)
                 {
                     if(blockOb[i].X + 52 <= 0)
                         {
                         blockOb[i].X = blockOb[4].X + pillarSpacing; // Using pillarSpacing variable
                        blockOb[i].botY = Math.round(150 + Math.random()*200);
                        blockOb[i].topY = blockOb[i].botY - pillarGap - 320; // Using pillarGap variable

                             blockOb[i].passed = false;

                         }
                 }
                else
                    {
                        if(blockOb[i].X+52 <=0)
                            {
                            blockOb[i].X = blockOb[i-1].X + pillarSpacing; // Using pillarSpacing variable
                            blockOb[i].botY = Math.round(150 + Math.random()*200);
                            blockOb[i].topY = blockOb[i].botY - pillarGap - 320; // Using pillarGap variable

                                blockOb[i].passed = false;

                            }
                    }     
            }
        
        if(birdOb.bounceSpeed > 0 && start)
            {
                rotSpeed=2*Math.PI/180;
                birdOb.angle -= 20 * Math.PI / 180; 
                if(birdOb.angle <= -30*Math.PI/180)
                    birdOb.angle = -30*Math.PI/180;
            }
        else if (start)
            {
                birdOb.angle += rotSpeed; 
                rotSpeed += 0.0017;
                if(birdOb.angle >= 90*Math.PI/180)
                    birdOb.angle = 90*Math.PI/180;
            }

        if (clicked && !birdOb.dead && !over)
            {
                if(!start) start = true; // Start the game on first click
                birdOb.swing();
                birdOb.bounceSpeed = 6;
                clicked =false;
            }
        
        if(birdOb.Y - 12.5 + 30 >= 400)
            {
                birdOb.Y  = 400 +12.5 -30;
                touchGround = true;
                
                // Only play hit ground sound if not already dead and not won
                if(!birdOb.dead && !won && !birdOb.hitGroundPlayed)
                    {
                        birdOb.hitGroundSound.play();
                        birdOb.hitGroundPlayed = true;
                    }
                over = true;
            }
         for(n=1;n<5;n++)
        {
            var crash = false; 
            
                       
            if((birdOb.X-18 + 32 >= blockOb[n].X) &&
                (birdOb.X-18 +4 <= blockOb[n].X + 52) &&
                (birdOb.Y-12.5 +4 <= blockOb[n].topY + 320||
                birdOb.Y-12.5 +21 >= blockOb[n].botY))
                {
                    // Only play hit sound once and if not won
                    if(!birdOb.hitPlayed && !won)
                        {
                            birdOb.hitSound.play();
                            birdOb.hitPlayed = true;
                            birdOb.dead = true;
                        }
                    crash = true;
                    
                }
            if(!crash &&
                birdOb.X > blockOb[n].X + 26 & !blockOb[n].passed)
                {
                    // Play point sound and suppress other sounds
                    blockOb[n].passSound.play();
                    score++;
                    blockOb[n].passed = true;
                    
                    // Suppress wing sound temporarily
                    birdOb.suppressWingSound = true;
                    setTimeout(function() {
                        birdOb.suppressWingSound = false;
                    }, 200); // Suppress for 200ms
                }
            
            if (crash)
                {
                    over=true;
                }
            
        }
        
        
    }
    
    this.render = function()
    {
        ctx.drawImage(images["BGI"], 0,0);
        for (j = 1; j< 5; j++)
            {
                blockOb[j].drawBlock();
            }
        groundOb.drawGround();
        birdOb.drawBird();
        
        // Start screen
        if(!start)
            {
                // Draw start image covering whole screen
                ctx.drawImage(images["start"], 0, 0, canvas.width, canvas.height);
                
                // Happy Birthday text
                ctx.font = "bold 32px Impact";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.strokeStyle = "black";
                ctx.lineWidth = 4;
                ctx.strokeText("HAPPY BIRTHDAY", canvas.width/2, canvas.height/2 - 50);
                ctx.fillText("HAPPY BIRTHDAY", canvas.width/2, canvas.height/2 - 50);
                
                ctx.strokeText("ALIZA", canvas.width/2, canvas.height/2 - 10);
                ctx.fillText("ALIZA", canvas.width/2, canvas.height/2 - 10);
                
                // Flappy Aliza text
                ctx.font = "bold 28px Impact";
                ctx.lineWidth = 3;
                ctx.strokeText("Flappy Aliza", canvas.width/2, canvas.height/2 + 35);
                ctx.fillText("Flappy Aliza", canvas.width/2, canvas.height/2 + 35);
                
                // Click to start
                ctx.font = "20px Impact";
                ctx.strokeText("Click to start!", canvas.width/2, canvas.height/2 + 75);
                ctx.fillText("Click to start!", canvas.width/2, canvas.height/2 + 75);
            }
   
    
        ctx.font = "40px Impact ";
        ctx.textAlign = "center";
        ctx.fillStyle = "white";
        ctx.fillText(score,canvas.width/2, 100);
        
        // Win screen
        if(won)
        {
            // Draw aliza image covering whole screen
            ctx.drawImage(images["aliza"], 0, 0, canvas.width, canvas.height);
            
            ctx.font = "bold 35px Impact";
            ctx.textAlign = "center";
            ctx.fillStyle = "white";
            ctx.strokeStyle = "black";
            ctx.lineWidth = 4;
            ctx.strokeText("CONGRATULATIONS", canvas.width/2, canvas.height/2 - 20);
            ctx.fillText("CONGRATULATIONS", canvas.width/2, canvas.height/2 - 20);
            
            ctx.font = "bold 32px Impact";
            ctx.strokeText("YOU WON!", canvas.width/2, canvas.height/2 + 25);
            ctx.fillText("YOU WON!", canvas.width/2, canvas.height/2 + 25);
            
            ctx.font = "20px Impact";
            ctx.lineWidth = 3;
            ctx.strokeText("Click to restart!", canvas.width/2, canvas.height/2 + 65);
            ctx.fillText("Click to restart!", canvas.width/2, canvas.height/2 + 65);
        }
        // Game over screen (only if not won)
        else if(over && touchGround)
            {
                ctx.font = "40px Impact ";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.fillText("GAME OVER!", canvas.width/2, canvas.height/2);
                ctx.font = "20px Impact ";
                ctx.textAlign = "center";
                ctx.fillStyle = "white";
                ctx.fillText("Click to restart!",canvas.width/2, canvas.height/2 + 40);
            }
    }
    
    this.destroy = function()
    {
        
    }
}
