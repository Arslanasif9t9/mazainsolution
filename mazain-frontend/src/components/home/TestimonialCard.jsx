export default function TestimonialCard({ name, role, img, quote, border, ring }) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-xl border-l-4 ${border} w-80 flex-shrink-0`}>
      <div className="flex items-center space-x-4 mb-4">
        <div className={`w-12 h-12 rounded-full overflow-hidden ring-2 ${ring}`}>
          <img src={img} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <p className="font-bold text-gray-800 text-sm">{name}</p>
          <p className="text-xs text-gray-600">{role}</p>
        </div>
      </div>
      <div className="flex mb-3">
        <span className="text-yellow-400 text-sm">⭐️⭐️⭐️⭐️⭐️</span>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed">"{quote}"</p>
    </div>
  );
}
