import { Check, ChevronRight, Plus, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { websiteTypes } from "../data/websiteTypes";

const PlanCard = ({ priceRange, title, description, features, isPopular, isCustom, tag }) => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        websiteType: '',
        budget: '',
        noBudget: false
    });

    // Get min and max budget from price range
    const getBudgetRange = () => {
        try {
            // First, clean up the price range string
            const cleanPriceRange = priceRange
                .replace(/R/g, '')  // Remove all 'R's
                .replace(/\s/g, '') // Remove spaces
                .replace(/,/g, ''); // Remove commas

            // Handle "25,000+" format
            if (cleanPriceRange.includes('+')) {
                const min = parseInt(cleanPriceRange);
                return { min, max: 1000000 };
            }

            // Handle "2,000 - 10,000" format
            const [minStr, maxStr] = cleanPriceRange.split('-');
            const min = parseInt(minStr);
            const max = parseInt(maxStr);

            // Validate the parsed values
            if (isNaN(min) || isNaN(max)) {
                console.error('Invalid price range format:', priceRange);
                return { min: 0, max: 0 };
            }

            return { min, max };
        } catch (error) {
            console.error('Error parsing price range:', error);
            return { min: 0, max: 0 };
        }
    };

    const handleBudgetChange = (e) => {
        if (formData.noBudget) return;
        let value = e.target.value;
        
        // Remove non-numeric characters
        value = value.replace(/[^0-9]/g, '');
        
        // Allow empty value for backspace/delete
        if (value === '') {
            setFormData({ ...formData, budget: '' });
            return;
        }

        setFormData({ ...formData, budget: value });
    };

    const handleBudgetBlur = () => {
        if (formData.noBudget || formData.budget === '') return;

        const { min, max } = getBudgetRange();
        const numValue = parseInt(formData.budget);

        if (numValue < min) {
            setFormData(prev => ({ ...prev, budget: min.toString() }));
        } else if (numValue > max) {
            setFormData(prev => ({ ...prev, budget: max.toString() }));
        }
    };

    const toggleNoBudget = () => {
        setFormData(prev => ({
            ...prev,
            noBudget: !prev.noBudget,
            budget: !prev.noBudget ? '' : prev.budget
        }));
    };

    const handleClick = () => {
        if (isCustom) {
            navigate('/custom-plan');
        } else {
            setShowForm(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate budget before submission
        if (!formData.noBudget && formData.budget) {
            const { min, max } = getBudgetRange();
            const numValue = parseInt(formData.budget);
            if (numValue < min || numValue > max) {
                alert(`Please enter a budget between R${min.toLocaleString()} and R${max.toLocaleString()}`);
                return;
            }
        }

        setSubmitting(true);
        
        try {
            const { min } = getBudgetRange();
            const response = await fetch('http://localhost:3001/api/card-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    budget: formData.noBudget ? 0 : parseInt(formData.budget || min),
                    planType: title,
                    planPrice: parseInt(priceRange.replace(/[^0-9]/g, ''))
                })
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setShowForm(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                websiteType: '',
                budget: '',
                noBudget: false
            });
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit form. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`plan-card ring-1 ${
                    isCustom 
                        ? 'ring-purple-200 border border-purple-200 shadow-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50' 
                        : isPopular 
                            ? 'ring-indigo-200 border border-indigo-200 shadow-indigo-100' 
                            : 'ring-gray-200 border border-gray-200'
                } shadow-lg flex flex-col justify-between ${!isCustom && 'bg-white'} rounded-2xl h-full p-8 hover:shadow-xl hover:scale-105 transition-all duration-300 text-left relative`}
            >
                {tag && (
                    <div className={`tag absolute -top-4 left-1/2 -translate-x-1/2 ${
                        isCustom 
                            ? 'bg-purple-600' 
                            : isPopular 
                                ? 'bg-indigo-600' 
                                : 'bg-gray-700'
                    } text-white px-4 py-1 rounded-full text-sm font-medium`}>
                        {tag}
                    </div>
                )}
                <div>
                    <h2 className="font-bold text-2xl mt-3 text-gray-900">
                        {title}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm">{description}</p>
                    <div className="mt-4 mb-6">
                        <div className="text-4xl font-extrabold text-gray-900">
                            {priceRange}
                        </div>
                    </div>
                    <div className="border-t border-gray-200 my-6"></div>
                    <ul className="space-y-4">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-3 text-gray-700">
                                <div className="mt-1">
                                    <div className={`w-4 h-4 ${
                                        isCustom 
                                            ? 'bg-purple-600' 
                                            : isPopular 
                                                ? 'bg-indigo-600' 
                                                : 'bg-gray-700'
                                    } rounded-full flex items-center justify-center flex-shrink-0`}>
                                        {isCustom ? <Plus className="text-white w-3 h-3" /> : <Check className="text-white w-3 h-3" />}
                                    </div>
                                </div>
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <button 
                    onClick={handleClick}
                    className={`group flex items-center justify-center gap-2 w-full mt-8 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 ${
                        isCustom 
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : isPopular 
                                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {isCustom ? 'Build Your Plan' : 'Get Started'}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
            </motion.div>

            {/* Form Modal */}
            {showForm && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-2xl p-6 max-w-md w-full relative"
                    >
                        <button
                            onClick={() => setShowForm(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Get Started with {title} Plan</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                    Phone Number *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    required
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="+27 123 456 7890"
                                />
                            </div>
                            <div>
                                <label htmlFor="websiteType" className="block text-sm font-medium text-gray-700 mb-1">
                                    Type of Website *
                                </label>
                                <select
                                    id="websiteType"
                                    required
                                    value={formData.websiteType}
                                    onChange={(e) => setFormData({ ...formData, websiteType: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="">Select a website type</option>
                                    {websiteTypes.map((type) => (
                                        <option key={type.id} value={type.name}>
                                            {type.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Budget *
                                </label>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="noBudget"
                                            checked={formData.noBudget}
                                            onChange={toggleNoBudget}
                                            className="rounded text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <label htmlFor="noBudget" className="text-sm text-gray-600">
                                            Uncapped/No Budget
                                        </label>
                                    </div>
                                    {!formData.noBudget && (
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">R</span>
                                            <input
                                                type="text"
                                                value={formData.budget}
                                                onChange={handleBudgetChange}
                                                onBlur={handleBudgetBlur}
                                                className="w-full px-4 py-2 pl-8 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder={`${getBudgetRange().min.toLocaleString()} - ${getBudgetRange().max.toLocaleString()}`}
                                                required={!formData.noBudget}
                                            />
                                        </div>
                                    )}
                                    <p className="text-xs text-gray-500">
                                        Budget range for {title} plan: {
                                            formData.noBudget ? 
                                            'Uncapped' : 
                                            `R${getBudgetRange().min.toLocaleString()} - R${getBudgetRange().max.toLocaleString()}`
                                        }
                                    </p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-3 px-4 rounded-xl text-white font-medium ${
                                    submitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : isPopular
                                            ? 'bg-indigo-600 hover:bg-indigo-700'
                                            : 'bg-gray-800 hover:bg-gray-900'
                                } transition-colors`}
                            >
                                {submitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}

            {/* Success Popup */}
            {showSuccess && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative z-10">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <svg
                                    className="h-6 w-6 text-green-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                    ></path>
                                </svg>
                            </div>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">Submission Successful!</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Thank you for your interest! We will contact you shortly to discuss your {title} plan requirements.
                            </p>
                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
                                    onClick={() => setShowSuccess(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PlanCard;