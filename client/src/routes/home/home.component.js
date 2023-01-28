import "./home.style.scss";
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
export default function Home() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
  };
  return (
    <div className="home">
      <div className="carousel">
        <div className="carousel-container">
          <Slider {...settings} className="carousel-slider">
            <div className="slide-container">
              <div id="slide-1" className="slide"></div>
            </div>
            <div className="slide-container">
              <div id="slide-2" className="slide"></div>
            </div>
            <div className="slide-container">
              <div id="slide-3" className="slide"></div>
            </div>
          </Slider>
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
