import React from 'react';
import { personalInfo, education } from '../mock';
import { GraduationCap, MapPin, Calendar } from 'lucide-react';
import { Card } from './ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            About <span className="text-emerald-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto"></div>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
            <div className="relative">
              <img
                src={personalInfo.aboutImage}
                alt="About Vinay Kumar"
                className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">
              I'm a passionate developer focused on creating innovative solutions
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              {personalInfo.bio}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-emerald-500/50 transition-colors duration-300">
                <div className="text-3xl font-bold text-emerald-400">3+</div>
                <div className="text-gray-400 text-sm">Internships</div>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-emerald-500/50 transition-colors duration-300">
                <div className="text-3xl font-bold text-emerald-400">3+</div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-emerald-500/50 transition-colors duration-300">
                <div className="text-3xl font-bold text-emerald-400">4+</div>
                <div className="text-gray-400 text-sm">Certifications</div>
              </div>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800 hover:border-emerald-500/50 transition-colors duration-300">
                <div className="text-3xl font-bold text-emerald-400">3+</div>
                <div className="text-gray-400 text-sm">Hackathons</div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-white mb-8 text-center">
            Education <span className="text-emerald-400">Background</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu) => (
              <Card
                key={edu.id}
                className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-emerald-500/10 p-3 rounded-lg">
                        <GraduationCap className="text-emerald-400" size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{edu.degree}</h4>
                        <p className="text-emerald-400 font-medium">{edu.institution}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{edu.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span>{edu.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-400">{edu.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
