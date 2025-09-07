// Count number of Safe Reports with one acceptable error level
const fs = require("fs")

const checkReportSafetyWithOneErrorLevel = (modifiedArray) => {
    let modifier = 0;
    let testArray = [];
    let i = 0;
    do{
        let isSafe = true;
        testArray = modifiedArray.filter((_, i) => i !== (modifier) );
        const expectedSign = Math.sign(testArray[1] - testArray[0]);
        for(i=0; i<testArray.length-1; i++) {
            const difference = testArray[i+1]-testArray[i];
            if( expectedSign === 0 || Math.sign(difference) != expectedSign || (Math.abs(difference) < 1 || Math.abs(difference) > 3)) {
                modifier+=1;
                isSafe = false;
                break;
            }
        }
        if(isSafe) return true;
    }while (modifier < modifiedArray.length)
    return false;
}

const checkReportSafety = (reportArray) => {
    let safeCount = 0;
    reportArray.map(eachReport => {
        const reportData = eachReport.trim().split(" ").map(Number);
        const expectedSign = Math.sign(reportData[1] - reportData[0]);
        for(let i=0; i<reportData.length-1; i++) {
            const difference = reportData[i+1]-reportData[i];
            if(Math.sign(difference) != expectedSign) {
                const isSafe = checkReportSafetyWithOneErrorLevel(reportData)
                if(isSafe) safeCount+=1;
                return;
            } else if(Math.abs(difference) < 1 || Math.abs(difference) > 3) {
                const isSafe = checkReportSafetyWithOneErrorLevel(reportData)
                if(isSafe) safeCount+=1;
                return;
            }
        }
        safeCount+=1
    })
    return safeCount;
}

const reportArray = fs.readFileSync("data/reportData.txt", "utf8").trim()
.split("\n")

console.log(`Total Safe Reports : ${checkReportSafety(reportArray)}`);