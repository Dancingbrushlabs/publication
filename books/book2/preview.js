const pageElements = document.querySelectorAll(".book-page");
const pageCount = document.querySelector("#page-count");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const flipBook = document.querySelector("#flip-book");

function updatePageCount(index) {
  pageCount.textContent = `${index + 1} / ${pageElements.length}`;
}

if (window.St && pageElements.length > 0) {
  const pageFlip = new St.PageFlip(flipBook, {
    width: 715,
    height: 550,
    size: "stretch",
    minWidth: 320,
    maxWidth: 1120,
    minHeight: 246,
    maxHeight: 862,
    maxShadowOpacity: 0.35,
    showCover: false,
    usePortrait: false,
    mobileScrollSupport: false,
    flippingTime: 800,
  });

  pageFlip.loadFromHTML(pageElements);
  pageFlip.on("flip", (event) => updatePageCount(event.data));

  prevButton.addEventListener("click", () => pageFlip.flipPrev());
  nextButton.addEventListener("click", () => pageFlip.flipNext());
} else {
  let currentPage = 0;

  pageElements.forEach((page, index) => {
    page.hidden = index !== 0;
  });

  function showPage(index) {
    currentPage = (index + pageElements.length) % pageElements.length;
    pageElements.forEach((page, pageIndex) => {
      page.hidden = pageIndex !== currentPage;
    });
    updatePageCount(currentPage);
  }

  prevButton.addEventListener("click", () => showPage(currentPage - 1));
  nextButton.addEventListener("click", () => showPage(currentPage + 1));
}
