import React from 'react';
import { Check, Star, Zap } from 'lucide-react';

const PricingComponent = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "10 messages per month",
        "Multiple export formats (TXT, JSON, CSV, SRT, VTT)",
        "Basic YouTube note-taking",
        "Standard processing speed"
      ],
      limitations: [
        "No email support",
        "Limited messages"
      ],
      buttonText: "Get Started Free",
      buttonStyle: "bg-zinc-700 hover:bg-zinc-600 text-white",
      popular: false,
      icon: <Zap className="w-5 h-5" />
    },
    {
      name: "Monthly",
      price: "$9.99",
      period: "per month",
      description: "For regular users",
      features: [
        "Unlimited messages & summarizing",
        "Multiple export formats (TXT, JSON, CSV, SRT, VTT)",
        "Priority processing speed",
        "Email support",
      ],
      buttonText: "Start Monthly Plan",
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white",
      popular: true,
      icon: <Star className="w-5 h-5" />
    },
    {
      name: "Yearly",
      price: "$99.99",
      period: "per year",
      originalPrice: "$119.88",
      savings: "Save $19.89",
      description: "Best value for power users",
      features: [
        "Unlimited messages & summarizing",
        "Multiple export formats (TXT, JSON, CSV, SRT, VTT)",
        "Priority processing speed",
        "Premium email support",
        "Early access to new features"
      ],
      buttonText: "Start Yearly Plan",
      buttonStyle: "bg-green-600 hover:bg-green-700 text-white",
      popular: false,
      icon: <Check className="w-5 h-5" />
    }
  ];

  return (
    <div className="bg-zinc-900 min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your YTNotes Plan
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Transform your YouTube learning experience with powerful note-taking and summarization tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-zinc-800 rounded-2xl p-8 border-2 transition-all duration-300 flex flex-col justify-between ${
                plan.popular 
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'border-zinc-700 hover:border-zinc-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-full ${plan.popular ? 'bg-blue-600' : 'bg-zinc-700'}`}>
                    {plan.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-zinc-400 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-zinc-400 ml-2">/{plan.period}</span>
                  </div>
                  {plan.originalPrice && (
                    <div className="mt-2">
                      <span className="text-zinc-500 line-through text-lg">{plan.originalPrice}</span>
                      <span className="text-green-400 ml-2 text-sm font-semibold">{plan.savings}</span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="space-y-4  mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 ${plan.buttonStyle}`}>
                {plan.buttonText}
              </button>

             
            </div>
          ))}
        </div>

      
      </div>
    </div>
  );
};

export default PricingComponent;