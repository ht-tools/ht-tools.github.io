/* CONSTANTS */
const ONE_DAY = 1000 * 60 * 60 * 24;

/* SET ALL DEFAULT VARIABLE VALUES */
let textVars = {};
let numVars = {};
let dateVars = {};
let boolVars = {};

/* Current DateTime */
textVars['dtNow'] = "0/0/0000 00:00:00 AM"

/* Setup - Status */
boolVars['setupComplete'] = false;
textVars['setupStatus1'] = "background-color: red";
textVars['setupStatus2'] = "background-color: red";

/* CYA */
numVars['cyaLastTest'] = 0;
dateVars['cyaLastTestDate'] = createDate(0, -2, 0);
numVars['cyaPrediction'] = 0;
numVars['cyaDecay'] = 1;
numVars['cyaAdded'] = 0;
numVars['cyaDaysAgo'] = 60;
textVars['cyaStatus1'] = "background-color: red";
textVars['cyaStatus2'] = "background-color: red";
textVars['cyaDaysAgoBox'] = "border-color: black";
textVars['cyaPredictionBox'] = "border-color: black";
textVars['cyaUseDichlorBox'] = "border-color: black";
textVars['cyaUseBleachBox'] = "border-color: black";

/* FC */
numVars['fcLastTest'] = 0;
dateVars['fcLastTestDate'] = createDate(0, -2, 0);
numVars['fcPrediction'] = 0;
numVars['fcDemand'] = 2;
numVars['fcTarget'] = 5;
numVars['fcTargetBase'] = 5;
boolVars['autoTarget'] = false;
numVars['fcAddDichlor'] = 0;
numVars['fcAddBleach'] = 0;
numVars['fcAdded'] = 0;
numVars['fcDaysAgo'] = 60;
textVars['fcStatus1'] = "background-color: red";
textVars['fcStatus2'] = "background-color: red";
textVars['fcDaysAgoBox'] = "border-color: black";
textVars['fcPredictionBox'] = "border-color: black";
textVars['fcAddDichlorBox'] = "border-color: black";
textVars['fcAddBleachBox'] = "border-color: black";
textVars['fcUseDichlorBox'] = "border-color: black";
textVars['fcUseBleachBox'] = "border-color: black";

/* CC */
numVars['ccLastTest'] = 0;
dateVars['ccLastTestDate'] = createDate(0, -2, 0);
numVars['ccAddDichlor'] = 0;
numVars['ccAddBleach'] = 0;
numVars['ccRaiseFC'] = 0;
numVars['ccRaiseFC2'] = 0;
numVars['ccRaiseCYA'] = 0;
numVars['ccDaysAgo'] = 60;
textVars['ccStatus1'] = "background-color: red";
textVars['ccStatus2'] = "background-color: red";
textVars['ccTestBox'] = "border-color: black";
textVars['ccDaysAgoBox'] = "border-color: black";
textVars['ccAddDichlorBox'] = "border-color: black";
textVars['ccAddBleachBox'] = "border-color: black";
textVars['ccUseDichlorBox'] = "border-color: black";
textVars['ccUseBleachBox'] = "border-color: black";

/* pH */
numVars['phLastTest'] = 0;
dateVars['phLastTestDate'] = createDate(0, -2, 0);
numVars['acidDemand'] = 0;
numVars['baseDemand'] = 0;
numVars['phAddPhTaDown'] = 0;
numVars['phAddMuriaticAcid'] = 0;
numVars['addPhUp'] = 0;
textVars['phStatus1'] = "background-color: red";
textVars['phStatus2'] = "background-color: red";
textVars['phTestBox'] = "border-color: black";
textVars['phDaysAgoBox'] = "border-color: black";
textVars['acidDemandBox'] = "border-color: black";
textVars['baseDemandBox'] = "border-color: black";
textVars['phPhTaDownBox'] = "border-color: black";
textVars['phUpBox'] = "border-color: black";
textVars['phMuriaticBox'] = "border-color: black";

/* TA */
numVars['taLastTest'] = 0;
dateVars['taLastTestDate'] = createDate(0, -2, 0);
numVars['taDaysAgo'] = 60;
numVars['taCorrectedTest'] = 0;
numVars['taTarget'] = 50;
numVars['taAddPhTaDown'] = 0;
textVars['taPhTaDownCheck'] = '';
numVars['addTaUp'] = 0;
textVars['taUpCheck'] = '';
numVars['taAddMuriaticAcid'] = 0;
textVars['taMuriaticCheck'] = '';
textVars['taStatus1'] = "background-color: red";
textVars['taStatus2'] = "background-color: red";
textVars['taCorrTestBox'] = "border-color: black";
textVars['taDaysAgoBox'] = "border-color: black";
textVars['taPhTaDownBox'] = "border-color: black";
textVars['taMuriaticBox'] = "border-color: black";
textVars['taUpBox'] = "border-color: black";

