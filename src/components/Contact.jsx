import { useState } from "react";
import TagLine from "./TagLine";
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    const formInitialDetails = {
        firstName: "",
        email: "",
        phone: "",
        message: "",
    };
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState("Send Message");
    const [status, setStatus] = useState({});
    const [errors, setErrors] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formDetails.firstName) newErrors.firstName = true;
        if (!formDetails.email) newErrors.email = true;
        if (!formDetails.message) newErrors.message = true;
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
            if (result.code === 200) {
                setStatus({ success: true, message: "Message sent successfully" });
            } else {
                setStatus({ success: false, message: "Something went wrong, please try again" });
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({ success: false, message: "Something went wrong, please try again" });
        }
    };

    return (
        <section id="contact" className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/30 to-indigo-100/30" />

            <div className="relative px-4 py-16">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                        <div className="p-8">
                            <TagLine>Contact Us</TagLine>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-8">Get in Touch</h2>

                            {/* Contact Info Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <div className="bg-indigo-50/50 rounded-xl p-6 flex flex-col items-center text-center group hover:bg-indigo-100/50 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Mail className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                                    <a href="mailto:info@devaurva.com" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                        info@devaurva.com
                                    </a>
                                </div>

                                <div className="bg-indigo-50/50 rounded-xl p-6 flex flex-col items-center text-center group hover:bg-indigo-100/50 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Phone className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Phone</h3>
                                    <a href="tel:+1234567890" className="text-gray-600 hover:text-indigo-600 transition-colors">
                                        +123 456 7890
                                    </a>
                                </div>

                                <div className="bg-indigo-50/50 rounded-xl p-6 flex flex-col items-center text-center group hover:bg-indigo-100/50 transition-colors duration-300">
                                    <div className="w-12 h-12 bg-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <MapPin className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-gray-900 mb-2">Location</h3>
                                    <p className="text-gray-600">
                                        Cape Town, South Africa
                                    </p>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-4">
                                    <label className="text-sm font-semibold text-gray-900" htmlFor="firstName">
                                        Full Name
                                    </label>
                                    <input 
                                        className={`border rounded-xl p-3 bg-gray-50/50 focus:bg-white transition-colors ${errors.firstName ? "border-red-500" : "border-gray-200"}`}
                                        type="text"
                                        value={formDetails.firstName}
                                        name="firstName"
                                        placeholder="Your Full Name"
                                        onChange={(e) => onFormUpdate("firstName", e.target.value)}
                                        required
                                    />
                                    {errors.firstName && (
                                        <p className="text-red-500 text-sm mt-1">Please enter your full name</p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-4">
                                    <label className="text-sm font-semibold text-gray-900" htmlFor="email">
                                        Email Address
                                    </label>
                                    <input 
                                        className={`border rounded-xl p-3 bg-gray-50/50 focus:bg-white transition-colors ${errors.email ? "border-red-500" : "border-gray-200"}`}
                                        type="email"
                                        value={formDetails.email}
                                        name="email"
                                        placeholder="Your Email Address"
                                        onChange={(e) => onFormUpdate("email", e.target.value)}
                                        required
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1">Please enter your email address</p>
                                    )}
                                </div>

                                <div className="flex flex-col gap-4 md:col-span-2">
                                    <label className="text-sm font-semibold text-gray-900" htmlFor="message">
                                        Message
                                    </label>
                                    <textarea 
                                        className={`border rounded-xl p-3 h-[150px] bg-gray-50/50 focus:bg-white transition-colors ${errors.message ? "border-red-500" : "border-gray-200"}`}
                                        name="message"
                                        value={formDetails.message}
                                        placeholder="Your Message"
                                        onChange={(e) => onFormUpdate("message", e.target.value)}
                                        required
                                    />
                                    {errors.message && (
                                        <p className="text-red-500 text-sm mt-1">Please enter your message</p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <button 
                                        type="submit" 
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition-colors duration-300"
                                    >
                                        {buttonText}
                                    </button>
                                </div>

                                {status.message && (
                                    <div className="md:col-span-2 text-center">
                                        <p className={`text-sm ${status.success ? "text-green-600" : "text-red-600"}`}>
                                            {status.message}
                                        </p>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
