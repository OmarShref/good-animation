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

    const imageScrollRange = 965;
    const videoScrollRange = 965;

    const isLargeScreen = windowWidth >= 1024;

    const image = imgRef.current;
    const video = videoRef.current;

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

    if (image && video) {
      image.style.top = `${imageInitialTop}px`;

      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;

        // image calculations
        if (scrollPosition <= imageScrollRange) {
          image.style.left = `${0 + scrollPosition * imageLeftFactor}px`;
          image.style.width = `${
            windowWidth - scrollPosition * imageWidthFactor
          }px`;
        } else {
          image.style.left = `${imageFinalLeft}px`;
          image.style.width = `${imageFinalWidth}px`;
        }

        // video calculations
        if (scrollPosition <= videoScrollRange) {
          video.style.top = `${
            videoInitialTop - scrollPosition * videoTopFactor
          }px`;
          video.style.right = `${
            videoInitialRight - scrollPosition * videoRightFactor
          }px`;
          video.style.width = `${
            videoInitialWidth + scrollPosition * videoWidthFactor
          }px`;
          video.style.height = `${
            videoInitialHeight + scrollPosition * videoHeightFactor
          }px`;
        } else {
          video.style.top = `${videoFinalTop}px`;
          video.style.right = `${videoFinalRight}px`;
          video.style.width = `${videoFinalWidth}px`;
          video.style.height = `${videoFinalHeight}px`;
        }
      });
    }
  }, []);

  return (
    <div dir="ltr" className="scroll-section-1 h-[1342px]">
      <div className="slide-1  sticky top-0 ">
        <img
          ref={imgRef}
          src="https://areebe.com/wp-content/uploads/2025/02/Areeb-Logo-01-copy.png"
          alt="Slide Image"
          className=" absolute "
          style={{
            top: "16px",
            left: "0px",
            width: "100%",
          }}
        />

        <video
          autoPlay
          muted
          loop
          ref={videoRef}
          className=" absolute rounded-xl top-[30vw] right-[10vw] block bg-black max-h-[calc(100vh-120px)]"
          style={{
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
  );
}