/* CH */
numVars['chLastTest'] = 0;
dateVars['chLastTestDate'] = createDate(0, -2, 0);
numVars['chDaysAgo'] = 60;
numVars['chTarget'] = 150;
numVars['addCalcium'] = 0;
textVars['chStatus1'] = "background-color: red";
textVars['chStatus2'] = "background-color: red";
textVars['chDaysAgoBox'] = "border-color: black";
textVars['addCalciumBox'] = "border-color: black";
textVars['addCalciumCheck'] = '';

/* Filter */
dateVars['filterLastCleaned'] = createDate(0, -2, 0);
dateVars['filterLastReplaced'] = createDate(0, 0, -2);
numVars['filterCleanedDaysAgo'] = 60;
numVars['filterReplacedDaysAgo'] = 700;
textVars['filterStatus1'] = "background-color: red";
textVars['filterStatus2'] = "background-color: red";
textVars['cleanFilterBox'] = "border-color: black";
textVars['replaceFilterBox'] = "border-color: black";

/* Setup - Spa */
numVars['spaVolume'] = 400;

/* Setup - Chemicals */
numVars['dichlorStrength'] = 99;
numVars['bleachStrength'] = 10;
numVars['phTaDownStrength'] = 93;
numVars['muriaticStrength'] = 31.45;
numVars['taUpStrength'] = 100;
numVars['phUpStrength'] = 100;
numVars['calciumStrength'] = 77;
numVars['boricAcidStrength'] = 98;

/* Setup - Time Limits */
numVars['cyaDaysAgoLimit'] = 30;
numVars['fcDaysAgoLimit'] = 1;
numVars['ccDaysAgoLimit'] = 7;
numVars['phDaysAgoLimit'] = 1;
numVars['taDaysAgoLimit'] = 14;
numVars['chDaysAgoLimit'] = 30;
numVars['filterCleanedDaysAgoLimit'] = 21;
numVars['filterReplacedDaysAgoLimit'] = 365;

/* OVERWRITE DEFAULTS WITH ANY VALUES STORED IN THE BROWSER */
for (var key in textVars) {
    var value = localStorage.getItem(key);
    if (value) {
        textVars[key] = value;
    }
}

for (var key in numVars) {
    var value = localStorage.getItem(key);
    if (value) {
        numVars[key] = Number(value);
    }
}

for (var key in dateVars) {
    var value = localStorage.getItem(key);
    if (value) {
        dateVars[key] = Date.parse(value);
    }
}

for (var key in boolVars) {
    var value = localStorage.getItem(key);
    if (value) {
        boolVars[key] = (value == "true");
    }
}

window.addEventListener('load', init, false); // Call init() when page loads

