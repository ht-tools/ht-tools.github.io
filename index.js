/* CONSTANTS */
const ONE_DAY = 1000 * 60 * 60 * 24; // milliseconds in one day
const ONE_HOUR = 1000 * 60 * 60; // milliseconds in one hour
const ONE_MINUTE = 1000 * 60; // milliseconds in one minute
//const ADJUST_FC_TEXT = 'Add Chemicals to hit Target'; 
const FC_INDICATOR_SLOT_Y = [120, 136, 158, 184, 206, 230, 255, 280, 302, 309];
// Per-slot horizontal offsets in px for the 10 FC indicator positions (top, 8 middle bands, bottom).
// Adjust these values directly in code to shape the marker's exponential curve.
const FC_INDICATOR_X_OFFSETS = [11, 18, 29, 46, 63, 86, 115, 152, 192, 215];
const FC_INDICATOR_BASE_X = 67;

/* SET ALL DEFAULT VARIABLE VALUES */
let textVars = {};
let numVars = {};
let dateVars = {};
let boolVars = {};

let chemicalPrefixes = ['Dichlor', 'Bleach', 'PhTaDown', 'MuriaticAcid', 'TaUp', 'PhUp', 'Calcium', 'Ahhsome'];

/* Current DateTime 
textVars['dtNow'] = "0/0/0000 00:00:00 AM"; 
textVars['nothingNeeded'] = ''; */
//textVars['fcTargetText'] = ADJUST_FC_TEXT;

/* Setup - Status */
boolVars['showAll'] = false;
//boolVars['showca'] = true; // Always show CYA
//boolVars['caVisible'] = false;
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
//boolVars['showSpaVolume'] = true; // Always show Spa Volume
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
boolVars['showAhhsome'] = false;
boolVars['AhhsomeVisible'] = false;
//boolVars['testHeaderVisible'] = false;
boolVars['chemicalHeaderVisible'] = false;
boolVars['maintenanceHeaderVisible'] = false;
boolVars['adjustTA'] = false;

/* CYA */
numVars['caLastValue'] = 0;
dateVars['caLastTestDate'] = createDate(0, -2, 0);
numVars['caPrediction'] = 0;
//numVars['caAdded'] = 0;
numVars['caDaysAgo'] = 60;

/* FC */
numVars['fcLastValue'] = 0;
dateVars['fcLastTestDate'] = createDate(-7, 0, 0); 
dateVars['fcLastModifiedDate'] = createDate(-7, 0, 0);
numVars['fcPrediction'] = 0;
numVars['fcDecayK'] = 8.02e-9; // Default decay constant for 10 to 5 ppm FC loss in 1 day
numVars['fcHalfLife'] = 1; // Default half-life in days
numVars['fcTarget'] = 5;
boolVars['customFcTarget'] = false;
//numVars['fcTargetOld'] = 5; // Store old value for comparison
numVars['addDichlor'] = 0;
numVars['addBleach'] = 0;
numVars['fcMin'] = 3;
//numVars['fcHigh'] = 5;
numVars['fcSlamTarget'] = 10; // Same as FC Max TBD

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

/* Ahh-some Weekly Maintenance */
dateVars['ahhsomeWeeklyLastAdded'] = createDate(0, -2, 0);
numVars['ahhsomeWeeklyDaysAgo'] = 60;

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

class ChemistryChart {
    constructor() {
        this.canvas = document.getElementById('chemistryChart');
        this.ctx = this.canvas.getContext('2d');
        this.cyaValue = numVars['caPrediction'];
        //this.cyaSubmit = document.getElementById('cyaSubmit');
        //this.cyaResult = document.getElementById('cyaResult');
        
        // Data
        this.cyaNumbers = [90, 80, 70, 60, 50, 40, 30, 20];
        this.fcNumbers = [35, 31, 28, 24, 20, 16, 12, 10, 9, 8, 7, 6, 5, 4, 3];
        
        // Positioning
        this.leftColumnX = 15;
        this.rightColumnX = 45;
        this.numberSpacing = 24; // pixels between each number
        this.cyaStartY = 139; // starting Y position for CYA numbers
        this.fcStartY = 55; // starting Y position for FC numbers
        
        // Viewing windows (rectangular regions)
        this.cyaWindow = { x: 5, y: 127, width: 21, height: 21 };
        this.fcWindowUpper = { x: 35, y: 43, width: 21, height: 21 };
        this.fcWindowLower = { x: 35, y: 211, width: 21, height: 21 };
        
        // Scroll control
        this.scrollOffset = 0;
        this.maxScroll = (this.fcNumbers.length - 1) * this.numberSpacing;
        this.animationFrameId = null;
        this.animationDurationMs = 2000;
        
        // Initialize chart to current value without a startup jump.
        this.handleCyaInput(this.cyaValue, false);
    }

