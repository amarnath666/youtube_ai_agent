"use client";
import CustomButton from "./CustomButton";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "./resizableNavbar";
import { useRouter } from "next/navigation";
import Profile from "./ui/Profile";
import { useState } from "react";
import { useSession } from "next-auth/react";

export function NavbarDemo() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "How It Works",
         link: "#how-it-works",
  },
  {
    name: "Pricing",
    link: "#pricing",
  },
];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  if (status === "loading") return null;


  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {!session && (
              <NavbarButton
                variant="secondary"
                onClick={() => router.push("/signin")}
              >
                Login
              </NavbarButton>
            )}
            {/* <NavbarButton variant="primary">Book a call</NavbarButton> */}
            {session ? (
              <Profile   />
            ) : (
              <CustomButton
                name="Join Waitlist"
                onClick={() => router.push("/signin")}
              />
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Navbar */}
    </div>
  );
}