/* FUNCTIONS */
function init() {

    /* CALCULATE ALL TIME-DEPENDENT VARIABLES */

    /* Current DateTime */
    const date = new Date();
    const displayDate = date.toLocaleDateString();
    const displayTime = date.toLocaleTimeString();
    textVars['dtNow'] = displayDate + " " + displayTime;
    
    /* CYA - Days Since Last Test */
    numVars['cyaDaysAgo'] = ((date - dateVars['cyaLastTestDate']) / ONE_DAY).toFixed(2);

    /* FC - Days Since Last Test */
    numVars['fcDaysAgo'] = ((date - dateVars['fcLastTestDate']) / ONE_DAY).toFixed(2);

    /* CC - Days Since Last Test */
    numVars['ccDaysAgo'] = ((date - dateVars['ccLastTestDate']) / ONE_DAY).toFixed(2);

    /* pH - Days Since Last Test */
    numVars['phDaysAgo'] = ((date - dateVars['phLastTestDate']) / ONE_DAY).toFixed(2);

    /* TA - Days Since Last Test */
    numVars['taDaysAgo'] = ((date - dateVars['taLastTestDate']) / ONE_DAY).toFixed(2);

    /* CH - Days Since Last Test */
    numVars['chDaysAgo'] = ((date - dateVars['chLastTestDate']) / ONE_DAY).toFixed(2);

    /* FILTER - Days Since Last Cleaning */
    numVars['filterCleanedDaysAgo'] = ((date - dateVars['filterLastCleaned']) / ONE_DAY).toFixed(2);
    numVars['filterReplacedDaysAgo'] = ((date - dateVars['filterLastReplaced']) / ONE_DAY).toFixed(2);

    /* CALCULATE ALL OTHER DEPENDENT VARIABLES */

    /* CYA - Current Prediction */
    numVars['cyaPrediction'] = (numVars['cyaLastTest'] - (numVars['cyaDecay'] * numVars['cyaDaysAgo']) + numVars['cyaAdded']).toFixed(2);
    if (numVars['cyaPrediction'] < 0) {
        numVars['cyaPrediction'] = 0;
    }

    /* CYA - Status Color*/
    if (numVars['cyaDaysAgo'] <= numVars['cyaDaysAgoLimit'] && numVars['cyaPrediction'] <= 50 && numVars['cyaPrediction'] >= 30) {
        textVars['cyaStatus1'] = 'background-color: green';
        textVars['cyaStatus2'] = 'background-color: green';
    }
    else {
        if (numVars['cyaDaysAgo'] > numVars['cyaDaysAgoLimit']) {
            textVars['cyaDaysAgoBox'] = 'border-color: red';
        }
        if (numVars['cyaPrediction'] < 30) {
            textVars['cyaPredictionBox'] = 'border-color: red';
            textVars['cyaUseDichlorBox'] = 'border-color: red';
        }
        if (numVars['cyaPrediction'] > 50) {
            textVars['cyaPredictionBox'] = 'border-color: red';
            textVars['cyaUseBleachBox'] = 'border-color: red';
        }
    }
    
    /* FC - Current Prediction */
    numVars['fcPrediction'] = (numVars['fcLastTest'] - (numVars['fcDemand'] * numVars['fcDaysAgo']) + numVars['fcAdded']).toFixed(2);
    if (numVars['fcPrediction'] < 0) {
        numVars['fcPrediction'] = 0;
    }
    
    /* FC - Target */
    if(boolVars['autoTarget']) {
        numVars['fcTarget'] = numVars['fcDemand'] + numVars['fcTargetBase'];
    }

    /* FC - Update Dichlor and Bleach */
    let fcDelta = numVars['fcTarget'] - numVars['fcPrediction'];
    if (fcDelta < 0.5) {
        fcDelta = 0;
    }
    
    numVars['fcAddDichlor'] = (fcDelta * 0.1032 * numVars['spaVolume'] / 400 * 99 / numVars['dichlorStrength']).toFixed(2);
    localStorage.setItem("fcAddDichlor", numVars['fcAddDichlor']);
    
    numVars['fcAddBleach'] = (fcDelta * 0.51 * numVars['spaVolume'] / 400 * 10 / numVars['bleachStrength']).toFixed(2);
    localStorage.setItem("fcAddBleach", numVars['fcAddBleach']);

    /* FC - Status Color*/
    if (numVars['fcDaysAgo'] <= numVars['fcDaysAgoLimit'] && numVars['fcPrediction'] <= 10 && numVars['fcPrediction'] >= 3) {
        textVars['fcStatus1'] = 'background-color: green';
        textVars['fcStatus2'] = 'background-color: green';
    }
    else {
        if (numVars['fcDaysAgo'] > numVars['fcDaysAgoLimit']) {
            textVars['fcDaysAgoBox'] = 'border-color: red';
        }
        if (numVars['fcPrediction'] < 3 || numVars['fcPrediction'] > 10) {
            textVars['fcPredictionBox'] = 'border-color: red';
        }
    }
    if (fcDelta > 0) {
        if (numVars['cyaPrediction'] <= 40) {
            textVars['fcAddDichlorBox'] = 'border-color: red';
            textVars['fcUseDichlorBox'] = 'border-color: red';
        }
        else { /* numVars['cyaPrediction'] > 40 */
            textVars['fcAddBleachBox'] = 'border-color: red';
            textVars['fcUseBleachBox'] = 'border-color: red';
        }
    }
    
    /* CC - Update Dichlor and Bleach */
    let fcDelta2 = numVars['ccLastTest'] * 10 - numVars['fcPrediction'];
    if (fcDelta2 < 0.5) {
        fcDelta2 = 0;
    }

    numVars['ccAddDichlor'] = (fcDelta2 * 0.1032 * numVars['spaVolume'] / 400 * 99 / numVars['dichlorStrength']).toFixed(2);
    localStorage.setItem("ccAddDichlor", numVars['ccAddDichlor']);
    
    numVars['ccRaiseFC'] = fcDelta2.toFixed(2);
    localStorage.setItem("ccRaiseFC", numVars['ccRaiseFC']);
    
    numVars['ccRaiseCYA'] = (fcDelta2 * 0.8).toFixed(2);
    localStorage.setItem('ccRaiseCYA', numVars['ccRaiseCYA']);
    
    numVars['ccAddBleach'] = (fcDelta2 * 0.51 * numVars['spaVolume'] / 400 * 10 / numVars['bleachStrength']).toFixed(2);
    localStorage.setItem("ccAddBleach", numVars['ccAddBleach']);
    
    numVars['ccRaiseFC2'] = fcDelta2.toFixed(2);
    localStorage.setItem("ccRaiseFC2", numVars['ccRaiseFC2']);

    /* CC - Status Color*/
    if (numVars['ccDaysAgo'] <= numVars['ccDaysAgoLimit'] && numVars['ccLastTest'] == 0 ) {
        textVars['ccStatus1'] = 'background-color: green';
        textVars['ccStatus2'] = 'background-color: green';
    }
    else {
        if (numVars['ccDaysAgo'] > numVars['ccDaysAgoLimit']) {
            textVars['ccDaysAgoBox'] = 'border-color: red';
        }
        if (numVars['ccLastTest'] > 0) {
            textVars['ccTestBox'] = 'border-color: red';
        }
    }
    if (fcDelta2 > 0) {
        if (numVars['cyaPrediction'] <= 40) {
            textVars['ccAddDichlorBox'] = 'border-color: red';
            textVars['ccUseDichlorBox'] = 'border-color: red';
        }
        else { /* numVars['cyaPrediction'] > 40 */
            textVars['ccAddBleachBox'] = 'border-color: red';
            textVars['ccUseBleachBox'] = 'border-color: red';
        }
    }

    /* pH - Update Acid Demand */
    numVars['phAddPhTaDown'] = (numVars['acidDemand'] * 0.49 * numVars['spaVolume'] / 400 * 93.2 / numVars['phTaDownStrength']).toFixed(2);
    localStorage.setItem("phAddPhTaDown", numVars['phAddPhTaDown']);
    
    numVars['phAddMuriaticAcid'] = (numVars['acidDemand'] * 0.37 * numVars['spaVolume'] / 400 * 31.45 / numVars['muriaticStrength']).toFixed(2);
    localStorage.setItem("phAddMuriaticAcid", numVars['phAddMuriaticAcid']);
    
    /* pH - Update Base Demand */
    numVars['addPhUp'] = (numVars['baseDemand'] * 0.21 * numVars['spaVolume'] / 400 * 100 / numVars['phUpStrength']).toFixed(2);
    localStorage.setItem("addPhUp", numVars['addPhUp']);
    
    /* pH - Status Color */
    if (numVars['phDaysAgo'] <= numVars['phDaysAgoLimit'] && numVars['phLastTest'] >= 7.4 && numVars['phLastTest'] <= 7.8) {
        textVars['phStatus1'] = 'background-color: green';
        textVars['phStatus2'] = 'background-color: green';
    }
    else {
        if (numVars['phDaysAgo'] > numVars['phDaysAgoLimit']) {
            textVars['phDaysAgoBox'] = 'border-color: red';
        }
        if (numVars['phLastTest'] < 7.4) {
            textVars['phTestBox'] = 'border-color: red';
            textVars['baseDemandBox'] = 'border-color: red';
            textVars['phUpBox'] = 'border-color: red';
        }
        if (numVars['phLastTest'] > 7.8) {
            textVars['phTestBox'] = 'border-color: red';
            textVars['acidDemandBox'] = 'border-color: red';
            textVars['phPhTaDownBox'] = 'border-color: red';
            textVars['phMuriaticBox'] = 'border-color: red';
        }
    }

    /* TA - Calculate chemicals to reach Target */
    if (numVars['taCorrectedTest'] > (numVars['taTarget'] + 10)) {
        numVars['taAddPhTaDown'] = ((numVars['taCorrectedTest'] - numVars['taTarget']) / 10 * 1.37 * numVars['spaVolume'] / 400 * 93.2 / numVars['phTaDownStrength']).toFixed(2);
        localStorage.setItem('taAddPhTaDown', numVars['taAddPhTaDown']);

        numVars['taAddMuriaticAcid'] = ((numVars['taCorrectedTest'] - numVars['taTarget']) / 10 * 1.02 * numVars['spaVolume'] / 400 * 31.45 / numVars['muriaticStrength']).toFixed(2);
        localStorage.setItem("taAddMuriaticAcid", numVars['taAddMuriaticAcid']);
    }
    else {
        if (numVars['taCorrectedTest'] < (numVars['taTarget'] - 10)) {
            numVars['addTaUp'] = ((numVars['taTarget'] - numVars['taCorrectedTest']) / 10 * 0.9 * numVars['spaVolume'] / 400 * 100 / numVars['taUpStrength']).toFixed(2);
            localStorage.setItem('addTaUp', numVars['addTaUp']);
        }
        else {
            numVars['taAddPhTaDown'] = 0;
            localStorage.setItem('taAddPhTaDown', numVars['taAddPhTaDown']);
            numVars['taAddMuriaticAcid'] = 0;
            localStorage.setItem("taAddMuriaticAcid", numVars['taAddMuriaticAcid']);
            numVars['addTaUp'] = 0;
            localStorage.setItem('addTaUp', numVars['addTaUp']);
        }
    }
    
    // TODO - TEST ALL CALCULATIONS MATCH TAYLOR POOL TABLES
    
    /* TA - Status Color */
    if (numVars['taDaysAgo'] <= numVars['taDaysAgoLimit'] && numVars['taCorrectedTest'] >= (numVars['taTarget'] - 10) && 
        numVars['taCorrectedTest'] <= (numVars['taTarget'] + 10)) {
        textVars['taStatus1'] = 'background-color: green';
        textVars['taStatus2'] = 'background-color: green';
    }
    else {
        if (numVars['taDaysAgo'] > numVars['taDaysAgoLimit']) {
            textVars['taDaysAgoBox'] = 'border-color: red';
        }
        if (numVars['taCorrectedTest'] < (numVars['taTarget'] - 10)) {
            textVars['taCorrTestBox'] = 'border-color: red';
            textVars['taUpBox'] = 'border-color: red';
        }
        if (numVars['taCorrectedTest'] > (numVars['taTarget'] + 10)) {
            textVars['taCorrTestBox'] = 'border-color: red';
            textVars['taPhTaDownBox'] = 'border-color: red';
            textVars['taMuriaticBox'] = 'border-color: red';
        }
    }

    /* CH - Update Calcium */
    let chDelta = numVars['chTarget'] - numVars['chLastTest'];
    if (chDelta < 10) {
        chDelta = 0;
    }
    numVars['addCalcium'] = (chDelta / 10 * 0.77 * numVars['spaVolume'] / 400 * 77 / numVars['calciumStrength']).toFixed(2);
    localStorage.setItem("addCalcium", numVars['addCalcium']);
    
    /* CH - Status Color*/
    if (numVars['chDaysAgo'] <= numVars['chDaysAgoLimit'] && numVars['chLastTest'] >= 150 && numVars['chLastTest'] <= 250) {
        textVars['chStatus1'] = 'background-color: green';
        textVars['chStatus2'] = 'background-color: green';
    }
    else {
        if (numVars['chDaysAgo'] > numVars['chDaysAgoLimit']) {
            textVars['chDaysAgoBox'] = 'border-color: red';
        }
        if (numVars['chLastTest'] < 150) {
            textVars['addCalciumBox'] = 'border-color: red';
        }
        if (numVars['chLastTest'] > 250) {
            textVars['chFilterCalciumBox'] = 'border-color: red';
        }
    }
    
     /* OTHER CALCULATIONS */

    /* FILTER - Status Color*/
    if (numVars['filterCleanedDaysAgo'] <= numVars['filterCleanedDaysAgoLimit'] && 
        numVars['filterReplacedDaysAgo'] <= numVars['filterReplacedDaysAgoLimit']) {
        textVars['filterStatus1'] = 'background-color: green';
        textVars['filterStatus2'] = 'background-color: green';
    }
    else {
        if (numVars['filterCleanedDaysAgo'] > numVars['filterCleanedDaysAgoLimit']) {
            textVars['cleanFilterBox'] = 'border-color: red';
        }
        if (numVars['filterReplacedDaysAgo'] > numVars['filterReplacedDaysAgoLimit']) {
            textVars['replaceFilterBox'] = 'border-color: red';
        }
    }
    
    /* SETUP - Status Color*/
    if (boolVars['setupComplete']) {
        textVars['setupStatus1'] = 'background-color: green';
        textVars['setupStatus2'] = 'background-color: green';
    }
    
    /* POPULATE ALL NUMERIC INPUT BOXES */
    inputBoxes = document.querySelectorAll('input[type="number"]');
    for (box in inputBoxes) {
        inputBoxes[box].value = numVars[inputBoxes[box].id];
    } 

    /* POPULATE ALL BOOLEAN CHECKBOXES */
    checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    for (box in checkBoxes) {
        checkBoxes[box].checked = boolVars[checkBoxes[box].id];
    } 

    /* POPULATE ALL NUMERIC INNER HTML */
    numDisplays = document.getElementsByClassName("numDisplays");
    for (display in numDisplays) {
        numDisplays[display].innerHTML = numVars[numDisplays[display].id];
    } 

    /* POPULATE ALL TEXT INNER HTML */
    textDisplays = document.getElementsByClassName("textDisplays");
    for (display in textDisplays) {
        textDisplays[display].innerHTML = textVars[textDisplays[display].id];
    } 

    /* SET ALL COLORS */
    colorDisplays = document.getElementsByClassName("colorChange");
    for (display in colorDisplays) {
        colorDisplays[display].style = textVars[colorDisplays[display].id];
    }
}



// CYA FUNCTIONS

function updateCyaTest() {
    const cyaCurrentTest = cyaLastTest.valueAsNumber;
    if (cyaCurrentTest >= 0 && cyaCurrentTest <= 200) {
        localStorage.setItem("cyaLastTest", cyaCurrentTest);
        const date = new Date();
        localStorage.setItem("cyaLastTestDate", date);
        localStorage.setItem("cyaAdded", 0);
            
        const cyaDifference = numVars['cyaLastTest'] - (cyaCurrentTest - numVars['cyaAdded']);
        if (cyaDifference >= 0) {
            numVars['cyaDaysAgo'] = (date - dateVars['cyaLastTestDate']) / ONE_DAY;
            numVars['cyaDecay'] = (cyaDifference / numVars['cyaDaysAgo']).toFixed(2);
            if (numVars['cyaDecay'] > 15) {
                numVars['cyaDecay'] = 15;
            }
            localStorage.setItem("cyaDecay", numVars['cyaDecay']); 
        }
        refresh(); 
    }
    else {
        alert("Please enter a CYA value between 0 and 200.");
    }
}

// FC FUNCTIONS

function updateFcTest() {
    const fcCurrentTest = fcLastTest.valueAsNumber;
    if (fcCurrentTest >= 0 && fcCurrentTest <= 75) {
        localStorage.setItem("fcLastTest", fcCurrentTest.toFixed(2));
        const date = new Date();
        localStorage.setItem("fcLastTestDate", date);
        localStorage.setItem("fcAdded", 0);

        const fcDifference = numVars['fcLastTest'] - (fcCurrentTest - numVars['fcAdded']);
        if (fcDifference >= 0) {
            numVars['fcDaysAgo'] = (date - dateVars['fcLastTestDate']) / ONE_DAY;
            numVars['fcDemand'] = (fcDifference / numVars['fcDaysAgo']).toFixed(2);
            if (numVars['fcDemand'] > 30) {
                numVars['fcDemand'] = 30;
            }
            localStorage.setItem("fcDemand", numVars['fcDemand']); 
        }
        refresh();
    }
    else {
        alert("Please enter a FC value between 0 and 75.");
    }
}

