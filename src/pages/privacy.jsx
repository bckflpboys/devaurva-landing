import React from 'react';
import { motion } from 'framer-motion';
import TagLine from '../components/TagLine';

const Privacy = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30 py-20">
            <div className="max-w-4xl mx-auto px-4">
                <TagLine>Legal</TagLine>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy & Cookie Policy</h1>
                    <p className="text-gray-600">Last updated: February 2, 2025</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="prose prose-indigo max-w-none"
                >
                    <section className="mb-12">
                        <p className="text-gray-600 mb-8">
                            This Policy governs our use of any and all data collected by us in connection with your use of our website. 
                            Please read this Privacy Statement carefully and make sure you understand it. When you use our site for the 
                            first time, you are deemed to have accepted our Privacy Policy. If you do not accept and agree with this 
                            Privacy Policy, you must immediately stop using our site.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Interpretations</h2>
                        <p className="text-gray-600 mb-4">
                            The following terminology used in this Policy shall have the definitions set out below:
                        </p>
                        <div className="space-y-4 text-gray-600">
                            <div>
                                <strong className="text-gray-900">Our Site</strong>
                                <p>Which is our website address: devaura.com</p>
                            </div>
                            <div>
                                <strong className="text-gray-900">Cookie</strong>
                                <p>A small text file that Our Site stores on your computer or device when you access particular pages 
                                or utilize specific features of Our Site.</p>
                            </div>
                            <div>
                                <strong className="text-gray-900">We/Us/Our</strong>
                                <p>Refers to DevAura, our employees, and authorized representatives.</p>
                            </div>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                        <p className="text-gray-600 mb-4">Our Site will collect some data automatically based on your use of Our Site. We may collect:</p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Business name and information</li>
                            <li>Contact details (email addresses and phone numbers)</li>
                            <li>Usage data and analytics</li>
                            <li>Technical information about your device and browser</li>
                            <li>Preferences and settings</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                        <p className="text-gray-600 mb-4">
                            All personal data is securely stored in accordance with the principles of The Protection of Personal 
                            Information Act, 2013 (POPIA) and Electronic Communications and Transactions Act, 2002 (ECTA).
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Providing and managing your account access</li>
                            <li>Personalizing your experience on our site</li>
                            <li>Delivering our web development services</li>
                            <li>Responding to your communications</li>
                            <li>Sending email alerts you've subscribed to (with opt-out option)</li>
                            <li>Analyzing site usage to improve our services</li>
                            <li>Marketing communications (with your permission)</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
                        <p className="text-gray-600 mb-4">
                            We implement robust security measures to protect your data:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Encrypted data transmission</li>
                            <li>Secure server infrastructure</li>
                            <li>Regular security audits</li>
                            <li>Limited access to personal information</li>
                            <li>Strict data handling procedures</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
                        <p className="text-gray-600 mb-4">
                            Our site uses cookies to enhance your experience. These include:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Essential cookies for site functionality</li>
                            <li>Analytics cookies to understand usage patterns</li>
                            <li>Preference cookies to remember your settings</li>
                            <li>Marketing cookies for relevant content (optional)</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Content</h2>
                        <p className="text-gray-600 mb-4">
                            Our site may include embedded content (videos, images, articles, etc.). These third-party websites 
                            may collect data about you, use cookies, and monitor your interaction with their content. We recommend 
                            reviewing their privacy policies.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                        <p className="text-gray-600 mb-4">
                            You have the right to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Access your personal data</li>
                            <li>Request data correction or deletion</li>
                            <li>Opt-out of marketing communications</li>
                            <li>Manage cookie preferences</li>
                            <li>File a complaint with relevant authorities</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Policy Updates</h2>
                        <p className="text-gray-600 mb-4">
                            We reserve the right to update this policy as needed. Changes will be posted on our site, and 
                            continued use of our services after changes indicates acceptance of the updated policy.
                        </p>
                    </section>

                    <div className="bg-indigo-50 p-6 rounded-xl mt-8">
                        <p className="text-gray-600 text-sm">
                            For any questions about this Privacy & Cookie Policy or to exercise your rights, please contact 
                            us at support@devaura.com.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
