/* exported generateGrid, drawGrid */
/* global placeTile */

function generateGrid(numCols, numRows) {
    let grid = [];
    for (let i = 0; i < numRows; i++) {
      let row = [];
      for (let j = 0; j < numCols; j++) {
        row.push("_");
      }
      grid.push(row);
    }
  
    // add room to the grid
    function addRoom() {
      let width = Math.floor(Math.random() * 5 + 3); // Room width between 3 and 7
      let height = Math.floor(Math.random() * 5 + 3); // Room height between 3 and 7
      let x = Math.floor(Math.random() * (numCols - width));
      let y = Math.floor(Math.random() * (numRows - height));
      return { x, y, width, height };
    }
  
    // if a room overlaps with existing rooms
    function doesOverlap(room, rooms) {
      for (let other of rooms) {
        if (
          !(
            room.x + room.width < other.x ||
            other.x + other.width < room.x ||
            room.y + room.height < other.y ||
            other.y + other.height < room.y
          )
        ) {
          return true;
        }
      }
      return false;
    }
  
    // Generate 2 or 3 rooms
    let rooms = [];
    let numRooms = Math.random() > 0.5 ? 3 : 2;
    while (rooms.length < numRooms) {
      let room = addRoom();
      if (!doesOverlap(room, rooms)) {
        rooms.push(room);
        for (let i = room.y; i < room.y + room.height; i++) {
          for (let j = room.x; j < room.x + room.width; j++) {
            grid[i][j] = ".";
          }
        }
      }
    }
    
    function addSpecialTiles(room, tile, count) {
      let placements = 0;
      while (placements < count) {
        let x = Math.floor(Math.random() * room.width) + room.x;
        let y = Math.floor(Math.random() * room.height) + room.y;
  
        if (grid[y][x] === '.') {
          grid[y][x] = tile;
          placements++;
        }
      }
    }
  
    // Randomly place '1' and '2' in the rooms
    rooms.forEach(room => {
      let count1 = Math.floor(Math.random() * 2); 
      let count2 = Math.floor(Math.random() * 2); 
      addSpecialTiles(room, '1', count1);
      addSpecialTiles(room, '2', count2);
    });
  
    function connectRooms(room1, room2) {
      let point1 = {
        x: Math.floor(room1.x + room1.width / 2),
        y: Math.floor(room1.y + room1.height / 2),
      };
      let point2 = {
        x: Math.floor(room2.x + room2.width / 2),
        y: Math.floor(room2.y + room2.height / 2),
      };
  
      // Horizontal hallway
      for (
        let x = Math.min(point1.x, point2.x);
        x <= Math.max(point1.x, point2.x);
        x++
      ) {
        grid[point1.y][x] = ".";
      }
  
      // Vertical hallway
      for (
        let y = Math.min(point1.y, point2.y);
        y <= Math.max(point1.y, point2.y);
        y++
      ) {
        grid[y][point2.x] = ".";
      }
    }
  
    // Connect the rooms with hallways
    for (let i = 0; i < rooms.length - 1; i++) {
      connectRooms(rooms[i], rooms[i + 1]);
    }
  
    return grid;
  }
  
  function gridCheck(grid, i, j, target) {
    return (
      i >= 0 &&
      i < grid.length &&
      j >= 0 &&
      j < grid[i].length &&
      grid[i][j] === target
    );
  }
  
  function gridCode(grid, i, j, targets) {
    let code = 0;
    targets.forEach(target => {
      if (gridCheck(grid, i - 1, j, target)) code |= 1; // Top
      if (gridCheck(grid, i + 1, j, target)) code |= 2; // Bottom
      if (gridCheck(grid, i, j - 1, target)) code |= 4; // Left
      if (gridCheck(grid, i, j + 1, target)) code |= 8; // Right
    });
    return code;
  }
  
  function getAnimatedTileFor2(frameCount) {
    const animationSpeed = 10;
    const tileFrames = [[0, 28], [1, 28], [2, 28]]; 
    
    const index = Math.floor(frameCount / animationSpeed) % tileFrames.length;
    return tileFrames[index];
  }
  
  function drawContext(grid, i, j, targets, dti, dtj) {
    let code = gridCode(grid, i, j, targets);
    let tile = lookup[code];
    
    if (grid[i][j] === '1') {
      placeTile(i, j, 26, 0);
    } else if (grid[i][j] === '2') {
      const [ti, tj] = getAnimatedTileFor2(frameCount);
      placeTile(i, j, ti, tj);
    } else if (tile) {
      placeTile(i, j, tile[0], tile[1]);
    } else {
      placeTile(i, j, dti, dtj);
    }
  }
  
  const lookup = [
    [16, 4], //out side
    [4,21], //bottom
    [1,21], //top
    null,
    [1, 23], //Right
    [1,23], //topLeft
    [2,23], //bottomLeft
    null,
    [2,23], //Left
    [5,24], //TopRight
    [6,24], //BottomRight
  ];
  
  function drawGrid(grid) {
    background(171, 82, 54);
    
    // Iterate over each cell in the grid
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        drawContext(grid, i, j, [".", "1", "2"], 1, 3);
      }
    }
  }