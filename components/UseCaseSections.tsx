"use client";

import React from 'react';
import { PenTool, Brain, Search, FileText, GraduationCap, Eye } from 'lucide-react';

const UseCaseSections = () => {
  const useCases = [
    {
      title: "Content Creators",
      description: "Generate engaging content, enhance your creative workflow, and streamline your content production process with AI-powered assistance.",
      icon: <PenTool className="w-12 h-12 text-white" />,
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "AI & LLM Training",
      description: "Optimize model performance, fine-tune parameters, and accelerate your machine learning workflows with advanced AI tools.",
      icon: <Brain className="w-12 h-12 text-white" />,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      title: "Researchers",
      description: "Accelerate your research process, analyze complex data patterns, and discover insights faster with intelligent research assistance.",
      icon: <Search className="w-12 h-12 text-white" />,
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "Journalists",
      description: "Enhance your reporting capabilities, fact-check information quickly, and create compelling stories with AI-powered journalism tools.",
      icon: <FileText className="w-12 h-12 text-white" />,
      gradient: "from-green-500 to-cyan-500"
    },
    {
      title: "Students",
      description: "Improve your learning experience, get personalized study assistance, and excel in your academic journey with smart educational tools.",
      icon: <GraduationCap className="w-12 h-12 text-white" />,
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      title: "Accessibility",
      description: "Break down barriers with inclusive AI solutions, making technology accessible to everyone regardless of their abilities or limitations.",
      icon: <Eye className="w-12 h-12 text-white" />,
      gradient: "from-pink-500 to-rose-500"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powered by AI for Every Use Case
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover how our AI platform transforms workflows across industries and roles, 
            making complex tasks simple and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative bg-zinc-800/90 backdrop-blur-sm rounded-3xl p-8 border border-zinc-700/30 hover:border-purple-400/40 transition-all duration-700 hover:-translate-y-3"
              style={{
                boxShadow: `
                  0 4px 20px -2px rgba(0, 0, 0, 0.6),
                  0 10px 40px -5px rgba(0, 0, 0, 0.4),
                  0 20px 60px -10px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(255, 255, 255, 0.03),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                `,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 8px 30px -2px rgba(196, 113, 245, 0.15),
                  0 15px 50px -5px rgba(250, 113, 205, 0.12),
                  0 25px 80px -10px rgba(0, 0, 0, 0.4),
                  0 35px 100px -15px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(196, 113, 245, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.08),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.3)
                `;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `
                  0 4px 20px -2px rgba(0, 0, 0, 0.6),
                  0 10px 40px -5px rgba(0, 0, 0, 0.4),
                  0 20px 60px -10px rgba(0, 0, 0, 0.3),
                  0 0 0 1px rgba(255, 255, 255, 0.03),
                  inset 0 1px 0 rgba(255, 255, 255, 0.05),
                  inset 0 -1px 0 rgba(0, 0, 0, 0.2)
                `;
              }}
            >
              {/* Gradient background overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/8 via-transparent to-pink-500/8 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Additional glow layer for that premium look */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] via-transparent to-transparent rounded-3xl"></div>
              
              {/* Icon container */}
              <div className={`relative mb-8 w-24 h-24 rounded-3xl bg-gradient-to-br ${useCase.gradient} p-5 shadow-2xl`}
                style={{
                  boxShadow: `
                    0 4px 20px rgba(0, 0, 0, 0.3),
                    0 8px 40px rgba(0, 0, 0, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.2),
                    inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                  `
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-3xl"></div>
                <div className="relative flex items-center justify-center h-full">
                  {useCase.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                  {useCase.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {useCase.description}
                </p>
              </div>

              {/* Call to action button */}
              <div className="relative mt-10">
                <button className="w-full bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] text-white font-semibold py-4 px-6 rounded-2xl opacity-0 group-hover:opacity-100 transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 hover:shadow-2xl"
                  style={{
                    boxShadow: 'group-hover:0 8px 30px rgba(196, 113, 245, 0.4)'
                  }}
                >
                  Get Started
                </button>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-br from-cyan-400 to-blue-400 rounded-full opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA section */}
       
      </div>
    </div>
  );
};

export default UseCaseSections;