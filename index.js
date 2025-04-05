// TODO - Up and Down arrows look wrong on iOS Safari
// TODO - Abreviation hover tips do not show up on iOS Safari
// TODO - How to add site as app on homepage for iPhone and Android
// TODO - move all abbr to FAQ
// TODO - Show ideal FC and CYA values somewhere?

/* CONSTANTS */
const ONE_DAY = 1000 * 60 * 60 * 24;

/* SET ALL DEFAULT VARIABLE VALUES */
let textVars = {};
let numVars = {};
let dateVars = {};
let boolVars = {};

let testAndMaintainPrefixes = ['ca', 'fc', 'cc', 'ph', 'ta', 'ch', 'spaVolume', 'filterCleaned', 'filterReplaced'];
let chemicalPrefixes = ['Dichlor', 'Bleach', 'PhTaDown', 'MuriaticAcid', 'TaUp', 'PhUp', 'Calcium'];

/* Current DateTime */
textVars['dtNow'] = "0/0/0000 00:00:00 AM"
textVars['nothingNeeded'] = ''

/* Setup - Status */
boolVars['showAll'] = false;
boolVars['showca'] = false;
boolVars['caVisible'] = false;
boolVars['showfc'] = false;
boolVars['fcVisible'] = false;
boolVars['showcc'] = false;
boolVars['ccVisible'] = false;
boolVars['showph'] = false;
boolVars['phVisible'] = false;
boolVars['showad'] = false;
boolVars['adVisible'] = false;
boolVars['showbd'] = false;
boolVars['bdVisible'] = false;
boolVars['showta'] = false;
boolVars['taVisible'] = false;
boolVars['showch'] = false;
boolVars['chVisible'] = false;
boolVars['showSpaVolume'] = false;
boolVars['showFilterCleaned'] = false;
boolVars['showFilterReplaced'] = false;
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
numVars['caLastTest'] = 0;
dateVars['caLastTestDate'] = createDate(0, -2, 0);
numVars['caPrediction'] = 0;
numVars['caDecay'] = 1.4;
numVars['caAdded'] = 0;
numVars['caDaysAgo'] = 60;
numVars['caNegCorrection'] = 0;

/* FC */
numVars['fcLastTest'] = 0;
dateVars['fcLastTestDate'] = createDate(0, -2, 0);
numVars['fcPrediction'] = 0;
numVars['fcDecay'] = 2;
numVars['fcTarget'] = 5;
numVars['addDichlor'] = 0;
numVars['fcAddBleach'] = 0;
numVars['fcAdded'] = 0;
numVars['fcDaysAgo'] = 60;
numVars['fcNegCorrection'] = 0;

/* CC */
numVars['ccLastTest'] = 0;
dateVars['ccLastTestDate'] = createDate(0, -2, 0);
numVars['ccDaysAgo'] = 60;

/* pH */
numVars['phLastTest'] = 7.6;
dateVars['phLastTestDate'] = createDate(0, -2, 0);
numVars['adLastTest'] = 0;
numVars['bdLastTest'] = 0;
numVars['addPhTaDown'] = 0;
numVars['addMuriaticAcid'] = 0;
numVars['addPhUp'] = 0;

/* TA */
numVars['taNewTestDisplay'] = 0;
numVars['taLastTest'] = 50;
dateVars['taLastTestDate'] = createDate(0, -2, 0);
numVars['taDaysAgo'] = 60;
numVars['taTarget'] = 50;
numVars['addTaUp'] = 0;

/* CH */
numVars['chLastTest'] = 150;
dateVars['chLastTestDate'] = createDate(0, -2, 0);
numVars['chDaysAgo'] = 60;
numVars['chTarget'] = 150;
numVars['addCalcium'] = 0;

/* Maintenance */
dateVars['spaVolumeLastConfirmed'] = createDate(0, 0, -2);
dateVars['filterLastCleaned'] = createDate(0, -2, 0);
dateVars['filterLastReplaced'] = createDate(0, 0, -2);
numVars['spaVolumeDaysAgo'] = 700;
numVars['filterCleanedDaysAgo'] = 60;
numVars['filterReplacedDaysAgo'] = 700;

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
// numVars['boricAcidStrength'] = 98;

