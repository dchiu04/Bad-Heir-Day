//global variabls
var canvas = document.getElementById("goodName");
var ctx = canvas.getContext("2d");
var dialogue = document.getElementById("dialogue");
var cycle;//walk cycle
var washCycle;//sink cycle
var direct;//way character is facing
var x;//character's position onscreen
var y;
var itemArray = Array(10);//items
var roomNo;//what room you're in
var mouseActivate;
var enigma;
var gardenArray = ["seeds", "soil", "wateringcan"];
var myFlower;
var flowerCounter = 0;
var growingFlower = false
var collected_letters = document.getElementById("collected_letters");
var collected_array = [];
var instructions = false;

/*itemArray Legend
key = 0
trowel = 1
cheese = 2
bread = 3
pitcher = 4
fancy key = 5
soil = 6
seed = 7
watering can = 8
garden key = 9
*/

/**start
 * Resets initial values to their defaults and draws the lobby,
 */
function start(){
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear beginning screen
    dialogue.innerHTML = ' ';
    collected_array = [];
    collected_letters.innerHTML = 'Collected Letters: ';
    roomNo = 0;
    cycle = 0;
    washCycle = 0;
    direct = "right";
    mouseActivate = false;
    enigma = "sealed";
    instructions = false;
    x = 0;
    y = 255;
    for (var i = 0; i<itemArray.length; i++){
        itemArray[i]=false;
    }
    if (!instructions) {
        instructions = true;
        addText(dialogue, "You've been locked inside an abandoned house by your friends! Find a way out!");
    }

	gardenArray = ["seeds", "soil", "wateringcan"];
	growingFlower = false;
	flowerCounter = 0;
    
    drawLobby(ctx, x, y);
}

/**drawLobby
 * Main lobby denoted as room 0.
 * @param {*} ctx Context that is used to draw
 * @param {*} x Character's x coordinate
 * @param {*} y Character's y coordinate
 */
function drawLobby(ctx, x, y){
    roomNo = 0;
    var wall = new Image();
    wall.src = "images/bg.png";
    ctx.drawImage(wall, 0, 0, 700, 500, 0, 0, 700, 500);
    
    drawChar(ctx, x, y);
    inventory();
}

/**drawCorridor
 * Corridor denoted as room 1.
 * @param {*} ctx Context that is used to draw
 * @param {*} x Character's x coordinate
 * @param {*} y Character's y coordinate
 */
function drawCorridor(ctx, x, y){
    roomNo = 1;
    
    if(mouseActivate == true){
        var corridor = new Image();
        corridor.src = "images/cor.png";
        ctx.drawImage(corridor, 0, 0, 700, 500, 0, 0, 700, 500);
    }else{
        var corridor = new Image();
        corridor.src = "images/cor-mouse.png";
        ctx.drawImage(corridor, 0, 0, 700, 500, 0, 0, 700, 500);
    }
    
    drawChar(ctx, x, y);
    inventory();
}

/**drawKitchen
 * Kitchen denoted as room 2.
 * @param {*} ctx Context that is used to draw
 * @param {*} x Character's x coordinate
 * @param {*} y Character's y coordinate
 */
function drawKitchen(ctx, x, y){
    roomNo = 2;
    
    var sink = new Image();
    sink.src = "images/sink.png";
    var trowel = new Image();
    trowel.src = "images/trowel.png";
    
    if(itemArray[3]==false){
        var kit = new Image();
        kit.src = "images/kitchen.png";
        ctx.drawImage(kit, 0, 0, 700, 500, 0, 0, 700, 500);
    }else if (itemArray[3]==true){
        var kit = new Image();
        kit.src = "images/kitchen-alt.png";
        ctx.drawImage(kit, 0, 0, 700, 500, 0, 0, 700, 500);
    }else{
        var kit = new Image();
        kit.src = "images/kitchen-alt.png";
        ctx.drawImage(kit, 0, 0, 700, 500, 0, 0, 700, 500);
    }
    
    ctx.drawImage(sink, washCycle*224, 0, 220, 220, 580, 275, 220, 220);
        washCycle = (washCycle + 1) % 4;
    
    if(itemArray[1] == false)
        ctx.drawImage(trowel, 640, 0, 160, 160, 590, 283, 160, 160);
    
    drawChar(ctx, x, y);
    inventory();
}

/**drawDining
 * Dining room denoted as room 3.
 * @param {*} ctx Context that is used to draw
 * @param {*} x Character's x coordinate
 * @param {*} y Character's y coordinate
 */
