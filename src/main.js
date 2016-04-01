/**
 * binarymillenium
 * November-December 2010
 * GNU GPL v3
 *
 * 'w','a','s','d' to move.
 *
 * Art from http://opengameart.org/content/isometric-64x64-outside-tileset
 * Yar
 * CC-BY 3.0
 *
 * Changed: <simon@nekapuzer.at>, port to GameJs, Feb 2010
 *
 */

var gamejs = require('gamejs');
var Simplex = require('gamejs/math/noise').Simplex;
var Alea = require('gamejs/math/random').Alea;

var simplex = new Simplex(new Alea());
var idata = require('./imagedata');

// setup noise fn
var noise = function() {
   var r = Math.abs(simplex.get3d.apply(simplex, arguments));
   if (r < 0 || r > 1) console.log(r);
   return r;
}

function main() {
   var display = gamejs.display.getSurface();
   var [width, height] = display.getSize();
   idata.init();

   var ew_mv_size = 32;
   var ns_mv_size = 16;
   var maxmv = 32;
   function handleEvent(event) {

      if (event.type === gamejs.event.KEY_UP) {
         switch(event.key) {
            case gamejs.event.K_a:
               ew_mv_size -= 32;
               break;
            case gamejs.event.K_d:
               ew_mv_size += 32;
               break;
            case gamejs.event.K_w:
               ns_mv_size += 16;
               break;
            case gamejs.event.K_s:
               ns_mv_size -= 16;
               break;


         }
         if (ew_mv_size > maxmv) ew_mv_size = maxmv;
         if (ew_mv_size < -maxmv) ew_mv_size = -maxmv;
      }
      return;
   };

   var t = 0.0;
   var xoff = 0;
   var yoff = 0;
   var dec_ind_max = 0;
   var dec_ind_min = 100000;

   var MAX_HEIGHT=8;

   function getElevation(x_noise, y_noise) {
      var frac = 10.0;
      var elevation = parseInt(MAX_HEIGHT*noise(x_noise/frac+2000, y_noise/frac,t), 10);
      elevation -=4;

      if (elevation <0) elevation = 0;

      return elevation;
   };

   function draw(msDuration) {
      // the algo only works with steps of tile size (ew_mv_size, ns_mv_size)
      // so slow down or it's too fast for humans
      t += msDuration;
      if (t < 50) {
         return;
      }
      t = 0;

      display.clear();
      xoff += ew_mv_size;
      yoff -= ns_mv_size;

      var x_part = xoff % 32;
      var x_rnd  = xoff/32;

      var y_part = yoff % 16;
      var y_rnd  = yoff/16;
      //println(x_part);

      for (var i = 12; i>= -12/*-2; i < width/32+1*/; i--) {
         // diagonal down to right
         for (var j = -12; j <=12; j++) {
            var x =  j*32 - x_part;
            var y = -i*32 + y_part;

            var x_rot = x   - y/2 + width/2 + i*16 -32;
            var y_rot = x/2 + y   + height/2 + i*16 -16*3;

            var x_noise = (i + x_rnd);
            var y_noise = (j + y_rnd);

            var offset = 0;
            //////////////////////////////////////
            // get a random flat tile for base
            var frac = 9.0;
            // random(tiles.length);
            var tile_ind = offset +
               parseInt(((idata.tiles.length-offset) *
               3.0*noise( x_noise/frac, y_noise/frac,t))%(idata.tiles.length-offset), 10);

            if (tile_ind < 0) tile_ind = 0;
            if (idata.tiles[tile_ind] != null) {
               display.blit(idata.tiles[tile_ind], [x_rot, y_rot]);
            }
if (true) {
            ///////////////////////////////////////
            // raise the elevation
            var elevation = getElevation(x_noise,y_noise);

            var elev_factor = 32;
            // draw elev tiles upwards
            for (var k = 0; k < elevation; k++) {
               var nval =  3.0*noise( x_noise/frac,y_noise/frac, k/frac + t);
               var ind = parseInt((idata.elev.length * nval) % idata.elev.length);
               if (idata.elev[ind] != null) {
                  display.blit(idata.elev[ind], [x_rot, y_rot - k*elev_factor]);
               }
            }

            var is_slope = false;

            /// put a slope if neighboring tiles are elevated differently
            if (getElevation(x_noise+1,y_noise) > elevation) {
               display.blit(idata.slope[1], [x_rot, y_rot - elevation*elev_factor]);
               is_slope = true;
            } else if (getElevation(x_noise, y_noise-1) > elevation) {
               display.blit(idata.slope[2], [x_rot, y_rot - elevation*elev_factor]);
               is_slope = true;
            } else if (getElevation(x_noise-1,y_noise) > elevation) {
               display.blit(idata.slope[6], [x_rot, y_rot - elevation*elev_factor]);
               is_slope = true;
            } else if (getElevation(x_noise, y_noise+1) > elevation) {
               display.blit(idata.slope[5], [x_rot, y_rot - elevation*elev_factor]);
               is_slope = true;
            } else if (getElevation(x_noise+1,y_noise-1) > elevation) {
               /// directly above
               display.blit(idata.slope[0], [x_rot, y_rot - elevation*elev_factor]);
               is_slope = true;
            } else if (getElevation(x_noise+1,y_noise+1) > elevation) {
               ///
               display.blit(idata.slope[1], [x_rot, y_rot - elevation*elev_factor]);
               is_slope = true;
            } else if (getElevation(x_noise-1,y_noise-1) > elevation) {
               ///
               display.blit(idata.slope[4], [x_rot, y_rot - elevation*elev_factor]);
               is_slope = true;
            } else
               //////////////////////////
               /// now put a tree on it
               if ((!is_slope) && (noise( 500 + x_noise/frac, y_noise/frac,t) > 0.55)) {
                  frac = 11.0;

                  var nval =  3.0*noise( 100 + x_noise/frac,y_noise/frac,t);
                  var ind = 1+ parseInt(((idata.dec.length-1) * nval) % (idata.dec.length-1));
                  if (idata.dec[ind] != null) {
                     display.blit(idata.dec[ind],
                        [x_rot,
                        y_rot - (elevation-2)*elev_factor - idata.dec[ind].rect.height
                        ]
                     );
                  }

                  if (ind > dec_ind_max){
                     dec_ind_max = ind;
//                     console.log(idata.dec.length + " max " + ind + " " + nval);
                  }
                  if (ind < dec_ind_min){
                     dec_ind_min = ind;
//                     console.log(idata.dec.length + "  min " + ind + " " + nval);
                  }
               }
} // extra terrain

         } // j loop
      } // i loop
}



   gamejs.event.onEvent(handleEvent);

   gamejs.onTick(draw);
};


// preload & start
gamejs.preload(idata.tile_names);
gamejs.preload(idata.dec_names);
gamejs.preload(idata.elev_names);
gamejs.preload(idata.slope_names);
gamejs.ready(main);
