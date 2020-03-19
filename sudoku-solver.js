{
    let grid = [[0,0,0,2,6,0,7,0,1],[6,8,0,0,7,0,0,9,0],[1,9,0,0,0,4,5,0,0],[8,2,0,1,0,0,0,4,0],[0,0,4,6,0,2,9,0,0],[0,5,0,0,0,3,0,2,8],[0,0,9,3,0,0,0,7,4],[0,4,0,0,5,0,0,3,6],[7,0,3,0,1,8,0,0,0]];
    let usedGrid = [
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]],
        [[],[],[],[],[],[],[],[],[]]
    ]
    
    // Standard Functions(for reuse within solving functions)
    function getValue(xInd, yInd) {
        return grid[yInd][xInd];
    }
    
    function invertNumList(list) {
        // Inverts values in list (in:[1, 3] len 3; out:[2])
        let tempArray = [...Array(10).keys()];
        tempArray.shift();
        for (i=0; i<list.length; i++) {
            let numToRemove = list[i];
            if (tempArray.includes(numToRemove)) {
                tempArray.splice(tempArray.indexOf(numToRemove), 1);
            }
        }
        return tempArray;
    }
    
    function onlyUnique(value, index, self) { 
        return self.indexOf(value) === index;
    }

    
    // Main Solving function
    function solver (curGrid) {
        // Look through each subset
        for (y=0; y<3; y++) {
            // vertical for loop
            for (x=0; x<3; x++) {
                // horizontal for loop
                
                // basePossibilities: Find values already inside the subset and remove them from the basePossibilities array
                var basePossibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];    // the base/beginning possibilities for each tile because tiles can't be a value already in their subset.
                startInd = [x*3, y*3]
                for (i=0; i<9; i++) {
                    if (i<3) {
                        // when in the first row of a subeset
                        if (getValue(startInd[0]+i, startInd[1]) != 0) {
                            basePossibilities.splice(basePossibilities.indexOf(getValue(startInd[0]+i, startInd[1])), 1);
                        }
                    } else if (i<6) {
                        // when in the second row of a subset
                        if (getValue(startInd[0]+i-3, startInd[1]+1) != 0) {
                            basePossibilities.splice(basePossibilities.indexOf(getValue(startInd[0]+i-3, startInd[1]+1)), 1);
                        }
                    } else {
                        //when in the last row of a subset
                        if (getValue(startInd[0]+i-6, startInd[1]+2) != 0) {
                            basePossibilities.splice(basePossibilities.indexOf(getValue(startInd[0]+i-6, startInd[1]+2)), 1);
                        }
                    }
                }
                
                //console.log(`basePossibilities: [${basePossibilities}]`);
                basePossibilities = invertNumList(basePossibilities);
                for (i=0; i<9; i++) {
                    if (i<3) {
                        usedGrid[(y*3)][(x*3)+i] = basePossibilities;
                    } else if (i<6) {
                        usedGrid[(y*3)+1][(x*3)+i-3] = basePossibilities;
                    } else {
                        usedGrid[(y*3)+2][(x*3)+i-6] = basePossibilities;
                    }
                }
            }
                

        }
        
        // get values in each row and column and add them to the used grid of each tile on that row/column
        for (y=0; y<9; y++) {
            var xUsedByRow = [];
            // Horizontal: get values of each tile in a row and add to their usedGrid
            for (x=0; x<9; x++) {
                if (getValue(x, y) != 0 && !xUsedByRow.includes(getValue(x, y))) {
                    xUsedByRow.push(getValue(x, y));
                }
            }
            // Adds used value to each tile on the usedGrid array.
            for (x=0; x<9; x++) {
                usedGrid[y][x] = usedGrid[y][x].concat(xUsedByRow).filter( onlyUnique );
            }
            
            
        }
        for (x=0; x<9; x++) {
            var yUsedByRow = [];
            // Vertical: get values of each tile in a column and add to their usedGrid
            for (y=0; y<9; y++) {
                if (getValue(x, y) != 0 && !yUsedByRow.includes(getValue(x, y))) {
                    yUsedByRow.push(getValue(x, y));
                }
            }
            // Adds used value to each tile on the usedGrid array.
            for (y=0; y<9; y++) {
                usedGrid[y][x] = usedGrid[y][x].concat(yUsedByRow).filter( onlyUnique );
            }
            
            
        }
        
        
        // Solves tiles with one possible value; uses values in usedGrid.
        let complete = true;
        for (y=0; y<9; y++) {
            for (x=0; x<9; x++) {
                if (getValue(x, y) === 0) {
                    if (usedGrid[y][x].length === 8) {
                        grid[y][x] = invertNumList(usedGrid[y][x])[0]
                    } else {
                        complete = false;
                    }
                }
            }
        }
        
        return complete
    }
    
    let complete = false;
    while (complete === false) {
        complete = solver(grid);
        console.log(grid);
    }
}
