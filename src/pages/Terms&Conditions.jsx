import React, { useState } from 'react';
import {
    FileText,
    Shield,
    Users,
    Database,
    AlertTriangle,
    Copyright,
    XCircle,
    RefreshCw,
    Phone,
    Mail,
    Globe,
    Github,
    ChevronRight,
    CheckCircle,
    Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function TermsAndConditions() {

    const navigate = useNavigate();
    const [expandedSection, setExpandedSection] = useState(null);

    const toggleSection = (index) => {
        setExpandedSection(expandedSection === index ? null : index);
    };

    const sections = [
        {
            id: 1,
            title: "Acceptance of Terms",
            icon: CheckCircle,
            content: "By accessing or using InvoiceManager, you acknowledge that you have read, understood, and agree to comply with these Terms. If you do not agree, you must discontinue use of the service immediately."
        },
        {
            id: 2,
            title: "Description of Service",
            icon: FileText,
            content: "InvoiceManager is a web-based application designed to assist businesses and individuals in managing their invoicing process, including:",
            list: [
                "Creation and tracking of invoices",
                "Management of customer and product data",
                "Storing and viewing company details",
                "Generating summaries and HSN/SAC code insights"
            ],
            footer: "We reserve the right to enhance, modify, or discontinue any aspect of the service at any time."
        },
        {
            id: 3,
            title: "User Responsibilities",
            icon: Users,
            list: [
                "You are responsible for maintaining the accuracy and legality of any data you input.",
                "You agree not to use the service for any unlawful or unauthorized purpose.",
                "You shall not attempt to access the service's backend or underlying code in a malicious or harmful manner."
            ]
        },
        {
            id: 4,
            title: "Data and Privacy",
            icon: Database,
            list: [
                "Invoice data, product details, and customer records entered into the application remain your sole property.",
                "If the application is hosted locally (e.g., in-browser using localStorage), data is stored solely on your device.",
                "In a hosted version with backend support (e.g., FastAPI + database), we implement reasonable security measures to protect your information."
            ]
        },
        {
            id: 5,
            title: "Limitation of Liability",
            icon: AlertTriangle,
            content: "To the fullest extent permitted by law, InvoiceManager and its developers shall not be held liable for:",
            list: [
                "Any direct, indirect, incidental, or consequential damages arising from the use of or inability to use the application.",
                "Loss of data due to browser storage limits, user actions, or third-party interactions.",
                "Errors, omissions, or inaccuracies in output generated from user-entered data."
            ]
        },
        {
            id: 6,
            title: "Intellectual Property",
            icon: Copyright,
            content: "All components of the platform including design, branding, and source code (except user-entered data) are the intellectual property of the developers and may not be copied, distributed, or used without explicit permission."
        },
        {
            id: 7,
            title: "Termination and Suspension",
            icon: XCircle,
            content: "We reserve the right to suspend or terminate your access to InvoiceManager at our sole discretion, without notice, for violations of these Terms or for suspected malicious activity."
        },
        {
            id: 8,
            title: "Changes to Terms",
            icon: RefreshCw,
            content: "These Terms may be updated periodically. All changes will be posted to this page and the effective date will be updated accordingly. Continued use of the application constitutes acceptance of the revised terms."
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
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
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
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
                <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
                        <p className="text-blue-100 text-lg">
                            For inquiries, support, or concerns, you may reach the development team at:
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
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
                                    <span>9159604934</span>
                                </div>
                                <div className="flex items-center text-blue-200">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span>mohanapriyan.m2006@gmail.com</span>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <Globe className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                                    <Github className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Sakthi Selvan */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center mr-3">
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
                                    <span>9159604934</span>
                                </div>
                                <div className="flex items-center text-blue-200">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span>mohanapriyan.m2006@gmail.com</span>
                                </div>
                                <div className="flex gap-3 mt-3">
                                    <Github className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Acceptance Section */}
                <div className="mt-12 bg-white rounded-2xl shadow-lg border-2 border-blue-200 p-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Agreement Acknowledgment</h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            By using InvoiceManager, you acknowledge that you have read and understood these terms and conditions.
                        </p>


                        <button
                            onClick={() => navigate('/home')}
                            className={`px-8 py-3 rounded-full font-semibold transition-all duration-200  bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg transform hover:-translate-y-1 '}`}
                        >
                            Continue to InvoiceManager
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}