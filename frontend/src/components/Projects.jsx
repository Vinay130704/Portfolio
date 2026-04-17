import React, { useState, useEffect } from 'react';
import { projects as mockProjects } from '../mock';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Github, Star } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Projects = () => {
  const [projects, setProjects] = useState(mockProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${API}/projects`);
        if (response.data.success && response.data.projects.length > 0) {
          setProjects(response.data.projects);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Featured <span className="text-emerald-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A showcase of my recent work and innovative solutions
          </p>
        </div>

        {}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 overflow-hidden group hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10"
            >
              {}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star size={14} fill="currentColor" />
                    <span>Featured</span>
                  </div>
                )}
              </div>

              {}
              <div className="p-6 space-y-4">
                {}
                <div>
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500">{project.duration}</p>
                </div>

                {}
                <p className="text-gray-400 text-sm">
                  {project.shortDescription}
                </p>

                {}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-400 border border-gray-700 text-xs"
                    >
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                {}
                <div className="flex gap-3 pt-2">
                  <Button
                    onClick={() => window.open(project.github, '_blank')}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500"
                  >
                    <Github size={16} className="mr-2" />
                    Code
                  </Button>
                  <Button
                    onClick={() => window.open(project.demo, '_blank')}
                    size="sm"
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  >
                    <ExternalLink size={16} className="mr-2" />
                    Live Demo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {}
        <div className="text-center mt-12">
          <Button
            onClick={() => window.open('https://github.com/Vinay130704', '_blank')}
            className="bg-gray-800 hover:bg-gray-700 text-white border border-emerald-500/30 hover:border-emerald-500 px-8 py-6 rounded-full transition-all duration-300 hover:scale-105"
          >
            <Github size={20} className="mr-2" />
            View More Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
