const sliderInput = document.querySelector("#slider");
const sliderLabel = document.querySelector(".slider-label");
const adjustableGrid = document.querySelector(".adjustable-grid");
const gridChildren = document.querySelectorAll(".adjustable-grid div");
const colorPickerInput = document.querySelector("#color-picker");
const rainbowColor = document.querySelector(".rainbow");
const resetGrid = document.querySelector(".reset-grid");
const clearSingleDiv = document.querySelector(".clear-single-div");
let holding = false;
let rainbow = false;
let clear = false;
let gridSize;

// WHAT: update grid size and create div
// WHY: needs to be decided function because it's called by
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
  rgbColorsJoined = `rgb(${rgbColors.join(", ")})`;
  return rgbColorsJoined;
};

// WHAT: apply color on as mouse moves
// WHY: it's necessary to make sure it works only when the mouse is over the grid
const clickAndHoldHandler = () => {
  adjustableGrid.addEventListener("mouseover", (event) => {
    //console.log(event.target);
    const rgbColor = rainbowColorSetter();
    if (event.currentTarget === adjustableGrid) {
      if (clear && holding) {
        event.target.style = ''
      } else if (rainbow && holding) {
        event.target.style.backgroundColor = `${rgbColor}`;
      } else if (holding) {
        event.target.style.backgroundColor = `${colorPickerInput.value}`;
      }
    }
  });
};

sliderInput.addEventListener("input", (event) => {
  gridSize = event.currentTarget.value;
  updateGrid(gridSize);
});

// WHY: if the color is not set when the mouse is pressed the code
// will not work unless the mouse is moving.
adjustableGrid.addEventListener("mousedown", (event) => {
  const rgbColor = rainbowColorSetter();
  holding = true;
  console.log(event.target);
  if (clear) {
    event.target.style = ''
  } else if (rainbow) {
    event.target.style.backgroundColor = `${rgbColor}`;
  } else {
    event.target.style.backgroundColor = `${colorPickerInput.value}`;
  }
  clickAndHoldHandler();
});

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

clearSingleDiv.addEventListener("click", (event) => {
  clear = true;  
});
