import { Link } from 'react-router-dom';
import ServiceDetailCard from '../components/services/ServiceDetailCard';
import { serviceCategories } from '../data/servicesData';
import HeroBackgroundVideo from '../components/HeroBackgroundVideo';
import ScrollReveal from '../components/ScrollReveal';

// Hero plays through these video chunks in sequence, looping back to the first
const heroVideoChunks = [
  { start: 0, end: 6 },
  { start: 25, end: 31 },
  { start: 55, end: 61 },
];

export default function Services() {
  return (
    <>
      {/* Page hero */}
      <header className="bg-dark-gradient text-white py-20 shadow-xl border-b border-purple-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/70 z-0"></div>

        {/* Background video — swap src for the real hero clip */}
        <HeroBackgroundVideo src="/video/hero-background.mp4" chunks={heroVideoChunks} />

        <div className="relative z-10 text-center mt-16 md:mt-24">
          <p className="text-lg font-medium text-purple-400 uppercase tracking-widest mb-3 animate-fade-in-up">
            Premier Full-Stack Software House
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold font-serif mb-6 leading-tight animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Building Digital Solutions <br className="hidden sm:inline" /> For Tomorrow
          </h1>
          <p className="max-w-3xl mx-auto text-gray-300 text-xl mb-10 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            We specialize in delivering bespoke web, mobile, and cloud solutions that drive innovation and business growth.
          </p>
          <Link to="/contact">
            <button className="btn-primary bg-gradient-to-r from-purple-700 to-red-600 hover:from-purple-800 hover:to-red-700 animate-fade-in-up" style={{ animationDelay: '600ms' }}>
              Start Your Project Today
            </button>
          </Link>
        </div>
      </header>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-purple-700 mr-2">/</span> Our Core Services
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Mazain Solution offers end-to-end development services, from initial concept and design to deployment
              and ongoing maintenance.
            </p>
          </div>

          {serviceCategories.map((category) => (
           <ScrollReveal key={category.title} direction="up" delay={0.2}>
             <div className="mb-20" key={category.name}>
              <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">{category.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.items.map((item) => (
                  <ServiceDetailCard key={item.title} {...item} />
                ))}
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      {/* CTA */}
<section className="py-20 bg-gray-900 text-white text-center">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
    <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
      Let's discuss how our services can help you achieve your digital goals and drive business growth.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
      <a href="https://wa.me/923151480480" target="_blank" rel="noreferrer">
        <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-semibold text-lg transition duration-300 transform hover:scale-105">
          Get a Free Consultation
        </button>
      </a>
      <a href="tel:+923151480480">
        <button className="border border-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-full font-semibold text-lg transition duration-300 transform hover:scale-105">
          Call Us: 03151480480
        </button>
      </a>
    </div>
  </div>
</section>
    </>
  );
}