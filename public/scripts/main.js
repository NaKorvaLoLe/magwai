document.addEventListener("DOMContentLoaded", function () {
  const headerHamburger = document.querySelector(".header__hamburger");
  const headerNav = document.querySelector(".header__nav");
  const headerWrapper = document.querySelector(".header__wrapper");

  headerHamburger.addEventListener("click", function () {
    headerNav.classList.toggle("active");
    headerWrapper.classList.toggle("active");
  });

  let currentPostCount = 0;
  const initialLoad = 10;
  const loadMoreCount = 5;
  const maxPosts = 30;
  const cardsWrapper = document.querySelector(".cards__wrapper");
  const cardsBtn = document.querySelector(".cards__btn");

  function createcardsItem(post) {
    const cardsItem = document.createElement("div");
    cardsItem.className = "cards__item";
    cardsItem.innerHTML = `
            <img
                src="./public/img/Bitmap.png"
                alt=""
                class="cards__item-img"
              />
              <div class="cards__item-content">
                <div>
                    <span class="cards__item-tag">bridge</span>
                    <span class="cards__item-name"
                    >${post.title}</span
                    >
                    <p class="cards__item-text">
                    ${post.body}
                    </p>
                </div>
                <div>
                    <span class="cards__item-posted"
                    >Posted by
                    <span class="cards__item-posted cards__item-posted__name"
                        >Eugenia</span
                    >, on July 24, 2019</span
                    >
                    <a href="/" class="cards__item-link">Continue reading</a>
                </div>
        `;
    return cardsItem;
  }

  async function loadPosts(count) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts`
      );
      const allPosts = await response.json();

      const newPosts = allPosts.slice(
        currentPostCount,
        currentPostCount + count
      );

      newPosts.forEach((post) => {
        cardsWrapper.appendChild(createcardsItem(post));
      });

      currentPostCount += newPosts.length;

      if (currentPostCount >= maxPosts) {
        cardsBtn.style.display = "none";
      }
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }

  loadPosts(initialLoad);

  cardsBtn.addEventListener("click", () => {
    if (currentPostCount < maxPosts) {
      loadPosts(loadMoreCount);
    }
  });

  const popupOverlay = document.querySelector(".popup__overlay");
  const record = document.querySelectorAll(".record");

  record.forEach((item) => {
    item.addEventListener("click", () => {
      popupOverlay.classList.add("active");
    });
  });
  popupOverlay.addEventListener("click", (e) => {
    console.log(e.target.className);
    
    if (e.target.className === "popup__overlay active") {
        popupOverlay.classList.remove("active");
    }
  });
});