    clamp(value, min, max) {
        return Math.min(max, Math.max(min, value));
    }

    getNearestCyaValue(value) {
        return this.cyaNumbers.reduce((nearest, current) => {
            const nearestDiff = Math.abs(nearest - value);
            const currentDiff = Math.abs(current - value);
            return currentDiff < nearestDiff ? current : nearest;
        }, this.cyaNumbers[0]);
    }

    setColumnsByCyaInput(value, animate = true) {
        const clampedValue = this.clamp(value, 0, 200);
        const roundedCya = this.getNearestCyaValue(clampedValue);
        const roundedIndex = this.cyaNumbers.indexOf(roundedCya);
        const targetOffset = roundedIndex * this.numberSpacing;

        if (animate) {
            this.animateToScrollOffset(targetOffset);
        } else {
            this.scrollOffset = targetOffset;
            this.draw();
        }

        return { input: clampedValue, roundedCya, targetOffset };
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    animateToScrollOffset(targetOffset) {
        const fromOffset = this.scrollOffset;
        const delta = targetOffset - fromOffset;

        if (delta === 0) {
            this.draw();
            return;
        }

        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }

        const startTime = performance.now();

        const step = (now) => {
            const elapsed = now - startTime;
            const progress = this.clamp(elapsed / this.animationDurationMs, 0, 1);
            const easedProgress = this.easeInOutCubic(progress);

            this.scrollOffset = fromOffset + (delta * easedProgress);
            this.draw();

            if (progress < 1) {
                this.animationFrameId = requestAnimationFrame(step);
            } else {
                this.scrollOffset = targetOffset;
                this.animationFrameId = null;
                this.draw();
            }
        };

        this.animationFrameId = requestAnimationFrame(step);
    }

    getWindowCenterY(window) {
        return window.y + (window.height / 2);
    }

    getClosestVisibleFcNumber(targetOffset, window) {
        let closestNumber = this.fcNumbers[0];
        let closestDistance = Number.POSITIVE_INFINITY;
        const windowCenterY = this.getWindowCenterY(window);

        for (const number of this.fcNumbers) {
            const index = this.fcNumbers.indexOf(number);
            const y = this.fcStartY + (index * this.numberSpacing) - targetOffset;
            const distance = Math.abs(y - windowCenterY);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestNumber = number;
            }
        }

