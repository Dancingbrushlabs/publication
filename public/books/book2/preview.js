const pageElements = document.querySelectorAll(".book-page");
const pageCount = document.querySelector("#page-count");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
const flipBook = document.querySelector("#flip-book");
const sceneTitle = document.querySelector("#scene-title");
const sceneCopy = document.querySelector("#scene-copy");

const sceneTexts = [
  {
    title: "초록 기차가 바다를 향해 달립니다",
    copy:
      "햇빛이 부서지는 바다 위로 초록 기차가 지나가고, 아이는 창밖으로 펼쳐지는 풍경을 바라봅니다. 이 장면에서 작은 여행의 설렘이 시작됩니다.",
  },
  {
    title: "바닷가 역에 도착한 순간",
    copy:
      "기차에서 내린 아이는 반짝이는 바다를 향해 달려갑니다. 익숙한 길을 벗어나 새 풍경 속으로 들어서는 마음이 환하게 번집니다.",
  },
  {
    title: "파도와 함께 뛰노는 시간",
    copy:
      "밀려오는 파도 사이에서 아이의 웃음이 커집니다. 바다는 놀이가 되고, 여행은 몸으로 기억하는 하루가 됩니다.",
  },
  {
    title: "모래 위에 쌓아 올린 작은 성",
    copy:
      "조개와 모래로 만든 성 앞에서 아이의 상상은 더 멀리 이어집니다. 바닷가의 하루가 한 권의 이야기로 천천히 남습니다.",
  },
];

function updatePageCount(index) {
  pageCount.textContent = `${index + 1} / ${pageElements.length}`;
}

function updateSceneText(index) {
  const safeIndex = Math.max(0, Math.min(sceneTexts.length - 1, index));
  const scene = sceneTexts[safeIndex];
  sceneTitle.textContent = scene.title;
  sceneCopy.textContent = scene.copy;
  updatePageCount(safeIndex);
}

if (window.St && pageElements.length > 0) {
  const isNarrowViewport = window.matchMedia("(max-width: 860px)").matches;
  const imageSources = Array.from(pageElements)
    .map((page) => page.querySelector("img")?.getAttribute("src"))
    .filter(Boolean);
  const pageFlip = new St.PageFlip(flipBook, {
    width: 715,
    height: 550,
    size: "stretch",
    minWidth: isNarrowViewport ? 240 : 320,
    maxWidth: 1120,
    minHeight: isNarrowViewport ? 185 : 246,
    maxHeight: 862,
    maxShadowOpacity: 0.35,
    showCover: false,
    usePortrait: isNarrowViewport,
    mobileScrollSupport: false,
    flippingTime: 800,
  });

  pageElements.forEach((page) => {
    page.hidden = true;
  });
  pageFlip.loadFromImages(imageSources);
  updateSceneText(0);
  pageFlip.on("flip", (event) => updateSceneText(event.data));

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
    updateSceneText(currentPage);
  }

  updateSceneText(0);
  prevButton.addEventListener("click", () => showPage(currentPage - 1));
  nextButton.addEventListener("click", () => showPage(currentPage + 1));
}
