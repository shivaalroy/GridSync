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

function getTime() {
	var d = new Date();
	return d.getTime();
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
		cells[i].addEventListener('touchmove', function(event) {
			var touch = event.targetTouches[0];

			// Place element where the finger is
			this.style.left = touch.pageX-25 + 'px';
			this.style.top = touch.pageY-25 + 'px';
			event.preventDefault();
		}, false);
		this.status += "0";
	}
	this.startCell;
	this.endCell;
	// this.setLastChange();
	this.refreshGrid();
	setInterval(function() { grid.refreshGrid() }, 1000);
	// window.addEventListener("load", function() { grid.changeCount(1); });
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

Grid.prototype.setLastChange = function() {
	var grid = this;
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "refresh_grid.php?mostrecentchange=lastchange&size="+grid.size, true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			if (ajax.responseText != "no_lastchange") {
				grid.lastchange = ajax.responseText;
				console.log("previous_lastchange_was="+grid.lastchange);
			} else {
				grid.lastchange = getTime();
			}
			grid.refreshGrid();
		}
	};
};

// Get the newest grid with status and the most current lastchange
Grid.prototype.refreshGrid = function() {
	var grid = this;
	console.log("lastchange="+grid.lastchange);
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "refresh_grid.php?size="+grid.size+"&lastchange="+grid.lastchange, true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			if (ajax.responseText != "nochange") {
				grid.status = ajax.responseText.substring(0, grid.size * grid.size);
				grid.lastchange = ajax.responseText.substring((grid.size * grid.size) + 1);
				console.log("new lastchange="+grid.lastchange);
				console.log("new status="+grid.status);
				grid.setGrid();
			}
			console.log("refreshGrid="+ajax.responseText);
		}
	};
};


Grid.prototype.updateGridStatus = function() {
	this.getGrid();
	this.lastchange = getTime();
	var grid = this;
	var ajax = new XMLHttpRequest();
	console.log("starting ajax");
	var start = getTime();
	ajax.open("GET", "refresh_grid.php?status="+grid.status+"&lastchange="+grid.lastchange+"&gridsize="+grid.size, true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			var end = getTime();
			console.log("Time="+ (end - start));
			console.log("updateStatus="+ajax.responseText);
		}
	};
};

Grid.prototype.changeCount = function(option) {
	var grid = this;
	var ajax = new XMLHttpRequest();
	ajax.open("GET", "refresh_grid.php?instance="+option+"&gridsize="+grid.size, true);
	ajax.send();
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4 && ajax.status == 200) {
			console.log("instanceStatus="+ajax.responseText);
		}
	};
};

Grid.prototype.clearGrid = function() {
	for (var i = 0; i < this.cells.length; i++) {
		this.cells[i].innerHTML = "";
	}
};

Grid.prototype.setGrid = function() {
	for (var i = 0; i < this.cells.length; i++) {
		if (this.status.substring(i, i + 1) == "1")
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
