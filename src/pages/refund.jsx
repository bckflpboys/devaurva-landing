import React from 'react';
import { motion } from 'framer-motion';
import TagLine from '../components/TagLine';

const Refund = () => {
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
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Refund Policy</h1>
                    <p className="text-gray-600">Last updated: February 2, 2025</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="prose prose-indigo max-w-none"
                >
                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Overview</h2>
                        <p className="text-gray-600 mb-4">
                            At DevAura, we are committed to delivering exceptional web development services. We offer a 30-Day 
                            Money-Back Guarantee to ensure your complete satisfaction. To maintain the integrity of our services 
                            and protect our business interests, we have established the following refund policy.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Deposit and Payment Structure</h2>
                        <p className="text-gray-600 mb-4">
                            To ensure project commitment and maintain quality service delivery, we implement the following payment structure:
                        </p>
                        <div className="grid md:grid-cols-4 gap-6 mb-6">
                            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-indigo-200/70 hover:border-indigo-300 transition-colors">
                                <div className="text-2xl font-bold text-indigo-600 mb-2">25%</div>
                                <h3 className="font-semibold text-gray-900 mb-2">Initial Deposit</h3>
                                <p className="text-sm text-gray-600">Due before UI/UX design phase</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-indigo-200/70 hover:border-indigo-300 transition-colors">
                                <div className="text-2xl font-bold text-indigo-600 mb-2">25%</div>
                                <h3 className="font-semibold text-gray-900 mb-2">Development Deposit</h3>
                                <p className="text-sm text-gray-600">Due before coding begins</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-indigo-200/70 hover:border-indigo-300 transition-colors">
                                <div className="text-2xl font-bold text-indigo-600 mb-2">25%</div>
                                <h3 className="font-semibold text-gray-900 mb-2">Midpoint Payment</h3>
                                <p className="text-sm text-gray-600">Due at major milestone completion</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-md border-2 border-indigo-200/70 hover:border-indigo-300 transition-colors">
                                <div className="text-2xl font-bold text-indigo-600 mb-2">25%</div>
                                <h3 className="font-semibold text-gray-900 mb-2">Final Payment</h3>
                                <p className="text-sm text-gray-600">Due upon project completion</p>
                            </div>
                        </div>
                        <div className="bg-indigo-50/50 p-4 rounded-lg">
                            <p className="text-gray-600 text-sm mb-3">
                                <strong className="text-indigo-600">Important Payment Information:</strong>
                            </p>
                            <ul className="list-disc pl-6 text-gray-600 space-y-2 text-sm">
                                <li>Initial 25% deposit is required to begin the UI/UX design phase</li>
                                <li>Second 25% deposit is required before development work begins</li>
                                <li>Both initial deposits become non-refundable once their respective phases begin</li>
                                <li>Deposits ensure resource allocation and project commitment</li>
                                <li>Subsequent payments are tied to development milestones</li>
                                <li>Final payment is required before the transfer of any project files or deployment</li>
                            </ul>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Eligibility for Refunds</h2>
                        <p className="text-gray-600 mb-4">
                            To be eligible for a refund, the following conditions must be met:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>A formal refund request must be submitted within 30 days of the initial payment</li>
                            <li>The request must include specific reasons for dissatisfaction with our services</li>
                            <li>Services provided must significantly deviate from the agreed-upon specifications</li>
                            <li>All communication attempts to resolve the issues have been exhausted</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Non-Refundable Situations</h2>
                        <p className="text-gray-600 mb-4">
                            Refunds will not be granted in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Changes in business requirements after development has begun</li>
                            <li>Dissatisfaction with delivered features that meet the original specifications</li>
                            <li>Delays caused by client-side response times or resource availability</li>
                            <li>Completed and approved project milestones</li>
                            <li>Services that have been fully delivered according to specifications</li>
                            <li>Premium features or add-ons that have been activated or implemented</li>
                            <li>Third-party integrations or services that have been purchased and configured</li>
                            <li>Custom development work that has been completed to specifications</li>
                            <li>Domain registration and hosting services once activated</li>
                        </ul>
                        <div className="bg-indigo-50/50 p-4 rounded-lg mt-4">
                            <p className="text-gray-600 text-sm">
                                <strong className="text-indigo-600">Important Note:</strong> Certain paid features and services are 
                                non-refundable once activated or implemented. This includes, but is not limited to, premium integrations, 
                                third-party services, custom development work, and hosting services. Please carefully review the features 
                                included in your package before making a purchase.
                            </p>
                        </div>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Partial Refunds</h2>
                        <p className="text-gray-600 mb-4">
                            We may issue partial refunds in the following situations:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Specific features or components did not meet agreed-upon requirements</li>
                            <li>Project cancellation after partial completion</li>
                            <li>Significant delays in delivery caused by our team</li>
                            <li>Mutual agreement to terminate the project mid-development</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Refund Process</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Submit your refund request to support@devaura.co.za within 30 days of payment</li>
                            <li>Our team will review and respond to your request within 2 business days</li>
                            <li>If approved, refunds will be processed within 5-7 business days</li>
                            <li>Refunds will be issued using the original payment method</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Dispute Resolution</h2>
                        <p className="text-gray-600 mb-4">
                            We prioritize resolving any issues through direct communication. If you're experiencing concerns 
                            with our services, please contact our support team immediately. We're committed to finding 
                            solutions that work for both parties while maintaining our high standards of service.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Policy Updates</h2>
                        <p className="text-gray-600 mb-4">
                            DevAura reserves the right to modify this refund policy at any time. Changes will be 
                            communicated to all clients and will not affect existing agreements or ongoing projects.
                        </p>
                    </section>

                    <div className="bg-indigo-50 p-6 rounded-xl mt-8">
                        <p className="text-gray-600 text-sm">
                            Your satisfaction is our priority. We are committed to delivering high-quality web development 
                            solutions and ensuring a positive experience for all our clients. If you have any questions 
                            about this refund policy, please contact our support team.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Refund;
