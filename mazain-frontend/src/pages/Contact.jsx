import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Link } from 'react-router-dom';
import HeroBackgroundVideo from '../components/HeroBackgroundVideo';
import ScrollReveal from '../components/ScrollReveal';

const heroVideoChunks = [
  { start: 0, end: 6 },
  { start: 25, end: 31 },
  { start: 55, end: 61 },
];

// Field names match the scope doc's API contract exactly, so the request body lines up with the backend
const initialForm = { fnam: '', lname: '', email: '', phone: '', 'service-name': '', msg: '' };

const serviceOptions = [
  'Web Development',
  'Mobile App Development',
  'E-Commerce Solutions',
  'Digital Marketing',
  'SEO Optimization',
  'Graphic Design',
  'Video Editing',
  'UI/UX Design',
  'Other',
];

const contactFaqs = [
  {
    q: 'What is your typical response time for inquiries?',
    a: 'We typically respond to all inquiries within 2-4 hours during business hours. For urgent matters, you can call us directly at +92 315 1480480 for immediate assistance.',
  },
  {
    q: 'Do you offer free consultations?',
    a: 'Yes! We offer free 30-minute initial consultations to discuss your project requirements, understand your goals, and provide preliminary recommendations.',
  },
  {
    q: 'What information should I provide when contacting you?',
    a: 'Please provide your project requirements, timeline, budget range, and any specific features or functionalities you need. The more details you share, the better we can assist you.',
  },
  {
    q: 'Do you work with international clients?',
    a: 'Absolutely! We have experience working with clients from around the world. We use various collaboration tools and accommodate different time zones to ensure smooth communication.',
  },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    Object.keys(initialForm).forEach((key) => {
      if (!form[key]) newErrors[key] = 'This field is required';
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    try {
      const res = await axiosClient.post('/contact', form);
      if (res.data.status === 'success') {
        setStatus('success');
        setStatusMsg('Thanks! Your message has been sent — we will get back to you within 24 hours.');
        setForm(initialForm);
        setErrors({});
      } else {
        setStatus('error');
        setStatusMsg(res.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setStatusMsg('Something went wrong. Please try again.');
      // form data is intentionally kept so the user doesn't have to retype it
    }
  };

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info column */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                <span className="text-purple-700 mr-2">/</span> Let's Start a Conversation
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                We're here to answer your questions and discuss how our services can benefit your business. Reach out
                to us through any of the following channels.
              </p>

              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-2xl">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-phone text-white text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Call Us</h3>
                    <a href="tel:+923151480480" className="text-gray-600 hover:text-purple-700 text-lg font-medium">
                      +92 315 1480480
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Available 24/7 for urgent inquiries</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-2xl">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-envelope text-white text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Email Us</h3>
                    <a href="mailto:mazainsolution@gmail.com" className="text-gray-600 hover:text-purple-700 text-lg font-medium">
                      mazainsolution@gmail.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-2xl">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-white text-lg"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">Visit Us</h3>
                    <p className="text-gray-600 text-lg font-medium">Narowal City</p>
                    <p className="text-gray-600">Jassar Bypass, Shakargarh Road, opp. Rangers Head Quarter, Narowal, 51600</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a href="https://www.youtube.com/@MazainSolution" target="_blank" rel="noreferrer" className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition">
                    <i className="fab fa-facebook-f text-white text-lg"></i>
                  </a>
                  <a href="http://www.instagram.com/mazainsolution" target="_blank" rel="noreferrer" className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition">
                    <i className="fab fa-instagram text-white text-lg"></i>
                  </a>
                  <a href="http://www.youtube.com/zainulhassan" target="_blank" rel="noreferrer" className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition">
                    <i className="fab fa-youtube text-white text-lg"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/mazainsolution/posts/?feedView=all" target="_blank" rel="noreferrer" className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition">
                    <i className="fab fa-linkedin-in text-white text-lg"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        name="fnam"
                        value={form.fnam}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 transition"
                      />
                      {errors.fnam && <p className="text-red-500 text-sm mt-1">{errors.fnam}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lname"
                        value={form.lname}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 transition"
                      />
                      {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 transition"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 transition"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interested In</label>
                    <select
                      name="service-name"
                      value={form['service-name']}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 transition"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors['service-name'] && <p className="text-red-500 text-sm mt-1">{errors['service-name']}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                    <textarea
                      name="msg"
                      rows="5"
                      value={form.msg}
                      onChange={handleChange}
                      placeholder="Tell us about your project..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 transition"
                    ></textarea>
                    {errors.msg && <p className="text-red-500 text-sm mt-1">{errors.msg}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send Message'}
                  </button>

                  {status && status !== 'loading' && (
                    <div className={`text-center mt-4 ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                      {statusMsg}
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Find Us Here — office info + Google Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-purple-700 mr-2">/</span> Find Us Here
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visit our office in Narowal or connect with us virtually from anywhere in the world.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Office Location */}
            <div>
              <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Office Location</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-purple-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Main Office</h4>
                      <p className="text-gray-600">Narowal City, Shakrgar</p>
                      <p className="text-gray-600">Narowal Road near Ranger Head Covater</p>
                      <p className="text-sm text-gray-500 mt-1">Pakistan</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-clock text-purple-600"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">Business Hours</h4>
                      <p className="text-gray-600">Monday - Sunday: 10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-purple-50 rounded-xl">
                  <h4 className="font-semibold text-purple-800 mb-2">Virtual Meetings Available</h4>
                  <p className="text-sm text-purple-600">
                    We offer online consultations via Zoom, Google Meet, and other platforms for international clients.
                  </p>
                </div>
              </div>
            </div>

            {/* Google Map */}
            <div>
              <div className="relative h-96 rounded-2xl shadow-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3380.0319329932026!2d74.88637267472255!3d32.0954226185079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391953901938ffb1%3A0x8ef7b2833b80936e!2sMazain%20Solution!5e0!3m2!1sen!2s!4v1770639520628!5m2!1sen!2s"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                  title="Mazain Solution Office Location"
                ></iframe>

                {/* Clickable overlay — opens Google Maps directly */}
                <a
                  href="https://maps.app.goo.gl/DbwCGC4yPSJxPTeZA"
                  target="_blank"
                  rel="noreferrer"
                  className="absolute inset-0"
                  title="Open on Google Maps"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="min-h-[650px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-purple-700 mr-2">/</span> Frequently Asked Questions
            </h2>
            <p className="text-gray-600">Quick answers to common questions about working with us</p>
          </div>

          <div className="space-y-4">
            {contactFaqs.map((f) => (
              <details key={f.q} className="bg-gray-50 p-6 rounded-2xl group">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-800 text-lg">
                  {f.q}
                  <span className="text-purple-600 group-open:rotate-180 transition-transform">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </summary>
                <ScrollReveal direction="up" delay={0.2}>
                  <p className="pt-4 text-gray-600 border-t border-gray-200 mt-4">{f.a}</p>
                  </ScrollReveal>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't wait any longer. Contact us today and let's discuss how we can bring your ideas to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="tel:+923151480480">
              <button className="btn-primary bg-red-600 hover:bg-red-700">
                <i className="fas fa-phone mr-2"></i>Call Now
              </button>
            </a>
            <a href="mailto:mazainsolution@gmail.com">
              <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-full transition">
                <i className="fas fa-envelope mr-2"></i>Send Email
              </button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}