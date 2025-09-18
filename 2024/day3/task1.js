// Find sum of products from corrupted memory
const fs = require("fs");

const generateSumOfProducts = (rawMemory) => {
    let sum = 0;
    const regex = /mul\((\d+),(\d+)\)/g;
    while((match = regex.exec(rawMemory)) !== null) {
        sum += match[1]*match[2];
    }
    return sum;
}
const readCorruptedMemory = fs.readFileSync("data.txt", "utf8")
.trim();

console.log("The SUM is :", generateSumOfProducts(readCorruptedMemory))