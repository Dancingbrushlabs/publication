const pages = [
  {
    src: "../../assets/books/book2-1.jpg",
    alt: "두 번째 그림책 프리뷰 장면 1",
  },
  {
    src: "../../assets/books/book2-2.jpg",
    alt: "두 번째 그림책 프리뷰 장면 2",
  },
  {
    src: "../../assets/books/book2-3.jpg",
    alt: "두 번째 그림책 프리뷰 장면 3",
  },
  {
    src: "../../assets/books/book2-4.jpg",
    alt: "두 번째 그림책 프리뷰 장면 4",
  },
];

const bookPage = document.querySelector("#book-page");
const bookImage = document.querySelector("#book-image");
const nextImage = document.querySelector("#next-image");
const pageCount = document.querySelector("#page-count");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentPage = 0;
let isTurning = false;

function showPage(index) {
  const normalizedIndex = (index + pages.length) % pages.length;
  const page = pages[normalizedIndex];

  currentPage = normalizedIndex;
  bookImage.src = page.src;
  bookImage.alt = page.alt;
  pageCount.textContent = `${currentPage + 1} / ${pages.length}`;
}

function turnTo(index) {
  if (isTurning) {
    return;
  }

  const normalizedIndex = (index + pages.length) % pages.length;
  const nextPage = pages[normalizedIndex];

  isTurning = true;
  nextImage.src = nextPage.src;
  nextImage.alt = "";
  bookPage.classList.add("turning");

  window.setTimeout(() => {
    showPage(normalizedIndex);
  }, 320);

  window.setTimeout(() => {
    bookPage.classList.remove("turning");
    nextImage.src = pages[currentPage].src;
    isTurning = false;
  }, 640);
}

prevButton.addEventListener("click", () => turnTo(currentPage - 1));
nextButton.addEventListener("click", () => turnTo(currentPage + 1));
bookPage.addEventListener("click", () => turnTo(currentPage + 1));
