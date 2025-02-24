function applyAnimation() {
  const windowWidth = window.innerWidth; // 100%
  const windowHeight = window.innerHeight; // 100%

  const mainHeader = document.getElementById("main-header");
  const headerLogo = document.getElementById("header-logo");
  const image = document.getElementById("hero-image");
  const video = document.getElementById("hero-video");

  const headerScrollRange = 965;
  const imageScrollRange = 965;
  const videoScrollRange = 965;
  const videoRetrievingScrollRange = 1382;

  // image factors
  const imageInitialTop = 16;

  const imageInitialWidth = 1 * windowWidth;
  const imageFinalWidth = 160;
  const imageWidthFactor =
    (imageInitialWidth - imageFinalWidth) / imageScrollRange;

  const imageFinalLeft = 40;
  const imageLeftFactor = imageFinalLeft / imageScrollRange;

  // video factors
  const videoInitialTop = 0.3 * windowWidth;
  const videoFinalTop = 110;
  const videoTopFactor = (videoInitialTop - videoFinalTop) / videoScrollRange;

  const videoInitialRight = 0.1 * windowWidth;
  const videoFinalRight = 40;
  const videoRightFactor =
    (videoInitialRight - videoFinalRight) / videoScrollRange;

  const videoInitialWidth = 0.31 * windowWidth;
  const videoFinalWidth = windowWidth - 80;
  const videoWidthFactor =
    (videoFinalWidth - videoInitialWidth) / videoScrollRange;

  const videoInitialHeight = 0.1705 * windowWidth;
  const videoFinalHeight = windowHeight - 150;
  const videoHeightFactor =
    (videoFinalHeight - videoInitialHeight) / videoScrollRange;

  // calculations
  if (image && video && mainHeader && headerLogo) {
    image.style.top = `${imageInitialTop}px`;

    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY;
      const retrievingVideoScrollPosition =
        window.scrollY - videoRetrievingScrollRange;

      // header calculations
      if (scrollPosition <= headerScrollRange) {
        mainHeader.style.backgroundColor = "transparent";
        headerLogo.style.visibility = "hidden";
      } else {
        mainHeader.style.backgroundColor = "white";
        headerLogo.style.visibility = "visible";
      }

      // image calculations
      if (scrollPosition <= imageScrollRange) {
        image.style.insetInlineStart = `${
          0 + scrollPosition * imageLeftFactor
        }px`;
        image.style.width = `${
          windowWidth - scrollPosition * imageWidthFactor
        }px`;
      } else {
        image.style.insetInlineStart = `${imageFinalLeft}px`;
        image.style.width = `${imageFinalWidth}px`;
      }

      // video calculations
      if (scrollPosition <= videoScrollRange) {
        video.style.top = `${
          videoInitialTop - scrollPosition * videoTopFactor
        }px`;
        video.style.insetInlineEnd = `${
          videoInitialRight - scrollPosition * videoRightFactor
        }px`;
        video.style.width = `${
          videoInitialWidth + scrollPosition * videoWidthFactor
        }px`;
        video.style.height = `${
          videoInitialHeight + scrollPosition * videoHeightFactor
        }px`;
      } else if (
        scrollPosition > videoScrollRange &&
        scrollPosition <= videoRetrievingScrollRange
      ) {
        video.style.top = `${videoFinalTop}px`;
        video.style.insetInlineEnd = `${videoFinalRight}px`;
        video.style.width = `${videoFinalWidth}px`;
        video.style.height = `${videoFinalHeight}px`;
      } else {
        video.style.top = `${
          videoFinalTop + retrievingVideoScrollPosition * videoTopFactor
        }px`;
        video.style.insetInlineEnd = `${
          videoFinalRight + retrievingVideoScrollPosition * videoRightFactor
        }px`;
        video.style.width = `${
          videoFinalWidth - retrievingVideoScrollPosition * videoWidthFactor
        }px`;
        video.style.height = `${
          videoFinalHeight - retrievingVideoScrollPosition * videoHeightFactor
        }px`;
      }
    });
  }
}
applyAnimation();
