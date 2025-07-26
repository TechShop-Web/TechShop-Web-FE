import React from "react";
import MainLayout from "../layouts/MainLayout";
import HeroSection from "../components/HeroSection";
import CategoryList from "../components/CategoryList";
import ProductList from "../components/ProductList";
import RevealOnScroll from "../components/RevealOnScroll";
const HomePage = () => {
  return (
    <>
      <RevealOnScroll>
        <HeroSection />
      </RevealOnScroll>

      <RevealOnScroll delay={100}>
        <CategoryList />
      </RevealOnScroll>

      <RevealOnScroll delay={200}>
        <ProductList />
      </RevealOnScroll>
    </>
  );
};

export default HomePage;