function drawDining(ctx, x, y){
    roomNo = 3; 
    
    var diningBackground = new Image();
    diningBackground.src = "images/diningroombackground.png";
    var pitcher = new Image();
    pitcher.src = "images/pitcher.png";
    var food = new Image();
	food.src = "images/bread.png";
	var drink = new Image();
	drink.src = "images/water.png";
	var meal = new Image();
	meal.src = "images/breadwater.png";
    
    if((itemArray[3]=="complete")&&(itemArray[4]=="complete")){
        ctx.drawImage(meal, 0, 0, 700, 500, 0, 0, 700, 500);
    }else if ((itemArray[3]!=="done")&&(itemArray[4]!=="done")){
        ctx.drawImage(diningBackground, 0, 0, 700, 500, 0, 0, 700, 500);
    }else if ((itemArray[3]=="done")&&(itemArray[4]!=="done")){
        ctx.drawImage(food, 0, 0, 700, 500, 0, 0, 700, 500);
    }else if ((itemArray[3]!=="done")&&(itemArray[4]=="done")){
        ctx.drawImage(drink, 0, 0, 700, 500, 0, 0, 700, 500);
    }else if((itemArray[3]=="done")&&(itemArray[4]=="done")){
        ctx.drawImage(meal, 0, 0, 700, 500, 0, 0, 700, 500);
    }
    
    if (itemArray[4]==false){
        ctx.drawImage(pitcher, 0, 0, 160, 160, 80, 278, 100, 100);
    }
        
    drawChar(ctx, x, y);
    inventory();
}

/**drawLibrary
 * Library denoted as room 4.
 * @param {*} ctx Context that is used to draw
 * @param {*} x Character's x coordinate
 * @param {*} y Character's y coordinate
 */
function drawLibrary(ctx, x, y){
    roomNo = 4;
    
    var libraryBackground = new Image();
    libraryBackground.src = "images/librarybackground.png";
    ctx.drawImage(libraryBackground, 0, 0, 1025, 1027, 0, 0, 700, 500);
	
	var compTerm = new Image();
    compTerm.src = "images/computer.png";
    ctx.drawImage(compTerm, 0, 0, 1025, 1027, 413, 270, 340, 290);
	
    var bookShelfL = new Image();
	bookShelfL.src = "images/bookshelfL.png"
	ctx.drawImage(bookShelfL, 0, 0, 1025, 1027, -150, 130, 400, 300);
    
	
    var bookShelfR = new Image();
	bookShelfR.src = "images/bookshelfR.png"
	ctx.drawImage(bookShelfR, 0, 0, 1025, 1027, 200, 130, 400, 300);
    
	var postCard = new Image();
	postCard.src = "images/postcard.png"
	ctx.drawImage(postCard, 0, 0, 1025, 1027, 195, 350, 80, 70);
	
	var eC = new Image();
	eC.src = "images/ec.png";
	ctx.drawImage(eC, 0, 0, 512, 512, 145, 213, 75, 63);
	
	var b1 = new Image();
	b1.src = "images/book1.png";
	ctx.drawImage(b1, 0, 0, 1024, 1024, 80, 270, 75, 63);
	
	var b2 = new Image();
	b2.src = "images/book2.png";
	ctx.drawImage(b2, 0, 0, 1024, 1024, 290, 213, 75, 63);
	
	var pAlbum = new Image();
	pAlbum.src = "images/photoalbum.png";
	ctx.drawImage(pAlbum, 0, 0, 1024, 1024, 333, 268, 75, 63);
	
	var libraryDoor = new Image();
	libraryDoor.src = "images/librarydoor.png";
	ctx.drawImage(libraryDoor, 0, 0, 1024, 1024, 560, 218, 200, 200);
	
	var gardenDoor = new Image();
	gardenDoor.src = "images/gardendoor.png";
	ctx.drawImage(gardenDoor, 0, 0, 1024, 1024, -105, 218, 200, 200); 
	
	var midGardenDoor = new Image();
	midGardenDoor.src = "images/midgardendoor.png";
	ctx.drawImage(midGardenDoor, 0, 0, 1024, 1024, -105, 100, 200, 200); 
	
	var topGardenDoor = new Image();
	topGardenDoor.src = "images/topgardendoor.png";
	ctx.drawImage(topGardenDoor, 0, 0, 1024, 1024, -105, -35, 200, 200);
    
    drawChar(ctx, x, y);
    inventory();
}

/**drawGarden
 * Dining room denoted as room 5.
 * @param {*} ctx Context that is used to draw
 * @param {*} x Character's x coordinate
 * @param {*} y Character's y coordinate
 */
