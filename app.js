let temparetureBtnEl = document.getElementById("temparetureBtn");
let lengthBtnEl = document.getElementById("lengthBtn");
let weightBtnEl = document.getElementById("weightBtn");
let fromEl = document.getElementById("from");
let toEl = document.getElementById("to");
let valueEl = document.getElementById("value");
let convertBtnEl = document.getElementById("convertBtn");
let resultEl = document.getElementById("result");

const units = {
  tempareture: ["Celsius", "Fahrenheit", "Kelvin"],
  weight: ["Grams", "Kilograms", "Pounds"],
  length: ["Centimeters", "Meters", "Kilometers", "Inches"],
};

const conversions = {
  tempareture: {
    CelsiusToFahrenheit: (v) => (v * 9) / 5 + 32,
    CelsiusToKelvin: (v) => v + 273.15,
    FahrenheitToCelsius: (v) => ((v - 32) * 5) / 9,
    FahrenheitToKelvin: (v) => ((v - 32) * 5) / 9 + 273.15,
    KelvinToCelsius: (v) => v - 273.15,
    KelvinToFahrenheit: (v) => ((v - 273.15) * 9) / 5 + 32,
  },
  length: {
    CentimetersToMeters: (v) => v / 100,
    CentimetersToKilometers: (v) => v / (1000 * 100),
    CentimetersToInches: (v) => v * 0.393700787,
    MetersToCentimeters: (v) => v * 100,
    MetersToKilometers: (v) => v / 1000,
    MetersToInches: (v) => v * 39.3700787,
    KilometersToCentimeters: (v) => v * (1000 * 100),
    KilometersToMeters: (v) => v * 1000,
    KilometersToInches: (v) => v * 39370.0787,
    InchesToCentimeters: (v) => v * 2.54,
    InchesToMeters: (v) => v * 0.0254,
    InchesToKilometers: (v) => v * 2.54 * (1000 * 100),
  },
  weight: {
    GramsToKilograms: (v) => v / 1000,
    GramsToPounds: (v) => v * 0.00220462262,
    KilogramsToGrams: (v) => v * 1000,
    KilogramsToPounds: (v) => v * 2.20462262,
    PoundsToGrams: (v) => v * 453.59237,
    PoundsToKilograms: (v) => v * 0.45359237,
  },
};

let categories = ["tempareture", "length", "weight"];
let category = categories[0];

function renderOptions(category) {
  fromEl.innerHTML = "";
  toEl.innerHTML = "";
  units[category].forEach((value, index, arr) => {
    let optionEl = document.createElement("option");
    let toOptionEl = document.createElement("option");
    let toValue = arr[arr.length - (index + 1)];

    optionEl.value = value;
    toOptionEl.value = toValue;
    optionEl.textContent = value;
    toOptionEl.textContent = toValue;
    optionEl.id = `option${index}`;
    fromEl.appendChild(optionEl);
    toEl.appendChild(toOptionEl);
  });
}

function toggleActive(active) {
  if (active === "tempareture") {
    temparetureBtnEl.classList.add("active");
    lengthBtnEl.classList.remove("active");
    weightBtnEl.classList.remove("active");
  } else if (active === "length") {
    lengthBtnEl.classList.add("active");
    temparetureBtnEl.classList.remove("active");
    weightBtnEl.classList.remove("active");
  } else if (active === "weight") {
    lengthBtnEl.classList.remove("active");
    temparetureBtnEl.classList.remove("active");
    weightBtnEl.classList.add("active");
  }
}

renderOptions(category);

temparetureBtnEl.addEventListener("click", () => {
  category = categories[0];
  toggleActive(category);

  renderOptions(category);
});

lengthBtnEl.addEventListener("click", () => {
  category = categories[1];
  toggleActive(category);

  renderOptions(category);
});

weightBtnEl.addEventListener("click", () => {
  category = categories[2];
  toggleActive(category);

  renderOptions(category);
});

function getValidInput(input) {
  if (input === "" || isNaN(Number(input))) {
    return false;
  } else {
    return true;
  }
}

convertBtnEl.addEventListener("click", () => {
  let from = fromEl.value;
  let to = toEl.value;
  let input = valueEl.value;
  let isValidInput = getValidInput(input);
  if (isValidInput) {
    let result = conversions[category][`${from}To${to}`](Number(input));
    //console.log(result.toFixed(2));
    resultEl.textContent = `${result.toFixed(2)} ${to}`;
  } else {
    alert("Please Enter Valid Number");
  }
});
