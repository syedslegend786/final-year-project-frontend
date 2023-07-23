import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import React from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Select from "@/components/Select";
import CarForm from "./CarForm";
const cars = [];
const settings = {
  dots: false,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
  pauseOnHover: false,
  pauseOnFocus: false,
  autoplay: true,
  fade: true,
} as Settings;
const HeroCarousel = () => {
  return (
    <div className="h-screen w-full overflow-hidden relative">
      <div className="inset-0 absolute z-10 bg-[rgba(0,0,0,0.4)] py-5 ">
        <div>
          <h1 className="capitalize text-7xl font-bold text-center text-white">
            Luxury cars to hire
          </h1>
          <p className="text-center w-[30%] m-auto mt-5 text-white text-sm font-medium">
            We offer professional car rental services in our range of high-end
            vehicles
          </p>
        </div>
        <CarForm className="-mt-10" />
      </div>
      <Slider {...settings} className="">
        {[1, 2, 3, 4].map((_, key) => (
          <div key={key} className="w-full h-screen relative overflow-hidden">
            <Image
              fill
              className="object-cover"
              src={`/assets/cars/${key + 1}.jpg`}
              alt=""
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroCarousel;