function drawGarden(ctx, x, y){
    roomNo = 5;
    
    var seed = new Image();
	seed.src = "images/seeds.png";
	var soil = new Image();
	soil.src = "images/soil.png";
	var wc = new Image();
	wc.src = "images/wateringcan.png";
	
	if (checkItem("seeds", gardenArray)){
		seed.onload = function(){
			ctx.drawImage(seed, 0, 0, 1600, 1600, 530, 220, 100, 100);
		}
	}
	
	if (checkItem("soil", gardenArray)){
		soil.onload = function(){
			ctx.drawImage(soil, 0, 0, 1025, 1027, 400, 290, 120, 120);
		}
	}

	if (checkItem("wateringcan", gardenArray)){
		wc.onload = function(){
			ctx.drawImage(wc, 0, 0, 1025, 1027, 100, 330, 75, 75);
		}
	}
	
	var gardenBackground = new Image();
    gardenBackground.src = "images/gardenbackground.png";
    ctx.drawImage(gardenBackground, 0, 0, 1025, 1027, 0, 0, 700, 500);
	
	var scare = new Image();
	scare.src = "images/scarecrow.png";
	ctx.drawImage(scare, 0, 0, 1024, 1024, 250, 230, 200, 200);
	
	var manypots = new Image();
	manypots.src = "images/manypots.png";
	ctx.drawImage(manypots, 0, 0, 1024, 1024, 435, 198, 100, 100);
	
	var gardenDoor = new Image();
    gardenDoor.src = "images/gardendoor.png";
    ctx.drawImage(gardenDoor, 0, 0, 1024, 1024, 560, 218, 200, 200); 
	

	var midGardenDoor = new Image();
	midGardenDoor.src = "images/midgardendoor.png";
	ctx.drawImage(midGardenDoor, 0, 0, 1024, 1024, 560, 100, 200, 200); 
	
	var topGardenDoor = new Image();
	topGardenDoor.src = "images/topgardendoor.png";
	ctx.drawImage(topGardenDoor, 0, 0, 1024, 1024, 560, -35, 200, 200); 
	
	var fp = new Image();
    fp.src = "images/pot.png";
    ctx.drawImage(fp, 0, 0, 1600, 1600, 190, 290, 150, 140);
	
	if(flowerCounter == 7){
		var flowergrown = new Image();
		flowergrown.src = "images/potgrowth7.png";
		ctx.drawImage(flowergrown, 0, 0, 1600, 1600, 190, 290, 150, 140);
	}
    
    drawChar(ctx, x, y);
    inventory();
}

/**drawMystery
 * Hidden room denoted as room 6.
 * @param {*} ctx Context that is used to draw
 * @param {*} x Character's x coordinate
 * @param {*} y Character's y coordinate
 */
function drawMystery(ctx, x, y){
    roomNo = 6;
    
    var bunk = new Image();
    bunk.src = "images/dontlook.png";
    ctx.drawImage(bunk, 0, 0, 700, 500, 0, 0, 700, 500);
    
    var erin = new Image();
    erin.src = "images/secretRoom.png";
    ctx.drawImage(erin, 0, 0, 192, 192, 80, 235, 192, 192);
    
    var debby = new Image();
    debby.src = "images/secretRoom.png";
    ctx.drawImage(debby, 192, 0, 192, 192, 150, 235, 192, 192);
    
    drawChar(ctx, x, y);
    inventory();
}

/**drawChar
 * Draws and animates the character when arrow keys left and right are pressed.
 * @param {*} ctx Context that is used to draw
 * @param {*} x Character's x coordinate
 * @param {*} y Character's y coordinate
 */
function drawChar(ctx, x, y){
    var spriteW = spriteH = 160;
    if (direct=="right"){ //walking right
        ctx.save();
        var char = new Image();
        char.src = "images/charlie-walk.png";
            ctx.drawImage(char, cycle*spriteW, 0, spriteW, spriteH, x, y, spriteW, spriteH);
            cycle = (cycle + 1) % 5;
        ctx.restore();
    }else if(direct=="left"){ //walking left
        ctx.save();
        var char = new Image();
        char.src = "images/chuck-bkwd.png";
            ctx.drawImage(char, cycle*spriteW, 0, spriteW, spriteH, x, y, spriteW, spriteH);
            cycle = (cycle + 1) % 5;
        ctx.restore();
    }
}

/**checkItem
 * Checks the inventory array and returns true or false depending on if the item is in the inventory
 * @param {*} item A string denoting an item necessary for puzzles
 * @param {*} array Keeps track of the character's inventory
 * @returns 
 */
function checkItem(item, array){
    for(var i = 0; i < array.length; i++){
        if(array[i] == item){
            return true;
        }
    }	
        return false;
}

/**inventory
 * Draws the inventory based on the inventory array.
 */
