import {
    FileText,
    Users,
    Database,
    AlertTriangle,
    Copyright,
    XCircle,
    RefreshCw,
    CheckCircle,
} from 'lucide-react';

const terms = [
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

export default terms;