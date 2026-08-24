// Maps each text-color used for icons to a matching solid button background + hover state.
// Written as full literal class names so Tailwind's compiler picks them up.
const buttonColorMap = {
  'text-purple-600': 'bg-purple-600 hover:bg-purple-700',
  'text-blue-600': 'bg-blue-600 hover:bg-blue-700',
  'text-green-600': 'bg-green-600 hover:bg-green-700',
  'text-orange-600': 'bg-orange-600 hover:bg-orange-700',
  'text-pink-600': 'bg-pink-600 hover:bg-pink-700',
  'text-teal-600': 'bg-teal-600 hover:bg-teal-700',
  'text-indigo-600': 'bg-indigo-600 hover:bg-indigo-700',
  'text-red-600': 'bg-red-600 hover:bg-red-700',
};

export default function ServiceDetailCard({ image, icon, iconColor, iconBg, title, description, features }) {
  const buttonClasses = buttonColorMap[iconColor] || 'bg-purple-600 hover:bg-purple-700';

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image */}
      <div className="w-full h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mr-4`}>
            <i className={`fas ${icon} ${iconColor} text-xl`}></i>
          </div>
          <h4 className="text-xl font-bold text-gray-800">{title}</h4>
        </div>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="text-sm text-gray-600 space-y-2 mb-4">
          {features.map((f) => (
            <li className="flex items-center" key={f}>
              <i className="fas fa-check text-green-500 mr-2"></i>
              {f}
            </li>
          ))}
        </ul>
        <a href="https://wa.me/923151480480" target="_blank" rel="noreferrer">
          <button className={`w-full ${buttonClasses} text-white py-2 rounded-lg transition`}>
            Learn More
          </button>
        </a>
      </div>
    </div>
  );
}