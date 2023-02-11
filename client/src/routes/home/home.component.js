import "./home.style.scss";
import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function Home() {
  // const settings = {
  //   dots: false,
  //   infinite: true,
  //   speed: 1000,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  //   // prevArrow: <PrevArrow />,
  //   // nextArrow: <NextArrow />,
  // };

  const initializeSlideEvents = () => {
    const dot1 = document.getElementById("dot-1");
    const dot2 = document.getElementById("dot-2");
    const dot3 = document.getElementById("dot-3");
    const slider = document.querySelector(".carousel-slider");

    dot1.addEventListener("click", () => {
      slider.style.transform = "translateX(0%)"
      dot1.style.transform = "scale(1.3)"
      dot2.style.transform = "scale(1)"
      dot3.style.transform = "scale(1)"
    });
    dot2.addEventListener("click", () => {
      slider.style.transform = "translateX(-33.3333%)"
      dot2.style.transform = "scale(1.3)"
      dot1.style.transform = "scale(1)"
      dot3.style.transform = "scale(1)"
    });
    dot3.addEventListener("click", () => {
      slider.style.transform = "translateX(-66.66667%)"
      dot3.style.transform = "scale(1.3)"
      dot2.style.transform = "scale(1)"
      dot1.style.transform = "scale(1)"
    });
  }

  useEffect(() => {
    initializeSlideEvents();
  },[initializeSlideEvents]);

  return (
    <div className="home">
      <div className="carousel">
        <div className="carousel-container">
          <div className="carousel-slider">
            <div className="slide-container">
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <h1 className="slide-title">Seasonal Woman Bags</h1>
                <a className="slide-btn">See More</a>
              </div>
              <div id="slide-1" className="slide"></div>
            </div>

            <div className="slide-container">
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <h1 className="slide-title">Summer Shoes On Sale</h1>
                <a className="slide-btn">See More</a>
              </div>
              <div id="slide-2" className="slide"></div>
            </div>

            <div className="slide-container">
              <div className="slide-overlay"></div>
              <div className="slide-content">
                <h1 className="slide-title">Find Out New Combines</h1>
                <a className="slide-btn">See More</a>
              </div>
              <div id="slide-3" className="slide"></div>
            </div>
          </div>
          <div className="carousel-dots">
            <div id="dot-1" className="dot"></div>
            <div id="dot-2" className="dot"></div>
            <div id="dot-3" className="dot"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div>
      <i
        onClick={onClick}
        id="arrow-left"
        class="arrow fa-solid fa-arrow-left"
      ></i>
    </div>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div>
      <i
        onClick={onClick}
        id="arrow-right"
        class="arrow fa-solid fa-arrow-right"
      ></i>
    </div>
  );
}
