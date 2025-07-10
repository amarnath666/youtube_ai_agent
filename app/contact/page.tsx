"use client";

import HompageHeader from "@/components/HomepageHeader";
import Footer from "@/components/ui/Footet";

const ContactUs = () => (     
    <div className="bg-zinc-900">
        <HompageHeader />   
        <div className="p-6 pt-[100px] max-w-2xl mx-auto ">     
            <h1 className="text-2xl font-bold mb-4">Get in Touch</h1>     
            <p className="mb-4">       
                Have a question, feedback, or want to discuss a project? I'd love to hear from you! Feel free to reach out anytime.     
            </p>      

            <div className=" p-6 rounded-lg border mb-6">       
                <p className="text-lg font-medium mb-2">📧 Email</p>       
                <a         
                    href="mailto:amarnathdhumal2001@gmail.com"         
                    className="text-white hover:underline"       
                >         
                    amarnathdhumal2001@gmail.com       
                </a>     
            </div>      

            <div className=" p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Want to work together?</h2>
                <p className="mb-4">
                    I'm always open to new opportunities and exciting projects. Whether it's a full-time role, freelance work, or just a chat about tech - I'd love to connect!
                </p>
                <button 
                  onClick={() => 
                    window.open("https://x.com/AmarnathDhumal", "_blank")
                  }
                className="bg-white cursor-pointer  text-black font-medium py-2 px-6 rounded-lg transition-colors">
                    💼 Let's Connect - DM me on X
                </button>
            </div>

            <p className="mt-6 text-sm text-gray-600">         
                📍 Based in: Vinayak Nagar, Hyderabad - 500056     
            </p>       
        </div>    
        <Footer />    
    </div> 
);  

export default ContactUs;