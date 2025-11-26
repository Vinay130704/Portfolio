import React from 'react';
import { certifications } from '../mock';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Award, Calendar } from 'lucide-react';

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Certifications & <span className="text-emerald-400">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Professional certifications and hackathon achievements
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert) => (
            <Card
              key={cert.id}
              className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 group"
            >
              <div className="p-6 space-y-4">
                {/* Icon */}
                <div className="flex items-center justify-center">
                  <div className="bg-emerald-500/10 p-4 rounded-full group-hover:bg-emerald-500/20 transition-colors duration-300">
                    <Award className="text-emerald-400" size={32} />
                  </div>
                </div>

                {/* Title */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-emerald-400 font-medium text-sm">{cert.issuer}</p>
                </div>

                {/* Date */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                  <Calendar size={14} />
                  <span>{cert.date}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm text-center">{cert.description}</p>

                {/* Credential ID */}
                {cert.credentialId && (
                  <Badge
                    variant="secondary"
                    className="w-full justify-center bg-gray-800 text-gray-400 border border-gray-700"
                  >
                    ID: {cert.credentialId}
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