        return closestNumber;
    }

    handleCyaInput(value = this.cyaValue, animate = true) {
        const rawValue = Number(value);
        const safeValue = Number.isFinite(rawValue) ? rawValue : 0;
        const { input, roundedCya, targetOffset } = this.setColumnsByCyaInput(safeValue, animate);

        this.cyaValue = input;
        numVars['fcSlamTarget'] = this.getClosestVisibleFcNumber(targetOffset, this.fcWindowUpper);
        localStorage.setItem("fcSlamTarget", numVars['fcSlamTarget']);
        numVars['fcMin'] = this.getClosestVisibleFcNumber(targetOffset, this.fcWindowLower);
        localStorage.setItem("fcMin", numVars['fcMin']);

        if( !boolVars['customFcTarget'] ) {
            numVars['fcTarget'] = numVars['fcSlamTarget'];
            localStorage.setItem("fcTarget", numVars['fcTarget']);
        }

        //this.cyaInput.value = String(input);
        //this.cyaResult.textContent = `Rounded to ${roundedCya} and sliding into position.`;
    }
    
    isNumberInWindow(y, window) {
        return y >= window.y && y <= (window.y + window.height);
    }
    
    isNumberInAnyWindow(y, windows) {
        return windows.some(window => this.isNumberInWindow(y, window));
    }
    
    getAlphaAndBlur(y, windows) {
        const inWindow = this.isNumberInAnyWindow(y, windows);
        if (inWindow) {
            return { alpha: 1, blur: 0 };
        } else {
            return { alpha: 0.1, blur: 30 };
        }
    }

    getCyaColor(number) {
        return [30, 40, 50].includes(number) ? '#198631' : '#c62828';
    }
    
    drawNumber(x, y, number, windows, textColor = '#000') {
        const { alpha, blur } = this.getAlphaAndBlur(y, windows);
        const text = String(number);
        
        this.ctx.save();
        this.ctx.font = 'bold 12px Arial';
        this.ctx.fillStyle = textColor;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        if (blur > 0) {
            // Browser-independent blur: draw multiple faint copies around the center.
            const ringCount = Math.max(2, Math.round(blur / 2));
            const baseRadius = Math.max(1, blur * 0.2);
            const sampleCount = 16;
            this.ctx.globalAlpha = alpha / (ringCount * 2 + 1);

            for (let ring = 1; ring <= ringCount; ring++) {
                const radius = (ring / ringCount) * baseRadius;
                for (let i = 0; i < sampleCount; i++) {
                    const angle = (i / sampleCount) * Math.PI * 2;
                    const dx = Math.cos(angle) * radius;
                    const dy = Math.sin(angle) * radius;
                    this.ctx.fillText(text, x + dx, y + dy);
                }
            }
        }

        this.ctx.globalAlpha = alpha;
        this.ctx.fillText(text, x, y);
        
        this.ctx.restore();
    }
    
    drawColumn(columnX, numbers, windows, startY, colorResolver = null) {
        for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];
            const y = startY + (i * this.numberSpacing) - this.scrollOffset;
            const textColor = colorResolver ? colorResolver(number) : '#000';
            this.drawNumber(columnX, y, number, windows, textColor);
        }
    }
    
    drawWindow(window) {
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 3;
        this.ctx.strokeRect(window.x, window.y, window.width, window.height);
        
        // Optional: subtle background
        this.ctx.fillStyle = 'rgba(200, 200, 200, 0.05)';
        this.ctx.fillRect(window.x, window.y, window.width, window.height);
    }
    
    drawLabels() {
        this.ctx.font = 'bold 14px Arial';
        this.ctx.fillStyle = '#333';
        this.ctx.textAlign = 'center';
        
        // CYA label
        //this.ctx.fillText('CYA', this.leftColumnX, 15);
        
        // FC label
        //this.ctx.fillText('FC', this.rightColumnX, 15);
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#fff';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw labels
        this.drawLabels();
        
        // Draw CYA column with its window
        this.drawColumn(this.leftColumnX, this.cyaNumbers, [this.cyaWindow], this.cyaStartY, (number) => this.getCyaColor(number));
        
        // Draw FC column with both windows
        this.drawColumn(this.rightColumnX, this.fcNumbers, [this.fcWindowUpper, this.fcWindowLower], this.fcStartY);
        
        // Draw windows on top
        this.drawWindow(this.cyaWindow);
        this.drawWindow(this.fcWindowUpper);
        this.drawWindow(this.fcWindowLower);
    }
}

