function dandrLoad() {
    for (let i = 1; i < 19; i++) {
        let checked = false;
        let strItem = "qstep" + i;
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
    for (let i = 1; i < 19; i++) {
        let strItem = "qstep" + i;
        let inputElement = document.getElementById(strItem);
        checked = inputElement.checked;
        localStorage.setItem(strItem, checked);
    } 
}

