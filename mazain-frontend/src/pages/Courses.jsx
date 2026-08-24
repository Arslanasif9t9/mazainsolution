import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import CourseListCard from '../components/courses/CourseListCard';
import { courses, enrollmentCourseOptions, educationOptions } from '../data/coursesData';
import { Link } from 'react-router-dom';
import HeroBackgroundVideo from '../components/HeroBackgroundVideo';
import ScrollReveal from '../components/ScrollReveal';
const heroVideoChunks = [
  { start: 0, end: 6 },
  { start: 25, end: 31 },
  { start: 55, end: 61 },
];

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  course: '',
  education: '',
  experience: '',
  goals: '',
  terms: false,
};

// education and experience are optional per the scope doc — everything else is required
const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'course', 'goals', 'terms'];

export default function Courses() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [statusMsg, setStatusMsg] = useState('');

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };
const handleEnroll = (courseValue) => {
  setForm((prev) => ({
    ...prev,
    course: courseValue,
  }));

  document
    .getElementById("enroll-form")
    ?.scrollIntoView({ behavior: "smooth" });
};
  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((key) => {
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
      const res = await axiosClient.post('/enroll', form);
      if (res.data.status === 'success') {
        setStatus('success');
        setStatusMsg('Thank you for your enrollment! Our team will contact you within 24 hours to complete the registration process.');
        setForm(initialForm);
        setErrors({});
      } else {
        setStatus('error');
        setStatusMsg(res.data.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setStatusMsg('Something went wrong. Please try again.');
      // keep the entered data so the user doesn't have to retype it
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

      {/* Course listing (static content) */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-purple-700 mr-2">/</span> Master In-Demand Skills
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive courses designed for beginners and professionals alike, taught by industry experts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((c) => (
              <ScrollReveal key={c.title} direction="up" delay={0.2}>
               <CourseListCard
  key={c.title}
  {...c}
  onEnroll={handleEnroll}
/>
                </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Enrollment Form */}
      <section id="enroll-form" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              <span className="text-purple-700 mr-2">/</span> Enroll in Your Desired Course
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill out the form below to start your learning journey with Mazain Solution. Our team will contact you
              within 24 hours.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Course *</label>
                <select
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                >
                  <option value="">Choose a course</option>
                  {enrollmentCourseOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
                <select
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                >
                  <option value="">Select your education level</option>
                  {educationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Previous Experience</label>
                <textarea
                  name="experience"
                  rows="3"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder="Tell us about your previous experience (if any)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Learning Goals *</label>
                <textarea
                  name="goals"
                  rows="3"
                  value={form.goals}
                  onChange={handleChange}
                  placeholder="What do you hope to achieve from this course?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition"
                ></textarea>
                {errors.goals && <p className="text-red-500 text-sm mt-1">{errors.goals}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="terms"
                  checked={form.terms}
                  onChange={handleChange}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label className="ml-2 text-sm text-gray-600">
                  I agree to the <a href="#" className="text-purple-600 hover:text-purple-700">terms and conditions</a> and{' '}
                  <a href="#" className="text-purple-600 hover:text-purple-700">privacy policy</a>
                </label>
              </div>
              {errors.terms && <p className="text-red-500 text-sm">{errors.terms}</p>}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-purple-700 transition transform hover:scale-105 focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50"
              >
                <i className="fas fa-graduation-cap mr-2"></i>
                {status === 'loading' ? 'Submitting...' : 'Enroll Now'}
              </button>

              <p className="text-center text-sm text-gray-500">
                Need help choosing a course?{' '}
                <a href="tel:+923151480480" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Call us: +92 315 1480480
                </a>
              </p>

              {status && status !== 'loading' && (
                <div className={`text-center ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                  {statusMsg}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
