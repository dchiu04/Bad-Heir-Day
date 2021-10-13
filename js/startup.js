//----Startup stuff
var canvas = document.getElementById("goodName");
var ctx = canvas.getContext("2d");
var imagesLoaded = 0;

function canvasSucks(imgsrc, sx, sy, swidth, sheight, x, y, width, height){
    "use strict";
    var image = new Image();
    image.onload = function(){
        ctx.drawImage(this, sx, sy, swidth, sheight, x, y, width, height);
        ++imagesLoaded;
        if(imagesLoaded === 39)
            document.getElementById("start").disabled = false;
    }
    image.src = imgsrc;
}

function gameEnd(){ //loads finish screen
	canvasSucks("images/endgame.png", 0, 0, 700, 500, 0, 0, 700, 500);
}


function loadThem(){ //they will be loaded
	canvasSucks("images/pain.png", 0, 0, 700, 500, 0, 0, 700, 500);
    canvasSucks("images/charlie-walk.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/chuck-bkwd.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/inventory.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/items.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/bg.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/cor.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/cor-mouse.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/kitchen.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/kitchen-alt.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/sink.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/trowel.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/librarybackground.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/computer.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/bookshelfL.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/bookshelfR.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/postcard.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/ec.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/book1.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/book2.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/photoalbum.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/librarydoor.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/diningroombackground.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/gardenbackground.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/gardendoor.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/soil.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/wateringcan.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/pot.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/seeds.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/photo.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/bread.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/water.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/breadwater.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/potgrowth1.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/midgardendoor.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/topgardendoor.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/gardenkey.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/fancykey.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/pitcher.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/dontlook.png", 0, 0, 1, 1, -2, -2, 1, 1);
    canvasSucks("images/secretRoom.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/scarecrow.png", 0, 0, 1, 1, -2, -2, 1, 1);
	canvasSucks("images/manypots.png", 0, 0, 1, 1, -2, -2, 1, 1);
	}