function inventory(){
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 430, 700, 80);
    ctx.restore();
    ctx.save();
    var itemX = 20;
    
    var fKey = new Image();
    fKey.src = "images/fancykey.png";
    
    var gKey = new Image();
    gKey.src = "images/gardenkey.png";
    
    var item = new Image();
    item.src = "images/items.png";
    
    for(var i = 0; i<itemArray.length; i++){
        if(itemArray[i]==true){
            ctx.drawImage(item, i*160, 0, 160, 160, itemX, 450, 160, 160);
            itemX += 67;
        }else if(itemArray[i]=="full"){
            ctx.drawImage(item, 1600, 0, 160, 160, itemX, 450, 160, 160);
            itemX += 67;
        }else if(itemArray[i]=="fKey"){
            ctx.drawImage(fKey, 0, 0, 96, 96, itemX, 430, 70, 70);
            itemX += 67;
        }else if (itemArray[i]=="gKey"){
            ctx.drawImage(gKey, 0, 0, 96, 96, itemX, 430, 70, 70);
            itemX += 67;
        }
    }
    
    var inventorySprite = new Image();
    inventorySprite.src = "images/inventory.png";
    ctx.drawImage(inventorySprite, 0, 0, 160, 160, 640, 435, 160, 160);
}

/**move
 * Switches character's current location and draws the corresponding room.
 * @param {*} xChange Character's new x coordinate
 * @param {*} yChange Character's new y coordinate
 */
function move(xChange, yChange){
    x = x + xChange;
    y = y + yChange;
    if (x>560){
        x = 560;
        if (roomNo == 0){
            drawLobby(ctx, x, y);
        }else if (roomNo == 1){
            drawCorridor(ctx, x, y);
        }else if (roomNo == 2){
            drawKitchen(ctx, x, y);
        }else if (roomNo == 3){
            drawDining(ctx, x, y);
        }else if (roomNo == 4){
            drawLibrary(ctx, x, y);
        }else if (roomNo == 5){
            drawGarden(ctx, x, y);
        }else if (roomNo == 6){
            drawMystery(ctx, x, y);
        }
    }else if (x<-20){
        x = -20;
        if (roomNo == 0){
            drawLobby(ctx, x, y);
        }else if (roomNo == 1){
            drawCorridor(ctx, x, y);
        }else if (roomNo == 2){
            drawKitchen(ctx, x, y);
        }else if (roomNo == 3){
            drawDining(ctx, x, y);
        }else if (roomNo == 4){
            drawLibrary(ctx, x, y);
        }else if (roomNo == 5){
            drawGarden(ctx, x, y);
        }else if (roomNo == 6){
            drawMystery(ctx, x, y);
        }
    }else{
        if (roomNo == 0){
            drawLobby(ctx, x, y);
        }else if (roomNo == 1){
            drawCorridor(ctx, x, y);
        }else if (roomNo == 2){
            drawKitchen(ctx, x, y);
        }else if (roomNo == 3){
            drawDining(ctx, x, y);
        }else if (roomNo == 4){
            drawLibrary(ctx, x, y);
        }else if (roomNo == 5){
            drawGarden(ctx, x, y);
        }else if (roomNo == 6){
            drawMystery(ctx, x, y);
        }
    }
}

/**investigate
 * Main function keeping track of all interactions in the game. Used when the 'up' arrow key is pressed on specific items/areas.
 */
