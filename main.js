const sliderInput = document.querySelector("#slider");
const sliderLabel = document.querySelector(".slider-label");
const adjustableGrid = document.querySelector(".adjustable-grid");
const colorPickerInput = document.querySelector("#color-picker");
const rainbowColor = document.querySelector(".rainbow");
const resetGrid = document.querySelector(".reset-grid");
const clearSingleDiv = document.querySelector(".clear-single-div");
let holding = false;
let rainbow = false;
let clear = false;
let gridSize;

// WHAT: update grid size and create div
// WHY: needs to be a dedicated function because it's called by
// multiple event listeners
const updateGrid = (size) => {
  adjustableGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  adjustableGrid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
  sliderLabel.textContent = `${size}`;

  let totalDiv = "";
  for (let numDiv = 0; numDiv < size * size; numDiv++) {
    totalDiv += `<div></div>`;
  }
  adjustableGrid.innerHTML = totalDiv;
};

// WHAT: generates a random rgb color
// WHY: separate function as it's used in multiple places
const rainbowColorSetter = () => {
  const rgbColors = [];
  for (let i = 0; i <= 2; i++) {
    let randomColor = Math.floor(Math.random() * 256);
    rgbColors[i] = randomColor;
  }
  const rgbColorsJoined = `rgb(${rgbColors.join(", ")})`;
  return rgbColorsJoined;
};

const lowerBrightness = (color) => {
  // Parse the RGB color string and extract the individual components
  const match = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

  // Extract the RGB components from the match result
  const [, red, green, blue] = match.map(Number);

  // Calculate the new RGB components with 10% reduced brightness
  const newRed = Math.max(0, red - Math.round(red * 0.1));
  const newGreen = Math.max(0, green - Math.round(green * 0.1));
  const newBlue = Math.max(0, blue - Math.round(blue * 0.1));

  // Format the new RGB values into a string
  const darkerColor = `rgb(${newRed}, ${newGreen}, ${newBlue})`;

  return darkerColor;
};

// WHAT: applies colors as the moves through the grid
// WHY: it's necessary to make sure it works only when the mouse is over the grid
// and after the initial color set
const mouseOverHandler = (event) => {
  if (holding) {
    if (clear) {
      event.target.style = "";
    } else if (event.target.style.backgroundColor) {
      const changedColor = lowerBrightness(event.target.style.backgroundColor);
      event.target.style.backgroundColor = `${changedColor}`;
    } else if (rainbow) {
      event.target.style.backgroundColor = `${rainbowColorSetter()}`;
    } else {
      event.target.style.backgroundColor = `${colorPickerInput.value}`;
    }
  }
};

// WHY: if the color is not set when the mouse is pressed the code will not run
const setInitialColorHandler = (event) => {
  holding = true;
  //console.log(event.target);
  if (clear) {
    event.target.style = "";
  } else if (event.target.style.backgroundColor) {
    const changedColor = lowerBrightness(event.target.style.backgroundColor);
    event.target.style.backgroundColor = `${changedColor}`;
  } else if (rainbow) {
    event.target.style.backgroundColor = `${rainbowColorSetter()}`;
  } else {
    event.target.style.backgroundColor = `${colorPickerInput.value}`;
  }
};

sliderInput.addEventListener("input", (event) => {
  gridSize = event.currentTarget.value;
  updateGrid(gridSize);
  clear = false;
});

adjustableGrid.addEventListener("mouseover", mouseOverHandler);

adjustableGrid.addEventListener("mousedown", setInitialColorHandler);

document.addEventListener("mouseup", () => {
  holding = false;
});

rainbowColor.addEventListener("click", () => {
  rainbow = true;
  clear = false;
});

colorPickerInput.addEventListener("click", () => {
  rainbow = false;
  clear = false;
});

resetGrid.addEventListener("click", () => {
  updateGrid(gridSize);
});

clearSingleDiv.addEventListener("click", () => {
  clear = true;
});

window.onload = () => {
  gridSize = 16;
  updateGrid(gridSize);
};
