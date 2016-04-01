var gamejs = require('gamejs');

exports.dec_names = [
"images/dec/iso2_62.png",
"images/dec/iso2_63.png",
"images/dec/iso2_70.png",
"images/dec/iso2_71.png",
"images/dec/iso2_72.png",
"images/dec/iso2_73.png",
"images/dec/iso_110.png",
"images/dec/iso_111.png",
"images/dec/iso_112.png",
"images/dec/iso_113.png",
"images/dec/iso_114.png",
"images/dec/iso_115.png",
"images/dec/iso_116.png",
"images/dec/iso_117.png",
"images/dec/iso_118.png",
"images/dec/iso_119.png",
"images/dec/iso_120.png",
"images/dec/iso_121.png",
"images/dec/iso_124.png",
"images/dec/iso_125.png",
"images/dec/iso_126.png",
"images/dec/iso_127.png",
"images/dec/iso_128.png",
"images/dec/iso_129.png",
"images/dec/iso_66.png",
"images/dec/iso_67.png",
"images/dec/iso_68.png",
"images/dec/iso_69.png",
"images/dec/iso_70.png"
];

exports.elev_names = [
"images/elev/iso_34.png",
"images/elev/iso_54.png",
"images/elev/iso_55.png",
"images/elev/iso_60.png",
"images/elev/iso_61.png",
"images/elev/iso_62.png",
"images/elev/iso_63.png",
"images/elev/iso_64.png",
"images/elev/iso_65.png",
"images/elev/iso_71.png",
"images/elev/iso_72.png",
"images/elev/iso_73.png",
"images/elev/iso_74.png",
"images/elev/iso_75.png",
"images/elev/iso_76.png",
"images/elev/iso_77.png",
"images/elev/iso_78.png",
"images/elev/iso_79.png"
];

exports.slope_names = [
"images/slope/iso_30.png",
"images/slope/iso_31.png",
"images/slope/iso_32.png",
"images/slope/iso_33.png",
"images/slope/iso_35.png",
"images/slope/iso_36.png",
"images/slope/iso_37.png",
"images/slope/iso_38.png",
"images/slope/iso_40.png",
"images/slope/iso_41.png",
"images/slope/iso_42.png",
"images/slope/iso_43.png",
"images/slope/iso_50.png",
"images/slope/iso_51.png",
"images/slope/iso_52.png",
"images/slope/iso_53.png",
"images/slope/iso_56.png",
"images/slope/iso_57.png",
"images/slope/iso_58.png",
"images/slope/iso_59.png"
];

exports.tile_names = [
"images/tiles/iso_0.png",
"images/tiles/iso_1.png",
"images/tiles/iso_10.png",
"images/tiles/iso_11.png",
"images/tiles/iso_12.png",
"images/tiles/iso_13.png",
"images/tiles/iso_14.png",
"images/tiles/iso_15.png",
"images/tiles/iso_16.png",
"images/tiles/iso_17.png",
"images/tiles/iso_2.png",
"images/tiles/iso_20.png",
"images/tiles/iso_21.png",
"images/tiles/iso_22.png",
"images/tiles/iso_23.png",
"images/tiles/iso_3.png",
"images/tiles/iso_4.png",
"images/tiles/iso_5.png",
"images/tiles/iso_6.png"
];

exports.water_names = [
"images/water/iso_100.png",
"images/water/iso_101.png",
"images/water/iso_102.png",
"images/water/iso_80.png",
"images/water/iso_81.png",
"images/water/iso_82.png",
"images/water/iso_83.png",
"images/water/iso_84.png",
"images/water/iso_85.png",
"images/water/iso_86.png",
"images/water/iso_87.png",
"images/water/iso_88.png",
"images/water/iso_89.png",
"images/water/iso_90.png",
"images/water/iso_91.png",
"images/water/iso_92.png",
"images/water/iso_93.png",
"images/water/iso_94.png",
"images/water/iso_95.png",
"images/water/iso_96.png",
"images/water/iso_97.png",
"images/water/iso_98.png",
"images/water/iso_99.png"
];

function loadTiles(tiles) {
   return tiles.map(function(t) {
      return gamejs.image.load(t);
   });
};

exports.init = function() {
  this.tiles = loadTiles(this.tile_names);
  this.dec   = loadTiles(this.dec_names);
  this.elev  = loadTiles(this.elev_names);
  this.slope  = loadTiles(this.slope_names);
};
