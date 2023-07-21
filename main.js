const sliderInput = document.querySelector("#slider");
const adjustableGrid = document.querySelector(".adjustable-grid");
const sliderLabel = document.querySelector(".slider-label");
const gridChildren = document.querySelectorAll(".adjustable-grid div");
const colorPickerInput = document.querySelector("#color-picker");
let holding = false;

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

const clickAndHoldHandler = () => {
  adjustableGrid.addEventListener("mouseover", (event) => {
    console.log(event.toElement);
    if (holding && event.currentTarget === adjustableGrid) {
      console.log("im inside the grid");
      clickAndHoldHandler(event);
    }
  });
};

sliderInput.addEventListener("input", gridInputHandler);

adjustableGrid.addEventListener("mousedown", (event) => {
  holding = true;
  console.log(event.target);
  event.target.style.backgroundColor = `${colorPickerInput.value}`;
  clickAndHoldHandler();
});

document.addEventListener("mouseup", () => {
  holding = false;
});
