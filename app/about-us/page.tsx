"use client";

import HompageHeader from "@/components/HomepageHeader";
import Footer from "@/components/ui/Footet";

const AboutUs = () => (
    <div><HompageHeader />
  <div className="p-6 pt-[100px] max-w-3xl mx-auto">
    
    <h1 className="text-2xl font-bold mb-4">About Us</h1>
    <p className="mb-4">
      <strong>YTNotes</strong> is a modern AI-powered platform that converts YouTube videos into short, easy-to-read summaries. Our goal is to save your time and help you understand key points without watching the full video.
    </p>
    <p className="mb-4">
      Whether you're a student, researcher, or casual viewer, YTNotes helps you consume content smarter and faster. We are passionate about simplifying online learning through smart tools and innovation.
    </p>
  </div>
  <Footer />
  </div>
);

export default AboutUs;
