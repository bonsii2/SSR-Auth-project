import Link from "next/link";
import React from "react";

export default function  Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-900">
              myapp
            </a>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-black hover:text-gray-900">
              Features
            </a>
            <a href="#pricing" className="text-black hover:text-gray-900">
              Pricing
            </a>
            <a href="#contact" className="text-black hover:text-gray-900">
              Contact
            </a>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              href="auth/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-6"
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              signUp
            </Link>
            
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-gray-900">☰</button>
          </div>
        </div>
      </div>
    </nav>
  );
};