/* Setup - Time Limits */
numVars['caDaysAgoLimit'] = 30;
numVars['fcDaysAgoLimit'] = 1;
numVars['ccDaysAgoLimit'] = 7;
numVars['phDaysAgoLimit'] = 1;
numVars['taDaysAgoLimit'] = 14;
numVars['chDaysAgoLimit'] = 30;
numVars['spaVolumeDaysAgoLimit'] = 365;
numVars['filterCleanedDaysAgoLimit'] = 21;
numVars['filterReplacedDaysAgoLimit'] = 365;

window.addEventListener('load', init, false); // Call init() when page loads

/* FUNCTIONS */
function init() {
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
    const displayDate = date.toLocaleDateString();
    const displayTime = date.toLocaleTimeString();
    textVars['dtNow'] = displayDate + " " + displayTime;
    
    /* CYA - Days Since Last Test */
    numVars['caDaysAgo'] = (date - dateVars['caLastTestDate']) / ONE_DAY;

    /* FC - Days Since Last Test */
    numVars['fcDaysAgo'] = (date - dateVars['fcLastTestDate']) / ONE_DAY;

    /* CC - Days Since Last Test */
    numVars['ccDaysAgo'] = (date - dateVars['ccLastTestDate']) / ONE_DAY;

    /* pH - Days Since Last Test */
    numVars['phDaysAgo'] = (date - dateVars['phLastTestDate']) / ONE_DAY;

    /* TA - Days Since Last Test */
    numVars['taDaysAgo'] = (date - dateVars['taLastTestDate']) / ONE_DAY;

    /* CH - Days Since Last Test */
    numVars['chDaysAgo'] = (date - dateVars['chLastTestDate']) / ONE_DAY;

    /* MAINTENANCE - Days Since Last Action */
    numVars['spaVolumeDaysAgo'] = (date - dateVars['spaVolumeLastConfirmed']) / ONE_DAY;
    numVars['filterCleanedDaysAgo'] = (date - dateVars['filterLastCleaned']) / ONE_DAY;
    numVars['filterReplacedDaysAgo'] = (date - dateVars['filterLastReplaced']) / ONE_DAY;

    /* CALCULATE ALL OTHER DEPENDENT VARIABLES */

    /* CYA - Current Prediction */
    numVars['caPrediction'] = numVars['caLastTest'] - (numVars['caDecay'] * numVars['caDaysAgo']) + 
        numVars['caAdded'] + numVars['caNegCorrection'];
    if (numVars['caPrediction'] < 0) {
        numVars['caNegCorrection'] = numVars['caNegCorrection'] - numVars['caPrediction'];
        localStorage.setItem('caNegCorrection', numVars['caNegCorrection']);
        numVars['caPrediction'] = 0;
    }

    /* FC - Current Prediction */
    numVars['fcPrediction'] = numVars['fcLastTest'] - (numVars['fcDecay'] * numVars['fcDaysAgo']) + 
        numVars['fcAdded'] + numVars['fcNegCorrection'];
    if (numVars['fcPrediction'] < 0) {
        numVars['fcNegCorrection'] = numVars['fcNegCorrection'] - numVars['fcPrediction'];
        localStorage.setItem('fcNegCorrection', numVars['fcNegCorrection']);
        numVars['fcPrediction'] = 0;
    }
    
    /* Dichlor and Bleach Amount to Add*/
    let fcTargetDelta = numVars['fcTarget'] - numVars['fcPrediction'];
    if (fcTargetDelta < 0.5) {
        fcTargetDelta = 0;
    }
    const fcAddDichlor = fcTargetDelta * 0.1032 * numVars['spaVolume'] / 400 * 99 / numVars['dichlorStrength'];
    const fcAddBleach = fcTargetDelta * 0.51 * numVars['spaVolume'] / 400 * 10 / numVars['bleachStrength'];
    
    let fcBreakpointDelta = numVars['ccLastTest'] * 10 - numVars['fcPrediction'];
    if (fcBreakpointDelta < 0.5) {
        fcBreakpointDelta = 0;
    }
    const ccAddDichlor = fcBreakpointDelta * 0.1032 * numVars['spaVolume'] / 400 * 99 / numVars['dichlorStrength'];
    const ccAddBleach = fcBreakpointDelta * 0.51 * numVars['spaVolume'] / 400 * 10 / numVars['bleachStrength'];
    
    const maxAddDichlor = Math.max(fcAddDichlor, ccAddDichlor); // Determine which is higher to use for max amount to add
    const maxAddBleach = Math.max(fcAddBleach, ccAddBleach); // Determine which is higher to use for max amount to add
    
    if (numVars['caPrediction'] <= 40) { // CYA is low enough to use Dichlor
        numVars['addDichlor'] = maxAddDichlor; // Use the max amount of Dichlor calculated
        numVars['addBleach'] = '0.00'; // Don't use bleach if CYA is low
    }
    else { // CYA is high enough to use Bleach
        numVars['addDichlor'] = '0.00'; // Don't use Dichlor if CYA is high
        numVars['addBleach'] = maxAddBleach; // Use the max amount of Bleach calculated
    }
    localStorage.setItem("addDichlor", numVars['addDichlor']);
    localStorage.setItem("addBleach", numVars['addBleach']);

    // TA & PH (only one should be active at a time)
    numVars['addTaUp'] = '0.00';
    numVars['addPhUp'] = '0.00';
    numVars['addPhTaDown'] = '0.00';
    numVars['addMuriaticAcid'] = '0.00';

    // TA UP
    if (numVars['taLastTest'] < (numVars['taTarget'] - 10)) {
        numVars['addTaUp'] = ((numVars['taTarget'] - numVars['taLastTest']) / 10 * 0.9 * numVars['spaVolume'] / 400 * 100 / numVars['taUpStrength']);
    }
    else {
        // PH TA DOWN
        const phAddPhTaDown = numVars['adLastTest'] * 0.49 * numVars['spaVolume'] / 400 * 93.2 / numVars['phTaDownStrength'];
        const phAddMuriaticAcid = numVars['adLastTest'] * 0.37 * numVars['spaVolume'] / 400 * 31.45 / numVars['muriaticStrength'];
        let taAddPhTaDown = 0;
        let taAddMuriaticAcid = 0;
        if (numVars['taLastTest'] > (numVars['taTarget'] + 10)) {
            taAddPhTaDown = (numVars['taLastTest'] - numVars['taTarget']) / 10 * 1.37 * numVars['spaVolume'] / 400 * 93.2 / numVars['phTaDownStrength'];
            taAddMuriaticAcid = (numVars['taLastTest'] - numVars['taTarget']) / 10 * 1.02 * numVars['spaVolume'] / 400 * 31.45 / numVars['muriaticStrength'];
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
            numVars['addPhUp'] = (numVars['bdLastTest'] * 0.21 * numVars['spaVolume'] / 400 * 100 / numVars['phUpStrength']);
        }
    }
    localStorage.setItem('addTaUp', numVars['addTaUp']);
    localStorage.setItem('addPhUp', numVars['addPhUp']);
    localStorage.setItem('addPhTaDown', numVars['addPhTaDown']);
    localStorage.setItem('addMuriaticAcid', numVars['addMuriaticAcid']);
    localStorage.setItem('adjustTA', boolVars['adjustTA']);

    /* CH - Update Calcium */
    let chDelta = numVars['chTarget'] - numVars['chLastTest'];
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

    inputBoxes = document.getElementsByClassName("numInputs0");
    for (box in inputBoxes) {
        inputBoxes[box].value = Number(numVars[inputBoxes[box].id]).toFixed(0);
    } 

    /* POPULATE ALL BOOLEAN CHECKBOXES */
    checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    for (box in checkBoxes) {
        checkBoxes[box].checked = boolVars[checkBoxes[box].id];
    } 

    /* POPULATE ALL NUMERIC INNER HTML */
    numDisplays = document.getElementsByClassName("numDisplays");
    for (display in numDisplays) {
        numDisplays[display].innerHTML = formatNumber(Number(numVars[numDisplays[display].id])); //.toFixed(2);
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
    for (prefix in testAndMaintainPrefixes) {
        displayTestAndMaintainRow(testAndMaintainPrefixes[prefix]);
    }

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

    hideTestHeader();
    hideChemicalHeader();
    hideMaintainHeader();
    
    if (boolVars['testHeaderVisible'] || boolVars['chemicalHeaderVisible'] || boolVars['maintenanceHeaderVisible']) {
        textVars['nothingNeeded'] = '';
    }
    else {
        textVars['nothingNeeded'] = 'Nothing needed. Enjoy your hot tub!'
    }
    textDisplays['nothingNeeded'].innerHTML = textVars['nothingNeeded'];
}

// FUNCTIONS

function hideTestHeader() {
    if (    boolVars['caVisible'] || boolVars['fcVisible'] || boolVars['ccVisible'] || boolVars['phVisible'] || 
            boolVars['adVisible'] || boolVars['bdVisible'] || boolVars['taVisible'] || boolVars['chVisible']) {
        boolVars['testHeaderVisible'] = true;
        document.getElementById('testHeaderRow').style.display = 'table-row';
        setTimeout(function(){document.getElementById('testHeaderRow').style.opacity = 1}, 1);
    }
    else {
        boolVars['testHeaderVisible'] = false;
        document.getElementById('testHeaderRow').style.opacity = 0;
        setTimeout(function(){document.getElementById('testHeaderRow').style.display = 'none'}, 2000);
    }
}
    
function hideChemicalHeader() {
    if (    boolVars['DichlorVisible'] || boolVars['BleachVisible'] || boolVars['PhTaDownVisible'] || 
            boolVars['MuriaticAcidVisible'] || boolVars['TaUpVisible'] || boolVars['PhUpVisible'] || 
            boolVars['CalciumVisible']) {
        boolVars['chemicalHeaderVisible'] = true;
        document.getElementById('chemicalHeaderRow').style.display = 'table-row';
        setTimeout(function(){document.getElementById('chemicalHeaderRow').style.opacity = 1}, 1);
    }
    else {
        boolVars['chemicalHeaderVisible'] = false;
        document.getElementById('chemicalHeaderRow').style.opacity = 0;
        setTimeout(function(){document.getElementById('chemicalHeaderRow').style.display = 'none'}, 2000); 
    }
}

function hideMaintainHeader() {
    if (boolVars['spaVolumeVisible'] || boolVars['filterCleanedVisible'] || boolVars['filterReplacedVisible']) {
        boolVars['maintenanceHeaderVisible'] = true;
        document.getElementById('maintainHeaderRow').style.display = 'table-row';
        setTimeout(function(){document.getElementById('maintainHeaderRow').style.opacity = 1}, 1);
    }
    else {
        boolVars['maintenanceHeaderVisible'] = false;
        document.getElementById('maintainHeaderRow').style.opacity = 0;
        setTimeout(function(){document.getElementById('maintainHeaderRow').style.display = 'none'}, 2000);
    }
}

function displayTestAndMaintainRow(prefix) {
    boolVars[prefix + 'Visible'] = boolVars['showAll'] || boolVars['show' + prefix] || numVars[prefix + 'DaysAgo'] > numVars[prefix + 'DaysAgoLimit'];
    if (boolVars[prefix + 'Visible']) {
        document.getElementById(prefix + 'Row').style.display = 'table-row';
        setTimeout(function(){document.getElementById(prefix + 'Row').style.opacity = 1}, 1);
    }
    else {
        document.getElementById(prefix + 'Row').style.opacity = 0;
        setTimeout(function(){document.getElementById(prefix + 'Row').style.display = 'none'}, 2000);
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

function updateTest(sPrefix, sDaysAgoLimitId = false) {
    const newTest = document.getElementById(sPrefix + 'NewTest');
    const newValue = Number(newTest.value);
    
    const deltaValue = numVars[sPrefix + 'LastTest'] - (newValue - numVars[sPrefix + 'Added'] - numVars[sPrefix + 'NegCorrection']);
    
    const date = new Date();
    
    if (deltaValue >= 0) {
        numVars[sPrefix + 'DaysAgo'] = (date - dateVars[sPrefix + 'LastTestDate']) / ONE_DAY;
        numVars[sPrefix + 'Decay'] = (deltaValue / numVars[sPrefix + 'DaysAgo']);
        if (numVars[sPrefix + 'Decay'] > 30) {
            numVars[sPrefix + 'Decay'] = 30;
        }
        localStorage.setItem(sPrefix + 'Decay', numVars[sPrefix + 'Decay']); 
    }

    numVars[sPrefix + 'LastTest'] = newValue;
    localStorage.setItem(sPrefix + 'LastTest', numVars[sPrefix + 'LastTest']);

    dateVars[sPrefix + 'LastTestDate'] = date;
    localStorage.setItem(sPrefix + 'LastTestDate', dateVars[sPrefix + 'LastTestDate']);
    
    numVars[sPrefix + 'Added'] = 0; 
    localStorage.setItem(sPrefix + 'Added', numVars[sPrefix + 'Added']);

    numVars[sPrefix + 'NegCorrection'] = 0;
    localStorage.setItem(sPrefix + 'NegCorrection', numVars[sPrefix + 'NegCorrection']);
        
    if (sDaysAgoLimitId) {
        const daysAgoLimit = document.getElementById(sDaysAgoLimitId);
        numVars[daysAgoLimit.id] = daysAgoLimit.valueAsNumber;
        localStorage.setItem(daysAgoLimit.id, numVars[daysAgoLimit.id]);
    }

    if (sPrefix == 'ph') {
        boolVars['showph'] = false;
        localStorage.setItem('showph', boolVars['showph']);

        if (numVars['phLastTest'] > 7.8) { 
            boolVars['showad'] = true;
        }
        else {
            boolVars['showad'] = false;
            
        }
        localStorage.setItem('showad', boolVars['showad']);

        if (numVars['phLastTest'] < 7.4) {
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
        numVars['fcAdded'] = numVars['fcAdded'] + fcDelta;
        numVars['caAdded'] = numVars['caAdded'] + (fcDelta * 0.8);
        localStorage.setItem('fcAdded', numVars['fcAdded']);
        localStorage.setItem('caAdded', numVars['caAdded']);

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
        numVars['fcAdded'] = (numVars['fcAdded'] + (value / 0.51 / numVars['spaVolume'] * 400 / 10 * numVars['bleachStrength']));
        localStorage.setItem("fcAdded", numVars['fcAdded']);
        
        refresh();
    }
}

// ADD - pH/TA DOWN

function addedPhTaDown() {
    // TODO - log chemical added
    const value = addPhTaDown.valueAsNumber;
    if (value >= 0) {
        if (boolVars['adjustTA']) {
            const taDelta = value * 10 / 1.37 / numVars['spaVolume'] * 400 / 93.2 * numVars['phTaDownStrength'];
            numVars['taLastTest'] = numVars['taLastTest'] - taDelta;
            localStorage.setItem('taLastTest', numVars['taLastTest']);
        }
        
        localStorage.setItem('adLastTest', 0);
        boolVars['showph'] = true;
        localStorage.setItem('showph', boolVars['showph']);

        refresh();
    }
}

// ADD - MURIATIC ACID

function addedMuriaticAcid() {
    // TODO - log chemical added
    const value = addMuriaticAcid.valueAsNumber;
    if (value >= 0) {
        if (boolVars['adjustTA']) {
            const taDelta = value * 10 / 1.02 / numVars['spaVolume'] * 400 / 31.45 * numVars['muriaticStrength'];
            numVars['taLastTest'] = numVars['taLastTest'] - taDelta;
            localStorage.setItem('taLastTest', numVars['taLastTest']);
        }
                
        localStorage.setItem('adLastTest', 0);
        boolVars['showph'] = true;
        localStorage.setItem('showph', boolVars['showph']);
        refresh();
    }
}

// ADD - TA UP

function addedTaUp() {
    // TODO - log chemical added
    const value = addTaUp.valueAsNumber;
    if (value >= 0) {
        const taDelta = value * 10 / 0.9 / numVars['spaVolume'] * 400 / 100 * numVars['taUpStrength'];
        numVars['taLastTest'] = numVars['taLastTest'] + taDelta;
        localStorage.setItem('taLastTest', numVars['taLastTest']);
        
        localStorage.setItem('bdLastTest', 0);
        
        boolVars['showph'] = true;
        localStorage.setItem('showph', boolVars['showph']);
        refresh();
    }
}

// ADD - pH UP

function addedPhUp() {
    // TODO - log chemical added
    const value = addPhUp.valueAsNumber;
    if (value >= 0) {
        localStorage.setItem('bdLastTest', 0);
        
        boolVars['showph'] = true;
        localStorage.setItem('showph', boolVars['showph']);
        refresh();
    }
}

// ADD - CALCIUM

function addedCalcium() { 
    // TODO - log chemical added
    const value = addCalcium.valueAsNumber;
    if (value >= 0) {
        const chDelta = value * 10 / 0.77 / numVars['spaVolume'] * 400 / 77 * numVars['calciumStrength'];
        numVars['chLastTest'] = numVars['chLastTest'] + chDelta;
        localStorage.setItem('chLastTest', numVars['chLastTest']);
        
        refresh();
    }
}

// MAINTAIN - SPA VOLUME

function confirmedSpaVolume() {
    numVars['spaVolume'] = spaVolume.valueAsNumber;
    localStorage.setItem("spaVolume", numVars['spaVolume']);
    
    numVars['spaVolumeDaysAgoLimit'] = spaVolumeDaysAgoLimit.valueAsNumber;
    localStorage.setItem('spaVolumeDaysAgoLimit', numVars['spaVolumeDaysAgoLimit']);

    localStorage.setItem('spaVolumeLastConfirmed', new Date());
    
    refresh();
}

// MAINTAIN - FILTER CLEANED

function cleanedFilter() {
    numVars['filterCleanedDaysAgoLimit'] = filterCleanedDaysAgoLimit.valueAsNumber;
    localStorage.setItem('filterCleanedDaysAgoLimit',numVars['filterCleanedDaysAgoLimit']); 

    localStorage.setItem('filterLastCleaned', new Date());
    
    refresh();
}

// MAINTAIN - FILTER REPLACED

function replacedFilter() {
    numVars['filterReplacedDaysAgoLimit'] = filterReplacedDaysAgoLimit.valueAsNumber;
    localStorage.setItem('filterReplacedDaysAgoLimit', numVars['filterReplacedDaysAgoLimit']); 
    
    localStorage.setItem("filterLastReplaced", new Date());
    
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
    if (value) {
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
    if (numVars['fcTarget'] < 1) {
        numVars['fcTarget'] = 1;
    }
    if (numVars['fcTarget'] > 70) {
        numVars['fcTarget'] = 70;
    }
    localStorage.setItem("fcTarget", numVars['fcTarget']);
    
    refresh();
}

function editFcTarget() {
    let target = prompt("Please enter new FC target value.", numVars['fcTarget']);
    if (target) {
        target = parseInt(target);
        if (target >= 1 && target <= 70) {
            numVars['fcTarget'] = target;
            localStorage.setItem('fcTarget', numVars['fcTarget']);
            refresh();
        }
        else {
            alert("Please enter a number between 1 and 70.");
        }
    }
}

function editTaTarget() {
    let target = prompt("Please enter new TA target value.", numVars['taTarget']);
    if (target) {
        target = parseInt(target);
        if (target >= 50 && target <= 120) {
            numVars['taTarget'] = target;
            localStorage.setItem('taTarget', numVars['taTarget']);
            refresh();
        }
        else {
            alert("Please enter a number between 50 and 120.");
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