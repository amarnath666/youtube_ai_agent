const Footer = () => {
  const links = [
    {
      title: "Product",
      items: [{
        name: "About",
        href: "/about",
      }, {
        name: "Privacy Policy",
        href: "/privacy-policy",
      }, {
        name: "Refund Policy",
        href: "/refund-policy",
      }, {
        name: "Terms and Conditions",
        href: "/terms-and-conditions",
        }, {
        name: "Contact",
        href: "/contact",
      }],
      
    },

  ];

  return (
    <div className="bg-zinc-950 rounded-t-[25px]">
    <footer className=" text-gray-400 pt-[30px] lg:pt-[60px] px-[30px] lg:px-[60px]  w-full max-w-[1440px] mx-auto">
      <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-12 pb-[25px] border-b border-zinc-700  ">
        {/* Left Side */}
        <div className="max-w-md">
          <h3 className="text-3xl font-bold text-white mb-4 md:mb-[25px]">YTNotes</h3>
          <p className="text-sm sm:text-lg">
            Turn any YouTube video into AI-powered notes in seconds. Designed for students, professionals, and lifelong learners.
          </p>
        </div>

        {/* Right Side - Links */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-8">
          {links.map((section, idx) => (
            <div key={idx}>
             
              <ul className="space-y-2">
                {section.items.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-white text-sm sm:text-base hover:text-gray-300 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center py-6 text-sm text-zinc-500">
        <p>&copy; {new Date().getFullYear()} YTNotes. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="https://x.com/AmarnathDhumal"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            X
          </a>
          <a
            href="https://www.linkedin.com/in/amarnath-dhumal/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
