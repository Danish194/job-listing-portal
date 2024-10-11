import JobList from '../components/JobList';
import { useEffect, useState } from 'react';
import { Fade } from 'react-awesome-reveal';
import img from '../assets/about-img.png';
import img2 from '../assets/online-review-animate.svg';
import img3 from '../assets/we-are-hiring-animate.svg';
import img4 from '../assets/apply_animate.svg';
// import img5 from '../assets/hover-layers.webp';
import Footer from '../components/Footer';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    // Fetch jobs from backend
    fetch('/api/jobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center ${darkMode ? 'dark' : ''} bg-[#ffffff] dark:bg-backgroundBlue`}>
      
      <div className="w-full max-w-5xl bg-transparent px-6 lg:px-20 mt-32 mb-32 lg:mt-48 lg:pb-32">
        {/* About Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-12">
          {/* About Text */}
          <div className="max-w-lg text-black dark:text-white px-6 lg:px-0 lg:pl-32 lg:pr-10">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-center lg:text-left">Kick-Start your future today</h1>
            <p className="text-lg mb-6 text-center lg:text-left">Your dream job awaits...</p>
          </div>

          {/* Illustrator */}
          <div className="w-60 h-60 lg:w-72 lg:h-72 mt-6 lg:mt-0">
            <img
              src={img} 
              alt="Illustrator"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        

        {/* Search Bar */}
        <div className="flex items-center mb-8 px-4 lg:px-0">
          <input
            type="text"
            placeholder="Search Jobs"
            className="flex-grow p-3 pl-8 rounded-l-full bg-gray-200 text-gray-700 dark:bg-white dark:text-gray-300 border-none focus:outline-none"
          />
          <button className="bg-[#27debf] text-white py-3 px-6 rounded-r-full hover:bg-[#3b3b72] transition duration-300">
            Search
          </button>
        </div>



        {/* Job List Component */}
        <JobList jobs={jobs} />
      </div>




      {/* About Section 2 */}
      <Fade duration={1000}>
        <div className='flex flex-col lg:flex-row items-center justify-between mb-12 pb-32 border-b-2 px-6 lg:px-0 lg:-ml-72' id='about'>
          <div className="w-72 h-72 lg:w-96 lg:h-60">
            <img src={img2} alt="Illustrator" className='h-80'/>
          </div>
          <div className="max-w-lg text-black dark:text-white px-6 lg:px-10">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-center lg:text-left">Your skills are awarded by our recruiters</h1>
            <p className="text-md lg:text-lg mb-6 text-center lg:text-left">Land on your dream job where you are recognized and appreciated!</p>
          </div>
        </div>
      </Fade>

      <Fade duration={1000} fraction={0.4}>
        <div className='flex flex-col-reverse lg:flex-row items-center justify-between mt-20 mb-18 pb-24 border-b-2 px-6 lg:px-0 lg:-mr-72 lg:pb-10 lg:mb-24'>
          <div className="max-w-lg text-black dark:text-white px-6 lg:px-10">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-center lg:text-left">Find the best candidates for your company</h1>
            <p className="text-md lg:text-lg mb-6 text-center lg:text-left">Top rankers apply for jobs whom you can recruit for your company!</p>
          </div>
          <div className="w-72 h-72 lg:w-96 lg:h-72 mt-6 lg:mt-0">
            <img src={img3} alt="Hiring" />
          </div>
        </div>
      </Fade>

      <Fade duration={1000} fraction={0.4}>
        <div className='flex flex-col lg:flex-row items-center justify-between mb-12 mt-12 pb-28 border-b-2 px-6 lg:px-0 lg:-ml-72 lg:pb-18'>
          
          <div className="w-72 h-72 lg:w-80 lg:h-72 mt-6 lg:mt-0">
            <img src={img4} alt="Apply" />
          </div>
          <div className="max-w-lg text-black dark:text-white px-6 lg:px-10">
            <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-center lg:text-left">Apply to your dream company in a click</h1>
            <p className="text-md lg:text-lg mb-6 text-center lg:text-left">We provide the simplest way to apply to your dream job!</p>
          </div>
        </div>
      </Fade>

      {/* Top Companies Section */}
      <div className="w-full max-w-5xl mb-32 mt-20 px-6 lg:px-0">
        <h2 className="text-backgroundBlue dark:text-white text-xl mb-4 text-center">Top Companies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 bg-gray-800 p-4 rounded-lg text-white">
          {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix'].map((company, index) => (
            <span key={index} className="text-center hover:skew-y-3 transition">{company}</span>
          ))}
        </div>
      </div>
     
      <Footer />
    </div>
  );
};

export default Home;