function updateFcTarget() {
    const value = fcTarget.valueAsNumber;
    if (value >= 1 && value <= 50) {
        numVars['fcTarget'] = value;
        numVars['fcTargetBase'] = value;

        /* Turn off auto target if target is changed */
        boolVars['autoTarget'] = false;
        localStorage.setItem("autoTarget", boolVars['autoTarget']);
        autoTarget.checked = boolVars['autoTarget'];

        localStorage.setItem("fcTarget", numVars['fcTarget']);
        localStorage.setItem("fcTargetBase", numVars['fcTargetBase']);
        
        refresh();
    }
    else {
        alert("Please enter a FC Target value between 1 and 50.");
    }
}

function updateAutoTarget() {
    const value = fcTarget.valueAsNumber;
    if (value >= 1 && value <= 50) {
        boolVars['autoTarget'] = document.getElementById("autoTarget").checked;
        localStorage.setItem("autoTarget", boolVars['autoTarget']);

        if(boolVars['autoTarget']) {
            numVars['fcTargetBase'] = value;
            numVars['fcTarget'] = numVars['fcDemand'] + numVars['fcTargetBase'];
            localStorage.setItem("fcTargetBase", numVars['fcTargetBase']);
            localStorage.setItem("fcTarget", numVars['fcTarget']);
        }
        else {
            numVars['fcTarget'] = numVars['fcTargetBase'];
            localStorage.setItem("fcTarget", numVars['fcTarget']);
        }

        refresh();
    }
    else {
        alert("Please enter a FC Target value between 1 and 50.");
    }
}

