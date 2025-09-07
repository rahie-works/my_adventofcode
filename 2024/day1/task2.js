// Calculate Similarity Score

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

const calculateSimilarityScore = ({leftList, rightList}) => {
    let similarityScore = 0;

    // Build a frequency map of leftList
    const freqMap = leftList.reduce((map, num) => {
        map[num] = (map[num] || 0) + 1;
        return map;
    }, {});
    
    // Count occurrences for items in array1
    rightList.map(item => similarityScore += item*(freqMap[item] || 0));
    return similarityScore;
}

const {leftList, rightList} = generateSideLists();

console.log("Similarity Score: ", calculateSimilarityScore({leftList, rightList}))