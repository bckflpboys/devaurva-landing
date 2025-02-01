import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { featureCategories } from '../data/customFeatures';
import { websiteTypes } from '../data/websiteTypes';
import { Check, ChevronRight, Info, X } from 'lucide-react';
import TagLine from '../components/TagLine';

const CustomPlanBuilder = () => {
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedType, setSelectedType] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        companyName: '',
        additionalNotes: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [isScrollable, setIsScrollable] = useState(false);

    // Scroll to top on component mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Update selected features when website type changes
    useEffect(() => {
        if (selectedType) {
            const websiteType = websiteTypes.find(type => type.id === selectedType);
            if (websiteType) {
                // Combine core features with recommended features
                const coreFeatures = featureCategories
                    .find(category => category.id === 'core')
                    ?.features.map(feature => feature.id) || [];
                const uniqueFeatures = [...new Set([...coreFeatures, ...websiteType.recommendedFeatures])];
                setSelectedFeatures(uniqueFeatures);
            }
        } else {
            // If no type selected, just show core features
            const coreFeatures = featureCategories
                .find(category => category.id === 'core')
                ?.features.map(feature => feature.id) || [];
            setSelectedFeatures(coreFeatures);
        }
    }, [selectedType]);

    // Calculate total price whenever selected features change
    useEffect(() => {
        const total = featureCategories
            .flatMap(category => category.features)
            .filter(feature => selectedFeatures.includes(feature.id))
            .reduce((sum, feature) => sum + feature.price, 0);
        setTotalPrice(total);
    }, [selectedFeatures]);

    // Add scroll detection
    useEffect(() => {
        const summaryElement = document.getElementById('mobile-summary-content');
        if (summaryElement) {
            const checkScrollable = () => {
                setIsScrollable(summaryElement.scrollHeight > summaryElement.clientHeight);
            };
            checkScrollable();
            // Recheck when content changes
            const observer = new ResizeObserver(checkScrollable);
            observer.observe(summaryElement);
            return () => observer.disconnect();
        }
    }, [selectedFeatures]);

    const toggleFeature = (featureId) => {
        setSelectedFeatures(prev =>
            prev.includes(featureId)
                ? prev.filter(id => id !== featureId)
                : [...prev, featureId]
        );
    };

    // Check if a feature is recommended for current website type
    const isRecommendedFeature = (featureId) => {
        if (!selectedType) return false;
        const websiteType = websiteTypes.find(type => type.id === selectedType);
        return websiteType?.recommendedFeatures.includes(featureId) || false;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        
        try {
            // Get the full feature details for selected features
            const selectedFeaturesDetails = featureCategories
                .flatMap(category => category.features)
                .filter(feature => selectedFeatures.includes(feature.id))
                .map(({ id, name, description, price }) => ({
                    name,
                    description,
                    price
                }));

            const websiteType = websiteTypes.find(type => type.id === selectedType);
            
            const submission = {
                ...formData,
                selectedFeatures: selectedFeaturesDetails,
                websiteType: websiteType ? websiteType.name : null,
                totalPrice
            };

            const response = await fetch('http://localhost:3001/api/custom-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(submission)
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            setSubmitStatus({
                type: 'success',
                message: 'Your custom plan request has been sent successfully! We will contact you shortly to discuss your project in detail.'
            });
            setShowForm(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                companyName: '',
                additionalNotes: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus({ type: 'error', message: 'Failed to submit form. Please try again.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30 py-20 px-4">
            {/* Success Message Modal */}
            {submitStatus?.type === 'success' && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="fixed inset-0 flex items-center justify-center z-[60] px-4"
                >
                    <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSubmitStatus(null)}></div>
                    <div className="bg-white rounded-2xl p-8 shadow-xl relative max-w-md w-full">
                        <div className="absolute top-4 right-4">
                            <button
                                onClick={() => setSubmitStatus(null)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
                            <p className="text-gray-600">{submitStatus.message}</p>
                            <button
                                onClick={() => setSubmitStatus(null)}
                                className="mt-6 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
            <div className="max-w-6xl mx-auto">
                <TagLine>Custom Plan Builder</TagLine>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Build Your Perfect Solution
                    </h1>
                    <div className="space-y-2 mb-8">
                        <h2 className="text-xl font-semibold text-gray-900">Choose Your Website Category</h2>
                        <p className="text-gray-600">
                            Select a category below to get recommended features for your type of website.
                            Each option includes carefully selected features and estimated pricing.
                        </p>
                    </div>

                    {/* Website Type Selector */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto mb-16">
                        {websiteTypes.map((type) => {
                            // Calculate total price for this website type
                            const coreFeatures = featureCategories
                                .find(category => category.id === 'core')
                                ?.features.map(feature => feature.id) || [];
                            const allTypeFeatures = [...new Set([...coreFeatures, ...type.recommendedFeatures])];
                            
                            const typeTotal = allTypeFeatures.reduce((sum, featureId) => {
                                const feature = featureCategories
                                    .flatMap(category => category.features)
                                    .find(f => f.id === featureId);
                                return sum + (feature?.price || 0);
                            }, 0);

                            return (
                                <motion.div
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id === selectedType ? null : type.id)}
                                    className={`cursor-pointer p-4 rounded-xl transition-all duration-300 ${
                                        selectedType === type.id
                                            ? 'bg-indigo-50 ring-2 ring-indigo-500'
                                            : 'bg-white hover:bg-gray-50 ring-1 ring-gray-200'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <div className="text-3xl mb-2">{type.icon}</div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="font-semibold text-gray-900">{type.name}</h3>
                                        <span className="text-indigo-600 font-semibold">
                                            R{typeTotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{type.description}</p>
                                    <div className="mt-2 text-xs text-indigo-600">
                                        {type.recommendedFeatures.length} recommended features
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        {featureCategories.map((category) => (
                            <div key={category.id}>
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    {category.name}
                                </h2>
                                <div className="space-y-4">
                                    {category.features.map((feature) => (
                                        <div
                                            key={feature.id}
                                            onClick={() => toggleFeature(feature.id)}
                                            className={`relative flex items-start p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                                selectedFeatures.includes(feature.id)
                                                    ? feature.highlight
                                                        ? 'bg-emerald-50 ring-2 ring-emerald-500'
                                                        : 'bg-indigo-50 ring-2 ring-indigo-500'
                                                    : feature.highlight
                                                        ? 'hover:bg-emerald-50/50 ring-1 ring-emerald-200'
                                                        : 'hover:bg-gray-50 ring-1 ring-gray-200'
                                            }`}
                                        >
                                            {isRecommendedFeature(feature.id) && (
                                                <div className="absolute -top-3 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    Recommended
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="text-sm font-semibold text-gray-900">
                                                            {feature.name}
                                                            {feature.billingCycle && (
                                                                <span className={`ml-1 ${feature.recommended ? 'text-emerald-600' : 'text-emerald-500'} font-medium`}>
                                                                    {feature.billingCycle}
                                                                </span>
                                                            )}
                                                        </h3>
                                                    </div>
                                                    <span className={`text-sm font-medium ${feature.recommended ? 'text-emerald-600' : 'text-gray-900'}`}>
                                                        R{feature.price.toLocaleString()}
                                                    </span>
                                                </div>
                                                {feature.specs && (
                                                    <div className="mt-2 mb-3 grid grid-cols-2 gap-2">
                                                        <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-2">
                                                            <span className="text-xs font-medium text-emerald-700">CPU:</span>
                                                            <span className="text-xs text-emerald-600">{feature.specs.cpu}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-2">
                                                            <span className="text-xs font-medium text-emerald-700">RAM:</span>
                                                            <span className="text-xs text-emerald-600">{feature.specs.ram}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-2">
                                                            <span className="text-xs font-medium text-emerald-700">Storage:</span>
                                                            <span className="text-xs text-emerald-600">{feature.specs.storage}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2 bg-emerald-50 rounded-lg p-2">
                                                            <span className="text-xs font-medium text-emerald-700">Bandwidth:</span>
                                                            <span className="text-xs text-emerald-600">{feature.specs.bandwidth}</span>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="mt-2 space-y-1.5 text-sm text-gray-500">
                                                    {feature.description.split('\n').map((point, index) => (
                                                        <div key={index} className="flex items-start">
                                                            <span className="text-indigo-500 mr-2">•</span>
                                                            <span>{point.replace('• ', '')}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <div
                                                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                        selectedFeatures.includes(feature.id)
                                                            ? 'bg-indigo-600'
                                                            : 'bg-gray-200'
                                                    }`}
                                                >
                                                    <Check className={`w-4 h-4 ${
                                                        selectedFeatures.includes(feature.id)
                                                            ? 'text-white'
                                                            : 'text-transparent'
                                                    }`} />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-indigo-100 hover:border-indigo-200 transition-colors">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-between">
                                    Your Custom Package
                                    <span className="text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full">
                                        Summary
                                    </span>
                                </h2>
                                
                                {/* Selected Website Type */}
                                {selectedType && (
                                    <div className="mb-4 p-3 bg-indigo-50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xl">
                                                {websiteTypes.find(t => t.id === selectedType)?.icon}
                                            </span>
                                            <span className="font-medium text-indigo-900">
                                                {websiteTypes.find(t => t.id === selectedType)?.name}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Selected Features List */}
                                <div className="space-y-4 mb-6">
                                    {selectedFeatures.length === 0 ? (
                                        <p className="text-gray-500 text-sm italic">
                                            No features selected yet
                                        </p>
                                    ) : (
                                        featureCategories.map(category => {
                                            const categoryFeatures = category.features.filter(
                                                feature => selectedFeatures.includes(feature.id)
                                            );
                                            
                                            if (categoryFeatures.length === 0) return null;
                                            
                                            const categoryTotal = categoryFeatures.reduce(
                                                (sum, feature) => sum + feature.price, 0
                                            );
                                            
                                            return (
                                                <div key={category.id} className="border border-gray-100 rounded-lg p-3">
                                                    <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center justify-between">
                                                        {category.name}
                                                        <span className="text-indigo-600 font-semibold">
                                                            R{categoryTotal.toLocaleString()}
                                                        </span>
                                                    </h3>
                                                    <div className="space-y-2">
                                                        {categoryFeatures.map(feature => (
                                                            <div
                                                                key={feature.id}
                                                                className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0"
                                                            >
                                                                <div className="flex items-center gap-2">
                                                                    <Check className="w-4 h-4 text-emerald-500" />
                                                                    <span className="text-sm text-gray-700">
                                                                        {feature.name}
                                                                        {feature.billingCycle && (
                                                                            <span className="text-emerald-600 text-xs ml-1">
                                                                                {feature.billingCycle}
                                                                            </span>
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                <span className="text-sm font-medium text-gray-600">
                                                                    R{feature.price.toLocaleString()}
                                                                </span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                {/* Total Price */}
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-base font-semibold text-gray-900">
                                            Total Investment
                                        </span>
                                        <span className="text-xl font-bold text-indigo-600">
                                            R{totalPrice.toLocaleString()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-4">
                                        *Some features include annual billing
                                    </p>
                                    <button 
                                        onClick={() => setShowForm(true)}
                                        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
                                        disabled={selectedFeatures.length === 0}
                                    >
                                        Continue with Selection
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Summary Bar - Fixed at bottom */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] border-t-2 border-gray-600 z-50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div 
                        onClick={() => {
                            const summaryElement = document.getElementById('mobile-summary');
                            if (summaryElement) {
                                summaryElement.classList.toggle('h-0');
                                summaryElement.classList.toggle('h-[80vh]');
                            }
                        }}
                        className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-50 transition-colors rounded-t-xl group"
                    >
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Total: R{totalPrice.toLocaleString()}
                            </h2>
                            <span className="text-sm text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                                {selectedFeatures.length} {selectedFeatures.length === 1 ? 'feature' : 'features'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-indigo-600">
                            <span className="text-sm font-medium group-hover:underline">View Breakdown</span>
                            <ChevronRight className="w-5 h-5 transform -rotate-90 group-hover:translate-y-0.5 transition-transform" />
                        </div>
                    </div>
                    <div id="mobile-summary" className="h-0 overflow-hidden transition-all duration-300">
                        <div id="mobile-summary-content" className="py-4 space-y-4 max-h-[calc(80vh-4rem)] overflow-y-auto">
                            {/* Subtle scroll indicator that only shows when content is scrollable */}
                            {isScrollable && (
                                <div className="w-full flex justify-center mb-2">
                                    <div className="h-1 w-10 rounded-full bg-gray-200"></div>
                                </div>
                            )}
                            
                            {/* Selected Website Type */}
                            {selectedType && (
                                <div className="flex items-center gap-2 p-3 bg-indigo-50 rounded-xl">
                                    <span className="text-xl">
                                        {websiteTypes.find(t => t.id === selectedType)?.icon}
                                    </span>
                                    <span className="font-medium text-indigo-900">
                                        {websiteTypes.find(t => t.id === selectedType)?.name}
                                    </span>
                                </div>
                            )}

                            {/* Selected Features List */}
                            <div className="space-y-4">
                                {selectedFeatures.length === 0 ? (
                                    <p className="text-gray-500 text-sm italic">
                                        No features selected yet
                                    </p>
                                ) : (
                                    featureCategories.map(category => {
                                        const categoryFeatures = category.features.filter(
                                            feature => selectedFeatures.includes(feature.id)
                                        );
                                        
                                        if (categoryFeatures.length === 0) return null;
                                        
                                        const categoryTotal = categoryFeatures.reduce(
                                            (sum, feature) => sum + feature.price, 0
                                        );
                                        
                                        return (
                                            <div key={category.id} className="border border-gray-100 rounded-lg p-3">
                                                <h3 className="text-sm font-medium text-gray-900 mb-2 flex items-center justify-between">
                                                    {category.name}
                                                    <span className="text-indigo-600 font-semibold">
                                                        R{categoryTotal.toLocaleString()}
                                                    </span>
                                                </h3>
                                                <div className="space-y-2">
                                                    {categoryFeatures.map(feature => (
                                                        <div
                                                            key={feature.id}
                                                            className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0"
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Check className="w-4 h-4 text-emerald-500" />
                                                                <span className="text-sm text-gray-700">
                                                                    {feature.name}
                                                                    {feature.billingCycle && (
                                                                        <span className="text-emerald-600 text-xs ml-1">
                                                                            {feature.billingCycle}
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            </div>
                                                            <span className="text-sm font-medium text-gray-600">
                                                                R{feature.price.toLocaleString()}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Continue Button */}
                            <div className="pt-4">
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                                >
                                    Continue with Selection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Complete Your Request</h2>
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
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="companyName"
                                    value={formData.companyName}
                                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Company Ltd."
                                />
                            </div>
                            <div>
                                <label htmlFor="additionalNotes" className="block text-sm font-medium text-gray-700 mb-1">
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    id="additionalNotes"
                                    value={formData.additionalNotes}
                                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                    rows="4"
                                    placeholder="Any specific requirements or questions..."
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-3 px-4 rounded-xl text-white font-medium ${
                                    submitting
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700'
                                } transition-colors`}
                            >
                                {submitting ? 'Submitting...' : 'Submit Request'}
                            </button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};

export default CustomPlanBuilder;