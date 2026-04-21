import { useState, useEffect } from "react";
import TagLine from "./TagLine";
import { Mail, MapPin, Phone, Check } from 'lucide-react';

const Contact = ({ preFill }) => {
    const categories = [
        "Enquire/Get Quotes",
        "Website Development",
        "Ecommerce",
        "Company Systems",
        "Software (SaaS)",
        "Mobile Apps",
        "Desktop Software",
        "Mobile Games",
        "Desktop Games",
        "Digital Paid Ads",
        "Digital Marketing/Branding",
        "Webhosting",
        "Email Hosting",
        "Social Media Management",
        "SEO Boost",
        "Browser Extension"
    ];

    const formInitialDetails = {
        firstName: "",
        email: "",
        phone: "",
        categories: [],
        message: "",
    };
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState("Send Message");
    const [status, setStatus] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (preFill) {
            setFormDetails(prev => {
                const newCategories = Array.isArray(preFill.category) 
                    ? [...new Set([...prev.categories, ...preFill.category])]
                    : [...new Set([...prev.categories, preFill.category])];
                
                return {
                    ...prev,
                    categories: newCategories,
                    message: preFill.message ? (prev.message.includes(preFill.message) ? prev.message : `${prev.message} I'm interested in ${preFill.message}. `.trim()) : prev.message
                };
            });
        }
    }, [preFill]);

    const onFormUpdate = (key, value) => {
        setFormDetails({
            ...formDetails,
            [key]: value,
        });
    };

    const toggleCategory = (cat) => {
        setFormDetails(prev => {
            const isSelected = prev.categories.includes(cat);
            const newCategories = isSelected 
                ? prev.categories.filter(c => c !== cat)
                : [...prev.categories, cat];
            return { ...prev, categories: newCategories };
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formDetails.firstName) newErrors.firstName = true;
        if (!formDetails.email) newErrors.email = true;
        if (!formDetails.message) newErrors.message = true;
        if (formDetails.categories.length === 0) newErrors.categories = true;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setButtonText("Send Message");
            return;
        }

        setButtonText("Sending...");
        try {
            let response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify(formDetails)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let result = await response.json();
            setButtonText("Send");
            setFormDetails(formInitialDetails);
            if (result.success) {
                setStatus({ success: true, message: "Message sent successfully" });
            } else {
                setStatus({ success: false, message: result.message || "Something went wrong, please try again" });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({ success: false, message: "Something went wrong, please try again" });
        }
    };

    return (
        <section id="contact" className="relative bg-white border-t-2 border-zinc-100">
            {/* Background decoration - subtle but visible */}
            <div className="absolute inset-0 bg-indigo-50/10 pointer-events-none" />

            <div className="relative px-4 py-24 md:py-32">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-20">
                        <TagLine>Contact Us</TagLine>
                        <h2 className="text-4xl md:text-7xl font-black text-gray-900 mt-4 tracking-tighter uppercase leading-[0.9]">LET'S BUILD SOMETHING <br /> EXTRAORDINARY</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Info Panel - Higher Contrast */}
                        <div className="space-y-8">
                            <div className="p-10 rounded-[2.5rem] bg-indigo-50/50 border-2 border-indigo-200 space-y-8">
                                <h3 className="text-xl font-black uppercase tracking-[0.2em] text-indigo-900">Reach Out</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex items-center gap-5 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-indigo-200 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">Email Us</div>
                                            <a href="mailto:support@devaura.co.za" className="font-extrabold text-lg text-gray-900 border-b border-indigo-200 hover:border-indigo-600 transition-colors">support@devaura.co.za</a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-emerald-200 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-600 mb-1">Call Us</div>
                                            <a href="tel:+27734919207" className="font-extrabold text-lg text-gray-900 border-b border-emerald-200 hover:border-emerald-600 transition-colors">073 491 9207</a>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-5 group">
                                        <div className="w-14 h-14 rounded-2xl bg-white border-2 border-orange-200 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                                            <MapPin className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-1">Location</div>
                                            <div className="font-extrabold text-lg text-gray-900">Cape Town, SA</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 rounded-[2.5rem] border-2 border-zinc-200 bg-white">
                                <h4 className="font-black text-sm uppercase tracking-widest mb-6 text-zinc-900">Office Hours</h4>
                                <div className="space-y-3 text-sm font-bold text-zinc-600">
                                    <div className="flex justify-between border-b border-zinc-100 pb-2"><span>Mon - Fri</span> <span className="text-zinc-900 text-base">08:00 - 17:00</span></div>
                                    <div className="flex justify-between border-b border-zinc-100 pb-2"><span>Saturday</span> <span className="text-zinc-900 text-base">09:00 - 13:00</span></div>
                                    <div className="flex justify-between"><span>Sunday</span> <span className="text-zinc-900 text-base italic opacity-50">Closed</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Form Panel - Bold Inputs and Borders */}
                        <div className="lg:col-span-2">
                            <form className="space-y-12" onSubmit={handleSubmit}>
                                {/* Name and Email Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Full Name</label>
                                        <input 
                                            className={`w-full bg-transparent border-b-4 py-4 text-xl font-bold focus:outline-none transition-colors ${errors.firstName ? 'border-red-500' : 'border-zinc-300 focus:border-indigo-600'}`}
                                            type="text"
                                            value={formDetails.firstName}
                                            placeholder="Your Name"
                                            onChange={(e) => onFormUpdate("firstName", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Email Address</label>
                                        <input 
                                            className={`w-full bg-transparent border-b-4 py-4 text-xl font-bold focus:outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-zinc-300 focus:border-indigo-600'}`}
                                            type="email"
                                            value={formDetails.email}
                                            placeholder="hello@example.com"
                                            onChange={(e) => onFormUpdate("email", e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Multi-Select Category Grid - High Visibility */}
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Project Requirements</label>
                                        {errors.categories && <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Please select at least one</span>}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {categories.map((cat, i) => {
                                            const isSelected = formDetails.categories.includes(cat);
                                            return (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    onClick={() => toggleCategory(cat)}
                                                    className={`px-6 py-3 rounded-2xl text-[13px] font-black border-2 transition-all duration-300 flex items-center gap-2 ${
                                                        isSelected 
                                                        ? "bg-indigo-600 border-indigo-600 text-white translate-y-[-2px]" 
                                                        : "bg-white border-zinc-300 text-zinc-900 hover:border-indigo-600 hover:bg-indigo-50"
                                                    }`}
                                                >
                                                    {isSelected && <Check className="w-4 h-4 stroke-[3px]" />}
                                                    {cat}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Message */}
                                <div className="space-y-4">
                                    <label className="text-xs font-black uppercase tracking-[0.2em] text-zinc-900">Project Details</label>
                                    <textarea 
                                        className={`w-full bg-zinc-50 border-2 rounded-[2rem] p-8 h-48 text-lg font-bold focus:outline-none transition-all ${errors.message ? 'border-red-500' : 'border-zinc-300 focus:border-indigo-600 focus:bg-white'}`}
                                        value={formDetails.message}
                                        placeholder="Tell us everything about your vision..."
                                        onChange={(e) => onFormUpdate("message", e.target.value)}
                                    />
                                </div>

                                <div className="pt-6">
                                    <button 
                                        type="submit" 
                                        className="w-full md:w-auto inline-flex items-center justify-center gap-6 bg-indigo-600 hover:bg-black text-white px-16 py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-sm transition-all duration-500 group"
                                    >
                                        {buttonText}
                                        <div className="w-12 h-1 bg-white/30 group-hover:w-20 group-hover:bg-white transition-all duration-500" />
                                    </button>
                                    
                                    {status.message && (
                                        <p className={`mt-8 text-sm font-black uppercase tracking-widest p-4 rounded-xl inline-block ${status.success ? "bg-emerald-50 text-emerald-700 border-2 border-emerald-100" : "bg-red-50 text-red-700 border-2 border-red-100"}`}>
                                            {status.message}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
