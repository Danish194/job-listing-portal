import React from 'react';
import { FaInstagram, FaLinkedin, FaTwitter,  FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-[#1e1e1e] text-gray-700 dark:text-gray-300 py-10 w-full mt-32">
      <div className="max-w-6xl mx-auto px-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-8 lg:grid-cols-4">
          {/* Company Info Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Job Portal</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Job Portal is your trusted platform for your future. We offer a wide variety of opportunities to help you
              excel in your career.
            </p>
          </div>

          {/* Address Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Address</h3>
            <p className="text-gray-600 dark:text-gray-300">
              1234 Learning Avenue,<br />
              Knowledge City, Education State,<br />
              ZIP 12345, Country
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-300 flex">
              <FaEnvelope  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white p-1" size={24} />
              Email: contact@jobportal.com
            </p>
            <p className="text-gray-600 dark:text-gray-300 flex">
              <FaPhone  className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white p-1" size={24} />
              Phone: +123 456 7890
            </p>
            <p className="text-gray-600 dark:text-gray-300 pl-6">
              Support: support@jobportal.com
            </p>
          </div>



          <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Follow Us On</h3>
            <div className="flex space-x-4 mt-4 ">
            
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white" size={24} />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white" size={24} />
              </a>
              <a href="https://x.com/JobListingP_09" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white" size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t pt-6 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Job Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;