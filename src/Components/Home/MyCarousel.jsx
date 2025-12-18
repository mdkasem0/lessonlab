import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const MyCarousel = () => {
  const slides = [
    {
      img: "https://i.postimg.cc/Y06QnfBr/learning.jpg",
      text: "Every experience teaches us something — capture your wisdom.",
    },
    {
      img: "https://i.postimg.cc/kMzrqMmh/learning_(1).jpg",
      text: "Grow a little every day — let your lessons guide you forward.",
    },
    {
      img: "https://i.postimg.cc/C5Tjsrtm/learning_(10).jpg",
      text: "Your stories hold power — share them and inspire others.",
    },
    {
      img: "https://i.postimg.cc/vBjPFvKt/learning_(11).jpg",
      text: "Organize what matters. Revisit what shaped you.",
    },
    {
      img: "https://i.postimg.cc/XY3sbqsz/learning_(12).jpg",
      text: "Track your growth, embrace your journey.",
    },
    {
      img: "https://i.postimg.cc/9QzJMZYc/learning_(2).jpg",
      text: "Your lessons might be someone else’s turning point.",
    },
  ];

  return (
    <div className=" max-h-[66vh] overflow-hidden  shadow-xl">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3500}
        transitionTime={800}
        swipeable
        emulateTouch
      >
        {slides.map((slide, i) => (
          <div key={i} className="relative max-h-[66vh]">
            {/* Image */}
            <img
              src={slide.img}
              alt={`slide-${i}`}
              className="object-cover w-full h-[66vh] object-center"
            />

            {/* Black Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>

            {/* Centered Text */}
            <div className="absolute w-2/3 mx-auto inset-0 flex items-center justify-center px-5">
              <h2 className="text-white text-2xl md:text-4xl font-semibold text-center leading-snug drop-shadow-lg tracking-wide">
                {slide.text}
              </h2>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
