// Count number of Safe Reports

const fs = require("fs")

const checkReportSafety = (reportArray) => {
    let safeCount = 0;
    reportArray.map(eachReport => {
        const reportData = eachReport.trim().split(" ").map(Number);
        const expectedSign = Math.sign(reportData[1] - reportData[0]);
        for(let i=0; i<reportData.length-1; i++) {
            const difference = reportData[i+1]-reportData[i];
            if(Math.sign(difference) != expectedSign) {
                return;
            } else if(Math.abs(difference) < 1 || Math.abs(difference) > 3) {
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