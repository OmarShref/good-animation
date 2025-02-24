"use client";

import { useEffect, useRef } from "react";

export default function Home() {
  // scrollY:0 => top:20 width:1487px left:0
  // scrollY:965 => top:-49 width:174px left:46px

  // start scrollend 1342
  // start video retrieve transformation 1362

  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const windowWidth = window.innerWidth; // 100%
    const windowHeight = window.innerHeight; // 100%

    const mainHeader = document.getElementById("main-header");
    const headerLogo = document.getElementById("header-logo");
    const image = imgRef.current;
    const video = videoRef.current;

    const headerScrollRange = 965;
    const imageScrollRange = 965;
    const videoScrollRange = 965;
    const videoRetrievingScrollRange = 1382;

    const isLargeScreen = windowWidth >= 1024;

    // image factors
    const imageInitialTop = isLargeScreen ? 16 : 16;

    const imageInitialWidth = 1 * windowWidth;
    const imageFinalWidth = isLargeScreen ? 160 : 160;
    const imageWidthFactor =
      (imageInitialWidth - imageFinalWidth) / imageScrollRange;

    const imageFinalLeft = isLargeScreen ? 40 : 40;
    const imageLeftFactor = imageFinalLeft / imageScrollRange;

    // video factors
    const videoInitialTop = 0.3 * windowWidth;
    const videoFinalTop = isLargeScreen ? 110 : 110;
    const videoTopFactor = (videoInitialTop - videoFinalTop) / videoScrollRange;

    const videoInitialRight = 0.1 * windowWidth;
    const videoFinalRight = isLargeScreen ? 40 : 40;
    const videoRightFactor =
      (videoInitialRight - videoFinalRight) / videoScrollRange;

    const videoInitialWidth = 0.31 * windowWidth;
    const videoFinalWidth = isLargeScreen ? windowWidth - 80 : 40;
    const videoWidthFactor =
      (videoFinalWidth - videoInitialWidth) / videoScrollRange;

    const videoInitialHeight = 0.1705 * windowWidth;
    const videoFinalHeight = isLargeScreen ? windowHeight - 150 : 40;
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
  }, []);

  return (
    <>
      <div className="scroll-section-1 h-[1342px]">
        <div className="slide-1  sticky top-0 ">
          <img
            ref={imgRef}
            src="https://areebe.com/wp-content/uploads/2025/02/Areeb-Logo-01-copy.png"
            alt="Slide Image"
            className=" absolute "
            style={{
              top: "16px",
              insetInlineStart: "0px",
              width: "100%",
            }}
          />

          <video
            autoPlay
            muted
            loop
            ref={videoRef}
            className=" absolute rounded-xl block bg-black max-h-[calc(100vh-150px)]"
            style={{
              top: "30vw",
              insetInlineEnd: "10vw",
              width: "31vw",
              height: "17.05vw",
            }}
          >
            <source
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              type="video/mp4"
            ></source>
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* =========================================== */}

      <div className=" h-screen"></div>
    </>
  );
}
