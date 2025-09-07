// Calculate Distance between locations
const fs = require("fs")

const generateSideLists = () => {
    const rightList = []
    const leftList = []
    
    // read data from txt file and then convert them to array of numbers
    const listArray = fs.readFileSync("data/distanceData.txt", "utf8")
    .split("\n")                // split into lines
    .map(line => line.trim()    // trim spaces in each line
    .split(/\s+/)             // split by any whitespace
    .map(Number)              // convert to numbers
    );

    // seperate array to left and right lists
    listArray.map((eachSet) => {
        leftList.push(eachSet[0]);
        rightList.push(eachSet[1]);
    })

    return {leftList, rightList}
}

const calculateDistance = ({leftList, rightList}) => {
    // sort list in same order
    const sortedLeft = leftList.sort();
    const sortedRight = rightList.sort();

    let distance = 0;

    // calculate distance
    sortedLeft.map((eachId, index) => distance+=Math.abs(eachId-sortedRight[index]))
    return distance;
}

const {leftList, rightList} = generateSideLists();

console.log(`Total Distance : ${calculateDistance({leftList, rightList})}`)