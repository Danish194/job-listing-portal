import { FaGoogle, FaMicrosoft, FaAmazon, FaFacebook, FaApple, FaTwitter, FaTwitterSquare } from 'react-icons/fa';

const TopCompaniesSection = () => {
  const companies = [
    { name: 'Google', icon: <FaGoogle size={64} /> },
    { name: 'Microsoft', icon: <FaMicrosoft size={64} /> },
    { name: 'Amazon', icon: <FaAmazon size={64} /> },
    { name: 'Meta', icon: <FaFacebook size={64} /> },
    { name: 'Apple', icon: <FaApple size={64} /> },
    { name: 'Twitter', icon: <FaTwitter size={64} /> },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mb-1 mt-20 px-6 lg:px-0">
      <h2 className="text-backgroundBlue dark:text-white text-2xl font-bold mb-6 text-center">
        Trusted by Top Companies
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-20 bg-gray-200 p-6 px-10 rounded-lg text-white lg:mt-16">
        {companies.map((company, index) => (
          <div key={index} className="flex flex-col items-center p-4 bg-gray-800 dark:bg-gray-800 rounded-lg hover:scale-105 transition transform duration-300 ease-in-out">
            <div className={`company-icon animate-company-icon-${index % 3}`}>
              {company.icon}
            </div>
            <span className="mt-2 text-center text-gray-300">{company.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCompaniesSection;