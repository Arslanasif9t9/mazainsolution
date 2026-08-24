import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsappButton from './WhatsappButton';
import ChatbotWidget from './chatbot/ChatbotWidget';

export default function Layout() {
  return (
    <div className="font-sans bg-gray-100 text-gray-800">
      <Navbar />
      <Outlet />
      <Footer />
      <ChatbotWidget />
      <WhatsappButton />
    </div>
  );
}
