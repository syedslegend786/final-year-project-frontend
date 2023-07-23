"use client";
import CarCard from "@/components/CarCard";
import useVehiclesApi from "@/hooks/useVehiclesApi";
import HeroCarousel from "@/layout/Home/HeroCarousel";
import Main from "@/templates/Main";
import React from "react";

const Home = () => {
  return (
    <Main>
      <HeroCarousel />
    </Main>
  );
};

export default Home;
