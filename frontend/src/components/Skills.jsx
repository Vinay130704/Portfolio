import React from 'react';
import { skills } from '../mock';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const Skills = () => {
  const skillCategories = [
    { title: 'Languages', data: skills.languages, color: 'emerald' },
    { title: 'Frameworks & Libraries', data: skills.frameworks, color: 'blue' },
    { title: 'Tools & Technologies', data: skills.tools, color: 'amber' },
    { title: 'Specializations', data: skills.specializations, color: 'purple' }
  ];

  const getColorClasses = (color) => {
    const colors = {
      emerald: 'from-emerald-500/20 to-green-500/20 border-emerald-500/30',
      blue: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
      amber: 'from-amber-500/20 to-orange-500/20 border-amber-500/30',
      purple: 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
    };
    return colors[color];
  };

  const getBarColor = (color) => {
    const colors = {
      emerald: 'bg-gradient-to-r from-emerald-400 to-green-500',
      blue: 'bg-gradient-to-r from-blue-400 to-cyan-500',
      amber: 'bg-gradient-to-r from-amber-400 to-orange-500',
      purple: 'bg-gradient-to-r from-purple-400 to-pink-500'
    };
    return colors[color];
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Technical <span className="text-emerald-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </div>

        {}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <Card
              key={idx}
              className={`bg-gradient-to-br ${getColorClasses(category.color)} border backdrop-blur-sm hover:shadow-2xl transition-all duration-300 hover:transform hover:scale-105`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <span className="w-2 h-8 bg-emerald-400 mr-3 rounded"></span>
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.data.map((skill, skillIdx) => (
                    <div key={skillIdx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{skill.name}</span>
                        <Badge variant="secondary" className="bg-gray-800 text-emerald-400 border-emerald-500/30">
                          {skill.level}%
                        </Badge>
                      </div>
                      <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className={`absolute top-0 left-0 h-full ${getBarColor(category.color)} rounded-full transition-all duration-1000 ease-out`}
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;
