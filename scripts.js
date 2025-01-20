function paint(color) {
    const circle1 = document.getElementById('circleFC1');
    circle1.style = `background-color:${color}`;
    const circle2 = document.getElementById('circleFC2');
    circle2.style = `background-color:${color}`;
    localStorage.setItem("savedColor", color);
  }
  
function loadVariables() {
    var savedColor = localStorage.getItem("savedColor");
    if (savedColor) {
        paint(savedColor);
    }
}