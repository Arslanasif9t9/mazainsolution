export default function CourseListCard({
  title,
  value,
  category,
  description,
  duration,
  students,
  image,
  onEnroll,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      
      {/* Course Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm font-medium">
            {category}
          </span>
          <span className="text-yellow-400 text-lg">⭐ 5.0</span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>

        <p className="text-gray-600 mb-4">{description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <i className="fas fa-clock mr-1"></i>
            <span>{duration}</span>
          </div>

          <div className="flex items-center text-sm text-gray-500">
            <i className="fas fa-users mr-1"></i>
            <span>{students}</span>
          </div>
        </div>

        <a href="#enroll-form">
          <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition transform hover:scale-105"
           
  onClick={() => onEnroll(value)}
 
>
  Enroll Now
</button>
        </a>
      </div>
    </div>
  );
}