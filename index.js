/* CONSTANTS */
const ONE_DAY = 1000 * 60 * 60 * 24; // milliseconds in one day
const ONE_HOUR = 1000 * 60 * 60; // milliseconds in one hour
const ONE_MINUTE = 1000 * 60; // milliseconds in one minute
const ADJUST_FC_TEXT = 'Add Chemicals to hit Target'; 

/* SET ALL DEFAULT VARIABLE VALUES */
let textVars = {};
let numVars = {};
let dateVars = {};
let boolVars = {};

let chemicalPrefixes = ['Dichlor', 'Bleach', 'PhTaDown', 'MuriaticAcid', 'TaUp', 'PhUp', 'Calcium'];

/* Current DateTime */
textVars['dtNow'] = "0/0/0000 00:00:00 AM";
textVars['nothingNeeded'] = '';
textVars['fcTargetText'] = ADJUST_FC_TEXT;

/* Setup - Status */
boolVars['showAll'] = false;
boolVars['showca'] = true; // Always show CYA
boolVars['caVisible'] = false;
boolVars['showfc'] = true; // Always show FC
boolVars['fcVisible'] = false;
boolVars['showcc'] = true; // Always show CC
boolVars['ccVisible'] = false;
boolVars['showph'] = true; // Always show pH
boolVars['phVisible'] = false;
boolVars['showad'] = false;
boolVars['adVisible'] = false;
boolVars['showbd'] = false;
boolVars['bdVisible'] = false;
boolVars['showta'] = true; // Always show TA
boolVars['taVisible'] = false;
boolVars['showch'] = true; // Always show CH
boolVars['chVisible'] = false;
boolVars['showSpaVolume'] = true; // Always show Spa Volume
boolVars['showFilterCleaned'] = true; // Always show Filter Cleaned
boolVars['showDichlor'] = false;
boolVars['DichlorVisible'] = false;
boolVars['showBleach'] = false;
boolVars['BleachVisible'] = false;
boolVars['showPhTaDown'] = false;
boolVars['PhTaDownVisible'] = false;
boolVars['showMuriaticAcid'] = false;
boolVars['MuriaticAcidVisible'] = false;
boolVars['showTaUp'] = false;
boolVars['TaUpVisible'] = false;
boolVars['showPhUp'] = false;
boolVars['PhUpVisible'] = false;
boolVars['showCalcium'] = false;
boolVars['CalciumVisible'] = false;
boolVars['testHeaderVisible'] = false;
boolVars['chemicalHeaderVisible'] = false;
boolVars['maintenanceHeaderVisible'] = false;
boolVars['adjustTA'] = false;

/* CYA */
numVars['caLastValue'] = 0;
dateVars['caLastTestDate'] = createDate(0, -2, 0);
numVars['caPrediction'] = 0;
numVars['caAdded'] = 0;
numVars['caDaysAgo'] = 60;

/* FC */
numVars['fcLastValue'] = 0;
dateVars['fcLastTestDate'] = createDate(-7, 0, 0); 
dateVars['fcLastModifiedDate'] = createDate(-7, 0, 0);
numVars['fcPrediction'] = 0;
numVars['fcDecayK'] = 8.02e-9; // Default decay constant for 10 to 5 ppm FC loss in 1 day
numVars['fcHalfLife'] = 1; // Default half-life in days
numVars['fcTarget'] = 5;
numVars['fcTargetOld'] = 5; // Store old value for comparison
numVars['addDichlor'] = 0;
numVars['fcAddBleach'] = 0;
numVars['fcMin'] = 3;
numVars['fcMax'] = 5;

/* CC */
numVars['ccLastValue'] = 0;
dateVars['ccLastTestDate'] = createDate(0, -2, 0);
numVars['ccDaysAgo'] = 60;

/* pH */
numVars['phLastValue'] = 7.6;
dateVars['phLastTestDate'] = createDate(-7, 0, 0);
numVars['adLastValue'] = 0;
numVars['bdLastValue'] = 0;
numVars['addPhTaDown'] = 0;
numVars['addMuriaticAcid'] = 0;
numVars['addPhUp'] = 0;

/* TA */
numVars['taNewTestDisplay'] = 0;
numVars['taLastValue'] = 50;
dateVars['taLastTestDate'] = createDate(0, -2, 0);
numVars['taTarget'] = 50;
numVars['addTaUp'] = 0;

/* CH */
numVars['chLastValue'] = 150;
dateVars['chLastTestDate'] = createDate(0, -2, 0);
numVars['chDaysAgo'] = 60;
numVars['chTarget'] = 150;
numVars['addCalcium'] = 0;

/* Maintenance */
dateVars['spaVolumeLastConfirmed'] = createDate(0, -2, 0);
dateVars['filterLastCleaned'] = createDate(0, -2, 0);
numVars['spaVolumeDaysAgo'] = 60;
numVars['filterCleanedDaysAgo'] = 60;

/* Setup - Spa */
numVars['spaVolume'] = 400;