let timer = null;
let chemistryChart = null;
let fcIndicatorCurrentSlot = 0;
let fcIndicatorInitialized = false;

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
    /*let displayDate = date.toLocaleDateString([], { month: '2-digit', day: '2-digit' });
    let displayTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    textVars['dtNow'] = displayDate + ", " + displayTime; */
    
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

    /* Ahh-some Weekly - Days Since Last Action */
    numVars['ahhsomeWeeklyDaysAgo'] = (date - dateVars['ahhsomeWeeklyLastAdded']) / ONE_DAY;
    if (numVars['ahhsomeWeeklyDaysAgo'] > 6.5) {
        boolVars['showAhhsome'] = true;
        localStorage.setItem('showAhhsome', boolVars['showAhhsome']);
    } else {
        boolVars['showAhhsome'] = false;
        localStorage.setItem('showAhhsome', boolVars['showAhhsome']);
    }


    /* MAINTENANCE - Days Since Last Action */
    numVars['spaVolumeDaysAgo'] = (date - dateVars['spaVolumeLastConfirmed']) / ONE_DAY;
    document.getElementById("svMeter").value = numVars['spaVolumeDaysAgo'];

    numVars['filterCleanedDaysAgo'] = (date - dateVars['filterLastCleaned']) / ONE_DAY;
    document.getElementById("filterMeter").value = numVars['filterCleanedDaysAgo'];
    
    /* CALCULATE ALL OTHER DEPENDENT VARIABLES */

    /* CYA - Current Prediction */
    numVars['caPrediction'] = numVars['caLastValue']; // + numVars['caAdded']; 
    if (numVars['caPrediction'] < 0) {
        numVars['caPrediction'] = 0;
    }

    if (!chemistryChart) {
        chemistryChart = new ChemistryChart();
    } else {
        chemistryChart.handleCyaInput(numVars['caPrediction']);
    }

    numVars['fcHigh'] = Math.min(numVars['fcSlamTarget'], numVars['fcMin'] + 2);

    // Ensure Target FC is >= new FC High value based on CYA
    //if (textVars['fcTargetText'] == ADJUST_FC_TEXT) {
    //    if (numVars['fcTarget'] < numVars['fcHigh']) {
    //        numVars['fcTarget'] = numVars['fcHigh'];
    //        numVars['fcTargetOld'] = numVars['fcTarget']; // Store old value for comparison
    //        localStorage.setItem("fcTargetOld", numVars['fcTargetOld']);
    //    }
    //} else {
    if( !boolVars['customFcTarget'] ) {   
        numVars['fcTarget'] = numVars['fcSlamTarget'];
        localStorage.setItem("fcTarget", numVars['fcTarget']);
    }
    //}
    
