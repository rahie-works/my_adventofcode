// Find sum of products from corrupted memory
const fs = require("fs");

const generateSumOfProducts = (rawMemory) => {
    let sum = 0;
    const regex = /mul\((\d+),(\d+)\)|don't|do/g;
    let foundDont = false;
    for(const match of rawMemory.matchAll(regex)) {
        if(match[0] === `don't`) {
            foundDont = true;
        }
        if(match[0] === `do`) {
            foundDont = false;
        }
        if(match[1] && match[2] && !foundDont) {
            sum += match[1]*match[2]
        } else if(match[1] && match[2] && foundDont) {
        }
    }
    return sum;
}

const readCorruptedMemory = fs.readFileSync("data.txt", "utf8")
.trim();

console.log("The SUM is :", generateSumOfProducts(readCorruptedMemory))