function fcAddedDichlor() {
    const value = fcAddDichlor.valueAsNumber;
    if (value >= 0) {
        const fcDelta = value / 0.1032 / numVars['spaVolume'] * 400 / 99 * numVars['dichlorStrength'];
        numVars['fcAdded'] = numVars['fcAdded'] + fcDelta;
        numVars['cyaAdded'] = numVars['cyaAdded'] + (fcDelta * 0.8);
        localStorage.setItem("fcAdded", numVars['fcAdded']);
        localStorage.setItem("cyaAdded", numVars['cyaAdded']);

        refresh();
    }
    else {
        alert("Please enter a positive value.");
    }
}

function fcAddedBleach() {
    const value = fcAddBleach.valueAsNumber;
    if (value >= 0) {
        numVars['fcAdded'] = (numVars['fcAdded'] + (value / 0.51 / numVars['spaVolume'] * 400 / 10 * numVars['bleachStrength']));
        localStorage.setItem("fcAdded", numVars['fcAdded']);
        
        refresh();
    }
    else {
        alert("Please enter a positive value.");
    }
}

// CC FUNCTIONS

function updateCcTest() {
    const ccCurrentTest = ccLastTest.valueAsNumber;
    if (ccCurrentTest >= 0 && ccCurrentTest <= 75) {
        localStorage.setItem("ccLastTest", ccCurrentTest);
        const date = new Date();
        localStorage.setItem("ccLastTestDate", date);
        
        refresh();
    }
    else {
        alert("Please enter a CC value between 0 and 75.");
    }
}

