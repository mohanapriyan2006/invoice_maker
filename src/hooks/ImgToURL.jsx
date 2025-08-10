import React, { useState } from 'react';
import { Upload, Copy, X, Image as ImageIcon } from 'lucide-react';

const ImgToURL = ({ onImageGenerated }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [dragOver, setDragOver] = useState(false);


    // File size limit in bytes (2MB)
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

    // Validate file size and type
    const validateFile = (file) => {
        if (!file) {
            return { isValid: false, error: 'No file selected.' };
        }

        if (!file.type.startsWith('image/')) {
            return { isValid: false, error: 'Please select a valid image file.' };
        }

        if (file.size > MAX_FILE_SIZE) {
            const maxSizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(1);
            const fileSizeMB = (file.size / (1024 * 1024)).toFixed(1);
            return {
                isValid: false,
                error: `File size ${fileSizeMB}MB exceeds the maximum limit of ${maxSizeMB}MB. Please choose a smaller image.`
            };
        }

        return { isValid: true, error: null };
    };

    // Convert file to data URL (base64)
    const convertToDataURL = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    };

    // Handle file selection
    const handleFileSelect = async (file) => {
        const validation = validateFile(file);

        if (!validation.isValid) {
            alert(validation.error);
            return;
        }

        setIsLoading(true);
        setSelectedImage(file);

        try {
            // Convert to data URL (base64) for persistent URL
            const dataURL = await convertToDataURL(file);
            setImageURL(dataURL);
        } catch (error) {
            console.error('Error processing image:', error);
            alert('Error processing image. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        handleFileSelect(file);
    };

    // Handle drag and drop
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragOver(false);
    };

    // Copy URL to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(imageURL).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };


    // Clear selected image
    const clearImage = () => {
        setSelectedImage(null);
        setImageURL('');
        setCopied(false);
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                    <ImageIcon className="w-8 h-8 text-blue-600 mr-2" />
                    <h1 className="md:text-3xl text-lg font-bold text-gray-800">Image to URL Generator</h1>
                </div>
                <p className="text-gray-600">Upload an image and get a shareable URL instantly</p>
            </div>

            {/* Upload Area */}
            <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragOver
                        ? 'border-blue-500 bg-blue-50'
                        : selectedImage
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                {!selectedImage ? (
                    <div>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-600 mb-2">
                            Drag and drop your image here
                        </p>
                        <p className="text-sm text-gray-500 mb-4">or</p>
                        <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                            <Upload className="w-5 h-5 mr-2" />
                            Choose Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </label>
                        <p className="text-xs text-gray-400 mt-2">
                            Supports: JPG, PNG, WebP (Max 2MB)
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-green-600 font-medium">Image uploaded successfully!</span>
                        </div>
                        <p className="text-sm text-gray-600">{selectedImage.name}</p>
                        <p className="text-xs text-gray-500">
                            Size: {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <p className="text-xs text-green-600 font-medium">
                            ✅ Data URL - Works after page reload
                        </p>
                    </div>
                )}
            </div>

            {/* Loading */}
            {isLoading && (
                <div className="flex items-center justify-center mt-6">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    <span className="text-blue-600">Processing image...</span>
                </div>
            )}

            {/* Image Preview and URL */}
            {selectedImage && imageURL && !isLoading && (
                <div className="mt-8 space-y-6">
                    {/* Image Preview */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
                        <div className="flex justify-center">
                            <img
                                src={imageURL}
                                alt="Preview"
                                className="max-w-full max-h-64 rounded-lg shadow-md object-contain"
                            />
                        </div>
                    </div>

                    {/* URL Section */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated URL</h3>
                        <div className="flex items-center  flex-col md:flex-row gap-2">
                            <input
                                type="text"
                                value={imageURL}
                                readOnly
                                className="flex-1 p-3 border border-gray-300 rounded-lg bg-white text-sm font-mono"
                            />
                            <button
                                onClick={copyToClipboard}
                                className={`px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                                    copied
                                        ? 'bg-green-600 text-white'
                                        : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                <Copy className="w-4 h-4" />
                                <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        {onImageGenerated && (
                            <button
                                onClick={() => onImageGenerated(imageURL)}
                                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <ImageIcon className="w-5 h-5" />
                                <span>Use This URL</span>
                            </button>
                        )}
                        <button
                            onClick={clearImage}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            <X className="w-5 h-5" />
                            <span>Clear</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Info Section */}
            <div className="mt-8 bg-blue-50 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-800 mb-2">How it works:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Upload an image by dragging & dropping or clicking "Choose Image"</li>
                    <li>• Get a data URL (base64) that persists after page reload</li>
                    <li>• Copy the URL to use in your applications</li>
                    <li>• Download the image if needed</li>
                </ul>
                <p className="text-xs text-blue-600 mt-2">
                    Note: The generated data URL is self-contained and will work even after page reload or sharing with others.
                </p>
            </div>
        </div>
    );
};

export default ImgToURL;
