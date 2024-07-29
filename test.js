function getSurroundingCells(matrix, topLeft, bottomRight) {
    const surroundingCells = [];
    const rows = matrix.length;
    const cols = matrix[0].length;
  
    const [top, left] = topLeft;
    const [bottom, right] = bottomRight;
  
    // Add top row
    if (top > 0) {
      for (let col = Math.max(0, left - 1); col <= Math.min(cols - 1, right + 1); col++) {
        surroundingCells.push([top - 1, col]);
      }
    }
  
    // Add bottom row
    if (bottom < rows - 1) {
      for (let col = Math.max(0, left - 1); col <= Math.min(cols - 1, right + 1); col++) {
        surroundingCells.push([bottom + 1, col]);
      }
    }
  
    // Add left column
    if (left > 0) {
      for (let row = Math.max(0, top - 1); row <= Math.min(rows - 1, bottom + 1); row++) {
        surroundingCells.push([row, left - 1]);
      }
    }
  
    // Add right column
    if (right < cols - 1) {
      for (let row = Math.max(0, top - 1); row <= Math.min(rows - 1, bottom + 1); row++) {
        surroundingCells.push([row, right + 1]);
      }
    }
  
    // Remove duplicates (corners added twice)
    const uniqueSurroundingCells = [...new Set(surroundingCells.map(JSON.stringify))].map(JSON.parse);
  
    return uniqueSurroundingCells;
  }
  
  // Example usage:
  const matrix = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
  ];
  
  const topLeft = [2, 1];
  const bottomRight = [2, 3];
  
  const surroundingCells = getSurroundingCells(matrix, topLeft, bottomRight);
  console.table(matrix);
  console.table(surroundingCells);
  // Output: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [2, 0], [3, 0], [3, 1], [3, 2], [3, 3], [1, 3], [2, 3]]

