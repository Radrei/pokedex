//Ajax function to retrieve data in pokemonData file
$.ajax({
	url: "pokemonData.html",
	success: function(result){
		organizeData(result);
	}
});
//Initialize the array
var pokemonData = [];
//Put the data from the ajax request into an array
function organizeData(data){
	//First split the data into an array by newline
	var lines = data.split("\n");
	//Next loop through each line
	for(var line of lines){
		//Push each line into the pokemonData array, splitting each line by comma into its own array, so we end up with a multidimensional array
		pokemonData.push(line.split(","));
	}
	//Call the function to create the table showing the data
	createTable();
}
/*Function to create table to show data
function createTable(){
	var content="<h2>Pokemon Information Table</h2>";
	content+= '<table>';
	
	//Loop to add row of data
	for(var row of pokemonData){
		content+="<tr>";
		
		//Loop to add cells to row
		for(var value of row){
			content += "<td>"
			content+=value;
			content+="</td>";
		}
		
		content+="</tr>";
	}
	
	content+='</table>';
	$("#pokemonTable").append(content);
}*/
var pokemonImage;
var pokemonId = 0;
//create a canvas with p5js
function setup(){
	//Note: devining a parent (div #myCanvas) places the canvas inside that div instead of at the bottom of the page
	createCanvas(301,301).parent(myCanvas);
	//Load the sprite sheet
	pokemonImage = loadImage("gen1pokemon.png");
}
//Draw a rectangle
function draw(){
	fill(255);
	rect(0,0,300,300);
	//Syntax: image(img, x, y, w, h, zx, zy, zw, zh) (image to draw, position, dimensions, zoom position & dimensions [optional])
	//Each sprite is 64px by 64px in this instance, so we multiply 64 by the column number and/or row number to get the desired position
	//To get the column number, we divide each id number by 16 (number of columns in this sprite sheet) and take the remainder
	//We can use the floor function to round down to an integer and get the row number
	var colNum = pokemonId % 16;
	var rowNum = floor(pokemonId/16);
	var zx = 64*colNum;
	var zy = 64 * rowNum;
	image(pokemonImage, 120, 120, 200, 200, zx, zy, 64, 64);
	
	//Because this code may run before the ajax call is returned, we need to check for the data first.
	if(pokemonData.length < 151){return;}
	
	var message = "";
	
	//Loop through the data in the second array and separate it by new lines
	//Add +1 to pokemonId because the actual pokemon in the dataset start at pokemonData[1]
	for(var i = 0; i < pokemonData[0].length; i++){
		message += pokemonData[0][i] + ": " + pokemonData[pokemonId + 1][i] + "\n";	
	}
	fill(0);
	text(message, 40, 40);
}
//Decrement the pokemon id to go to the previous pokemon in the list
function back(){
	//We're at the start of the list, do nothing
	if(pokemonId === 0){
		return;
	}
	//Move backward
	pokemonId--;
}
//Same as above but forward in the list
function next(){
	//We're at the end of the list, do nothing
	if(pokemonId == 150){
		return;
	}
	//Move forward
	pokemonId++;
}
//Get the value of the search box
function checkID(){
	var id = document.getElementById("searchInput").value;
	//Convert the value to an integer and subtract 1
	var number = int(id) - 1;
	//Only change the pokemonId if it's within the correct range
	if(number >0 && number <151){
		pokemonId = number;
	}
	else{
		alert("Sorry, that number is not in this pokedex");
	}
}