/* CONSTANTS */
const ONE_DAY = 1000 * 60 * 60 * 24;

/* FUNCTIONS */
function loadVariables() {
    /* Document Elements */
    const circleCYA1 = document.getElementById('circleCYA1');
    const circleCYA2 = document.getElementById('circleCYA2');
    const circleFC1 = document.getElementById('circleFC1');
    const circleFC2 = document.getElementById('circleFC2');
    const cyaTestInput = document.getElementById('cyaTestInput');

    /* Current DateTime */
    const date = new Date();
    const displayDate = date.toLocaleDateString();
    const displayTime = date.toLocaleTimeString();
    document.getElementById('datetime').innerHTML = displayDate + " " + displayTime;
    
    /* CYA - Last Test Value */
    var cyaLastTest = localStorage.getItem("cyaLastTest");
    if (cyaLastTest) {
        cyaTestInput.value = Number(cyaLastTest);
    }
    else {
        cyaLastTest = "0";
    }
    
    /* CYA - Days Since Last Test */
    var strCyaLastTestDate = localStorage.getItem("cyaLastTestDate");
    if (strCyaLastTestDate) {
        cyaLastTestDate = Date.parse(strCyaLastTestDate);
    }
    else {
        cyaLastTestDate = createDate(0, -2, 0);
        localStorage.setItem("cyaLastTestDate", cyaLastTestDate);
    }
   
    var cyaDaysAgo = (date - cyaLastTestDate) / ONE_DAY;
    var cyaDaysAgoRounded = Math.round(cyaDaysAgo);
    document.getElementById('cyaDaysAgo').innerHTML = "(" + cyaDaysAgoRounded + " days ago)";

    /* CYA - Decay */
    let cyaDecay = 1;
    const strCyaDecay = localStorage.getItem("cyaDecay");
    if (strCyaDecay) {
        cyaDecay = Number(strCyaDecay);
    }
    else {
        localStorage.setItem("cyaDecay", cyaDecay);
    }
    document.getElementById('cyaDecay').innerHTML = Math.round(cyaDecay) + " ppm/day";

    /* CYA - Current Prediction */
    let cyaPrediction = Math.round(cyaLastTest-(cyaDecay*cyaDaysAgo));
    if (cyaPrediction < 0) {
        cyaPrediction = 0;
    }
    document.getElementById('predictedCYA').innerHTML = cyaPrediction + " ppm";

    /* CYA - Status Color*/
    let cyaDaysAgoLimit = 30;
    const strCyaDaysAgoLimit = localStorage.getItem("cyaDaysAgoLimit");
    if (strCyaDaysAgoLimit) {
        cyaDaysAgoLimit = Number(strCyaDaysAgoLimit);
    }
    else {
        localStorage.setItem("cyaDaysAgoLimit", cyaDaysAgoLimit);
    }
    cyaDaysAgoLimitInput.value = cyaDaysAgoLimit;

    if (cyaDaysAgo > cyaDaysAgoLimit || cyaPrediction > 50 || cyaPrediction < 30) {
        circleCYA1.style = `background-color: red`;
        circleCYA2.style = `background-color: red`;
    }
    else {
        circleCYA1.style = `background-color: green`;
        circleCYA2.style = `background-color: green`;
    }

    /* FC */
    

    
}

function testCYA() {
    const cyaCurrentTest = cyaTestInput.value;
    if (cyaCurrentTest >= 0 && cyaCurrentTest <= 200) {
        const cyaLastTest = localStorage.getItem("cyaLastTest");
        const cyaDifference = cyaLastTest - cyaCurrentTest;
        localStorage.setItem("cyaLastTest", cyaCurrentTest);
        if (cyaDifference >= 0) {
            const date = new Date();
            const cyaLastTestDate = Date.parse(localStorage.getItem("cyaLastTestDate"));
            const cyaDaysAgo = (date - cyaLastTestDate) / ONE_DAY;
            let cyaDecay = cyaDifference / cyaDaysAgo;
            if (cyaDecay > 15) {
                cyaDecay = 15;
            }
            
            localStorage.setItem("cyaLastTestDate", date);
            localStorage.setItem("cyaDecay", cyaDecay);

            
        }
        refresh();
    }
    else {
        alert("Please enter a CYA value between 0 and 200.");
    }
}

function refresh() {
    location.reload();
}

function createDate(days, months, years) {
    var date = new Date(); 
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date;    
}