// Calculate Distance between locations
const fs = require("fs")

const generateSideLists = () => {
    const rightList = []
    const leftList = []

    const listArray = fs.readFileSync("data/distanceData.txt", "utf8")
    .split("\n")                // split into lines
    .map(line => line.trim()    // trim spaces in each line
    .split(/\s+/)             // split by any whitespace
    .map(Number)              // convert to numbers
    );

    listArray.map((eachSet) => {
        leftList.push(eachSet[0]);
        rightList.push(eachSet[1]);
    })

    return {leftList, rightList}
}

const calculateDistance = ({leftList, rightList}) => {
    const sortedLeft = leftList.sort();
    const sortedRight = rightList.sort();

    let distance = 0;

    sortedLeft.map((eachId, index) => distance+=Math.abs(eachId-sortedRight[index]))
    return distance;
}

const {leftList, rightList} = generateSideLists();

console.log(`Total Distance : ${calculateDistance({leftList, rightList})}`)