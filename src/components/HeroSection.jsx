import React, { useEffect } from "react";
import { Row, Col } from "antd";
import AOS from "aos";
import "aos/dist/aos.css";
import HeroBanner from "../assets/hero-tech.jpg";
const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section className="w-full bg-transparent text-gray-900 py-28 px-6">
      <Row
        gutter={[32, 32]}
        justify="center"
        align="middle"
        className="max-w-7xl mx-auto"
      >
        <Col xs={24} lg={12} data-aos="fade-up">
          <div className="space-y-6 lg:pr-6">
            <h1 className="text-5xl font-semibold leading-snug tracking-tight">
              Smart Technology, Sophisticated Design
            </h1>
            <p className="text-lg text-gray-700">
              Elevate your experience with minimalist tech products built for
              performance and style. Whether you're streamlining your workflow
              or enhancing your home, we deliver solutions that blend innovation
              and elegance.
            </p>
            <div className="space-x-4 pt-4">
              <a
                href="/products"
                className="bg-gray-900 text-white px-7 py-3 rounded-sm hover:bg-gray-800 transition duration-300"
              >
                View Products
              </a>
              <a
                href="/learn-more"
                className="border border-gray-900 px-7 py-3 rounded-sm text-gray-900 hover:bg-gray-900 hover:text-white transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={12} data-aos="fade-up">
          <img
            src={HeroBanner}
            alt="High-end tech devices"
            className="w-full rounded-xl shadow-lg mt-10 lg:mt-0"
          />
        </Col>
      </Row>
    </section>
  );
};

export default HeroSection;
