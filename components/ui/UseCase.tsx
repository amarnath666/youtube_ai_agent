import { Users, Brain, Search, FileText, GraduationCap, Accessibility } from 'lucide-react';

const UseCases = () => {
  const useCases = [
    {
      title: "Content Creators",
      description: "Transform long-form videos into bite-sized content. Extract key quotes, create social media posts, and repurpose video content across platforms with AI-generated notes.",
      icon: Users,
      gradient: "from-[#c471f5] to-[#fa71cd]",
      delay: "0ms"
    },
    {
      title: "AI & LLM Training",
      description: "Generate high-quality training datasets from video content. Extract structured data, transcripts, and metadata to improve AI model performance and accuracy.",
      icon: Brain,
      gradient: "from-[#fa71cd] to-[#fda085]",
      delay: "100ms"
    },
    {
      title: "Researchers",
      description: "Accelerate your research process by quickly extracting insights from educational videos, interviews, and documentaries. Create comprehensive notes for literature reviews.",
      icon: Search,
      gradient: "from-[#c471f5] to-[#fda085]",
      delay: "200ms"
    },
    {
      title: "Journalists",
      description: "Streamline interview transcription and analysis. Extract quotes, key points, and create article outlines from video interviews and press conferences.",
      icon: FileText,
      gradient: "from-[#fa71cd] to-[#c471f5]",
      delay: "300ms"
    },
    {
      title: "Students",
      description: "Convert lecture videos into study notes, create flashcards from educational content, and never miss important information from online courses and tutorials.",
      icon: GraduationCap,
      gradient: "from-[#fda085] to-[#fa71cd]",
      delay: "400ms"
    },
    {
      title: "Accessibility",
      description: "Make video content accessible to everyone. Generate accurate captions, transcripts, and summaries for hearing-impaired users and multilingual audiences.",
      icon: Accessibility,
      gradient: "from-[#c471f5] via-[#fa71cd] to-[#fda085]",
      delay: "500ms"
    }
  ];

  return (
    <section className="py-20 px-6 bg-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Perfect for <span className="bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] bg-clip-text text-transparent">Every Use Case</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed">
            From content creation to academic research, our AI-powered video note generation serves diverse professionals and industries.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const IconComponent = useCase.icon;
            return (
              <div 
                key={index}
                className="group relative"
                style={{ animationDelay: useCase.delay }}
              >
                {/* Glowing border effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${useCase.gradient} rounded-2xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />
                
                {/* Card */}
                <div className="relative bg-zinc-800/40 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-8 hover:bg-zinc-800/60 transition-all duration-500 hover:scale-[1.02] hover:border-zinc-600/50 group h-full">
                  {/* Icon with gradient background */}
                  <div className="mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${useCase.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#c471f5] group-hover:via-[#fa71cd] group-hover:to-[#fda085] group-hover:bg-clip-text transition-all duration-300">
                    {useCase.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed group-hover:text-zinc-300 transition-colors duration-300">
                    {useCase.description}
                  </p>

                  {/* Decorative corner elements */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-[#c471f5] to-[#fa71cd] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-gradient-to-r from-[#fa71cd] to-[#fda085] rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col items-center gap-4 bg-zinc-800/30 backdrop-blur-md border border-zinc-700/50 rounded-2xl p-8 hover:bg-zinc-800/50 transition-all duration-300">
            <div className="w-12 h-12 bg-gradient-to-r from-[#c471f5] via-[#fa71cd] to-[#fda085] rounded-full flex items-center justify-center animate-pulse">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="text-center">
              <h4 className="text-xl font-semibold text-white mb-2">Ready to Transform Your Videos?</h4>
              <p className="text-zinc-400">Join professionals across industries who trust our AI for video analysis.</p>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-[#c471f5] to-[#fa71cd] rounded-full opacity-5 blur-2xl animate-pulse" />
        <div className="absolute top-1/3 right-20 w-32 h-32 bg-gradient-to-r from-[#fa71cd] to-[#fda085] rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-[#fda085] to-[#c471f5] rounded-full opacity-5 blur-2xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </section>
  );
};

export default UseCases;