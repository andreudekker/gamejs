/**
 * A bare bones Sprite and sprite Group example.
 */
 
var gamejs = require('gamejs');

/**
 * The ship Sprite has a randomly rotated image und moves with random speed (upwards).
 */
var Ship = function(rect) {
   // call superconstructor
   Ship.superConstructor.apply(this, arguments);

   this.speed = 30 * Math.random();
   this.image = gamejs.transform.rotate(gamejs.image.load("images/ship.png"), parseInt(90*Math.random()));
   this.rect = new gamejs.Rect(rect);
   return this;
};
// inherit (actually: set prototype)
gamejs.utils.objects.extend(Ship, gamejs.sprite.Sprite);
Ship.prototype.update = function(msDuration) {
   // moveIp = move in place
   this.rect.moveIp(0, -1 * this.speed * (msDuration/1000));
};


function main() {
   // screen setup
   gamejs.display.setMode([800, 600]);
   gamejs.display.setCaption("Example Sprites");
   // create some ship sprites and put them in a group
   var ship = new Ship([100, 100]);
   var gShips = new gamejs.sprite.Group();
   for (var i=0; i<25; i++) {
      gShips.add(new Ship([10 + i*20, 500 + i*6]));
   }

   // game loop
   var mainSurface = gamejs.display.getSurface();
   // msDuration = time since last tick() call
   var tick = function(msDuration) {
         mainSurface.fill("#FFFFFF");
         // update and draw the ships
         gShips.update(msDuration);
         gShips.draw(mainSurface);
   };
   gamejs.time.fpsCallback(tick, this, 30);
}

/**
 * M A I N
 */
gamejs.preload(['images/ship.png']);
gamejs.ready(main);
