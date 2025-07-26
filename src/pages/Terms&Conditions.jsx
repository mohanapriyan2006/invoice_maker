import React, { useState } from 'react';
import {
    Shield,
    Phone,
    Mail,
    Globe,
    Github,
    ChevronRight,
    CheckCircle,
    Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import terms from '../data/Terms&Condition';

export default function TermsAndConditions() {

    const navigate = useNavigate();
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (index) => {
        setExpandedSection(expandedSection === index ? null : index);
    };

    const sections = terms;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="max-w-6xl mx-auto px-6 py-16">
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mr-4">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">Terms and Conditions</h1>
                            <p className="text-blue-100 text-lg mt-2">InvoiceManager Service Agreement</p>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center text-blue-100 mb-4">
                            <Calendar className="w-5 h-5 mr-2" />
                            <span className="font-medium">Effective Date: July 23, 2025</span>
                        </div>
                        <p className="text-white text-lg leading-relaxed">
                            Welcome to <span className="font-bold">InvoiceManager</span>, a streamlined solution for managing invoices,
                            products, customers, and company profiles. These Terms and Conditions ("Terms") govern your use of the
                            application and services provided by the development team ("we," "our," or "us"). By accessing or using
                            InvoiceManager, you agree to be bound by these Terms.
                        </p>
                    </div>
                </div>
            </div>

            {/* Terms Sections */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="space-y-6">
                    {sections.map((section, index) => (
                        <div key={section.id} className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
                            <button
                                onClick={() => toggleSection(index)}
                                className="w-full p-6 text-left hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                                            <section.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-800">{section.id}. {section.title}</h2>
                                        </div>
                                    </div>
                                    <ChevronRight
                                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${expandedSection === index ? 'rotate-90' : ''
                                            }`}
                                    />
                                </div>
                            </button>

                            {expandedSection === index && (
                                <div className="px-6 pb-6 border-t border-gray-100">
                                    <div className="pt-4">
                                        {section.content && (
                                            <p className="text-gray-700 leading-relaxed mb-4">{section.content}</p>
                                        )}

                                        {section.list && (
                                            <ul className="space-y-3">
                                                {section.list.map((item, itemIndex) => (
                                                    <li key={itemIndex} className="flex items-start">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                                        <span className="text-gray-700 leading-relaxed">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        {section.footer && (
                                            <p className="text-gray-600 mt-4 italic">{section.footer}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Contact Information */}
                <div className="md:mt-16 mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                    <div className="text-center mb-4 md:mb-8">
                        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                        <p className="text-blue-100 text-lg">
                            For inquiries, support, or concerns, you may reach the development team at:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 md:gap-8 gap-4 md:m-0 -ml-14 -mt-10 md:scale-[100%] scale-[70%]">
                        {/* Mohanapriyan M */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-lg">M</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Mohanapriyan M</h3>
                                    <p className="text-blue-200">Frontend Developer</p>
                                </div>
                            </div>

                            <div className="text-sm text-blue-100 mb-4">
                                <span className="italic">React.js, Tailwind CSS, JavaScript Libraries</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center text-blue-200">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span>+91 9159604934</span>
                                </div>
                                <div className="flex items-center text-blue-200">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span>mohanapriyan.m2006@gmail.com</span>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <div className="flex  text-blue-200 hover:text-white cursor-pointer transition-colors">
                                        <Globe className="w-5 h-5 " />
                                        <a target='new' href="https://mohanapriyan.netlify.app/" >Website</a>
                                    </div>
                                    <div className="flex  text-blue-200 hover:text-white cursor-pointer transition-colors">
                                        <Github className="w-5 h-5 " />
                                        <a target='new' href='https://github.com/mohanapriyan2006'>GitHub</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sakthi Selvan */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-lg">S</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Sakthi Selvan</h3>
                                    <p className="text-blue-200">Backend Developer</p>
                                </div>
                            </div>

                            <div className="text-sm text-blue-100 mb-4">
                                <span className="italic">FastAPI, Python</span>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center text-blue-200">
                                    <Phone className="w-4 h-4 mr-2" />
                                    <span>+91 9361802547 </span>
                                </div>
                                <div className="flex items-center text-blue-200">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span>ssakthitselvan7@gmail.com</span>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <div className="flex  text-blue-200 hover:text-white cursor-pointer transition-colors">
                                        <Github className="w-5 h-5 " />
                                        <a target='new' href='https://github.com/SSAKTHITSELVAN/' >GitHub</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acceptance Section */}
                <div className="mt-12 bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Agreement Acknowledgment</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            By using InvoiceManager, you acknowledge that you have read and understood these terms and conditions.
                        </p>


                        <button
                            onClick={() => navigate('/home')}
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-200  bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg transform hover:-translate-y-1 '}`}
                        >
                            Continue to InvoiceManager
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}