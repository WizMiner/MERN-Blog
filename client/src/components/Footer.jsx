// Importing necessary components and libraries
import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsGithub,
  BsDribbble,
} from "react-icons/bs";

export default function FooterCom() {
  return (
    // Main Footer container with a teal border on top
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full mx-auto max-w-7xl">
        {/* Main layout: Flexbox for responsiveness */}
        <div className="grid justify-between w-full sm:flex md:grid-cols-1">
          {/* Logo Section */}
          <div className="mt-5">
            <Link
              to="/"
              className="self-center text-lg font-semibold whitespace-nowrap sm:text-xl dark:text-white"
            >
              <span className="px-2 py-1 text-white transition-all duration-300 ease-in-out rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:rounded-full">
                BLOG
              </span>
              {/* Blog */}
            </Link>
          </div>

          {/* Footer Links Section */}
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            {/* About Section */}
            <div>
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://wizminer.github.io/PORTFOLIO/"
                  target="_blank"
                  rel="portfolio"
                  className="transition-all duration-300 ease-in-out hover:rounded-md"
                >
                  MINTE
                </Footer.Link>
                <Footer.Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 ease-in-out hover:rounded-md"
                >
                  BLOG
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            {/* Follow Us Section */}
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="https://github.com/WizMiner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 ease-in-out hover:rounded-md"
                >
                  Github
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="transition-all duration-300 ease-in-out hover:rounded-md"
                >
                  Discord
                </Footer.Link>
              </Footer.LinkGroup>
            </div>

            {/* Legal Section */}
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link
                  href="#"
                  className="transition-all duration-300 ease-in-out hover:rounded-md"
                >
                  Privacy Policy
                </Footer.Link>
                <Footer.Link
                  href="#"
                  className="transition-all duration-300 ease-in-out hover:rounded-md"
                >
                  Terms &amp; Conditions
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Footer.Divider />

        {/* Bottom Section with Social Icons */}
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          {/* Copyright */}
          <Footer.Copyright
            href="#"
            by="minte"
            year={new Date().getFullYear()}
          />

          {/* Social Media Icons */}
          <div className="flex gap-6 mt-4 sm:mt-0 sm:justify-center">
            <Footer.Icon
              href="#"
              icon={BsFacebook}
              className="transition-all duration-300 ease-in-out hover:rounded-full"
            />
            <Footer.Icon
              href="#"
              icon={BsInstagram}
              className="transition-all duration-300 ease-in-out hover:rounded-full"
            />
            <Footer.Icon
              href="#"
              icon={BsTwitter}
              className="transition-all duration-300 ease-in-out hover:rounded-full"
            />
            <Footer.Icon
              href="https://github.com/WizMiner"
              icon={BsGithub}
              className="transition-all duration-300 ease-in-out hover:rounded-full"
            />
            <Footer.Icon
              href="#"
              icon={BsDribbble}
              className="transition-all duration-300 ease-in-out hover:rounded-full"
            />
          </div>
        </div>
      </div>
    </Footer>
  );
}
