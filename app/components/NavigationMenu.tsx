// components/NavigationMenu.tsx
import React from 'react';
import Link from 'next/link';

const NavigationMenu: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" legacyBehavior>
            <a className="text-white hover:text-gray-400">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about" legacyBehavior>
            <a className="text-white hover:text-gray-400">About</a>
          </Link>
        </li>
        <li>
          <Link href="/services" legacyBehavior>
            <a className="text-white hover:text-gray-400">Services</a>
          </Link>
        </li>
        <li>
          <Link href="/contact" legacyBehavior>
            <a className="text-white hover:text-gray-400">Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;