function investigate(){
    if (roomNo == 0){ //lobby
        if (x == 560){ //if you're at the end of the room
            if (itemArray[0] == false){//no key
                addText(dialogue, "It's locked.");
                 
            }else if((itemArray[0] == true)||(itemArray[0]=="complete")){//have key
                itemArray[0]="complete";
                x = 0;//start at left side
                cycle = 0;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawCorridor(ctx, x, y);
				addText(dialogue, "Entered Corridor.");
                 
            }
        }else if((310 < x)&&(x < 360)){//in front of doll
            addText(dialogue, "Poor doll got abandoned here. It has an L on its dress.")
            if (!has_letter(collected_array, "L")) {
                collected_array.push("L");
                collected_letters.innerHTML += "L ";
            }
        
        }else if ((480 < x)&&(x < 540)){//in front of lamp
            if (itemArray[0] == false){
                itemArray[0] = true;
                cycle=0;
                addText(dialogue, "I think I can move this lamp around... A key fell out!");
                 
                drawLobby(ctx, x, y);
            }else{
                addText(dialogue, "There was a key here, but it's gone now.");
             

            }
        }else if ((370 < x)&&(x < 430)){//in front of lady's picture
            addText(dialogue, "Painting of a lady. Nothing suspicious about it.");
             
        }else if ((60 < x)&&(x < 140)){
            addText(dialogue, "Painting of a man. Nothing suspicious about it.");
             
        }else if ((210 < x)&&(x < 280)){
            addText(dialogue, "Spooky.");
             
        }else if (x == -20){
            addText(dialogue, "It's well and truly locked. Thanks guys.");
             
        }
        
    }else if (roomNo == 1){ //corridor
        if (x == -20){
            direct = "left";
            x = 560;
            cycle = 0; 
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawLobby(ctx, x, y);
			addText(dialogue, "Entered Lobby.");
             
        }else if ((350 < x)&&(x < 400)){//mouse
            if (itemArray[2]==true){//have cheese
                mouseActivate = true;
                cycle = 0;
                addText(dialogue, "The mouse ran off with the cheese! Sounds like it pushed something around in there. Maybe I should try the door.<br>It looks like it was sitting on the letter R. Weird.");
                 
                if (!has_letter(collected_array, "R")) {
                    collected_array.push("R");
                    collected_letters.innerHTML += "R ";
                }
                drawCorridor(ctx, x, y);
                itemArray[2]="nothing";
            }else if (itemArray[2]==false){
                addText(dialogue, "A hungry-looking mouse. Want to help me out little guy?");
                 
            }else if (itemArray[2]=="nothing"){
                addText(dialogue, "The mouse is gone.");
                 
            }
                
        }else if ((30 < x)&&(x < 120)){//sturdy door
            if (enigma == "sealed"){
                addText(dialogue, "This door looks pretty sturdy. I don't see any way of unlocking it from here.");
                 
            }else if (enigma == "unlock"){
                roomNo = 6;
                cycle = 0;
                x = 560;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawMystery(ctx, x, y);
                addText(dialogue,  "What in the world did I wander into.");
                 
            }
        }else if ((250 < x)&&(x < 330)){//bolted door
            if (itemArray[5]==false){
                addText(dialogue, "The door's locked.");
                 
            }else{
                roomNo = 4; //library
                x = 560;//start at right side
                direct="left";
                cycle = 0;
                itemArray[5]="complete";
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawLibrary(ctx, x, y);
				addText(dialogue,  "Entered Library.");
                 
            }
        }else if ((440 < x)&&(x < 530)){//fancy door
            if (mouseActivate == false){
                addText(dialogue,  "The door's locked.");
                 
            }else{
                x = 560;//start at right side
                direct="left";
                cycle = 0;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawDining(ctx, x, y);
				addText(dialogue,  "Entered Dining Room.");
                 
            }
        }else if (x == 560){//kitchen door
            x = 0;
            cycle = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawKitchen(ctx, x, y);
			addText(dialogue,  "Entered Kitchen.");
             
        }
        
    }else if (roomNo == 2){ //kitchen
        if(x==-20){//door out of kitchen
            x = 560;
            direct = "left";
            cycle = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCorridor(ctx, x, y);
			addText(dialogue,  "Entered Corridor.");
             
        }else if ((70 < x)&&(x < 120)){//garbage can
            addText(dialogue, "There’s a crumpled up piece of paper inside. It’s got some writing on it, but it’s all scribbled out. The only thing I can make out is an A.");
             
            if (!has_letter(collected_array, "A")) {
                collected_array.push("A");
                collected_letters.innerHTML += "A ";
            }
        }else if ((260 < x)&&(x < 350)){//fridge
            if(itemArray[2]==false){//no cheese
                cycle=0;
                addText(dialogue, "Let’s see if there’s anything good in the fridge...<br>Yeah, didn’t think so. This cheese might come in handy though.");
                 
                itemArray[2]=true;//get cheese
                drawKitchen(ctx, x, y);
            }else{
                if(itemArray[3]==false){//no bread
                    cycle=0;
                    addText(dialogue, "There's a loaf of bread on top. It's as hard as a rock... maybe I can use it as a weapon.");
                     
                    itemArray[3]=true;//get bread
                    drawKitchen(ctx, x, y);
					
                }else{
                    addText(dialogue, "Just a lonely fridge.");
                     
                }
            }
        }else if ((490 < x)&&(x < 560)){//sink
            if(itemArray[1]==false){//no trowel
                cycle=0;
                addText(dialogue, "There's a rusty trowel on the sink... Maybe someone was trying to wash it?<br>Better take it with me.");
                 
                itemArray[1]=true;//get trowel
                drawKitchen(ctx, x, y);
            }else if (itemArray[4]==false){//no pitcher
                addText(dialogue, "Looks like I'll need some kind of container if I want to carry this water around.");
                 
            }else if (itemArray[4]==true){//have pitcher
                addText(dialogue, "The pitcher's full of water now.");
                 
                itemArray[4]="full";
                inventory();
            }else if ((itemArray[4]=="full")||(itemArray[4]=="done")){//have water
                addText(dialogue, "Someone really needs to fix that leak.");
                 
            }
        }else if(370<x && x<490){//---stove
            addText(dialogue,  "A stove! It's empty.");
             
        }else if(150<x && x<210){//clock
            addText(dialogue,  "The clock's broken. It's a good thing I know the time right now: time to get a new clock.");
             
        }
        
    }else if (roomNo == 3){ //dining room
        if(x == 560){
			roomNo = 1;
			direction: "right";
			x = 500;
			cycle = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawCorridor(ctx, x, y);
			addText(dialogue,  "Entered Corridor.");
             
		}
		if((320<x)&&(x<380)){
            if((itemArray[3]=="done")&&(itemArray[4]=="done")){ //wine glass with water inside
                addText(dialogue,  "Sounds like something fell under the table! It's a key, and it looks pretty regal.");
                 
                itemArray[5]="fKey";
                itemArray[3]=itemArray[4]="complete";
                inventory();
            }else if(itemArray[3]==false){
			    addText(dialogue,  "A glass plate with nothing on it.");
                 
            }else if (itemArray[3]==true){
                addText(dialogue,  "A glass plate with bread on it.");
                 
                cycle = 0;
                itemArray[3]="done";
                drawDining(ctx, x, y);
            }else if ((itemArray[3]=="done")||(itemArray[3]=="complete")){
                addText(dialogue,  "Anyone who tries to eat this bread is going to chip a tooth.");
                 
            }
        }
        if((200<x)&&(x<320)){
            addText(dialogue,  "There's a little plaque on the painting that says ''Funyarinpa''. The ''i'' is in red."); //art on wall
             
            if (!has_letter(collected_array, "I")) {
                collected_array.push("I");
                collected_letters.innerHTML += "I ";
            }
        }
        if((150<x)&&(x<200)){
            if((itemArray[3]=="done")&&(itemArray[4]=="done")){
                addText(dialogue,  "Sounds like something fell under the table! It's a key, and it looks pretty regal.");
                 
                itemArray[5]="fKey";
                itemArray[3]=itemArray[4]="complete";
                inventory();
            }else if(itemArray[4]==false||itemArray[4]==true){
			    addText(dialogue,  "An empty wine glass.");
                 
            }else if (itemArray[4]=="full"){
                addText(dialogue,  "A wine glass full of water.");
                 
                cycle = 0;
                itemArray[4]="done";
                drawDining(ctx, x, y);
            }else if((itemArray[4]=="done")||(itemArray[4]=="complete")){
                addText(dialogue,  "The water's super dirty.");
                 
            }
        }else if ((0<x)&&(x<100)){
            if(itemArray[4]==false){
                itemArray[4]=true;
                addText(dialogue,  "The picture of the perfect pitcher.");
                 
                drawDining(ctx, x, y);
            }
        }
            
		}else if (roomNo == 4){ //library
        if (x == 560){ //if you're at the start of the library
            roomNo = 1;//enter corridor
            x = 289;//start from bolted door in corridor
            cycle = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCorridor(ctx, x, y);
            addText(dialogue,  "Entered Corridor.");
		}
		if((380<x) && (x<480) && checkItem("gardenkey", itemArray) == false){ //computer terminal location and puzzle trigger
			addText(dialogue,  "A computer terminal. It's asking for a password. It also says 'When correct, the next door will unlock.'");
        
			var answer = libraryPuzzle();   
            
            if (answer == true){
				itemArray.push("gardenkey");
                itemArray[9]="gKey";
				addText(dialogue,  "Password accepted. Door to garden is now unlocked.");
                 
                inventory();
			 }else if (answer == false){
                addText(dialogue,  "'Access denied'. I guess I have to look around a bit more. Maybe I need to unscramble the letters I've been seeing?");
                 
            }else if (answer == "unlock"){
                addText(dialogue, "The floor started rumbling... Did something unlock?!");    
                    
             }
            
		}else if((370<x)&&(x<490) && checkItem("gardenkey", itemArray) == true){ //computer terminal location and puzzle correct
				addText(dialogue, "Charlie? That's <i>my</i> name! I guess it's not that uncommon of a name though...");
                 
			}
			if(x==290){ //photo album
					var photo = new Image(); //pop up a canvas of photos
					photo.src = "images/photo.png";
					ctx.drawImage(photo, 0, 0, 1025, 1027, 0, 0, 700, 500);
					addText(dialogue, "A photo album, emblazened with a 'C'. They seem oddly familiar. <i>Too</i> familiar.");
                     
                    if (!has_letter(collected_array, "C")) {
                        collected_array.push("C");
                        collected_letters.innerHTML += "C ";
                    }
			}if(x == 240 || x == 230){ //book 2
					addText(dialogue, "Comic books, magazines, nothing suspicious.");
                     
				}if((130<x) && (x<160)){ //postcards
					addText(dialogue, "Some postcards from 20 years ago. Let's see here: 'Hey Tommy, how've you been? Anyway I was wondering if I could borrow some cash. Cheers, your friend Ben.' No wonder these are on the ground.");
                     
                }if((80<=x) && (x<=100)){ //encyclopedia
					addText(dialogue, "An encyclopedia. All the pages are missing except 'Name' and 'Heir'. Who takes the time to rip out everything from an encyclopedia?<br>The letters 'H' and 'E' are highlighted. Maybe they're important?");
                     
                    if (!has_letter(collected_array, "H") && !has_letter(collected_array, "E")) {
                        collected_array.push("H");
                        collected_array.push("E");
                        collected_letters.innerHTML += "H E ";
                    }
				}if((x == 30) || (x == 40)){ //book1
					addText(dialogue, "Family trees. It looks worse for wear.");
                     
				}if(x == -20 && checkItem("gardenkey" , itemArray) == true){ // library to garden door conditions if(gardenkey is in array), open
					roomNo = 5;
					direction = "right";
					x = 560;
                    itemArray[9] = "complete";
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
					drawGarden(ctx, x, y);
					addText(dialogue, "Entered Garden.");
                     
			     }else if(x == -20){
				    addText(dialogue, "Door won't budge.");
                     
			}
    }else if (roomNo == 5){ //garden
        if(x == 560){ //garden to library
			roomNo = 4;
			direction: "left";
			x = -20;
			cycle = 0;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
			drawLibrary(ctx, x, y);
			addText(dialogue, "Entered Library.");
             
		}
		if((460<x)&&(x<500) && checkItem("seeds", itemArray) == false){
			itemArray.push("seeds");
			 for(var i = 0; i < gardenArray.length; i++){
				 if(gardenArray[i] == "seeds"){
					gardenArray.splice([i], 1); //remove seeds from array
                    itemArray[7] = true;
				 }
			}
			roomNo = 5;
			drawGarden(ctx, x, y);
			addText(dialogue, "Some sorta seeds. I guess it's time to put my 'Harvest Mün' skills to action.");
             
		}
		if(340<x && x<420){
            if(checkItem("soil", itemArray) == false && itemArray[1]==true){ //Soil
			 itemArray.push("soil");
			 for(var i = 0; i < gardenArray.length; i++){
				if(gardenArray[i] == "soil"){
					gardenArray.splice([i], 1); //remove soil from array
                }
			}
            itemArray[1]="complete";
            itemArray[6]=true;
            cycle=0;
            drawGarden(ctx, x, y);
			addText(dialogue, "FREE DIRT?! Put me in coach.");
             
        }else if(checkItem("soil", itemArray) == true && itemArray[1] == false){
            addText(dialogue, "I'm not going to put this dirt directly into my pockets! I'm going to need something to carry it in.");
             
        }else if(checkItem("soil", itemArray) == true && itemArray[1] == true){
			addText(dialogue, "Such filthy dirt."); 
		} 
		
	}
		if(250<x && x<310){
			addText(dialogue, "The most non-threatening scarecrow ever.");
		}
		if(20<x && x<90 && checkItem("wateringcan", itemArray) == false){ //wateringcan 
			itemArray.push("wateringcan");
			for(var i = 0; i < gardenArray.length; i++){
				 if(gardenArray[i] == "wateringcan"){
					gardenArray.splice([i], 1); //remove wateringcan from array
				 }
			}
            itemArray[8]=true;
			drawGarden(ctx, x, y);
			addText(dialogue, "It can't be... the source of all life is just in front of me for the taking? Well don't mind if I do.");  
		}
		if(150<x && x<210 && checkItem("soil", itemArray) && checkItem("seeds", itemArray) && checkItem("wateringcan", itemArray) && growingFlower == false){ //flower pot, if all 3 items are in inventory flower grows
            itemArray[6]=itemArray[7]=itemArray[8]="complete";
            inventory();
			addText(dialogue, "My plant just went from dirt to adulthood in the blink of an eye... They grow up so fast -sniff-.");
			growingFlower = true;
			myFlower = setInterval(function(){
				flowerCounter++;
				var potgrowth = new Image()
				potgrowth.src = "images/potgrowth" + flowerCounter + ".png"
				potgrowth.onload = function(){
					ctx.drawImage(potgrowth, 0, 0, 1600, 1600, 190, 290, 150, 140);
				}
				if (flowerCounter == 7){
					clearInterval(myFlower);
				}
			},1000 );
			
		}
		if(150<x && x<210 && checkItem("soil", itemArray) && checkItem("seeds", itemArray) && checkItem("wateringcan", itemArray) && flowerCounter == 7){
			addText(dialogue, "Isn't that the most beautiful flower? Of course it is. It also unlocked that door so leggo.");
             
		}
		if(150<x && x<210 && checkItem("soil", itemArray) == false && checkItem("wateringcan", itemArray) == false && checkItem("seeds", itemArray) == false){ 	
			addText(dialogue, "An empty flower pot. I could probably plant something in this.");
             
		}
		if(150<x && x<210 && checkItem("soil", itemArray) && checkItem("wateringcan", itemArray) == false && checkItem("seeds", itemArray) == false){
			addText(dialogue, "Dirt + flower pot... Hmmm, I can't help but feel like I'm still missing something.");
             
		}
		if(150<x && x<210 && checkItem("seeds", itemArray) && checkItem("wateringcan", itemArray) == false && checkItem("soil", itemArray) == false){
			addText(dialogue, "Can't do much with just seeds and a flower pot. Let's gather more things first.");
             
		}
		if(150<x && x<210 && checkItem("wateringcan", itemArray) && checkItem("seeds", itemArray) == false && checkItem("soil", itemArray) == false){
			addText(dialogue, "Well, I've made the flower pot wet now. I think I'm still missing something.");
             
		}
		if(150<x && x<210 && checkItem("soil", itemArray) && checkItem("seeds", itemArray)&& checkItem("wateringcan", itemArray) == false){
			addText(dialogue, "I'm still missing something wet.... Like a liquid... Like something that sounds like 'Woh-ter'.");
             
		}
		if(150<x && x<210 && checkItem("wateringcan", itemArray) && checkItem("seeds", itemArray) && checkItem("soil", itemArray) == false){
			addText(dialogue, "Water and seeds... Water and seeds.... What else am I missing??");	
             
		}
		if(150<x && x<210 && checkItem("wateringcan", itemArray) && checkItem("soil", itemArray) && checkItem("seeds", itemArray) == false){
			addText(dialogue, "According to my calculations, if I use mother Earth as a base, and add some H20 I should get some muddy dirt. Muddy dirt is awesome because you can make dirt pies with it and who doesn't like dirt pies? But based on pure conjecture, I think I'm still missing the final touch.");
        }
		
		if(x == -20 && roomNo == 5 && flowerCounter == 7){ //gate
			addText(dialogue, "Press START to play again."); //finish game
            instructions = false;
            collected_array = [];
            collected_letters.innerHTML = ' ';
            dialogue.innerHTML = ' ';
			gameEnd();
           
			//start();

		}else if(x == -20){
			addText(dialogue,  "No go, the gate's stuck.");
		}
    }else if (roomNo == 6){
        if ((90<=x)&&(x<=115)){//erin
            addText(dialogue, "E???: Hey man, you're really not supposed to be here. We're <i>suuuper</i> busy bug testing right now. It wasn't really a well thought-out plan though; we're just avatars, we can't do anything.");
        }else if(150<x && x<=195){//debby
            addText(dialogue, "D????: You found us! This route is arguably the harder one so great job and go finish the game!!!");

        }else if(x==560){//door
            x=90;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCorridor(ctx, x, y);
			addText(dialogue, "Entered Corridor.");
        }
    }
}

