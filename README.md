# Sudoku-solver.js
This is a super simple javascipt program to solve many sudoku puzzles visually. This is my first project using Javascript and HTML, so that was an adventure. It wasn't too bad, and it is quite good as solving easy to mid-level puzzles. 
# How it works
This program uses the same visual process we would use to solve sudoku puzzles. I outlined the basic solving process below.
## Basic Process
1. Once the solve button is clicked, the numbers are stripped from the HTML text fields and filled into an array.
2. A loop will find the possibile values of every tile. It eliminates possibilities based on numbers in a tile's row and in adjacent tiles. If any tiles have one possibility, it assigns that value to the tile, then repeats.
3. **IF** the puzzle is solved, it then writes the array of tiles back to the HTML page so the user can see them.