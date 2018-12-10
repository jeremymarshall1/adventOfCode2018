/*
--- Day 3: No Matter How You Slice It ---
The Elves managed to locate the chimney-squeeze prototype fabric for Santa's suit (thanks 
to someone who helpfully wrote its box IDs on the wall of the warehouse in the middle 
of the night). Unfortunately, anomalies are still affecting them - nobody can even 
agree on how to cut the fabric.

The whole piece of fabric they're working on is a very large square - at least 1000 
inches on each side.

Each Elf has made a claim about which area of fabric would be ideal for Santa's suit. 
All claims have an ID and consist of a single rectangle with edges parallel to the 
edges of the fabric. Each claim's rectangle is defined as follows:

The number of inches between the left edge of the fabric and the left edge of the 
rectangle.
The number of inches between the top edge of the fabric and the top edge of the 
rectangle.
The width of the rectangle in inches. 
The height of the rectangle in inches.
A claim like #123 @ 3,2: 5x4 means that claim ID 123 specifies a rectangle 3 inches 
from the left edge, 2 inches from the top edge, 5 inches wide, and 4 inches tall. 
Visually, it claims the square inches of fabric represented by # (and ignores the 
    square inches of fabric represented by .) in the diagram below:

...........
...........
...#####...
...#####...
...#####...
...#####...
...........
...........
...........
The problem is that many of the claims overlap, causing two or more claims to cover 
part of the same areas. For example, consider the following claims:

#1 @ 1,3: 4x4
#2 @ 3,1: 4x4
#3 @ 5,5: 2x2
Visually, these claim the following areas:

........
...2222.
...2222.
.11XX22.
.11XX22.
.111133.
.111133.
........
The four square inches marked with X are claimed by both 1 and 2. (Claim 3, while 
    adjacent to the others, does not overlap either of them.)

If the Elves all proceed with their own plans, none of them will have enough fabric. 
How many square inches of fabric are within two or more claims?

--- Part Two ---
Amidst the chaos, you notice that exactly one claim doesn't overlap by even a single 
square inch of fabric with any other claim. If you can somehow draw attention to it, 
maybe the Elves will be able to make Santa's suit after all!

For example, in the claims above, only claim 3 is intact after all claims are made.

What is the ID of the only claim that doesn't overlap?

*/

let input = readInput("./input/day3.txt");
let inputArray = input.split("\n");
let parsedInput = parseInput(inputArray);
let fabric = constructFabric();
let unclaimed = [];

console.log(parsedInput);

assignClaims(fabric, parsedInput, unclaimed);

console.log("Number of overlapping claims: " + countOverlap(fabric));
console.log("Uncontested claim: " + unclaimed);

function findUnclaimed(matrix) {
    let xPos = 0;
    let yPos = 0;
    matrix.forEach(elementX => {
        elementX.forEach(elementY => {
            if (elementY != "X" && elementY != ".") {
                return (xPos + "," + yPos);
            }
            yPos++;
        })
        xPos++
    })
}

function countOverlap(matrix) {
    let count = 0;

    matrix.forEach(elementX => {
        elementX.forEach(elementY => {
            if (elementY == "X") {
                count++;
            }
        })
    })

    return count;
}

function assignClaims(matrix, input, unclaimed) {
    let initX, initY, sizeX, sizeY;

    let splitInput = [];

    input.forEach(element => {
        splitInput = element.toString().split(" ");
        //console.log(splitInput);
        initX = parseInt(splitInput[2]);
        initY = parseInt(splitInput[3]);
        sizeX = parseInt(splitInput[4]);
        sizeY = parseInt(splitInput[5]);
        let claimed = false;

        for (x = initX; x < (initX + sizeX); x++) {
            for (y = initY; y < (initY + sizeY); y++) {
                if (matrix[x][y] == ".") {
                    matrix[x][y] = splitInput[0];

                } else {
                    claimed = true;
                    if (unclaimed.includes(matrix[x][y])) {
                        unclaimed.splice(unclaimed.indexOf(matrix[x][y]), 1);

                    }
                    matrix[x][y] = 'X';

                }


            }
        }
        if (!claimed) {
            unclaimed.push(splitInput[0]);
        } else if (unclaimed.includes(splitInput[0])) {
            unclaimed.splice(unclaimed.indexOf(splitInput[0]), 1);
        }
    })


}

function constructFabric() {
    let fabric = new Array(1000);

    for (x = 0; x < 1000; x++) {
        fabric[x] = new Array(1000);
        fabric[x].fill(".");
    }


    return fabric;
}

function parseInput(input) {
    let parsedInput = [];

    input.forEach(element => {
        element = element.replace("#", "");
        //element = element.replace("@", "");
        element = element.replace(",", " ");
        element = element.replace(":", "");
        element = element.replace("x", " ");
        parsedInput.push(element.split());
    });

    return parsedInput;
}

function readInput(filePath) {
    fs = require('fs')
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        return err;
    }
}