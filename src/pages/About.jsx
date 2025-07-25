import React from 'react';
import { Rocket, Brain, Smartphone, Mail, Github, Linkedin, Globe, Zap, Users, Shield, TrendingUp } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="min-h-screen -mt-10  bg-gradient-to-br from-blue-50 via-blue-50 to-cyan-50">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="relative max-w-7xl mx-auto px-6 py-20">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mb-8 shadow-lg animate-pulse">
                            <Rocket className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-6">
                            About InvoiceManager
                        </h1>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            A smart, intuitive invoicing solution tailored for freelancers, small businesses, and growing enterprises.
                            With seamless data handling, beautiful PDF exports, and lightning-fast performance, we simplify the way
                            you handle billing and record-keeping—so you can focus on what matters most: your business.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-full shadow-lg">
                                <span className="text-sm font-medium">Built with love, technology, and precision</span>
                                <div className="ml-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why We Built This Section */}
            <div className="max-w-7xl mx-auto px-6 py-16 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-blue-700/10"></div>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Why We Built This?</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We wanted to create a fast, user-friendly invoice management tool that grows with your business
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Shield, title: "Structured Data", desc: "Keeps your data structured and accessible" },
                        { icon: Zap, title: "Instant Export", desc: "Exports professional invoices instantly" },
                        { icon: Users, title: "Simple Management", desc: "Simplifies product, company, and customer handling" },
                        { icon: TrendingUp, title: "Scalable", desc: "Can scale as your business grows" }
                    ].map((feature, index) => (
                        <div key={index} className="group relative">
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100">
                                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Meet the Developers Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-10 md:py-20">
                <div className="md:max-w-7xl max-w-fit mx-auto px-6">
                    <div className="text-center -mb-22 md:mb-16">
                        <h2 className="text-4xl font-bold text-white mb-6">Meet the Developers</h2>
                        <p className="text-xl text-blue-100">The talented minds behind InvoiceManager</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 md:scale-[100%] scale-[80%] max-w-fit md:max-w-5xl -ml-5 md:mx-auto">
                        {/* Mohanapriyan M */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                                    <Brain className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Mohanapriyan M</h3>
                                    <p className="text-blue-200 font-medium">Frontend Developer</p>
                                </div>
                            </div>

                            <p className="text-blue-100 mb-6 leading-relaxed">
                                Crafted the entire user experience with a clean and responsive interface
                            </p>

                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Tech Stack:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['React.js', 'Tailwind CSS', 'JavaScript', 'Formik', 'jsPDF', 'html2canvas'].map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-white/20 text-blue-100 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Role:</h4>
                                <p className="text-blue-100 text-sm">
                                    UI/UX Design, Form & Table Management, State Handling, PDF Exporting, and Frontend Architecture
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center text-blue-200 hover:text-white transition-colors">
                                    <Smartphone className="w-4 h-4 mr-2" />
                                    <span className="text-sm">9159604934</span>
                                </div>
                                <div className="flex items-center text-blue-200 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span className="text-sm">mohanapriyan.m2006@gmail.com</span>
                                </div>
                                <div className="flex gap-3">
                                    <Linkedin className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                                    <Globe className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                                    <Github className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* Sakthi Selvan */}
                        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4">
                                    <Brain className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Sakthi Selvan</h3>
                                    <p className="text-blue-200 font-medium">Backend Developer</p>
                                </div>
                            </div>

                            <p className="text-blue-100 mb-6 leading-relaxed">
                                Designed and implemented a robust and secure backend system
                            </p>

                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Tech Stack:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {['FastAPI', 'Python', 'SQLite/PostgreSQL', 'REST API'].map((tech) => (
                                        <span key={tech} className="px-3 py-1 bg-white/20 text-blue-100 rounded-full text-sm">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="text-white font-semibold mb-3">Role:</h4>
                                <p className="text-blue-100 text-sm">
                                    API Development, Authentication, CRUD Operations, and Backend Architecture
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center text-blue-200 hover:text-white transition-colors">
                                    <Smartphone className="w-4 h-4 mr-2" />
                                    <span className="text-sm">9159604934</span>
                                </div>
                                <div className="flex items-center text-blue-200 hover:text-white transition-colors">
                                    <Mail className="w-4 h-4 mr-2" />
                                    <span className="text-sm">mohanapriyan.m2006@gmail.com</span>
                                </div>
                                <div className="flex gap-3">
                                    <Linkedin className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                                    <Github className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}