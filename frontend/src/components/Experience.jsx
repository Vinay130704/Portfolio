import React from 'react';
import { experiences } from '../mock';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase, MapPin, Calendar } from 'lucide-react';

const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Work <span className="text-emerald-400">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            My professional journey and hands-on experience in the tech industry
          </p>
        </div>

        {}
        <div className="relative">
          {}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-emerald-500/50 via-emerald-500 to-emerald-500/50"></div>

          {}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-black z-10 shadow-lg shadow-emerald-500/50"></div>

                {}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10">
                    <div className="p-6 space-y-4">
                      {}
                      <div className="flex items-start justify-between">
                        <div className={`flex items-center space-x-3 ${index % 2 === 0 ? '' : 'md:flex-row-reverse md:space-x-reverse'}`}>
                          <div className="bg-emerald-500/10 p-3 rounded-lg">
                            <Briefcase className="text-emerald-400" size={24} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                            <p className="text-emerald-400 font-medium">{exp.company}</p>
                            {exp.organization && (
                              <p className="text-sm text-gray-500 mt-1">{exp.organization}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      {}
                      <div className={`flex flex-wrap gap-3 text-sm text-gray-400 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                        <div className="flex items-center space-x-1">
                          <Calendar size={16} className="text-emerald-400" />
                          <span>{exp.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin size={16} className="text-emerald-400" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {}
                      <ul className={`space-y-2 text-gray-400 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                        {exp.description.map((item, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-emerald-400 mt-1.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {}
                      <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                        {exp.technologies.map((tech, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors duration-300"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
