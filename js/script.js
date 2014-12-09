var numBands;
var numBands;
var band_1;
var band_2;
var band_3;
var multiplier;
var tolerance;
var resistanceText;
var toleranceCell1;
var toleranceCell2;

window.onload = function() {
  numBands = document.getElementById("num_bands");
  band_1 = document.getElementById("band_1");
  band_2 = document.getElementById("band_2");
  band_3 = document.getElementById("band_3");
  multiplier = document.getElementById("multiplier");
  tolerance = document.getElementById("tolerance");
  resistanceText = document.getElementById("resistance");
  toleranceCell1 = document.getElementById("tolerance_cell1");
  toleranceCell2 = document.getElementById("tolerance_cell2");
}

/*****
* Calculate resistance for a resistor based on the IEC Resistor Color
* Code standard.
* 
*****/
function calcResistance(digit1, digit2, digit3, multiplier) {
  
  var resistance;
  var bandValue;
  var resistance;

  if ((digit3 == -1)) {
    // 4-band color code
    bandValue = digit1 + "" + digit2;
    console.log ("4-band code = " + bandValue);
  }
  else {
    // 5 or 6 band color code
    bandValue = digit1 + "" + digit2 + "" + digit3;
    console.log ("5-6 band code = " + bandValue);
  }

  resistance = parseInt(bandValue) * multiplier;
  console.log("Calculated resistance: " + resistance);

  return resistance;
}

function updatePage() {

  if (numBands.value == "4") {
    hideTolerance();
  }
  if ((numBands.value == "5") || (numBands.value == 6)){
    showTolerance();
  }
}

function hideTolerance() {
  toleranceCell1.style.display = "none";
  toleranceCell2.style.display = "none";
}

function showTolerance() {
  toleranceCell1.style.display = "inline";
  toleranceCell2.style.display = "inline";
}