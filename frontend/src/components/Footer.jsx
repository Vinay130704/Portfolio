import React from 'react';
import { personalInfo } from '../mock';
import { Github, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              {personalInfo.name.split(' ')[0]}
            </h3>
            <p className="text-gray-400 text-sm">
              Full Stack Developer & Data Science Enthusiast passionate about creating innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
              >
                <Github size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white">Get In Touch</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                >
                  {personalInfo.email}
                </a>
              </li>
              <li className="text-gray-400">{personalInfo.location}</li>
              <li className="text-gray-400">{personalInfo.phone}</li>
            </ul>
          </div>
        </div>

        {}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
