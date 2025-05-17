/*
for (var key in boolVars) {
    var value = localStorage.getItem(key);
    if (value) {
        boolVars[key] = (value == "true");
    }
}
*/
function dandrLoad() {
    let checked = false;
    let strItem = "step";
    let strChecked = null;
    let inputElement = null;

    for (let i = 1; i < 26; i++) {
        checked = false;
        strItem = "step" + i;
        strChecked = localStorage.getItem(strItem);
        
        if (strChecked) {
            checked = (strChecked == "true");
        }
        else {
            localStorage.setItem(strItem, checked);
        }
        inputElement = document.getElementById(strItem);
        inputElement.checked = checked;
    }  

    checked = false;
    strChecked = localStorage.getItem("showDecon");
    if (strChecked) {
        checked = (strChecked == "true");
    }
    else {
        localStorage.setItem("showDecon", checked);
    }
    inputElement = document.getElementById("showDecon");
    inputElement.checked = checked;
}

function dandrStore() {
    let strItem = "step";
    let inputElement = null;

    for (let i = 1; i < 26; i++) {
        strItem = "step" + i;
        inputElement = document.getElementById(strItem);
        checked = inputElement.checked;
        localStorage.setItem(strItem, checked);
    } 

    inputElement = document.getElementById("showDecon");
    checked = inputElement.checked;
    localStorage.setItem("showDecon", checked);
}
/*
function showHideDeconSteps() {
    let fullDecon = boolVars[prefix + 'Visible'] = boolVars['showAll'] || boolVars['show' + prefix] || numVars[prefix + 'DaysAgo'] > numVars[prefix + 'DaysAgoLimit'];
    if (boolVars[prefix + 'Visible']) {
        document.getElementById(prefix + 'Row').style.display = 'table-row';
        setTimeout(function(){document.getElementById(prefix + 'Row').style.opacity = 1}, 1);
    }
    else {
        document.getElementById(prefix + 'Row').style.opacity = 0;
        setTimeout(function(){document.getElementById(prefix + 'Row').style.display = 'none'}, 2000);
    }
}

function showDecon() {
    const element = document.getElementById('fullDecon');
    if (element) {
        localStorage.setItem('fullDecon', element.checked);
    }
}
*/