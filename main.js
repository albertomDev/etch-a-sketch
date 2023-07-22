const sliderInput = document.querySelector("#slider");
const sliderLabel = document.querySelector(".slider-label");
const adjustableGrid = document.querySelector(".adjustable-grid");
const gridChildren = document.querySelectorAll(".adjustable-grid div");
const colorPickerInput = document.querySelector("#color-picker");
const rainbowColor = document.querySelector(".rainbow");
const resetGrid = document.querySelector(".reset-grid");
const clearSingleDiv = document.querySelector('.clear-single-div')
let holding = false;
let rainbow = false;
let gridSize;

// update grid size and create div
// needs to be decided function because it's called by 
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

// separate function as it's used in multiple places
// generates a random rgb color
const rainbowColorSetter = () => {
  const rgbColors = [];
  for (let i = 0; i <= 2; i++) {
    let randomColor = Math.floor(Math.random() * 256);
    rgbColors[i] = randomColor;
  }
  rgbColorsJoined = `rgb(${rgbColors.join(", ")})`;
  return rgbColorsJoined;
};

// apply color on as mouse moves
// it's necessary to make sure it works only when the mouse is over the grid
const clickAndHoldHandler = () => {
  adjustableGrid.addEventListener("mouseover", (event) => {
    //console.log(event.target);
    const rgbColor = rainbowColorSetter();
    if (event.currentTarget === adjustableGrid) {
      if (!rainbow && holding) {
        event.target.style.backgroundColor = `${colorPickerInput.value}`;
      } else if (rainbow && holding) {
        event.target.style.backgroundColor = `${rgbColor}`;
      }
    }
  });
};

sliderInput.addEventListener("input", (event) => {
  gridSize = event.currentTarget.value
  updateGrid(gridSize)
});

// if the color is not set when the mouse is pressed the code
// will not work unless the mouse is moving.
// this is also part of the click on hold feature
adjustableGrid.addEventListener("mousedown", (event) => {
  const rgbColor = rainbowColorSetter();
  holding = true;
  //console.log(event.target);
  if (rainbow) {
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
});

colorPickerInput.addEventListener("click", () => {
  rainbow = false;
});

resetGrid.addEventListener('click', () => {
  updateGrid(gridSize)
})