function ccAddedDichlor() {
    const value = ccAddDichlor.valueAsNumber;
    if (value >= 0) {
        const fcDelta = value / 0.1032 / numVars['spaVolume'] * 400 / 99 * numVars['dichlorStrength'];
        numVars['fcAdded'] = numVars['fcAdded'] + fcDelta;
        numVars['cyaAdded'] = numVars['cyaAdded'] + (fcDelta * 0.8);
        localStorage.setItem("fcAdded", numVars['fcAdded']);
        localStorage.setItem("cyaAdded", numVars['cyaAdded']);

        refresh();
    }
    else {
        alert("Please enter a positive value.");
    }
}

function ccAddedBleach() {
    const value = ccAddBleach.valueAsNumber;
    if (value >= 0) {
        numVars['fcAdded'] = (numVars['fcAdded'] + (value / 0.51 / numVars['spaVolume'] * 400 / 10 * numVars['bleachStrength']));
        localStorage.setItem("fcAdded", numVars['fcAdded']);
        
        refresh();
    }
    else {
        alert("Please enter a positive value.");
    }
}

// pH FUNCTIONS

function updatePhTest() { 
    const phCurrentTest = phLastTest.valueAsNumber;
    if (phCurrentTest >= 7 && phCurrentTest <= 8) {
        localStorage.setItem("phLastTest", phCurrentTest);
        const date = new Date();
        localStorage.setItem("phLastTestDate", date);

        localStorage.setItem("acidDemand", 0);
        localStorage.setItem("baseDemand", 0);
        
        refresh();
    }
    else {
        alert("Please enter a pH value between 7.0 and 8.0.");
    }
}

function updateAdTest() {
    const drops = acidDemand.valueAsNumber; 
    if (drops >= 0 && drops <= 10) {
        numVars['acidDemand'] = drops;
        localStorage.setItem('acidDemand', numVars['acidDemand']);

        refresh();
    }
    else {
        alert('Please enter a value between 0 and 10.');
    }
}

function updateBdTest() {
    const drops = baseDemand.valueAsNumber; 
    if (drops >= 0 && drops <= 10) {
        numVars['baseDemand'] = drops;
        localStorage.setItem('baseDemand', numVars['baseDemand']);

        refresh();
    }
    else {
        alert('Please enter a value between 0 and 10.');
    }
}

function phAddedPhTaDown() {
    /* const value = phAddPhTaDown.valueAsNumber; TODO - log chemical added */
    localStorage.setItem('acidDemand', 0);
    localStorage.setItem('baseDemand', 0);

    refresh();
}

