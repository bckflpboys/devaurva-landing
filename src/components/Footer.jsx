import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative mt-20">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-indigo-100/30" />
            
            <div className="relative border-t border-indigo-100">
                <div className="max-w-screen-xl mx-auto px-6 py-12">
                    {/* Main footer content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Company Info */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-gray-900">DevAura</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Transforming ideas into exceptional web experiences. Your vision, our expertise.
                            </p>
                            <div className="flex space-x-4 pt-2">
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    <Facebook size={20} />
                                </a>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    <Twitter size={20} />
                                </a>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    <Instagram size={20} />
                                </a>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    <Linkedin size={20} />
                                </a>
                                <a href="#" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                    <Github size={20} />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                            <ul className="space-y-2">
                                {['Features', 'Projects', 'Pricing'].map((item) => (
                                    <li key={item}>
                                        <a href={`/#${item.toLowerCase()}`} className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                                <li>
                                    <Link 
                                        to="/custom-plan" 
                                        className="font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient text-sm"
                                    >
                                        Customized Pricing
                                    </Link>
                                </li>
                                <li>
                                    <a href="/#contact" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Services</h3>
                            <ul className="space-y-2">
                                {[
                                    'Web Development',
                                    'UI/UX Design',
                                    'E-commerce Solutions',
                                    'API Development',
                                    'SEO Optimization'
                                ].map((service) => (
                                    <li key={service}>
                                        <a href="/#features" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                                            {service}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="mailto:info@devaura.com" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                                        <Mail size={16} className="mr-2" />
                                        info@devaura.com
                                    </a>
                                </li>
                                <li>
                                    <a href="tel:+1234567890" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                                        <Phone size={16} className="mr-2" />
                                        +123 456 7890
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                                        <MapPin size={16} className="mr-2" />
                                        Cape Town, South Africa
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="mt-12 pt-8 border-t border-gray-200">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-gray-600 text-sm">
                                &copy; {new Date().getFullYear()} DevAura. All rights reserved.
                            </p>
                            <div className="flex space-x-6">
                                <Link to="/privacy" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                                    Privacy & Cookie Policy
                                </Link>
                                <Link to="/terms" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                                    Terms of Service
                                </Link>
                                <Link to="/refund" className="text-gray-600 hover:text-indigo-600 transition-colors text-sm">
                                    Refund Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;