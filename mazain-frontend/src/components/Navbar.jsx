import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

// Same nav links as the original site's header (Home, About, Services, Courses)
const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/courses', label: 'Courses We Offer' },
];

// Same social links as the original footer/nav
const socialLinks = [
  { href: 'https://www.facebook.com/mazainsolution', icon: 'facebook-f', hover: 'hover:text-blue-500' },
  { href: 'https://www.instagram.com/mazainsolution', icon: 'instagram', hover: 'hover:text-pink-500' },
  { href: 'https://www.youtube.com/mazainsolution', icon: 'youtube', hover: 'hover:text-red-500' },
  { href: 'https://x.com/mazainsolution', icon: 'twitter', hover: 'hover:text-black' },
  { href: 'https://www.linkedin.com/company/mazainsolution/posts/?feedView=all', icon: 'linkedin-in', hover: 'hover:text-blue-600' },
  { href: 'https://wa.me/923151480480', icon: 'whatsapp', hover: 'hover:text-green-500' },
  { href: 'https://www.tiktok.com/@mazainsolution', icon: 'tiktok', hover: 'hover:text-white' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#2c1e34]/90 backdrop-blur-sm shadow-xl">
      <div className="flex justify-between items-center h-20 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wider text-purple-400 flex items-center">
          <div className="w-56 h-20">
            <img className="w-full h-full rounded-full overflow-hidden" src="/img/Mazain-solution-6.png" alt="Mazain Solution" />
          </div>
        </Link>

        {/* Desktop menu links */}
        <div className="hidden md:flex space-x-6 text-sm text-white">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `hover:text-purple-400 transition ${isActive ? 'text-purple-400 font-semibold' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right section: social icons + contact button + mobile toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex space-x-3 text-white text-sm">
            {socialLinks.map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noreferrer" className={`transition ${s.hover}`}>
                <i className={`fab fa-${s.icon}`}></i>
              </a>
            ))}
          </div>

          <Link to="/contact">
            <button className="px-4 py-2 text-sm font-medium rounded-full bg-white text-purple-700 hover:bg-gray-200 transition">
              Contact Us
            </button>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-3 px-4 pb-4 text-white bg-[#2c1e34]">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => (isActive ? 'text-purple-400 font-semibold' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
}
