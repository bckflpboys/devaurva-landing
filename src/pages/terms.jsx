import React from 'react';
import { motion } from 'framer-motion';
import TagLine from '../components/TagLine';

const Terms = () => {
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
                    <p className="text-gray-600">Last updated: February 2, 2025</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="prose prose-indigo max-w-none"
                >
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
                        <p className="text-gray-600 mb-4">
                            Welcome to DevAura. These terms and conditions govern your use of our website development and design services. 
                            By using our services, you agree to comply with these terms and conditions. If you do not agree with any part 
                            of these terms, please refrain from using our services.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Services Provided</h2>
                        <p className="text-gray-600 mb-4">
                            DevAura specializes in creating modern, responsive websites with a focus on SaaS and business applications. 
                            Our services include but are not limited to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Custom website development</li>
                            <li>SaaS application development</li>
                            <li>UI/UX design</li>
                            <li>Web application maintenance and support</li>
                            <li>Performance optimization</li>
                            <li>SEO implementation</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Policy</h2>
                        <p className="text-gray-600 mb-4">
                            We are committed to delivering all projects according to the agreed-upon timeline. Our refund policy includes:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Full refund if we fail to deliver within the agreed timeline (excluding delays caused by client feedback or external factors)</li>
                            <li>Refunds are processed within 5-7 business days</li>
                            <li>No refunds for completed work or delays caused by client-side factors</li>
                            <li>Partial refunds may be issued for incomplete milestones</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
                        <p className="text-gray-600 mb-4">
                            All intellectual property rights, including designs, code, and assets, remain with DevAura until full payment 
                            is received. Upon complete payment:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Full ownership of the custom code is transferred to you</li>
                            <li>You receive perpetual license to use all implemented features</li>
                            <li>Source code and assets are provided in their original format</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Confidentiality</h2>
                        <p className="text-gray-600 mb-4">
                            We maintain strict confidentiality of all client information and project details. This includes:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Non-disclosure of business strategies and plans</li>
                            <li>Secure handling of sensitive data</li>
                            <li>Private repository management</li>
                            <li>Confidential communication channels</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitation of Liability</h2>
                        <p className="text-gray-600 mb-4">
                            DevAura shall not be liable for any indirect, incidental, special, or consequential damages arising from:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Third-party service interruptions</li>
                            <li>Force majeure events</li>
                            <li>Client-side modifications</li>
                            <li>External security breaches</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
                        <p className="text-gray-600 mb-4">
                            These terms and conditions shall be governed by and construed in accordance with the laws of The Republic of 
                            South Africa. Any disputes shall be subject to the exclusive jurisdiction of the courts of The Republic of 
                            South Africa.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
                        <p className="text-gray-600 mb-4">
                            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting 
                            on our website. For ongoing projects, any significant changes will be communicated directly to clients.
                        </p>
                    </section>

                    <div className="bg-indigo-50 p-6 rounded-xl mt-8">
                        <p className="text-gray-600 text-sm">
                            By using our services, you acknowledge that you have read, understood, and agree to be bound by these 
                            terms and conditions. For any questions about these terms, please contact DevAura support team.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;
