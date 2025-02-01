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
    document.getElementById('datetime').innerHTML = "Status as of: " + displayDate + " " + displayTime;
    
    /* CYA - Added since last test */
    let cyaAdded = 0;
    const strCyaAdded = localStorage.getItem("cyaAdded");
    if (strCyaAdded) {
        cyaAdded = Number(strCyaAdded);
    }
    else {
        localStorage.setItem("cyaAdded", cyaAdded);
    }
    
    /* CYA - Last Test Value */
    let cyaLastTest = 0;
    const strCyaLastTest = localStorage.getItem("cyaLastTest");
    if (strCyaLastTest) {
        cyaLastTest = Number(strCyaLastTest);
    }
    else {
        localStorage.setItem("cyaLastTest", cyaLastTest);
    }
    cyaTestInput.value = cyaLastTest;
    
    /* CYA - Days Since Last Test */
    let cyaLastTestDate = createDate(0, -2, 0);
    const strCyaLastTestDate = localStorage.getItem("cyaLastTestDate");
    if (strCyaLastTestDate) {
        cyaLastTestDate = Date.parse(strCyaLastTestDate);
    }
    else {
        localStorage.setItem("cyaLastTestDate", cyaLastTestDate);
    }
    let cyaDaysAgo = (date - cyaLastTestDate) / ONE_DAY;
    let cyaDaysAgoRounded = Math.round(cyaDaysAgo);
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

    /* TODO - INCREASE PREDICTION BASED ON DICHLOR ADDITION */

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

    /* FC - Added since last test */
    let fcAdded = 0;
    const strFcAdded = localStorage.getItem("fcAdded");
    if (strFcAdded) {
        fcAdded = Number(strFcAdded);
    }
    else {
        localStorage.setItem("fcAdded", fcAdded);
    }
    
    /* FC - Last Test Result Value */
    let fcLastTest = 0;
    const strFcLastTest = localStorage.getItem("fcLastTest");
    if (strFcLastTest) {
        fcLastTest = Number(strFcLastTest);
    }
    else {
        localStorage.setItem("fcLastTest", fcLastTest);
    }
    fcTestInput.value = fcLastTest;
    
    /* FC - Days Since Last Test */
    let fcLastTestDate = createDate(0, -2, 0);
    const strFcLastTestDate = localStorage.getItem("fcLastTestDate");
    if (strFcLastTestDate) {
        fcLastTestDate = Date.parse(strFcLastTestDate);
    }
    else {
        localStorage.setItem("fcLastTestDate", fcLastTestDate);
    }
    let fcDaysAgo = (date - fcLastTestDate) / ONE_DAY;
    let fcDaysAgoRounded = Math.round(fcDaysAgo);
    document.getElementById('fcDaysAgo').innerHTML = "(" + fcDaysAgoRounded + " days ago)";

    /* FC - Chlorine Demand */
    let fcDemand = 2;
    const strFcDemand = localStorage.getItem("fcDemand");
    if (strFcDemand) {
        fcDemand = Number(strFcDemand);
    }
    else {
        localStorage.setItem("fcDemand", fcDemand);
    }
    document.getElementById('fcDemand').innerHTML = Math.round(fcDemand) + " ppm/day";

    /* FC - Current Prediction */

    /* TODO - INCREASE PREDICTION BASED ON DICHLOR AND BLEACH ADDITION */

    let fcPrediction = Math.round(fcLastTest-(fcDemand*fcDaysAgo));
    if (fcPrediction < 0) {
        fcPrediction = 0;
    }
    document.getElementById('predictedFC').innerHTML = fcPrediction + " ppm";

    /* FC - Target */
    let autoTarget = false;
    const strAutoTarget = localStorage.getItem("autoTarget");
    console.log(strAutoTarget);
    if (strAutoTarget) {
        autoTarget = (strAutoTarget == "true");
        console.log(autoTarget);
    }
    else {
        localStorage.setItem("autoTarget", autoTarget);
    }
    const inputElement = document.getElementById("autoTargetInput");
    inputElement.checked = autoTarget;

    let fcTarget = 5;
    if(autoTarget) {
        fcTarget = fcDemand + 5;
    }
    else {
        const strFcTarget = localStorage.getItem("fcTarget");
        if (strFcTarget) {
            fcTarget = Number(strFcTarget);
        }
    }
    localStorage.setItem("fcTarget", fcTarget);
    fcTargetInput.value = fcTarget;

    /* FC - Add Dichlor */
    let addDichlor = 5; /*TODO - calculate based on Prediction, label strength, and Target */
    addDichlorInput.value = addDichlor;

    /* FC - Add Bleach */
    let addBleach = 5; /*TODO - calculate based on Prediction, label strength, and Target */
    addBleachInput.value = addBleach;

    /* FC - Status Color*/
    let fcDaysAgoLimit = 1;
    const strFcDaysAgoLimit = localStorage.getItem("fcDaysAgoLimit");
    if (strFcDaysAgoLimit) {
        fcDaysAgoLimit = Number(strFcDaysAgoLimit);
    }
    else {
        localStorage.setItem("fcDaysAgoLimit", fcDaysAgoLimit);
    }
    fcDaysAgoLimitInput.value = fcDaysAgoLimit;

    if (fcDaysAgo > fcDaysAgoLimit || fcPrediction > 10 || fcPrediction < 3) {
        circleFC1.style = `background-color: red`;
        circleFC2.style = `background-color: red`;
    }
    else {
        circleFC1.style = `background-color: green`;
        circleFC2.style = `background-color: green`;
    }
}

