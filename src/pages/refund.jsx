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
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Eligibility for Refunds</h2>
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
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Non-Refundable Situations</h2>
                        <p className="text-gray-600 mb-4">
                            Refunds will not be granted in the following circumstances:
                        </p>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Changes in business requirements after development has begun</li>
                            <li>Dissatisfaction with delivered features that meet the original specifications</li>
                            <li>Delays caused by client-side response times or resource availability</li>
                            <li>Completed and approved project milestones</li>
                            <li>Services that have been fully delivered according to specifications</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Partial Refunds</h2>
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
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Refund Process</h2>
                        <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
                            <li>Submit your refund request to support@devaura.com within 30 days of payment</li>
                            <li>Our team will review and respond to your request within 2 business days</li>
                            <li>If approved, refunds will be processed within 5-7 business days</li>
                            <li>Refunds will be issued using the original payment method</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Dispute Resolution</h2>
                        <p className="text-gray-600 mb-4">
                            We prioritize resolving any issues through direct communication. If you're experiencing concerns 
                            with our services, please contact our support team immediately. We're committed to finding 
                            solutions that work for both parties while maintaining our high standards of service.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Policy Updates</h2>
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