/*
    if (numVars['fcTarget'] > numVars['fcSlamTarget']) {
        document.getElementById("fcTarget").style.color = "red";
    } else {
        document.getElementById("fcTarget").style.color = "black";
    }
*/
    /* FC - Current Prediction */
    // N(t) = N0 * e^(-kt)
    let nMilliseconds = numVars['fcModifiedDaysAgo'] * ONE_DAY; // milliseconds since last test
    numVars['fcPrediction'] = numVars['fcLastValue'] * Math.exp(-numVars['fcDecayK'] * nMilliseconds);
    /*
    if (Number(numVars['fcPrediction']).toFixed(1) > Number(numVars['fcSlamTarget']) ) {
        // TBD document.getElementById("fc_chart").src="./images/fc_too_high.png";
    } else if (Number(numVars['fcPrediction']).toFixed(1) > Number(numVars['fcTarget']) ) {
        // TBD document.getElementById("fc_chart").src="./images/fc_max.png";
    } else if (Number(numVars['fcPrediction']).toFixed(1) > Number(numVars['fcHigh']) ) {
        // TBD document.getElementById("fc_chart").src="./images/fc_target.png";
    } else if (Number(numVars['fcPrediction']).toFixed(1) >= Number(numVars['fcMin']) ) {
        // TBDdocument.getElementById("fc_chart").src="./images/fc_ideal.png";
    } else {
        // TBD document.getElementById("fc_chart").src="./images/fc_too_low.png";
    }
    */
    // FC - Ideal Start and End Dates
    // ln(N(t) / N0) / -k = t
    let dateLastModified = new Date(dateVars['fcLastModifiedDate']);
    let dateStartIdeal = new Date();
    let dateEndIdeal = new Date();
    if (Number(numVars['fcLastValue']) > 0) {
        dateStartIdeal = new Date(dateLastModified.getTime() + Math.log(numVars['fcHigh'] / numVars['fcLastValue']) / -numVars['fcDecayK']);
        dateEndIdeal = new Date(dateLastModified.getTime() + Math.log(numVars['fcMin'] / numVars['fcLastValue']) / -numVars['fcDecayK']);
    } 

    //textVars['fcStartIdeal'] = dateStartIdeal.toLocaleString([], { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
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
    //let dateTargetStartIdeal = new Date(date.getTime() + Math.log(numVars['fcHigh'] / numVars['fcTarget']) / -numVars['fcDecayK']);
    //let dateTargetEndIdeal = new Date(date.getTime() + Math.log(numVars['fcMin'] / numVars['fcTarget']) / -numVars['fcDecayK']);
    //textVars['fcTargetStartIdeal'] = dateTargetStartIdeal.toLocaleString([], { month: '2-digit', day: '2-digit'}) + ' ' + (dateTargetStartIdeal.getHours() >= 12 ? 'PM' : 'AM'); //hour: '2-digit', minute: '2-digit' 
    //textVars['fcTargetEndIdeal'] = dateTargetEndIdeal.toLocaleString([], { month: '2-digit', day: '2-digit'}) + ' ' + (dateTargetEndIdeal.getHours() >= 12 ? 'PM' : 'AM'); //hour: '2-digit', minute: '2-digit'

    /* Dichlor and Bleach Amount to Add*/
    let fcTargetDelta = numVars['fcTarget'] - numVars['fcPrediction'];
    if (fcTargetDelta < 0.5) {
        fcTargetDelta = 0;
    }
    const fcAddDichlor = fcTargetDelta * 0.1032 * numVars['spaVolume'] / 400 * 99 / numVars['dichlorStrength'];
    const fcAddBleach = fcTargetDelta * 0.51 * numVars['spaVolume'] / 400 * 10 / numVars['bleachStrength'];
    
    if (numVars['caPrediction'] <= 40) { // CYA is low enough to use Dichlor
        numVars['addDichlor'] = fcAddDichlor; // Use the max amount of Dichlor calculated
        numVars['addBleach'] = 0; // Don't use bleach if CYA is low
    }
    else { // CYA is high enough to use Bleach
        numVars['addDichlor'] = 0; // Don't use Dichlor if CYA is high
        numVars['addBleach'] = fcAddBleach; // Use the max amount of Bleach calculated
    }
    localStorage.setItem("addDichlor", numVars['addDichlor']);
    localStorage.setItem("addBleach", numVars['addBleach']);

    // TA & PH (only one should be active at a time)
    numVars['addTaUp'] = 0;
    numVars['addPhUp'] = 0;
    numVars['addPhTaDown'] = 0;
    numVars['addMuriaticAcid'] = 0;

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
    let inputBoxes = document.getElementsByClassName("numInputs2");
    for (const box of inputBoxes) {
        box.value = formatNumber(Number(numVars[box.id])); //.toFixed(2);
    } 

    inputBoxes = document.getElementsByClassName("numInputs5");
    for (const box of inputBoxes) {
        box.value = (Math.round(Number(numVars[box.id]) * 2) / 2).toFixed(1);
    } 

    inputBoxes = document.getElementsByClassName("numInputs0");
    for (const box of inputBoxes) {
        box.value = Number(numVars[box.id]).toFixed(0);
    } 

    inputBoxes = document.getElementsByClassName("numInputs1");
    for (const box of inputBoxes) {
        box.value = Number(numVars[box.id]).toFixed(1);
    }

    /* POPULATE ALL BOOLEAN CHECKBOXES */
    let checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    for (const box of checkBoxes) {
        box.checked = boolVars[box.id];
    } 

    /* POPULATE ALL NUMERIC INNER HTML */
    let numDisplays = document.getElementsByClassName("numDisplays");
    for (const display of numDisplays) {
        display.innerHTML = formatNumber(Number(numVars[display.id])); 
    } 

    numDisplays = document.getElementsByClassName("numDisplays1");
    for (const display of numDisplays) {
        display.innerHTML = Number(numVars[display.id]).toFixed(1);
    } 

    numDisplays = document.getElementsByClassName("numDisplays0");
    for (const display of numDisplays) {
        display.innerHTML = Number(numVars[display.id]).toFixed(0);
    } 

    /* POPULATE ALL TEXT INNER HTML */
    let textDisplays = document.getElementsByClassName("textDisplays");
    for (const display of textDisplays) {
        display.innerHTML = textVars[display.id];
    } 

    // SELECT ROWS TO HIDE

    for (const prefix of chemicalPrefixes) {
        displayChemicalRow(prefix);
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

    updateFcIndicator();
    
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

function getFcIndicatorSlot(fcPrediction, fcMin, fcSlamTarget) {
    if (fcPrediction > fcSlamTarget) {
        return 0;
    }

    if (fcPrediction < fcMin) {
        return FC_INDICATOR_SLOT_Y.length - 1;
    }

    const range = fcSlamTarget - fcMin;
    if (range <= 0) {
        return FC_INDICATOR_SLOT_Y.length - 2;
    }

    // 8 in-range bands map to slots 1..8 (high FC near top).
    const normalized = (fcPrediction - fcMin) / range;
    return 8 - Math.round(normalized * 7);
}

function updateFcIndicator() {
    const indicator = document.getElementById('fcIndicator');
    const icon = document.getElementById('fcIndicatorCircle');
    const value = document.getElementById('fcIndicatorValue');
    if (!indicator || !icon || !value) {
        return;
    }

    const fcPrediction = Number(numVars['fcPrediction']);
    const safePrediction = Number.isFinite(fcPrediction) ? fcPrediction : 0;
    const slot = getFcIndicatorSlot(safePrediction, Number(numVars['fcMin']), Number(numVars['fcSlamTarget']));
    fcIndicatorCurrentSlot = slot;

    const y = FC_INDICATOR_SLOT_Y[slot];
    const xOffset = Number(FC_INDICATOR_X_OFFSETS[slot] || 0);
    if (!fcIndicatorInitialized) {
        indicator.style.transition = 'none';
    }
    indicator.style.top = y + 'px';
    indicator.style.left = (FC_INDICATOR_BASE_X + xOffset) + 'px';
    if (!fcIndicatorInitialized) {
        indicator.getBoundingClientRect(); // force reflow before re-enabling transition
        indicator.style.transition = '';
        fcIndicatorInitialized = true;
    }
    indicator.classList.toggle('bottom-slot', slot === FC_INDICATOR_SLOT_Y.length - 1);

    const inRange = slot > 0 && slot < FC_INDICATOR_SLOT_Y.length - 1;
    icon.textContent = inRange ? '\u2713' : '\u2715';
    indicator.classList.toggle('is-alert', !inRange);
    value.textContent = safePrediction.toFixed(1) + ' ppm';
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
            let N_0 = numVars['fcLastValue']; 
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
/*
    if (sPrefix == 'cc') { // TBD
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
*/
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

    if (sPrefix == 'ca') {
        boolVars['customFcTarget'] = false;
        localStorage.setItem('customFcTarget', boolVars['customFcTarget']);
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
        //numVars['caAdded'] = numVars['caAdded'] + (fcDelta * 0.9);
        
        // N(t) = N0 * e^(-kt)
        // Add fcAdded to predicted value and store as LastTest value
        numVars['fcLastValue'] = numVars['fcPrediction'] + fcDelta; 
        dateVars['fcLastModifiedDate'] = new Date(); // milliseconds since epoch

        //localStorage.setItem('caAdded', numVars['caAdded']);
        localStorage.setItem('fcLastValue', numVars['fcLastValue']);
        localStorage.setItem('fcLastModifiedDate', dateVars['fcLastModifiedDate']);

        logActivity(
            'Added ' + numVars['dichlorStrength'] + '% Dichlor', 
            formatNumber(value) + ' oz', 
            'Increased FC by ' + formatNumber(fcDelta) + ' ppm.' // and CYA by ' + formatNumber(fcDelta * 0.9) + ' ppm. ' +
            //'Estimated CYA is now ' + (Number(numVars['caLastValue']) + Number(numVars['caAdded'])).toFixed(0) + ' ppm.'
        );
        
        boolVars['customFcTarget'] = false;
        localStorage.setItem('customFcTarget', boolVars['customFcTarget']);

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
        
        boolVars['customFcTarget'] = false;
        localStorage.setItem('customFcTarget', boolVars['customFcTarget']);
        
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

function addedAhhsome() { 
    localStorage.setItem('ahhsomeWeeklyLastAdded', new Date());
    
    logActivity(
        'Added Ahh-some Weekly Maintenance'
    );
    
    refresh();
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
    const input = document.getElementById('editChemStrengthInput');
    input.value = numVars[sChemicalStrengthId];
    input.dataset.chemId = sChemicalStrengthId;
    document.getElementById('editChemStrengthError').style.display = 'none';
    showDialog('editChemStrengthDialog');
}

function submitChemStrength() {
    const input = document.getElementById('editChemStrengthInput');
    const sChemicalStrengthId = input.dataset.chemId;
    const strength = Number(input.value);
    if (strength >= 1 && strength <= 100) {
        numVars[sChemicalStrengthId] = strength;
        localStorage.setItem(sChemicalStrengthId, numVars[sChemicalStrengthId]);
        closeDialog('editChemStrengthDialog');
        refresh();
    } else {
        const error = document.getElementById('editChemStrengthError');
        error.textContent = 'Please enter a number between 1 and 100.';
        error.style.display = '';
    }
}
/*
function fcTargetAdjust(delta) {
    numVars['fcTarget'] = numVars['fcTarget'] + delta;
    if (numVars['fcTarget'] < numVars['fcHigh']) {
        numVars['fcTarget'] = numVars['fcHigh'];
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
*/
function editFcTarget() {
    const input = document.getElementById('editFcTargetInput');
    input.value = numVars['fcTarget'];
    input.min = numVars['fcMin'];
    document.getElementById('editFcTargetError').style.display = 'none';
    showDialog('editFcTargetDialog');
}

function submitFcTarget() {
    const input = document.getElementById('editFcTargetInput');
    const target = parseInt(input.value);
    if (target >= numVars['fcMin'] && target <= 70) {
        numVars['fcTarget'] = target;
        boolVars['customFcTarget'] = true;
        localStorage.setItem('customFcTarget', boolVars['customFcTarget']);
        //textVars['fcTargetText'] = ADJUST_FC_TEXT;
        //localStorage.setItem('fcTargetText', textVars['fcTargetText']);
        //numVars['fcTargetOld'] = numVars['fcTarget']; // Store old value for comparison
        localStorage.setItem('fcTarget', numVars['fcTarget']);
        //localStorage.setItem('fcTargetOld', numVars['fcTargetOld']);
        closeDialog('editFcTargetDialog');
        refresh();
    } else {
        const error = document.getElementById('editFcTargetError');
        error.textContent = 'Please enter a number between ' + numVars['fcMin'] + ' and 70.';
        error.style.display = '';
    }
}

function editTaTarget() {
    const input = document.getElementById('editTaTargetInput');
    input.value = numVars['taTarget'];
    document.getElementById('editTaTargetError').style.display = 'none';
    showDialog('editTaTargetDialog');
}

function submitTaTarget() {
    const input = document.getElementById('editTaTargetInput');
    const target = parseInt(input.value);
    if (target >= 30 && target <= 120) {
        numVars['taTarget'] = target;
        localStorage.setItem('taTarget', numVars['taTarget']);
        closeDialog('editTaTargetDialog');
        refresh();
    } else {
        const error = document.getElementById('editTaTargetError');
        error.textContent = 'Please enter a number between 30 and 120.';
        error.style.display = '';
    }
}

function editChTarget() {
    const input = document.getElementById('editChTargetInput');
    input.value = numVars['chTarget'];
    document.getElementById('editChTargetError').style.display = 'none';
    showDialog('editChTargetDialog');
}

function submitChTarget() {
    const input = document.getElementById('editChTargetInput');
    const target = parseInt(input.value);
    if (target >= 150 && target <= 250) {
        numVars['chTarget'] = target;
        localStorage.setItem('chTarget', numVars['chTarget']);
        closeDialog('editChTargetDialog');
        refresh();
    } else {
        const error = document.getElementById('editChTargetError');
        error.textContent = 'Please enter a number between 150 and 250.';
        error.style.display = '';
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

    let date = new Date();
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