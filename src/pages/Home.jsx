import React from "react";
import { useInView } from "react-intersection-observer";

const FadeInSection = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const products = [
  {
    title: "Smartphone Pro Max",
    img: "https://image.plo.vn/300x200/Uploaded/2025/vrwqqxjwp/2024_02_25/5-thuong-hieu-smartphone-dan-dau-tai-viet-nam-8670.jpeg.webp",
    desc: "High-performance smartphone with advanced features.",
  },
  {
    title: "UltraBook X",
    img: "https://thegioididong.pro.vn/wp-content/uploads/2024/06/laptop-hp-15-fd0234tu-9q969pa-intel-core-i5-1334u-ram-16gb-ssd-512gb-card-do-hoa-intel-iris-xe-man-hinh-15-6-inch-image.jpg",
    desc: "Lightweight and powerful for work and play.",
  },
  {
    title: "Noise-Cancelling Headphones",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR5NkH6BAWSgB9zlUpuxpE93ri8IjCbmQ9oQ&s",
    desc: "Immerse yourself in pure, high-quality sound.",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Header */}
      <header className="bg-indigo-900 text-white py-6 text-center">
        <h1 className="text-4xl font-bold">TechZone</h1>
        <p className="text-lg mt-2">Your Source for the Latest Tech Products</p>
      </header>

      {/* Navigation */}
      <nav className="bg-indigo-800 text-white py-3">
        <ul className="flex flex-wrap justify-center gap-6 font-medium">
          {["Home", "Products", "About", "Contact"].map((item) => (
            <li key={item}>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero Section */}
      <FadeInSection>
        <section className="h-64 bg-gradient-to-r from-indigo-300 to-indigo-100 flex items-center justify-center text-3xl font-bold text-gray-900 shadow-inner">
          Discover the Future of Technology
        </section>
      </FadeInSection>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Products */}
        <FadeInSection>
          <section>
            <h2 className="text-2xl font-bold text-center mb-10">
              Featured Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <FadeInSection key={index} delay={index * 150}>
                  <div className="bg-white shadow p-4 text-center">
                    <img
                      src={product.img}
                      alt={product.title}
                      className="w-full h-40 object-cover mb-4"
                    />
                    <h3 className="text-xl font-semibold mb-1 truncate">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      {product.desc}
                    </p>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </section>
        </FadeInSection>

        {/* About Section */}
        <FadeInSection delay={200}>
          <section className="mt-16 bg-white px-6 py-8 shadow">
            <h2 className="text-2xl font-bold mb-4">About TechZone</h2>
            <p className="text-gray-700 mb-4">
              At TechZone, we are passionate about bringing you the latest and
              greatest in tech. From cutting-edge smartphones to powerful
              laptops and accessories, we offer a wide range of products
              designed to keep you connected, productive, and entertained.
            </p>
            <p className="text-gray-700">
              Our mission is to make technology accessible and affordable for
              everyone. Whether you're a tech enthusiast or just looking for
              reliable gadgets, TechZone has something for you.
            </p>
          </section>
        </FadeInSection>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white text-center py-4 mt-12">
        &copy; 2025 TechZone. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