//all game controls
addEventListener("keydown", function(event){
    if(event.keyCode == 39){ //right arrow
        direct = "right";
        move(10, 0);
    }else if (event.keyCode == 37){ //left arrow
        direct = "left";
        move(-10, 0);
    }else if (event.keyCode == 38){ //up arrow
        investigate();
    }
});

/**libraryPuzzle
 * User must guess the correct password to move onto the next room.
 * @returns true when password is correctly inputted, false otherwise
 */
function libraryPuzzle(){
	var res = prompt("Input password: ");
    res.toLowerCase();

	if(res == "charlie") {
		return true;
	}else if (res == "eilrahc" || res == "lariche"){
        enigma = "unlock";
        return "unlock";
    }else{
        return false;
    }
}

/**has_letter
 * Returns true if the user has already collected the letter that is being interacted with.
 * @param {*} arr Array that keeps track of all collected letters
 * @param {*} letter Char that is searched for within arr
 * @returns 
 */
function has_letter(arr, letter) {
    return arr.includes(letter);
}

/**addText
 * Appends the new text to the dialogue box.
 * @param {*} dialogue HTML element that keeps track of all dialogue
 * @param {*} text String to be appended onto dialogue
 */
function addText(dialogue, text) {
    dialogue.innerHTML += text;
    dialogue.innerHTML += "<br>";
    dialogue.scrollTop = document.getElementById("dialogue").scrollHeight; //keeps scrolling dialogue box automatically at the bottom
}