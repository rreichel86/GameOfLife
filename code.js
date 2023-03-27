
let n = 40; //number of columns
let m = 40; //number of rows
let tbody;
let board =  [];
let data = [];
let running;
let generations;
let toroidalWorld;


// color cells 
function setBoard(force) {
	let i;
	let j;
	
	if (running || force) {
		for (i = 0; i < m; i++) {
			for (j = 0; j < n; j++) {
				board[i][j].style.background = (data[i][j] ? "black" : "white");
			}
		}
	}
}

// delete cells
function clearBoard() {
	let i;
	let j;
	
	if (!running) {
		for (i = 0; i < m; i++) {
			for (j = 0; j < n; j++) {
				data[i][j] = false;
			}
		}
		setBoard(true);
		generations.value = 0;
	}
}


function init() {
	let i;
	let j;
	let row;
	let xcenter = Math.floor(n/2);
	let ycenter = Math.floor(m/2);


	generations = document.getElementById("generations");
	tbody = document.getElementById("board");
	for (i = 0; i < m; i++)  { 
		row = tbody.appendChild(document.createElement("tr"));
		board[i] = [];
		data[i] = [];
		for (j = 0; j < n; j++) {
			board[i][j] = row.appendChild(document.createElement("td"))
			board[i][j].addEventListener('click', callbackGenerator(i,j));
		}
	}
	
	data[ycenter-1][xcenter] = true;
	data[ycenter][xcenter+1] = true;
	data[ycenter+1][xcenter-1] = true;
	data[ycenter+1][xcenter] = true;
	data[ycenter+1][xcenter+1] = true;
	
	setBoard(true);
	
	setInterval( function () {
		update();
		setBoard();
	}, 300)
    
	
}

function check() {
	running = document.getElementById("running").checked;
	generations.value = 0;
}

function toggle() {
	toroidalWorld = document.getElementById("toroidalWorld").checked;
}

function update() {
	let i;
	let j;
	let k;
	let l;
	let neighbors;
	
	if (running) {
		for (i = 0; i < m; i++) {
			for (j = 0; j < n; j++) {
				neighbors = 0;
				for (k = i-1; k <= i+1; k++) {
					for (l = j-1; l <= j+1; l++) {
						if (k != i || l != j) {
							if (!toroidalWorld && board[k] && board[k][l] && 
							    board[k][l].style.background.indexOf("black") != -1) {
								
								neighbors++;
							}
							else if (toroidalWorld && board[(m+k)%m][(n+l)%n].style.background.indexOf("black") != -1) {
								
								neighbors++;
							}
						}
					}
				
				}
				if (neighbors == 3) {
					data[i][j] = true;
				} else if (neighbors != 2) {
					data[i][j] = false;
				}
				
			}
		}
		generations.value++;
	}
	
	
	
}


function callbackGenerator(i,j) {
	return function () {
		if (!running) {
			data[i][j] = (board[i][j].style.background.indexOf("black") == -1 );
			setBoard(true);
		}
	}
	
}


