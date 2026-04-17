import React, { useState } from 'react';
import { personalInfo } from '../mock';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { toast } from '../hooks/use-toast';
import { Mail, MapPin, Github, Loader2, Send } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      if (response.data.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast({
        title: "Error",
        description: typeof error.response?.data?.detail === 'string'
          ? error.response.data.detail
          : JSON.stringify(error.response?.data?.detail) || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get In <span className="text-emerald-400">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {}
          <div className="space-y-6">
            {}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-6 text-center space-y-3">
                <div className="flex items-center justify-center">
                  <div className="bg-emerald-500/10 p-4 rounded-full">
                    <Mail className="text-emerald-400" size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">Email</h3>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm break-all"
                >
                  {personalInfo.email}
                </a>
              </div>
            </Card>

            {}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-6 text-center space-y-3">
                <div className="flex items-center justify-center">
                  <div className="bg-emerald-500/10 p-4 rounded-full">
                    <MapPin className="text-emerald-400" size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">Location</h3>
                <p className="text-gray-400 text-sm">{personalInfo.location}</p>
              </div>
            </Card>

            {}
            <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="p-6 text-center space-y-3">
                <div className="flex items-center justify-center">
                  <div className="bg-emerald-500/10 p-4 rounded-full">
                    <Github className="text-emerald-400" size={24} />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white">GitHub</h3>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 text-sm"
                >
                  @Vinay130704
                </a>
              </div>
            </Card>
          </div>

          {}
          <Card className="md:col-span-2 bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-300">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-white font-medium text-sm">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-white font-medium text-sm">
                    Your Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-white font-medium text-sm">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project Collaboration"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-white font-medium text-sm">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-emerald-500 focus:ring-emerald-500 resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 rounded-full transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={20} className="mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