/* Setup - Chemicals */
numVars['dichlorStrength'] = 99;
textVars['dichlorMessage'] = 'Dichlor';
numVars['bleachStrength'] = 10;
textVars['bleachMessage'] = 'Bleach';
numVars['phTaDownStrength'] = 93;
numVars['muriaticStrength'] = 14.5;
numVars['taUpStrength'] = 100;
numVars['phUpStrength'] = 100;
numVars['calciumStrength'] = 100;

let timer = null;

window.addEventListener('load', init, false); // Call init() when page loads

/* FUNCTIONS */
function init() {
    if (timer) {
        clearTimeout(timer);
    }
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

    /* CALCULATE ALL TIME-DEPENDENT VARIABLES */

    /* Current DateTime */
    const date = new Date();
    let displayDate = date.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
    let displayTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    textVars['dtNow'] = displayDate + ", " + displayTime;
    
    /* CYA - Days Since Last Test */
    numVars['caDaysAgo'] = (date - dateVars['caLastTestDate']) / ONE_DAY;
    document.getElementById("caMeter").value = numVars['caDaysAgo'];

    /* FC - Days Since Last Test */
    numVars['fcTestedDaysAgo'] = (date - dateVars['fcLastTestDate']) / ONE_DAY;
    document.getElementById("fcMeter").value = numVars['fcTestedDaysAgo'];

    /* FC - Days Since Last Modification */
    numVars['fcModifiedDaysAgo'] = (date - dateVars['fcLastModifiedDate']) / ONE_DAY;
    
    /* CC - Days Since Last Test */
    numVars['ccDaysAgo'] = (date - dateVars['ccLastTestDate']) / ONE_DAY;
    document.getElementById("ccMeter").value = numVars['ccDaysAgo'];

    /* pH - Days Since Last Test */
    numVars['phDaysAgo'] = (date - dateVars['phLastTestDate']) / ONE_DAY;
    document.getElementById("phMeter").value = numVars['phDaysAgo'];

    /* CH - Days Since Last Test */
    numVars['chDaysAgo'] = (date - dateVars['chLastTestDate']) / ONE_DAY;
    document.getElementById("chMeter").value = numVars['chDaysAgo'];

    /* MAINTENANCE - Days Since Last Action */
    numVars['spaVolumeDaysAgo'] = (date - dateVars['spaVolumeLastConfirmed']) / ONE_DAY;
    document.getElementById("svMeter").value = numVars['spaVolumeDaysAgo'];

    numVars['filterCleanedDaysAgo'] = (date - dateVars['filterLastCleaned']) / ONE_DAY;
    document.getElementById("filterMeter").value = numVars['filterCleanedDaysAgo'];
    
    /* CALCULATE ALL OTHER DEPENDENT VARIABLES */

    /* CYA - Current Prediction */
    numVars['caPrediction'] = numVars['caLastValue'] + numVars['caAdded']; 
    if (numVars['caPrediction'] < 0) {
        numVars['caPrediction'] = 0;
    }
    if (numVars['caPrediction'] > 90) {
        numVars['fcMin'] = 11;
        numVars['fcMax'] = 13;
        numVars['fcSlamTarget'] = 39;
    } else {
        if (numVars['caPrediction'] > 80) {
            numVars['fcMin'] = 10;
            numVars['fcMax'] = 12;
            numVars['fcSlamTarget'] = 35;
        } else {
            if (numVars['caPrediction'] > 70) {
                numVars['fcMin'] = 9;
                numVars['fcMax'] = 11;
                numVars['fcSlamTarget'] = 31;
            } else {
                if (numVars['caPrediction'] > 60) {
                    numVars['fcMin'] = 8;
                    numVars['fcMax'] = 10;
                    numVars['fcSlamTarget'] = 28;
                } else {
                    if (numVars['caPrediction'] > 50) {
                        numVars['fcMin'] = 7;
                        numVars['fcMax'] = 9;
                        numVars['fcSlamTarget'] = 24;
                    } else {
                        if (numVars['caPrediction'] > 40) {
                            numVars['fcMin'] = 6;
                            numVars['fcMax'] = 8;
                            numVars['fcSlamTarget'] = 20;
                        } else {
                            if (numVars['caPrediction'] > 30) {
                                numVars['fcMin'] = 5;
                                numVars['fcMax'] = 7;
                                numVars['fcSlamTarget'] = 16;
                            } else {
                                if (numVars['caPrediction'] > 20) {
                                    numVars['fcMin'] = 4;
                                    numVars['fcMax'] = 6;
                                    numVars['fcSlamTarget'] = 12;
                                } else {
                                    numVars['fcMin'] = 3;
                                    numVars['fcMax'] = 5;
                                    numVars['fcSlamTarget'] = 10;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    // Ensure Target FC is >= new FC Max value based on CYA
    if (textVars['fcTargetText'] == ADJUST_FC_TEXT) {
        if (numVars['fcTarget'] < numVars['fcMax']) {
            numVars['fcTarget'] = numVars['fcMax'];
            numVars['fcTargetOld'] = numVars['fcTarget']; // Store old value for comparison
            localStorage.setItem("fcTargetOld", numVars['fcTargetOld']);
        }
    } else {
        numVars['fcTarget'] = numVars['fcSlamTarget'];
    }
    localStorage.setItem("fcTarget", numVars['fcTarget']);

    /* FC - Current Prediction */
    // N(t) = N0 * e^(-kt)
    nMilliseconds = numVars['fcModifiedDaysAgo'] * ONE_DAY; // milliseconds since last test
    numVars['fcPrediction'] = numVars['fcLastValue'] * Math.exp(-numVars['fcDecayK'] * nMilliseconds);
    if (Number(numVars['fcPrediction']).toFixed(1) > numVars['fcTarget']) {
        document.getElementById("fc_chart").src="./images/fc_high.png";
    } else if (Number(numVars['fcPrediction']).toFixed(1) > numVars['fcMax']) {
        document.getElementById("fc_chart").src="./images/fc_target.png";
    } else if (Number(numVars['fcPrediction']).toFixed(1) >= numVars['fcMin']) {
        document.getElementById("fc_chart").src="./images/fc_ideal.png";
    } else {
        document.getElementById("fc_chart").src="./images/fc_low.png";
    }
    
    // FC - Ideal Start and End Dates
    // ln(N(t) / N0) / -k = t
    let dateLastModified = new Date(dateVars['fcLastModifiedDate']);
    let dateStartIdeal = new Date();
    let dateEndIdeal = new Date();
    if (Number(numVars['fcLastValue']) > 0) {
        dateStartIdeal = new Date(dateLastModified.getTime() + Math.log(numVars['fcMax'] / numVars['fcLastValue']) / -numVars['fcDecayK']);
        dateEndIdeal = new Date(dateLastModified.getTime() + Math.log(numVars['fcMin'] / numVars['fcLastValue']) / -numVars['fcDecayK']);
    } 
    textVars['fcStartIdeal'] = dateStartIdeal.toLocaleString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    let timeDelta = date.getTime() - dateEndIdeal.getTime(); //milliseconds since last test
    if (timeDelta > ONE_DAY) {
        textVars['fcEndIdeal'] = 'for ' + (timeDelta / ONE_DAY).toFixed(1) + ' days';
    } else if (timeDelta > ONE_HOUR) {
        textVars['fcEndIdeal'] = 'for ' + (timeDelta / ONE_HOUR).toFixed(1) + ' hours';
    } else if (timeDelta > 0) { 
        textVars['fcEndIdeal'] = 'for ' + (timeDelta / ONE_MINUTE).toFixed(0) + ' minutes';
    } else if (timeDelta < -ONE_DAY) {
        textVars['fcEndIdeal'] = 'in ' + (-timeDelta / ONE_DAY).toFixed(1) + ' days';
    } else if (timeDelta < -ONE_HOUR) {
        textVars['fcEndIdeal'] = 'in ' + (-timeDelta / ONE_HOUR).toFixed(1) + ' hours';
    } else {
        textVars['fcEndIdeal'] = 'in ' + (-timeDelta / ONE_MINUTE).toFixed(0) + ' minutes';
    }
    
    // FC - TARGET - Start and End Dates
    // ln(N(t) / N0) / -k = t
    let dateTargetStartIdeal = new Date(date.getTime() + Math.log(numVars['fcMax'] / numVars['fcTarget']) / -numVars['fcDecayK']);
    let dateTargetEndIdeal = new Date(date.getTime() + Math.log(numVars['fcMin'] / numVars['fcTarget']) / -numVars['fcDecayK']);
    textVars['fcTargetStartIdeal'] = dateTargetStartIdeal.toLocaleString([], { month: '2-digit', day: '2-digit'}) + ' ' + (dateTargetStartIdeal.getHours() >= 12 ? 'PM' : 'AM'); //hour: '2-digit', minute: '2-digit' 
    textVars['fcTargetEndIdeal'] = dateTargetEndIdeal.toLocaleString([], { month: '2-digit', day: '2-digit'}) + ' ' + (dateTargetEndIdeal.getHours() >= 12 ? 'PM' : 'AM'); //hour: '2-digit', minute: '2-digit'

    /* Dichlor and Bleach Amount to Add*/
    let fcTargetDelta = numVars['fcTarget'] - numVars['fcPrediction'];
    if (fcTargetDelta < 0.5) {
        fcTargetDelta = 0;
    }
    const fcAddDichlor = fcTargetDelta * 0.1032 * numVars['spaVolume'] / 400 * 99 / numVars['dichlorStrength'];
    const fcAddBleach = fcTargetDelta * 0.51 * numVars['spaVolume'] / 400 * 10 / numVars['bleachStrength'];
    
    if (numVars['caPrediction'] <= 40) { // CYA is low enough to use Dichlor
        numVars['addDichlor'] = fcAddDichlor; // Use the max amount of Dichlor calculated
        numVars['addBleach'] = '0.00'; // Don't use bleach if CYA is low
    }
    else { // CYA is high enough to use Bleach
        numVars['addDichlor'] = '0.00'; // Don't use Dichlor if CYA is high
        numVars['addBleach'] = fcAddBleach; // Use the max amount of Bleach calculated
    }
    localStorage.setItem("addDichlor", numVars['addDichlor']);
    localStorage.setItem("addBleach", numVars['addBleach']);

    // TA & PH (only one should be active at a time)
    numVars['addTaUp'] = '0.00';
    numVars['addPhUp'] = '0.00';
    numVars['addPhTaDown'] = '0.00';
    numVars['addMuriaticAcid'] = '0.00';

    // TA UP
    if (numVars['taLastValue'] < (numVars['taTarget'] - 10)) {
        numVars['addTaUp'] = ((numVars['taTarget'] - numVars['taLastValue']) / 10 * 0.9 * numVars['spaVolume'] / 400 * 100 / numVars['taUpStrength']);
    }
    else {
        // PH TA DOWN
        const phAddPhTaDown = numVars['adLastValue'] * 0.49 * numVars['spaVolume'] / 400 * 93.2 / numVars['phTaDownStrength'];
        const phAddMuriaticAcid = numVars['adLastValue'] * 0.37 * numVars['spaVolume'] / 400 * 31.45 / numVars['muriaticStrength'];
        let taAddPhTaDown = 0;
        let taAddMuriaticAcid = 0;
        if (numVars['taLastValue'] > (numVars['taTarget'] + 10)) {
            taAddPhTaDown = (numVars['taLastValue'] - numVars['taTarget']) / 10 * 1.37 * numVars['spaVolume'] / 400 * 93.2 / numVars['phTaDownStrength'];
            taAddMuriaticAcid = (numVars['taLastValue'] - numVars['taTarget']) / 10 * 1.02 * numVars['spaVolume'] / 400 * 31.45 / numVars['muriaticStrength'];
        }
        if (taAddPhTaDown > phAddPhTaDown) {
            numVars['addPhTaDown'] = taAddPhTaDown;
            numVars['addMuriaticAcid'] = taAddMuriaticAcid;
            boolVars['adjustTA'] = true; 
        }
        else {
            numVars['addPhTaDown'] = phAddPhTaDown;
            numVars['addMuriaticAcid'] = phAddMuriaticAcid;
            boolVars['adjustTA'] = false; 
        }
        
        // PH UP
        if (numVars['addPhTaDown'] == 0) {
            numVars['addPhUp'] = (numVars['bdLastValue'] * 0.21 * numVars['spaVolume'] / 400 * 100 / numVars['phUpStrength']);
        }
    }
    localStorage.setItem('addTaUp', numVars['addTaUp']);
    localStorage.setItem('addPhUp', numVars['addPhUp']);
    localStorage.setItem('addPhTaDown', numVars['addPhTaDown']);
    localStorage.setItem('addMuriaticAcid', numVars['addMuriaticAcid']);
    localStorage.setItem('adjustTA', boolVars['adjustTA']);

    /* CH - Update Calcium */
    let chDelta = numVars['chTarget'] - numVars['chLastValue'];
    if (chDelta < 10) {
        chDelta = 0;
    }
    numVars['addCalcium'] = (chDelta / 10 * 0.77 * numVars['spaVolume'] / 400 * 77 / numVars['calciumStrength']);
    localStorage.setItem("addCalcium", numVars['addCalcium']);

    /* POPULATE ALL NUMERIC INPUT BOXES */
    inputBoxes = document.getElementsByClassName("numInputs2");
    for (box in inputBoxes) {
        inputBoxes[box].value = formatNumber(Number(numVars[inputBoxes[box].id])); //.toFixed(2);
    } 

    inputBoxes = document.getElementsByClassName("numInputs5");
    for (box in inputBoxes) {
        inputBoxes[box].value = (Math.round(Number(numVars[inputBoxes[box].id]) * 2) / 2).toFixed(1);
    } 

    inputBoxes = document.getElementsByClassName("numInputs0");
    for (box in inputBoxes) {
        inputBoxes[box].value = Number(numVars[inputBoxes[box].id]).toFixed(0);
    } 

    inputBoxes = document.getElementsByClassName("numInputs1");
    for (box in inputBoxes) {
        inputBoxes[box].value = Number(numVars[inputBoxes[box].id]).toFixed(1);
    }

    /* POPULATE ALL BOOLEAN CHECKBOXES */
    checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    for (box in checkBoxes) {
        checkBoxes[box].checked = boolVars[checkBoxes[box].id];
    } 

    /* POPULATE ALL NUMERIC INNER HTML */
    numDisplays = document.getElementsByClassName("numDisplays");
    for (display in numDisplays) {
        numDisplays[display].innerHTML = formatNumber(Number(numVars[numDisplays[display].id])); 
    } 

    numDisplays = document.getElementsByClassName("numDisplays1");
    for (display in numDisplays) {
        numDisplays[display].innerHTML = Number(numVars[numDisplays[display].id]).toFixed(1);
    } 

    numDisplays = document.getElementsByClassName("numDisplays0");
    for (display in numDisplays) {
        numDisplays[display].innerHTML = Number(numVars[numDisplays[display].id]).toFixed(0);
    } 

    /* POPULATE ALL TEXT INNER HTML */
    textDisplays = document.getElementsByClassName("textDisplays");
    for (display in textDisplays) {
        textDisplays[display].innerHTML = textVars[textDisplays[display].id];
    } 

    // SELECT ROWS TO HIDE

    for (prefix in chemicalPrefixes) {
        displayChemicalRow(chemicalPrefixes[prefix]);
    }
    
    // AD
    boolVars['adVisible'] = boolVars['showAll'] || boolVars['showad'];
    if (boolVars['adVisible']) {
        document.getElementById('adRow').style.display = 'table-row';
        setTimeout(function(){document.getElementById('adRow').style.opacity = 1}, 1);
    }
    else {
        document.getElementById('adRow').style.opacity = 0;
        setTimeout(function(){document.getElementById('adRow').style.display = 'none'}, 2000);
    }

    // BD
    boolVars['bdVisible'] = boolVars['showAll'] || boolVars['showbd'];
    if (boolVars['bdVisible']) {
        document.getElementById('bdRow').style.display = 'table-row';
        setTimeout(function(){document.getElementById('bdRow').style.opacity = 1}, 1);
    }
    else {
        document.getElementById('bdRow').style.opacity = 0;
        setTimeout(function(){document.getElementById('bdRow').style.display = 'none'}, 2000);
    }

    hideChemicalHeader();
    
    timer = setTimeout(init, ONE_MINUTE); // Refresh every 1 minute
    
}

// FUNCTIONS
function hideChemicalHeader() {
    if (    boolVars['DichlorVisible'] || boolVars['BleachVisible'] || boolVars['PhTaDownVisible'] || 
            boolVars['MuriaticAcidVisible'] || boolVars['TaUpVisible'] || boolVars['PhUpVisible'] || 
            boolVars['CalciumVisible']) {
        boolVars['chemicalHeaderVisible'] = true;
        document.getElementById('chemicalHeaderRow').style.display = 'table-row';
        setTimeout(function(){document.getElementById('chemicalHeaderRow').style.opacity = 1}, 1);
        document.getElementById('noneNeeded').innerHTML = '';
    }
    else {
        boolVars['chemicalHeaderVisible'] = false;
        document.getElementById('chemicalHeaderRow').style.opacity = 0;
        setTimeout(function(){document.getElementById('chemicalHeaderRow').style.display = 'none'}, 2000); 
        document.getElementById('noneNeeded').innerHTML = 'None needed.';
    }
}

function displayChemicalRow(prefix) {
    boolVars[prefix + 'Visible'] = boolVars['showAll'] || boolVars['show' + prefix] || numVars['add' + prefix] > 0;
    if (boolVars[prefix + 'Visible']) {
        document.getElementById(prefix + 'Row').style.display = 'table-row';
        setTimeout(function(){document.getElementById(prefix + 'Row').style.opacity = 1}, 1);
    }
    else {
        document.getElementById(prefix + 'Row').style.opacity = 0;
        setTimeout(function(){document.getElementById(prefix + 'Row').style.display = 'none'}, 2000);
    }
}

// TEST - ALL

function updateTest(sPrefix/*, sDaysAgoLimitId = false*/) {
    const newTest = document.getElementById(sPrefix + 'NewTest');
    const newValue = Number(newTest.value);
    const date = new Date();
    
    if (sPrefix == 'fc') {
        if ((newValue > 0) && (newValue < numVars['fcLastValue'])) {
            // N(t) = N0 * e^(-kt)
            let dateLastModified = new Date(dateVars['fcLastModifiedDate']);
            let t = date.getTime() - dateLastModified.getTime(); //milliseconds since last test
            let N_t = newValue;
            let N_0 = numVars['fcLastValue']; // + numVars['fcAdded'];
            let k = Math.log(N_0 / N_t) / t;
            let halfLife = Math.log(2) / k / ONE_DAY; // in days
            numVars['fcDecayK'] = k;
            localStorage.setItem('fcDecayK', numVars['fcDecayK']);
            numVars['fcHalfLife'] = halfLife;
            localStorage.setItem('fcHalfLife', numVars['fcHalfLife']);
        }
    }
    
    numVars[sPrefix + 'LastValue'] = newValue;
    localStorage.setItem(sPrefix + 'LastValue', numVars[sPrefix + 'LastValue']);

    dateVars[sPrefix + 'LastTestDate'] = date;
    localStorage.setItem(sPrefix + 'LastTestDate', dateVars[sPrefix + 'LastTestDate']);

    if (sPrefix == 'fc') {
        dateVars['fcLastModifiedDate'] = date;
        localStorage.setItem('fcLastModifiedDate', dateVars['fcLastModifiedDate']);
    }

    numVars[sPrefix + 'Added'] = 0; 
    localStorage.setItem(sPrefix + 'Added', numVars[sPrefix + 'Added']);

    if (sPrefix == 'cc') {
        if (numVars['ccLastValue'] > 0.5) {
            numVars['fcTarget'] = numVars['fcSlamTarget'];
            textVars['fcTargetText'] = 'Hold this Target until CC Test &le; 0.5 ppm';
        } else {
            numVars['fcTarget'] = numVars['fcTargetOld'];
            textVars['fcTargetText'] = ADJUST_FC_TEXT;
        }
        localStorage.setItem('fcTarget', numVars['fcTarget']);
        localStorage.setItem('fcTargetText', textVars['fcTargetText']);
    }

    if (sPrefix == 'ph') {
        boolVars['showph'] = false;
        localStorage.setItem('showph', boolVars['showph']);

        if (numVars['phLastValue'] > 7.8) { 
            boolVars['showad'] = true;
        }
        else {
            boolVars['showad'] = false;
            
        }
        localStorage.setItem('showad', boolVars['showad']);

        if (numVars['phLastValue'] < 7.4) {
            boolVars['showbd'] = true;
        }
        else {
            boolVars['showbd'] = false; 
        }
        localStorage.setItem('showbd', boolVars['showbd']);
    }

    if (sPrefix == 'ad') {
        boolVars['showad'] = false;
        localStorage.setItem('showad', boolVars['showad']);
    }

    if (sPrefix == 'bd') {
        boolVars['showbd'] = false;
        localStorage.setItem('showbd', boolVars['showbd']);
    }
    
    let units = ' ppm';
    if (sPrefix == 'ph') {
        units = '';
    } else if (sPrefix == 'ad' || sPrefix == 'bd') {
        units = '  drops';
    }
    let prefix = sPrefix.toUpperCase();
    if (prefix == 'CA') {
        prefix = 'CYA';
    }

    if (sPrefix == 'fc') {
        logActivity('Tested ' + prefix, formatNumber(newValue) + units, 'FC Half Life: ' + formatNumber(numVars['fcHalfLife']) + ' days');
    } else {
        logActivity('Tested ' + prefix, formatNumber(newValue) + units);
    }
    refresh();
}

// ADD - DICHLOR

function addedDichlor() {
    const value = addDichlor.valueAsNumber;
    if (value >= 0) {
        refresh(); // Forces recalculation of fcPrediction and caPrediction, 
        // including correction for decay causing Predicted value to go negative,
        // immediately before adding the value in case it's been a while since the last refresh.
        const fcDelta = value / 0.1032 / numVars['spaVolume'] * 400 / 99 * numVars['dichlorStrength'];
        numVars['caAdded'] = numVars['caAdded'] + (fcDelta * 0.9);
        
        // N(t) = N0 * e^(-kt)
        // Add fcAdded to predicted value and store as LastTest value
        numVars['fcLastValue'] = numVars['fcPrediction'] + fcDelta; 
        dateVars['fcLastModifiedDate'] = new Date(); // milliseconds since epoch

        localStorage.setItem('caAdded', numVars['caAdded']);
        localStorage.setItem('fcLastValue', numVars['fcLastValue']);
        localStorage.setItem('fcLastModifiedDate', dateVars['fcLastModifiedDate']);

        logActivity(
            'Added ' + numVars['dichlorStrength'] + '% Dichlor', 
            formatNumber(value) + ' oz', 
            'Increased FC by ' + formatNumber(fcDelta) + ' ppm and CYA by ' + formatNumber(fcDelta * 0.9) + ' ppm. ' +
            'Estimated CYA is now ' + (Number(numVars['caLastValue']) + Number(numVars['caAdded'])).toFixed(0) + ' ppm.'
        );
        
        refresh();
    }
}

// ADD - BLEACH

function addedBleach() {
    const value = addBleach.valueAsNumber;
    if (value >= 0) {
        refresh(); // Forces recalculation of fcPrediction and caPrediction, 
        // including correction for decay causing Predicted value to go negative,
        // immediately before adding the value in case it's been a while since the last refresh.
        const fcDelta = value / 0.51 / numVars['spaVolume'] * 400 / 10 * numVars['bleachStrength'];
        
        // N(t) = N0 * e^(-kt)
        // Add fcAdded to predicted value and store as LastTest value
        numVars['fcLastValue'] = numVars['fcPrediction'] + fcDelta; 
        dateVars['fcLastModifiedDate'] = new Date(); // milliseconds since epoch

        localStorage.setItem('fcLastValue', numVars['fcLastValue']);
        localStorage.setItem('fcLastModifiedDate', dateVars['fcLastModifiedDate']);
        
        logActivity(
            'Added ' + numVars['bleachStrength'] + '% Bleach', 
            formatNumber(value) + ' fl oz', 
            'Increased FC by ' + formatNumber(fcDelta) + ' ppm'
        );
        
        refresh();
    }
}

// ADD - pH/TA DOWN

function addedPhTaDown() {
    const value = addPhTaDown.valueAsNumber;
    if (value >= 0) {
        let note = 'Decreased pH';
        if (boolVars['adjustTA']) {
            const taDelta = value * 10 / 1.37 / numVars['spaVolume'] * 400 / 93.2 * numVars['phTaDownStrength'];
            note = 'Decreased TA by ' + formatNumber(taDelta) + ' ppm';
            numVars['taLastValue'] = numVars['taLastValue'] - taDelta;
            localStorage.setItem('taLastValue', numVars['taLastValue']);
        }
        
        localStorage.setItem('adLastValue', 0);
        boolVars['showph'] = true;
        localStorage.setItem('showph', boolVars['showph']);

        logActivity(
            'Added ' + numVars['phTaDownStrength'] + '% Sodium Bisulfate', 
            formatNumber(value) + ' oz', 
            note
        );
        
        refresh();
    }
}

// ADD - MURIATIC ACID

function addedMuriaticAcid() {
    const value = addMuriaticAcid.valueAsNumber;
    if (value >= 0) {
        let note = 'Decreased pH';
        if (boolVars['adjustTA']) {
            const taDelta = value * 10 / 1.02 / numVars['spaVolume'] * 400 / 31.45 * numVars['muriaticStrength'];
            note = 'Decreased TA by ' + formatNumber(taDelta) + ' ppm';
            numVars['taLastValue'] = numVars['taLastValue'] - taDelta;
            localStorage.setItem('taLastValue', numVars['taLastValue']);
        }
                
        localStorage.setItem('adLastValue', 0);
        boolVars['showph'] = true;
        localStorage.setItem('showph', boolVars['showph']);
        
        logActivity(
            'Added ' + numVars['muriaticStrength'] + '% Muriatic Acid', 
            formatNumber(value) + ' fl oz', 
            note
        );
        
        refresh();
    }
}

// ADD - TA UP

function addedTaUp() {
    const value = addTaUp.valueAsNumber;
    if (value >= 0) {
        const taDelta = value * 10 / 0.9 / numVars['spaVolume'] * 400 / 100 * numVars['taUpStrength'];
        numVars['taLastValue'] = numVars['taLastValue'] + taDelta;
        localStorage.setItem('taLastValue', numVars['taLastValue']);
        
        localStorage.setItem('bdLastValue', 0);
        
        boolVars['showph'] = true;
        localStorage.setItem('showph', boolVars['showph']);
        
        logActivity(
            'Added ' + numVars['taUpStrength'] + '% Sodium Bicarbonate', 
            formatNumber(value) + ' oz', 
            'Increased TA by ' + formatNumber(taDelta) + ' ppm'
        );
        
        refresh();
    }
}

// ADD - pH UP

function addedPhUp() {
    const value = addPhUp.valueAsNumber;
    if (value >= 0) {
        localStorage.setItem('bdLastValue', 0);
        
        boolVars['showph'] = true;
        localStorage.setItem('showph', boolVars['showph']);
        
        logActivity(
            'Added ' + numVars['phUpStrength'] + '% Sodium Carbonate', 
            formatNumber(value) + ' oz', 
            'Increased pH'
        );
        
        refresh();
    }
}

// ADD - CALCIUM

function addedCalcium() { 
    const value = addCalcium.valueAsNumber;
    if (value >= 0) {
        const chDelta = value * 10 / 0.77 / numVars['spaVolume'] * 400 / 77 * numVars['calciumStrength'];
        numVars['chLastValue'] = numVars['chLastValue'] + chDelta;
        localStorage.setItem('chLastValue', numVars['chLastValue']);
        
        logActivity(
            'Added ' + numVars['calciumStrength'] + '% Calcium Chloride', 
            formatNumber(value) + ' oz', 
            'Increased CH by ' + formatNumber(chDelta) + ' ppm'
        );
        
        refresh();
    }
}

// MAINTAIN - SPA VOLUME

function confirmedSpaVolume() {
    numVars['spaVolume'] = spaVolume.valueAsNumber;
    localStorage.setItem("spaVolume", numVars['spaVolume']);
    localStorage.setItem('spaVolumeLastConfirmed', new Date());
    
    logActivity(
        'Confirmed Spa Volume', 
        formatNumber(numVars['spaVolume']) + ' gallons'
    );
    
    refresh();
}

// MAINTAIN - FILTER CLEANED

function cleanedFilter() {
    localStorage.setItem('filterLastCleaned', new Date());
    
    logActivity(
        'Cleaned Filter'
    );
    
    refresh();
}

// OTHER FUNCTIONS
function refresh() {
    init();
}

function createDate(days, months, years) {
    var date = new Date(); 
    date.setDate(date.getDate() + days);
    date.setMonth(date.getMonth() + months);
    date.setFullYear(date.getFullYear() + years);
    return date;    
}

function storeShowAll() {
    const element = document.getElementById('showAll');
    if (element) {
        localStorage.setItem('showAll', element.checked);
    }
    refresh();
}

function updateTaCorrectedTest() {
    const value = taUncorrectedTest.valueAsNumber;
    if (!isNaN(value)) {
        let correctedValue = value - (numVars['caPrediction'] * 0.33);
        if (correctedValue < 0) {
            correctedValue = 0;
        }
        if (correctedValue > 500) {
            correctedValue = 500;
        }
        document.getElementById('taNewTestDisplay').innerHTML = correctedValue.toFixed(0);
        document.getElementById('taNewTest').value = Number(correctedValue);
    }
}

function editChemStrength(sChemicalStrengthId) {
    let strength = prompt("Please enter Active Ingredient % from chemical bottle.", numVars[sChemicalStrengthId]);
    if (strength) {
        strength = Number(strength);
        if (strength >= 1 && strength <= 100) {
            numVars[sChemicalStrengthId] = strength;
            localStorage.setItem(sChemicalStrengthId, numVars[sChemicalStrengthId]);
            refresh();
        }
        else {
            alert("Please enter a number between 1 and 100.");
        }
    }
}

function fcTargetAdjust(delta) {
    numVars['fcTarget'] = numVars['fcTarget'] + delta;
    if (numVars['fcTarget'] < numVars['fcMax']) {
        numVars['fcTarget'] = numVars['fcMax'];
    }
    if (numVars['fcTarget'] > 70) {
        numVars['fcTarget'] = 70;
    }
    localStorage.setItem("fcTarget", numVars['fcTarget']);

    textVars['fcTargetText'] = ADJUST_FC_TEXT;
    numVars['fcTargetOld'] = numVars['fcTarget']; // Store old value for comparison
    localStorage.setItem("fcTargetText", textVars['fcTargetText']);
    localStorage.setItem("fcTargetOld", numVars['fcTargetOld']);

    refresh();
}

function editFcTarget() {
    let target = prompt("Please enter new Target FC.", numVars['fcTarget']);
    if (target) {
        target = parseInt(target);
        if (target >= numVars['fcMax'] && target <= 70) {
            numVars['fcTarget'] = target;
            textVars['fcTargetText'] = ADJUST_FC_TEXT;
            localStorage.setItem('fcTargetText', textVars['fcTargetText']);
            numVars['fcTargetOld'] = numVars['fcTarget']; // Store old value for comparison
            localStorage.setItem('fcTarget', numVars['fcTarget']);
            localStorage.setItem('fcTargetOld', numVars['fcTargetOld']);
            refresh();
        }
        else {
            alert('Please enter a number between ' + numVars['fcMax'] + ' and 70.');
        }
    }
}

function editTaTarget() {
    let target = prompt("Please enter new TA target value.", numVars['taTarget']);
    if (target) {
        target = parseInt(target);
        if (target >= 30 && target <= 120) {
            numVars['taTarget'] = target;
            localStorage.setItem('taTarget', numVars['taTarget']);
            refresh();
        }
        else {
            alert("Please enter a number between 30 and 120.");
        }
    }
}

function editChTarget() {
    let target = prompt("Please enter new CH target value.", numVars['chTarget']);
    if (target) {
        target = parseInt(target);
        if (target >= 150 && target <= 250) {
            numVars['chTarget'] = target;
            localStorage.setItem('chTarget', numVars['chTarget']);
            refresh();
        }
        else {
            alert("Please enter a number between 150 and 250.");
        }
    }
}

function formatNumber(input) {
    if (Number.isInteger(input)) {
        return input; // Return the number as is if it's a whole number
    } else {
        return parseFloat(input.toFixed(2)); // Limit to 2 decimal places
    }
}

function logActivity(sActivity, sValue = '', sNote = '') {
    // Parse the existing log file or initialize an empty array if it's empty
    let logEntries = [];
    try {
        logEntries = JSON.parse(localStorage.getItem('htLog')) || [];
    } catch (error) {
        console.error("Error parsing log file:", error);
    }

    date = new Date();
    const dateTime = date.toLocaleString(); // Format the date and time

    // Create a new log entry
    const newEntry = {
        ['Date/Time']: dateTime,
        ['Activity']: sActivity,
        ['Value']: sValue,
        ['Note']: sNote,
    };

    // Add the new entry to the log
    logEntries.push(newEntry);

    // Save the updated log back to localStorage
    localStorage.setItem('htLog', JSON.stringify(logEntries));
}

function showDialog(dialogId, videoId=false) {
    const dialog = document.getElementById(dialogId);
    dialog.showModal(); 
    if (videoId) {
        const video = document.getElementById(videoId);
        video.play();
    }
}

function closeDialog(dialogId, videoId=false) {
    if (videoId) {
        const video = document.getElementById(videoId);
        video.pause();
        video.currentTime = 0;
    }
    const dialog = document.getElementById(dialogId);
    dialog.close();
}