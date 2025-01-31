import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { featureCategories } from '../data/customFeatures';
import { websiteTypes } from '../data/websiteTypes';
import { Check, ChevronRight, Info } from 'lucide-react';
import TagLine from '../components/TagLine';

const CustomPlanBuilder = () => {
    const [selectedFeatures, setSelectedFeatures] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedType, setSelectedType] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);

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

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-indigo-50/30 py-20 px-4">
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
                                    <button className="w-full bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                                        Continue with Selection
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Summary Bar - Fixed at bottom */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-sm font-semibold text-indigo-600">{selectedFeatures.length}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-700">
                                {selectedFeatures.length === 1 ? 'feature' : 'features'} selected
                            </span>
                        </div>
                        <button 
                            className="flex items-center gap-1 text-sm text-indigo-600 font-medium bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 transition-colors"
                            onClick={() => {
                                const summaryElement = document.getElementById('mobile-summary');
                                if (summaryElement) {
                                    summaryElement.classList.toggle('h-0');
                                    summaryElement.classList.toggle('h-72');
                                }
                            }}
                        >
                            View Details
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div id="mobile-summary" className="h-0 overflow-hidden transition-all duration-300">
                        <div className="bg-gray-50/80 backdrop-blur-sm rounded-t-xl p-4 space-y-2 max-h-72 overflow-y-auto">
                            {selectedFeatures.map((featureId) => {
                                const feature = featureCategories
                                    .flatMap(category => category.features)
                                    .find(f => f.id === featureId);
                                return (
                                    <div key={featureId} className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-indigo-400"></div>
                                            <span className="text-sm text-gray-700">{feature.name}</span>
                                        </div>
                                        <span className="text-sm font-semibold text-indigo-600">R{feature.price.toLocaleString()}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="flex items-center justify-between py-4 bg-white">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-600">Total Investment</span>
                            <span className="text-xl font-bold text-indigo-600">R{totalPrice.toLocaleString()}</span>
                        </div>
                        <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomPlanBuilder;