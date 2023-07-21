const sliderInput = document.querySelector("#slider");
const adjustableGrid = document.querySelector(".adjustable-grid");
const sliderLabel = document.querySelector(".slider-label");

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

sliderInput.addEventListener("input", gridInputHandler);
