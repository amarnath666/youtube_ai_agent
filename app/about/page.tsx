"use client";

import HompageHeader from "@/components/HomepageHeader";
import Footer from "@/components/ui/Footet";

const AboutUs = () => ( 
     <div className="bg-zinc-900">
        <HompageHeader /> 
        <div className="px-4 py-[30px]  md:p-12 md:pt-[100px] max-w-3xl mx-auto"> 
            <h1 className="text-2xl font-bold mb-4">About the Creator</h1> 
            
            <div className="mb-6">
                <p className="mb-4"> 
                    Hey there! 👋 I'm the developer behind <strong>YTNotes</strong> - a full-stack developer with over 1 year of experience building modern web applications.
                </p> 
                <p className="mb-4"> 
                    I created YTNotes because I was tired of watching long YouTube videos just to extract key information. As a developer who's always learning, I wanted a smarter way to consume content - so I built one!
                </p> 
                <p className="mb-4"> 
                    My passion lies in creating tools that make people's lives easier through clean code and innovative solutions.
                </p> 
            </div>

            <div className=" p-4 md:p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Want to work together?</h2>
                <p className="mb-4">
                    I'm always open to new opportunities and exciting projects. Whether it's a full-time role, freelance work, or just a chat about tech - I'd love to connect!
                </p>
                <button 
                  onClick={() => 
                    window.open("https://x.com/AmarnathDhumal", "_blank")
                  }
                className="bg-white cursor-pointer  text-black font-medium py-2 px-6 rounded-lg transition-colors">
                    💼 DM me on X
                </button>
            </div>
        </div> 
        <Footer /> 
    </div> 
); 
 
export default AboutUs;