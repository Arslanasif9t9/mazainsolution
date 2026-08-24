import { Link } from 'react-router-dom';
import HeroBackgroundVideo from '../components/HeroBackgroundVideo';
import ScrollReveal from '../components/ScrollReveal';
const heroVideoChunks = [
  { start: 0, end: 6 },
  { start: 25, end: 31 },
  { start: 55, end: 61 },
];
const softwareServices = [
  'Digital Marketing', 'E-Commerce Solutions', 'Social Media Marketing', 'Android App Development',
  'Web Development', 'UI/UX Design (Figma)', 'SEO Optimization', 'WordPress Development',
  'Shopify Store Setup', 'Content Writing', 'Email Marketing', 'Website Maintenance',
];

const professionalCourses = [
  'YouTube Automation', 'Digital Marketing', 'Graphic Designing', 'Video Editing',
  'Freelancing', 'Blogging', 'E-Commerce Solutions', 'Android App Development',
  'Web Development', 'UI/UX Design (Figma)', 'SEO Optimization', 'WordPress Development',
];

const stats = [
  { value: '100+', label: 'Projects Completed', color: 'text-purple-700' },
  { value: '98%', label: 'Client Retention', color: 'text-purple-700' },
  { value: '50K+', label: 'Development Hours', color: 'text-red-600' },
  { value: '24/7', label: 'Support & Maintenance', color: 'text-purple-700' },
];

export default function About() {
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

      {/* Company story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Journey</h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in the heart of Narowal City, Mazain Solution has been at the forefront of digital innovation,
                serving clients worldwide with cutting-edge software solutions and comprehensive IT education.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Located at Shakrgar, Narowal Road near Ranger Head Covater, we've grown from a local startup to a
                globally recognized software house, delivering excellence in every project we undertake.
              </p>
              <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-600">
                <p className="text-purple-800 font-semibold">
                  "Our mission is to bridge the gap between technology and business needs, empowering organizations
                  and individuals through innovative solutions and quality education."
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-8 text-white transform rotate-3 hover:rotate-0 transition duration-500">
                <div className="bg-white rounded-xl p-6 transform -rotate-3 shadow-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Presence</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-purple-600"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Narowal Office</p>
                        <p className="text-gray-600 text-sm">Jassar Bypass, Shakargarh Road, opp. Rangers Head Quarter, Narowal, 51600</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <i className="fas fa-globe text-purple-600"></i>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Global Reach</p>
                        <p className="text-gray-600 text-sm">Serving Clients Worldwide</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services + Courses overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive software services and professional courses designed to meet modern digital demands
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-code text-purple-600 text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Software Services</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {softwareServices.map((s) => (
                  <div className="flex items-center space-x-2" key={s}>
                    <i className="fas fa-check text-green-500"></i>
                    <span className="text-gray-700">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-graduation-cap text-pink-600 text-xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Professional Courses</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {professionalCourses.map((c) => (
                  <div className="flex items-center space-x-2" key={c}>
                    <i className="fas fa-play text-blue-500"></i>
                    <span className="text-gray-700">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <h2 className="text-2xl md:text-3xl font-bold mb-10">Mazain Solution by the numbers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <ScrollReveal key={s.label} direction="right" delay={0.4}>
              <div key={s.label}>
              <p className={`text-4xl font-extrabold ${s.color}`}>{s.value}</p>
              <p className="text-gray-600">{s.label}</p>
            </div>
              </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Let's discuss how Mazain Solution can help transform your ideas into successful digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+923151480480" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-full font-semibold text-lg transition duration-300 transform hover:scale-105">
              <i className="fas fa-phone mr-2"></i>Call Now: 03151480480
            </a>
            <a href="mailto:mazainsolution@gmail.com" className="border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition duration-300">
              <i className="fas fa-envelope mr-2"></i>Send Email
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
