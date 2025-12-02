document.querySelector(".strat-button button")?.addEventListener("click", function () {
  let yourName = prompt("Enter your name to start the game");

  if (yourName === null || yourName.trim() === "") {
    yourName = "Unknown";
  }

  document.querySelector(".name span").textContent = yourName;
  document.querySelector(".strat-button").style.display = "none";
});

let duration = 1000;
let blocksContainer = document.querySelectorAll(".game-memory-container");
let blocks = Array.from(blocksContainer[0].children);
let orderRange = [...Array(blocks.length).keys()];
shuffle(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});

function shuffle(array) {
  let current = array.length, temp, random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }
  return array;
}

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("flipped");

  let allFlippedBlocks = blocks.filter(block => block.classList.contains("flipped") && !block.classList.contains("matched"));

  if (allFlippedBlocks.length === 2) {
    stopClicking();

    checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocks.forEach(block => {
    block.classList.add("no-clicking");
  });

  setTimeout(() => {
    blocks.forEach(block => {
      block.classList.remove("no-clicking");
    });
  }, duration);
}

function checkMatchedBlocks(firstBlock, secondBlock) {
  let triesElement = document.querySelector(".tries span");

  if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
    firstBlock.classList.add("matched");
    secondBlock.classList.add("matched");
  } else {
    setTimeout(() => {
      firstBlock.classList.remove("flipped");
      secondBlock.classList.remove("flipped");
    }, duration);

    triesElement.textContent = parseInt(triesElement.textContent) + 1;
  }
}