function addedPhUp() {
    /* const value = addPhUp.valueAsNumber; TODO - log chemical added */
    localStorage.setItem('acidDemand', 0);
    localStorage.setItem('baseDemand', 0);

    refresh();
}

function phAddedMuriaticAcid() {
    /* const value = phAddMuriaticAcid.valueAsNumber; TODO - log chemical added */
    localStorage.setItem('acidDemand', 0);
    localStorage.setItem('baseDemand', 0);

    refresh();
}

// TA FUNCTIONS

function updateTaTest() { 
    const taCurrentTest = taLastTest.valueAsNumber;
    if (taCurrentTest >= 0 && taCurrentTest <= 500) {
        localStorage.setItem("taLastTest", taCurrentTest);
        const date = new Date();
        localStorage.setItem("taLastTestDate", date);
        let taCorrectedTest = taCurrentTest - (numVars['cyaPrediction'] * 0.33);
        if (taCorrectedTest < 0) {
            taCorrectedTest = 0;
        }
        localStorage.setItem("taCorrectedTest", taCorrectedTest);
        localStorage.setItem('taPhTaDownCheck', '');
        localStorage.setItem('taUpCheck', '');
        localStorage.setItem('taMuriaticCheck', '');

        // TA_corrected = TA_measured - (Borate_ppm * 0.17)
        
        refresh();
    }
    else {
        alert("Please enter a TA value between 0 and 500.");
    }
}

function updateTaTarget() { 
    const value = taTarget.valueAsNumber;
    if (value >= 30 && value <= 250) {
        numVars['taTarget'] = value;
        localStorage.setItem("taTarget", numVars['taTarget']);
        
        refresh();
    }
    else {
        alert("Please enter a TA Target value between 30 and 250.");
    }
}

function taAddedPhTaDown() { 
    /* const value = taAddPhTaDown.valueAsNumber; TODO - log chemical added */
    localStorage.setItem('taPhTaDownCheck', '&#10003');

    refresh();
}

function addedTaUp() {
    /* const value = addPhUp.valueAsNumber; TODO - log chemical added */
    localStorage.setItem('taUpCheck', '&#10003');

    refresh();
}

function taAddedMuriaticAcid() { 
    /* const value = phAddMuriaticAcid.valueAsNumber; TODO - log chemical added */
    localStorage.setItem('taMuriaticCheck', '&#10003');

    refresh();
}

// CH FUNCTIONS

function updateChTest() { 
    const chCurrentTest = chLastTest.valueAsNumber;
    if (chCurrentTest >= 0 && chCurrentTest <= 500) {
        localStorage.setItem("chLastTest", chCurrentTest);
        const date = new Date();
        localStorage.setItem("chLastTestDate", date);
        localStorage.setItem('addCalciumCheck', '');

        refresh();
    }
    else {
        alert("Please enter a CH value between 0 and 500.");
    }
}

function chAddedCalcium() { 
    /* const value = addCalcium.valueAsNumber; TODO - log chemical added */
    localStorage.setItem('addCalciumCheck', '&#10003');

    refresh();
}

function updateChTarget() { 
    const value = chTarget.valueAsNumber;
    if (value >= 150 && value <= 250) {
        numVars['chTarget'] = value;
        localStorage.setItem("chTarget", numVars['chTarget']);
        
        refresh();
    }
    else {
        alert("Please enter a CH Target value between 150 and 250.");
    }
}

// FILTER FUNCTIONS

function cleanedFilter() {
    localStorage.setItem("filterLastCleaned", new Date());
    refresh();
}

function replacedFilter() {
    localStorage.setItem("filterLastReplaced", new Date());
    refresh();
}

// SETUP FUNCTIONS

function updateSetupStatus() {
    boolVars['setupComplete'] = document.getElementById("setupComplete").checked;
    localStorage.setItem("setupComplete", boolVars['setupComplete']);
    refresh();
}

function storeSpa() {
    const collection = document.getElementsByClassName("spaList");
    for (let i = 0; i < collection.length; i++) {
        localStorage.setItem(collection[i].id, collection[i].value);
    } 
    refresh();
}

function storeChem() {
    const collection = document.getElementsByClassName("chemList");
    for (let i = 0; i < collection.length; i++) {
        localStorage.setItem(collection[i].id, collection[i].value);
    }
    refresh(); 
}

function storeTimeLimit() {
    const collection = document.getElementsByClassName("timeLimitList");
    for (let i = 0; i < collection.length; i++) {
        localStorage.setItem(collection[i].id, collection[i].value);
    }
    refresh(); 
}

// OTHER FUNCTIONS
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