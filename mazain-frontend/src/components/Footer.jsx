const socialLinks = [
  { href: 'https://www.facebook.com/mazainsolution', icon: 'facebook-f', label: 'Facebook' },
  { href: 'https://www.instagram.com/mazainsolution', icon: 'instagram', label: 'Instagram' },
  { href: 'https://www.tiktok.com/@mazainsolution', icon: 'tiktok', label: 'TikTok' },
  { href: 'https://www.youtube.com/mazainsolution', icon: 'youtube', label: 'YouTube' },
  { href: 'https://x.com/mazainsolution', icon: 'twitter', label: 'Twitter' },
  { href: 'https://wa.me/923151480480', icon: 'whatsapp', label: 'WhatsApp' },
  { href: 'https://www.linkedin.com/company/mazainsolution/posts/?feedView=all', icon: 'linkedin-in', label: 'LinkedIn' },
];

const coursesLinks = [
  { label: 'Digital Marketing', href: '#' },
  { label: 'E-Commerce', href: 'https://mazainsolution.com/e-commerce/' },
  { label: 'Social Media Marketing', href: '#' },
  { label: 'Get Likes & Subscribers', href: '#' },
  { label: 'Android App Development', href: '#' },
  { label: 'Youtube With AI Automation', href: 'https://mazainsolution.com/youtube-with-ai-automation/' },
  { label: 'Digital Marketing & Lead Generation', href: 'https://mazainsolution.com/digital-marketing-lead-generation/' },
];

const servicesLinks = [
  { label: 'Video Editing', href: '#' },
  { label: 'Graphic Designing', href: 'https://mazainsolution.com/graphic-desienrollment/' },
  { label: 'Web Development', href: '#' },
  { label: 'Blogging', href: 'https://mazainsolution.com/blogging/' },
  { label: 'YouTube Channel Monetization', href: '#' },
  { label: 'UI & UX (Figma)', href: 'https://mazainsolution.com/ui-ux-figma/' },
  { label: 'Freelancing (Fiverr & UpWork)', href: 'https://mazainsolution.com/freelancing-fiverr-upwork/' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-gradient text-white pt-16 pb-8 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-purple-800 pb-10">
          {/* Contact Us */}
          <div>
            <h3 className="font-semibold mb-3 text-purple-400">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-0.5">📞</span>
                <a href="tel:+923151480480" className="hover:text-purple-200 transition">03151480480</a>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-0.5">✉️</span>
                <span>mazainsolution@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-500 mt-0.5">📍</span>
                <span>Jassar Bypass, Shakargarh Road, opp. Rangers Head Quarter, Narowal, 51600</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-4">
              {socialLinks.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-purple-700 hover:bg-purple-600 transition text-white"
                >
                  <i className={`fab fa-${s.icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Courses column */}
          <div>
            <h3 className="font-semibold mb-3 text-purple-400">Our Courses</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {coursesLinks.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="hover:text-purple-200 transition">{c.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column */}
          <div>
            <h3 className="font-semibold mb-3 text-purple-400">Our Courses & Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {servicesLinks.map((s) => (
                <li key={s.label}>
                  <a href={s.href} className="hover:text-purple-200 transition">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Enquire */}
          <div>
            <h3 className="font-semibold mb-3 text-purple-400">Call To Enquire</h3>
            <div className="bg-purple-900 p-4 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-red-500 text-xl">📞</span>
                <a href="tel:+923151480480" className="text-lg font-bold hover:text-purple-200 transition">
                  +92 3151480480
                </a>
              </div>
              <p className="text-sm text-gray-300">Available 24/7 for your inquiries</p>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold tracking-wider text-purple-400 mb-2">
                <div className="w-56 h-20">
                  <img className="w-full h-full rounded-full overflow-hidden" src="/img/Mazain-solution-6.png" alt="Mazain Solution" />
                </div>
              </div>
              <p className="text-sm text-gray-400">Your partner in bespoke software development.</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 text-sm text-gray-500">
          &copy; 2024 Mazain Solution. All rights reserved. Building better software. <br />
          Developed by{' '}
          <a href="https://wa.me/923450776252" target="_blank" rel="noreferrer">
            Arslan Ahmad
          </a>
        </div>
      </div>
    </footer>
  );
}
