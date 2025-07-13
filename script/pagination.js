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

const petsPag = [
  {
    name: "Jennifer",
    image: "../img/pets-jennifer.png",
    type: "Dog",
    breed: "Labrador",
    description:
      "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
    age: "2 months",
    inoculations: ["none"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Sophia",
    image: "../img/pets-sophia.png",
    type: "Dog",
    breed: "Shih tzu",
    description:
      "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
    age: "1 month",
    inoculations: ["parvovirus"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Woody",
    image: "../img/pets-woody.png",
    type: "Dog",
    breed: "Golden Retriever",
    description:
      "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
    age: "3 years 6 months",
    inoculations: ["adenovirus", "distemper"],
    diseases: ["right back leg mobility reduced"],
    parasites: ["none"],
  },
  {
    name: "Scarlett",
    image: "../img/pets-scarlet.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
    age: "3 months",
    inoculations: ["parainfluenza"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Katrine",
    image: "../img/pets-katrine.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
    age: "6 months",
    inoculations: ["panleukopenia"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Timmy",
    image: "../img/pets-timmy.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
    age: "2 years 3 months",
    inoculations: ["calicivirus", "viral rhinotracheitis"],
    diseases: ["kidney stones"],
    parasites: ["none"],
  },
  {
    name: "Freddie",
    image: "../img/pets-freddy.png",
    type: "Cat",
    breed: "British Shorthair",
    description:
      "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
    age: "2 months",
    inoculations: ["rabies"],
    diseases: ["none"],
    parasites: ["none"],
  },
  {
    name: "Charly",
    image: "../img/pets-charly.png",
    type: "Dog",
    breed: "Jack Russell Terrier",
    description:
      "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
    age: "8 years",
    inoculations: ["bordetella bronchiseptica", "leptospirosis"],
    diseases: ["deafness", "blindness"],
    parasites: ["lice", "fleas"],
  },
];

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function createRandomArray(array, repeats) {
  let randomArr = [];
  for (let i = 0; i < repeats; i++) {
    let part = shuffleArray(array);
    randomArr.push(part);
    part = [];
  }
  return randomArr;
}
function flatten(arr) {
  return arr.reduce((acc, el) => {
    return Array.isArray(el) ? acc.concat(flatten(el)) : acc.concat(el);
  }, []);
}
function createCard(i) {
  let card = document.createElement("div");
  card.classList.add("card");
  let current = allPets[i];
  card.innerHTML = `
                  <img src=${current.image} alt=${current.name} />
                  <p class="card-text">${current.name}</p>
                  <div class="button pet-button">Learn more</div>
                `;

  return card;
}
function renderCards(page, items) {
  pagination.innerHTML = "";
  let firstCard = page * items - items;
  let lastCard = page * items;
  for (let i = firstCard; i < lastCard; i++) {
    pagination.append(createCard(i));
  }
}
function nextPage() {
  pageCurrent++;
  paginationStyles();
  if (pageCurrent == totalPages) {
    lastPageReached();
  }
  currentPageNumber.innerText = pageCurrent;
  renderCards(pageCurrent, pageCards);
}
function prevPage() {
  pageCurrent--;
  paginationStyles();
  if (pageCurrent == 1) {
    firstPageReached();
  }
  currentPageNumber.innerText = pageCurrent;
  renderCards(pageCurrent, pageCards);
}
function lastPage() {
  pageCurrent = totalPages;
  paginationStyles();
  lastPageReached();
  currentPageNumber.innerText = pageCurrent;
  renderCards(pageCurrent, pageCards);
}
function firstPage() {
  pageCurrent = 1;
  paginationStyles();
  firstPageReached();
  currentPageNumber.innerText = pageCurrent;
  renderCards(pageCurrent, pageCards);
}
function firstPageReached() {
  prevPageButton.removeEventListener("click", prevPage);
  prevPageButton.classList.remove("button-active");
  prevPageButton.classList.add("button-innactive");
  firstPageButton.classList.remove("button-active");
  firstPageButton.classList.add("button-innactive");
}
function lastPageReached() {
  nextPageButton.removeEventListener("click", nextPage);
  nextPageButton.classList.add("button-innactive");
  nextPageButton.classList.remove("button-active");
  lastPageButton.classList.add("button-innactive");
  lastPageButton.classList.remove("button-active");
}
function paginationStyles() {
  prevPageButton.addEventListener("click", prevPage);
  firstPageButton.addEventListener("click", firstPage);
  nextPageButton.addEventListener("click", nextPage);
  lastPageButton.addEventListener("click", lastPage);
  nextPageButton.classList.add("button-active");
  nextPageButton.classList.remove("button-innactive");
  lastPageButton.classList.add("button-active");
  lastPageButton.classList.remove("button-innactive");
  // activate all
  prevPageButton.classList.add("button-active");
  prevPageButton.classList.remove("button-innactive");
  firstPageButton.classList.add("button-active");
  firstPageButton.classList.remove("button-innactive");
}
function windowValidate() {
  if (window.innerWidth > 940) {
    pageCards = 8;
  } else if (window.innerWidth > 700) {
    pageCards = 6;
  } else {
    pageCards = 3;
  }
  firstPage();
  totalPages = Math.ceil(allPets.length / pageCards);
  renderCards(pageCurrent, pageCards);
  console.log(totalPages);
}
// sol
let pagination = document.querySelector(".slider"),
  currentPageNumber = document.querySelector(".nav-pages"),
  nextPageButton = document.querySelector(".next-page"),
  prevPageButton = document.querySelector(".prev-page"),
  lastPageButton = document.querySelector(".last-page"),
  firstPageButton = document.querySelector(".first-page");

let allPets = [
  ...shuffleArray(petsPag),
  ...shuffleArray(petsPag),
  ...shuffleArray(petsPag),
  ...shuffleArray(petsPag),
  ...shuffleArray(petsPag),
  ...shuffleArray(petsPag),
];
let pageCurrent = 1;
let pageCards = 8;
let totalPages = Math.ceil(allPets.length / pageCards);
windowValidate();

// renderCards(pageCurrent, pageCards);
nextPageButton.addEventListener("click", nextPage);
lastPageButton.addEventListener("click", lastPage);
window.addEventListener("resize", windowValidate);

//modal

const petsContainer = document.querySelector(".pets"),
  slierPag = document.querySelector(".slider");

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
        <img src="../img/icons/close.png" alt="cross" />
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
  let index = allPets.findIndex((obj) => obj.name == petName);
  return index;
}

slierPag.addEventListener("click", (e) => {
  let petName = "";
  if (e.target.classList.contains("card")) {
    petName = e.target.children[1].innerText;
  } else if (e.target.parentElement.classList.contains("card")) {
    petName = e.target.parentElement.children[1].innerText;
  } else {
    return;
  }
  console.log(petName);

  petsContainer.append(renderModal(allPets[getPetIndex(petName)]));
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