function testCYA() {
    const cyaCurrentTest = cyaTestInput.value;
    if (cyaCurrentTest >= 0 && cyaCurrentTest <= 200) {
        const cyaLastTest = Number(localStorage.getItem("cyaLastTest"));
        localStorage.setItem("cyaLastTest", cyaCurrentTest);
        const date = new Date();
        const cyaLastTestDate = Date.parse(localStorage.getItem("cyaLastTestDate"));
        localStorage.setItem("cyaLastTestDate", date);
        const cyaAdded = Number(localStorage.getItem("cyaAdded"));
        localStorage.setItem("cyaAdded", 0);
            
        const cyaDifference = cyaLastTest - (cyaCurrentTest - cyaAdded);
        if (cyaDifference >= 0) {
            const cyaDaysAgo = (date - cyaLastTestDate) / ONE_DAY;
            let cyaDecay = cyaDifference / cyaDaysAgo;
            if (cyaDecay > 15) {
                cyaDecay = 15;
            }
            localStorage.setItem("cyaDecay", cyaDecay); 
        }
        refresh();
    }
    else {
        alert("Please enter a CYA value between 0 and 200.");
    }
}

function testFC() {
    const fcCurrentTest = fcTestInput.value;
    if (fcCurrentTest >= 0 && fcCurrentTest <= 75) {
        const fcLastTest = Number(localStorage.getItem("fcLastTest"));
        localStorage.setItem("fcLastTest", fcCurrentTest);
        const date = new Date();
        const fcLastTestDate = Date.parse(localStorage.getItem("fcLastTestDate"));
        localStorage.setItem("fcLastTestDate", date);
        const fcAdded = Number(localStorage.getItem("fcAdded"));
        localStorage.setItem("fcAdded", 0);

        const fcDifference = fcLastTest - (fcCurrentTest - fcAdded);
        if (fcDifference >= 0) {
            const fcDaysAgo = (date - fcLastTestDate) / ONE_DAY;
            let fcDemand = fcDifference / fcDaysAgo;
            if (fcDemand > 30) {
                fcDemand = 30;
            }
            localStorage.setItem("fcDemand", fcDemand); 
        }
        refresh();
    }
    else {
        alert("Please enter a FC value between 0 and 75.");
    }
}

/* TODO - update this function */
function fcTarget() {
    const fcTarget = fcTargetInput.value;
    if (fcTarget >= 1 && fcTarget <= 50) {
        const fcLastTest = Number(localStorage.getItem("fcLastTest"));
        localStorage.setItem("fcLastTest", fcCurrentTest);
        const date = new Date();
        const fcLastTestDate = Date.parse(localStorage.getItem("fcLastTestDate"));
        localStorage.setItem("fcLastTestDate", date);
        const fcAdded = Number(localStorage.getItem("fcAdded"));
        localStorage.setItem("fcAdded", 0);

        const fcDifference = fcLastTest - (fcCurrentTest - fcAdded);
        if (fcDifference >= 0) {
            const fcDaysAgo = (date - fcLastTestDate) / ONE_DAY;
            let fcDemand = fcDifference / fcDaysAgo;
            if (fcDemand > 30) {
                fcDemand = 30;
            }
            localStorage.setItem("fcDemand", fcDemand); 
        }
        refresh();
    }
    else {
        alert("Please enter a FC value between 1 and 50.");
    }
}

function updateAutoTarget() {
    const inputElement = document.getElementById("autoTargetInput");
    let autoTarget = inputElement.checked;
    localStorage.setItem("autoTarget", autoTarget);
    
    
    let fcTarget = 5;
    if(autoTarget) {
        fcTarget = fcDemand + 5;
    }
    else {
        const strFcTarget = localStorage.getItem("fcTarget");
        if (strFcTarget) {
            fcTarget = Number(strFcTarget);
        }
    }
    localStorage.setItem("fcTarget", fcTarget);
    fcTargetInput.value = fcTarget;

    refresh();
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

function dandrLoad() {
    for (let i = 1; i < 27; i++) {
        let checked = false;
        let strItem = "step" + i;
        let strChecked = localStorage.getItem(strItem);
        
        if (strChecked) {
            checked = (strChecked == "true");
        }
        else {
            localStorage.setItem(strItem, checked);
        }
        let inputElement = document.getElementById(strItem);
        inputElement.checked = checked;
    }  
}

function dandrStore() {
    for (let i = 1; i < 27; i++) {
        let strItem = "step" + i;
        let inputElement = document.getElementById(strItem);
        checked = inputElement.checked;
        localStorage.setItem(strItem, checked);
    } 
}