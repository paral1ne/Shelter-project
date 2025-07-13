const burgerButton = document.querySelector(".burger");
const sideMenu = document.querySelector(".burger-menu");
const blur_background = document.querySelector(".blur_background");

function closeSideMenu() {
  sideMenu.classList.remove("burger-menu_active");
  burgerButton.classList.remove("burger_active");
  document.querySelector("body").classList.remove("body_block_scroll");
  blur_background.classList.remove("visible");
}
function openSideMenu() {
  sideMenu.classList.add("burger-menu_active");
  burgerButton.classList.add("burger_active");
  document.querySelector("body").classList.add("body_block_scroll");
  blur_background.classList.add("visible");
}
burgerButton.addEventListener("click", () => {
  if (sideMenu.classList.contains("burger-menu_active")) {
    closeSideMenu();
  } else {
    openSideMenu();
  }
});

sideMenu.addEventListener("click", (e) => {
  if (e.target.localName == "a") {
    closeSideMenu();
  }
});

blur_background.addEventListener("click", (e) => {
  if (!sideMenu.contains(e.target) && !burgerButton.contains(e.target)) {
    closeSideMenu();
  }
});

// slider
function checkWindowWidth() {
  if (window.innerWidth >= 1166) {
    visibleCards = 3;
    sliderOffset = -1080;
    doubleSliderOffset = -2160;
  } else if (window.innerWidth > 750) {
    visibleCards = 2;
    sliderOffset = -620;
    doubleSliderOffset = -1240;
    arrPrev = [0, 1];
    arrCurr = [2, 3];
    arrLast = [4, 5];
  } else {
    visibleCards = 1;
    sliderOffset = -310;
    doubleSliderOffset = -620;
    arrPrev = [0];
    arrCurr = [3];
    arrLast = [6];
  }
}
function renderCards(cards, slider, offset) {
  slider.innerHTML = "";
  let current = 0;
  for (let i = 0; i < cards * 3; i++) {
    slider.append(createCard(current));
    current++;
    if (current >= pets.length) {
      current = 0;
    }
  }
  slider.style.left = offset + "px";
}

function nextSlide() {
  let arrNew = [];
  let counter = 0;
  while (counter < visibleCards) {
    let number = Math.floor(Math.random() * 8);
    if (!arrLast.includes(number) && !arrNew.includes(number)) {
      arrNew.push(number);
      slider.append(createCard(number));
      slider.firstChild.remove();
      counter++;
    }
  }
  arrPrev = arrCurr;
  arrCurr = arrLast;
  arrLast = arrNew;
}
function prevSlide() {
  let arrNew = [];
  let counter = 0;
  while (counter < visibleCards) {
    let number = Math.floor(Math.random() * 8);
    if (!arrPrev.includes(number) && !arrNew.includes(number)) {
      arrNew.push(number);
      slider.prepend(createCard(number));
      slider.lastChild.remove();
      counter++;
    }
  }
  arrLast = arrCurr;
  arrCurr = arrPrev;
  arrPrev = arrNew;
}
function createCard(i) {
  let card = document.createElement("div");
  card.classList.add("card");
  let current = pets[i];
  card.innerHTML = `
                <img src=${current.image} alt=${current.name} />
                <p class="card-text">${current.name}</p>
                <div class="button pet-button">Learn more</div>
              `;

  return card;
}
function startAnimationRight() {
  slider.classList.add("slide-right");
  prevButton.removeEventListener("click", startAnimationLeft);
  slider.addEventListener("animationend", endAnimationRight);
}
function endAnimationRight() {
  slider.classList.remove("slide-right");
  nextSlide();
  slider.removeEventListener("animationend", endAnimationRight);
  setTimeout(prevButton.addEventListener("click", startAnimationLeft), 1000);
}
function startAnimationLeft() {
  slider.classList.add("slide-left");
  nextButton.removeEventListener("click", startAnimationRight);
  slider.addEventListener("animationend", endAnimationLeft);
}
function endAnimationLeft() {
  slider.classList.remove("slide-left");
  prevSlide();
  slider.removeEventListener("animationend", endAnimationLeft);
  setTimeout(nextButton.addEventListener("click", startAnimationRight), 1000);
}
function setOffsets() {
  document.documentElement.style.setProperty(
    "--slideLeft",
    sliderOffset + "px"
  );
  document.documentElement.style.setProperty(
    "--slideRight",
    doubleSliderOffset + "px"
  );
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

const slider = document.querySelector(".cards"),
  prevButton = document.querySelector(".prev"),
  nextButton = document.querySelector(".next");
let visibleCards = 0;
let currentCard = 0;
let sliderOffset = 0;
let doubleSliderOffset = 0;
let arrPrev = [0, 1, 2];
let arrCurr = [3, 4, 5];
let arrLast = [6, 7, 0];

shuffleArray(pets);
checkWindowWidth();
setOffsets();
renderCards(visibleCards, slider, sliderOffset);
nextButton.addEventListener("click", startAnimationRight);
prevButton.addEventListener("click", startAnimationLeft);
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowRight") {
    startAnimationRight();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key == "ArrowLeft") {
    startAnimationLeft();
  }
});
window.addEventListener("resize", () => {
  checkWindowWidth();
  setOffsets();
  renderCards(visibleCards, slider, sliderOffset);
});
// MODAL

const petsContainer = document.querySelector(".pets");

function renderModal({
  name,
  image,
  type,
  breed,
  description,
  age,
  inoculations,
  diseases,
  parasites,
}) {
  let modal = document.createElement("div");
  modal.classList.add("modal-wrapper");
  modal.innerHTML = `<div class="close-button">
        <img src="./img/icons/close.png" alt="cross" />
      </div>
      <div class="modal">
        <img src=${image} alt=${name} />
        <div class="modal-info">
          <div>
            <h3 class="title">${name}</h3>
            <h4 class="title">${type} - ${breed}</h4>
          </div>
          <p class="paragraph">
            ${description}
          </p>
          <ul class="pet-info">
            <li><b>Age:</b> ${age}</li>
            <li><b>Inoculations:</b> ${inoculations}</li>
            <li><b>Diseases:</b> ${diseases}</li>
            <li><b>Parasites:</b> ${parasites}</li>
          </ul>
        </div>
      </div>`;
  return modal;
}
function removeModal() {
  let modal = document.querySelector(".modal-wrapper");
  if (modal) {
    document.querySelector(".modal-wrapper").remove();
  }
  document.querySelector("body").classList.remove("body_block_scroll");
}
function getPetIndex(petName) {
  let index = pets.findIndex((obj) => obj.name == petName);
  return index;
}

slider.addEventListener("click", (e) => {
  let petName = "";
  if (e.target.classList.contains("card")) {
    petName = e.target.children[1].innerText;
  } else if (e.target.parentElement.classList.contains("card")) {
    petName = e.target.parentElement.children[1].innerText;
  } else {
    return;
  }
  console.log(petName);

  petsContainer.append(renderModal(pets[getPetIndex(petName)]));
  blur_background.classList.add("visible");
  document.querySelector("body").classList.add("body_block_scroll");

  const closeButton = document.querySelector(".close-button"),
    modalWrapper = document.querySelector(".modal-wrapper");
  document.querySelector("body").addEventListener("click", (e) => {
    if (e.target == closeButton || closeButton.contains(e.target)) {
      removeModal();
      blur_background.classList.remove("visible");
    } else if (e.target == modalWrapper && modalWrapper.contains(e.target)) {
      removeModal();
      blur_background.classList.remove("visible");
    } else if (e.target == blur_background) {
      removeModal();
      blur_background.classList.remove("visible");
    }
  });
});
