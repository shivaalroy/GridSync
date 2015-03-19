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
	if (size > 10) {
		alert("Size too large, please choose a smaller size");
		return;
	}
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
	grid1 = new Grid("grid", size);
}

function Grid(name, size) {
	this.size = size;
	this.name = name;
	this.status = "";
	this.table = document.getElementById(name);
	this.cells = document.getElementsByTagName("td");
	var cells = this.cells;
	var grid = this;
	for (var i = 0; i < cells.length; i++) {
		cells[i].id = "cell_"+i;
		cells[i].addEventListener("click", function() { grid.toggleX(this); });
		cells[i].addEventListener("dragover", function() { grid.allowDrop(event); });
		cells[i].addEventListener("drop", function() { grid.drop(event); });
		cells[i].addEventListener("dragstart", function() { grid.drag(event); });
	}
	this.startCell;
	this.endCell;
	this.refreshGrid();
	window.addEventListener("load", function() { grid.changeCount(1); });
}

Grid.prototype.toggleX = function(cell) {
	if (cell.innerHTML == "")
		cell.innerHTML = "x";
	else
		cell.innerHTML = "";
	this.updateGridStatus();
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
    if (startCellObject.innerHTML == "x" && endCellObject.innerHTML == "") {
    	startCellObject.innerHTML = "";
    	endCellObject.innerHTML = "x";
    	this.updateGridStatus();
    }
};


Grid.prototype.refreshGrid = function() {
	var grid = this;
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "refresh_grid.php?size="+this.size, true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			console.log("newGridStatus="+ajax.responseText);
			grid.setGrid(ajax.responseText);
		}
	};
};


Grid.prototype.updateGridStatus = function() {
	this.getGrid();
	var grid = this;
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "refresh_grid.php?gridsize1="+grid.size+"&status="+grid.status, true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			console.log("updateStatus="+ajax.responseText);
		}
	};
};

Grid.prototype.changeCount = function(option) {
	var grid = this;
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "refresh_grid.php?gridsize2="+grid.size+"&instance="+option, true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			console.log("instanceStatus="+ajax.responseText);
		}
	};
};


/* Sets the html of all "td" cells to the empty string ""
* and resets roundCount to 0
*/
Grid.prototype.clearGrid = function() {
	console.log("grid cleared");
	for (var i = 0; i < this.cells.length; i++) {
		this.cells[i].innerHTML = "";
	}
};

Grid.prototype.setGrid = function(string) {
	console.log("input="+string);
	for (var i = 0; i < this.cells.length; i++) {
		if (string.substring(i, i + 1) == "1")
			this.cells[i].innerHTML = "x";
		else
			this.cells[i].innerHTML = "";
	}
};

Grid.prototype.getGrid = function() {
	this.status = "";
	for (var i = 0; i < this.cells.length; i++) {
		if (this.cells[i].innerHTML == "")
			this.status += "0";
		else
			this.status += "1";
	}
};
