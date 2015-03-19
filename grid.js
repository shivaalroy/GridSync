/*
* The Grid class runs a tic-tac-toe grid for two
* human players.
* name: string representing the id of the tic-tac-toe grid
* 	in our html.
*/
function getParameterByName(name) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var grid1;
function makeGrid() {
	var size = getParameterByName('size');
	if (size == "") return;
	var dimension = 100 / size;
	var table = "<table id='grid'>";
	var table_row = "<tr>";
	var table_data = "<td style='width:"+dimension+"%; height:"+dimension+"%;' draggable='true'></td>";
	for (var i = 0; i < size; i++) {
		table_row += table_data;
	}
	table_row += "</tr>"
	for (var i = 0; i < size; i++) {
		table += table_row;
	}
	table += "</table>";
	document.getElementById("container").innerHTML = table;
	grid1 = new Grid("grid");
}

function Grid(name) {
	this.table = document.getElementById(name);
	this.name = name;
	var cells = document.getElementsByTagName("td");
	var grid = this;
	for (var i = 0; i < cells.length; i++) {
		cells[i].id = "cell_"+i;
		cells[i].addEventListener("click", function() { grid.toggleX(this);});
		cells[i].addEventListener("dragover", function() { grid.allowDrop(event);});
		cells[i].addEventListener("drop", function() { grid.drop(event);});
		cells[i].addEventListener("dragstart", function() { grid.drag(event);});

	}
	console.log(this.table);
	this.startCell;
	this.endCell;
	this.refreshGrid();
	// this.start();
}

Grid.prototype.toggleX = function(cell) {
	if (cell.innerHTML == "") {
		cell.innerHTML = "X";
	} else {
		cell.innerHTML = "";
	}
};

Grid.prototype.allowDrop = function(ev) {
    ev.preventDefault();
};

Grid.prototype.drag = function(ev) {
    this.startCell = ev.target.id;
};

Grid.prototype.drop = function(ev) {
    ev.preventDefault();
    this.endCell = ev.target.id;
    var startCellObject = document.getElementById(this.startCell);
    var endCellObject = document.getElementById(this.endCell);
    if (startCellObject.innerHTML == "X" && endCellObject.innerHTML == "") {
    	startCellObject.innerHTML = "";
    	endCellObject.innerHTML = "X";
    }
};


/* Function: start
* Initializes click handling
*/
Grid.prototype.start = function() {
	var grid = this;
	console.log("nigga we made it");
};

/* things that should happen each time a cell is clicked.
* 	obj : Object representing the cell that was clicked.
*/
Grid.prototype.handleClick = function() {
	console.log("got to handleClick");
	// toggleX(this);
};

/* Updates the html of the elements under the "status" class
* to msg
*/
Grid.prototype.refreshGrid = function() {
	console.log("giving the grid refreshments!");
};



/* Sets the html of all "td" cells to the empty string ""
* and resets roundCount to 0
*/
Grid.prototype.clearGrid = function() {
	console.log("grid cleared");
};
