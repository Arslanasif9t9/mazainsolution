import { Link } from 'react-router-dom';
import ServiceCard from '../components/home/ServiceCard';
import CourseCard from '../components/home/CourseCard';
import TestimonialCard from '../components/home/TestimonialCard';
import VideoTestimonial from '../components/home/VideoTestimonial';
import HeroBackgroundVideo from '../components/HeroBackgroundVideo';
import { coreServices, homeCourses, testimonials, faqs } from '../data/homeContent';
import ScrollReveal from '../components/ScrollReveal';
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";



// Sample video URLs used as placeholders — swap in the real client video clips
const videoUrls = [
  'https://www.tiktok.com/@mazainsolution/video/7558485260967611666?is_from_webapp=1&sender_device=pc&web_id=7427555546470139399',
  'https://www.youtube.com/watch?v=3vff-Pe-jFc',
  'https://www.youtube.com/watch?v=cHLhItJq8i8',
  'https://www.youtube.com/watch?v=kukBOj9q9c0',
  'https://www.youtube.com/watch?v=rroneMlN9DE',
  'https://www.youtube.com/watch?v=P57DJYCnpMk',
];
const heroVideoChunks = [
  { start: 0, end: 6 },
  { start: 25, end: 31 },
  { start: 55, end: 61 },
];

// Split testimonials into rows of 3 for the scrolling gallery layout
function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}
const testimonialRows = chunk(testimonials, 3);

export default function Home() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <>
      {/* Header & Hero Section */}
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

      <main className="py-16 md:py-24">
        {/* Core Services */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            <span className="text-purple-700 mr-2">/</span> Our Core Services
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-12">
            Mazain Solution offers end-to-end development services, from initial concept and design to deployment and ongoing maintenance.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreServices.map((s, i) => (
              <ServiceCard key={s.title} {...s} delay={200 + i * 100} />
            ))}
          </div>
          <Link to="/services">
            <button className="btn-primary bg-purple-600 hover:bg-purple-700 mt-10">View All Services</button>
          </Link>
        </section>

        {/* Courses teaser */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            <span className="text-purple-700 mr-2">/</span> Our Courses
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-12">
            Master in-demand tech skills with our comprehensive courses, designed for beginners and professionals alike.
            Learn from industry experts and build real-world projects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {homeCourses.map((c, i) => (
              <CourseCard key={c.title} {...c} delay={200 + i * 100} />
            ))}
          </div>
          <Link to="/courses">
            <button className="btn-primary bg-purple-600 hover:bg-purple-700 mt-10">View All Courses</button>
          </Link>
        </section>

        {/* Client video testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-10">
            <span className="text-purple-700 mr-2">/</span> Real Reviews & Recommendations
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 mb-12">
            Watch what our clients have to say about their experience working with Mazain Solution.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {videoUrls.map((url, i) => (
              <VideoTestimonial key={i} src={url} />
            ))}
          </div>
        </section>

        {/* Quality commitment */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <p className="text-sm text-gray-500 mb-2">
            <span className="text-purple-700 mr-1">/</span> Our Commitment to Quality
          </p>
          <h3 className="text-xl font-bold mb-4">Fixed Scope, Transparent Pricing, and Code Quality Guarantee</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            We ensure every project meets the highest standards of code integrity and functional accuracy. Our process
            is transparent, predictable, and client-focused.
          </p>
        </section>

        {/* Scrolling testimonials */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
            <span className="text-purple-700 mr-2">/</span> What Our Clients Say
          </h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Discover why industry leaders trust Mazain Solution for their digital transformation journey
          </p>

          <div className="relative h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white shadow-inner">
            <div className="absolute inset-0 overflow-hidden">
              {/* animate-scroll loops the content; render the set twice back-to-back for a seamless loop */}
              <div className="animate-scroll space-y-6 py-6">
                {[...testimonialRows, ...testimonialRows].map((row, rowIdx) => (
                  <div className="flex gap-6 justify-center" key={rowIdx}>
                    {row.map((t) => (
                      <TestimonialCard key={`${rowIdx}-${t.name}`} {...t} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

         <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
            <h2 className="text-2xl md:text-3xl font-bold mb-10 opacity-0 animate-fade-in-up">
                Mazain Solution by the numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               
                <ScrollReveal delay={0.4} direction="right">
                  <div >
                    <p className="text-4xl font-extrabold text-purple-700">100+</p>
                    <p className="text-gray-600">Projects Completed</p>
                   </div>
                </ScrollReveal>
               
                <ScrollReveal delay={0.4} direction="right">
                  <div >
                    <p className="text-4xl font-extrabold text-purple-700">98%</p>
                    <p className="text-gray-600">Client Retention</p>
                  </div>
                  </ScrollReveal>
               
                <ScrollReveal delay={0.4} direction="right">
                
                <div >
                    <p className="text-4xl font-extrabold text-red-600">50K+</p>
                    <p className="text-gray-600">Development Hours</p>
                </div>
                </ScrollReveal>
                
                <ScrollReveal delay={0.4} direction="right">
                <div>
                    <p className="text-4xl font-extrabold text-purple-700">24/7</p>
                    <p className="text-gray-600">Support & Maintenance</p>
                </div>
                </ScrollReveal>
            </div>
        </section>

        {/* FAQ + Team */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Frequently Asked Questions</h2>
           <div className="space-y-4">
  {faqs.map((f, index) => (
    <div
      key={f.q}
      className="bg-white rounded-lg shadow-md border-l-4 border-purple-600 overflow-hidden"
    >
      <button
        onClick={() =>
          setOpenIndex(openIndex === index ? null : index)
        }
        className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700"
      >
        {f.q}

        <motion.span
          animate={{ rotate: openIndex === index ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-purple-600"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {openIndex === index && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.35,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-sm text-gray-600">
              {f.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  ))}
</div>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Expertise: The Mazain Team</h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-32 h-32 flex-shrink-0">
                <img className="team-image" src="/img/mazain logo.jpg" alt="Mazain Team Lead" />
              </div>
              <div className="text-gray-600">
                <p className="font-semibold text-xl mb-2 text-gray-800">Mazain Solution Team</p>
                <p className="text-sm leading-relaxed">
                  Mazain Solution is powered by a collective of senior developers, certified cloud architects, and
                  award-winning designers. Our leadership focuses on modern engineering principles and delivering
                  maximum value through efficient, well-structured technology solutions. We turn ambitious ideas into
                  functional realities.
                </p>
                <a href="https://wa.me/923151480480" target="_blank" rel="noreferrer">
                  <button className="btn-primary bg-red-600 hover:bg-red-700 mt-4 text-sm">Meet Our Experts</button>
                </a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-xl mt-10 border-l-4 border-purple-600">
              <h3 className="text-xl font-bold text-purple-700 mb-3">
                <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Why Choose Mazain?
              </h3>
              <p className="text-gray-600 text-sm">
                We don't just write code; we partner with you to achieve your business objectives. Our collaborative
                approach, paired with deep technical expertise, ensures your software solution is a strategic asset.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Build Your Next Digital Product?</h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Let's discuss how Mazain Solution can transform your ideas into a powerful reality.
          </p>
          <a href="https://wa.me/923151480480" target="_blank" rel="noreferrer">
            <button className="btn-primary bg-red-600 hover:bg-red-700 focus:ring-red-500/50">
              Schedule a Free Consultation
            </button>
          </a>
        </section>
      </main>
    </>
  );
}
