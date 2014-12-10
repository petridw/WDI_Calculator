//vars for document elements
var numBands,
    band_1,
    band_2,
    band_3,
    multiplier,
    tolerance,
    coefficient,
    resistanceText,
    band_1_img,
    band_2_img,
    band_3_img,
    multiplier_img,
    tolerance_img,
    coefficient_img;


//objects for matching values in the HTML "select" elements to color strings
var band123Colors = {
  "0": "black",   
  "1": "#532425",
  "2": "#FE0000",
  "3": "#FE4E00",
  "4": "#FFFF00",
  "5": "#28C91B",
  "6": "#5141FF",
  "7": "violet",
  "8": "grey",
  "9": "white"
};
var band4Colors = {
  ".01":      "#BEBEBE",  //silver
  ".1":       "#BF8A1D",  //gold
  "1":        "black",    //black
  "10":       "#532425",  //brown
  "100":      "#FE0000",  //red
  "1000":     "#FE4E00",  //orange
  "10000":    "#FFFF00",  //yellow
  "100000":   "#28C91B",  //green
  "1000000":  "#5141FF",  //blue
  "10000000": "violet"    //violet
};
var band5Colors = {
  "10":   "#BEBEBE",
  "5":    "#BF8A1D",
  "1":    "#532425",
  "2":    "#FE0000",
  ".5":   "#28C91B",
  ".25":  "#5141FF",
  ".1":   "violet"
};
var band6Colors = {
  "100":  "brown",
  "50":   "red",
  "25":   "yellow",
  "15":   "orange"
};


window.onload = function() {

  numBands = document.getElementById("num_bands");
  band_1 = document.getElementById("band_1");
  band_2 = document.getElementById("band_2");
  band_3 = document.getElementById("band_3");
  multiplier = document.getElementById("multiplier");
  tolerance = document.getElementById("tolerance");
  coefficient = document.getElementById("coefficient");
  resistanceText = document.getElementById("resistance");
  band_1_img = document.getElementById("band_1_img");
  band_2_img = document.getElementById("band_2_img");
  band_3_img = document.getElementById("band_3_img");
  multiplier_img = document.getElementById("multiplier_img");
  tolerance_img = document.getElementById("tolerance_img");
  coefficient_img = document.getElementById("coefficient_img");

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

  resistance = parseInt(bandValue) * parseFloat(multiplier);

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

  if (!isNaN(resistance)) {
    updateResistance(resistance);
  }

  updateColors();

}

function hideBand3() {
  band_3.style.display = "none";
  band_3_img.style.display = "none";
}

function showBand3() {
  band_3.style.display = "inline";
  band_3_img.style.display = "block";
}

function hideCoefficient() {
  coefficient.style.display = "none";
  coefficient_img.style.display = "none";
}

function showCoefficient() {
  coefficient.style.display = "inline";
  coefficient_img.style.display = "block";
}

function updateResistance(resistance) {
  var text = resistance + " Ohms " + tolerance.value + "%";

  if (numBands.value == "6") {
    text += " " + coefficient.value + "ppm";
  }

  resistanceText.value = text;
}

function updateColors() {

  //update colors for band backgrounds
  band_1_img.style.background = band123Colors[band_1.value];
  band_2_img.style.background = band123Colors[band_2.value];
  band_3_img.style.background = band123Colors[band_3.value];
  multiplier_img.style.background = band4Colors[multiplier.value];
  tolerance_img.style.background = band5Colors[tolerance.value];
  coefficient_img.style.background = band6Colors[coefficient.value];

  //update colors for select dropdowns
  band_1.style.background = band123Colors[band_1.value];
  band_2.style.background = band123Colors[band_2.value];
  band_3.style.background = band123Colors[band_3.value];
  multiplier.style.background = band4Colors[multiplier.value];
  tolerance.style.background = band5Colors[tolerance.value];
  coefficient.style.background = band6Colors[coefficient.value];

  //set font color to black when select fields are yellow or white (and vice versa)
  ((band_1.value == "9") || (band_1.value == "4")) ? band_1.style.color = "black" : band_1.style.color = "white";
  ((band_2.value == "9") || (band_2.value == "4")) ? band_2.style.color = "black" : band_2.style.color = "white";
  ((band_3.value == "9") || (band_3.value == "4")) ? band_3.style.color = "black" : band_3.style.color = "white";
  (multiplier.value == "10000") ? multiplier.style.color = "black" : multiplier.style.color = "white";

}




