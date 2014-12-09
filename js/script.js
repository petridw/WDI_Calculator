//vars for document elements
var numBands;
var numBands;
var band_1;
var band_2;
var band_3;
var multiplier;
var tolerance;
var temp_coef;
var resistanceText;

window.onload = function() {
  numBands = document.getElementById("num_bands");
  band_1 = document.getElementById("band_1");
  band_2 = document.getElementById("band_2");
  band_3 = document.getElementById("band_3");
  multiplier = document.getElementById("multiplier");
  tolerance = document.getElementById("tolerance");
  temp_coef = document.getElementById("coefficient");
  resistanceText = document.getElementById("resistance");

  updatePage();
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

  if ((digit3 == "-1")) {
    // 4-band color code
    bandValue = digit1 + "" + digit2;
    console.log ("band value = " + bandValue);
  }
  else {
    // 5 or 6 band color code
    bandValue = digit1 + "" + digit2 + "" + digit3;
    console.log ("band value = " + bandValue);
  }

  resistance = parseInt(bandValue) * parseInt(multiplier);

  console.log("Calculated resistance: " + resistance);

  return resistance;
}

function updatePage() {
  var resistance;

  if (numBands.value == "4") {
    hideBand3();
    hideCoefficient();
    resistance = calcResistance(band_1.value, band_2.value, "-1", multiplier.value);
  }
  else if (numBands.value == "5") {
    showBand3();
    hideCoefficient();
    resistance = calcResistance(band_1.value, band_2.value, band_3.value, multiplier.value);
  }
  else {
    showBand3();
    showCoefficient();
    resistance = calcResistance(band_1.value, band_2.value, band_3.value, multiplier.value);
  }

  console.log ("tolerance: " + tolerance.value);

  if (!isNaN(resistance)) {
    updateResistance(resistance);
  }
}

function hideBand3() {
  band_3.style.display = "none";
}

function showBand3() {
  band_3.style.display = "inline";
}

function hideCoefficient() {
  temp_coef.style.display = "none";
}

function showCoefficient() {
  temp_coef.style.display = "inline";
}
function updateResistance(resistance) {
  var text = resistance + " Ohms " + tolerance.value + "%";

  if (numBands.value == "6") {
    text += " " + temp_coef.value + "ppm";
  }

  resistanceText.value = text;
}