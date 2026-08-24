export default function CourseCard({ title, text, bg, delay }) {
  return (
    <div
      className="relative bg-cover bg-center p-8 rounded-xl shadow-2xl text-white transform hover:scale-[1.02] transition duration-300 overflow-hidden min-h-[300px] flex flex-col justify-end animate-fade-in-up group"
      style={{ backgroundImage: `url('${bg}')`, animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-black/70 group-hover:bg-black/10 transition-opacity duration-500 z-10"></div>
      <div className="relative z-20">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-300 mb-4">{text}</p>
      </div>
    </div>
  );
}
