const sliderInput = document.querySelector("#slider");
const adjustableGrid = document.querySelector(".adjustable-grid");
const sliderLabel = document.querySelector(".slider-label");
const gridChildren = document.querySelectorAll(".adjustable-grid div");
const colorPickerInput = document.querySelector("#color-picker");
const rainbowColor = document.querySelector(".rainbow");
let holding = false;
let rainbow = false;

// update grid size and create div
const gridInputHandler = (event) => {
  const gridSize = event.currentTarget.value;
  adjustableGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  adjustableGrid.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
  sliderLabel.textContent = `${gridSize}`;

  let totalDiv = "";
  for (let numDiv = 0; numDiv < gridSize * gridSize; numDiv++) {
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

sliderInput.addEventListener("input", gridInputHandler);

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
